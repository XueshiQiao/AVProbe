import * as path from 'path';
import * as vscode from 'vscode';

import {FFProbe, FFmpeg, FFmpegBMPFrame} from './avffmpeg';
import {Disposable, disposeAll} from './dispose';
import {getNonce} from './util';
import { error } from 'console';
import { ExtensionOptions } from './extension_options';

interface AVFileDocumentDelegate {
  getFileData(): Promise<Uint8Array>;
}

/**
 * Define the document (the data model) used for media files.
 */
class AVFileDocument extends Disposable implements vscode.CustomDocument {
  static async create(
      uri: vscode.Uri,
      backupId: string|undefined,
      delegate: AVFileDocumentDelegate,
      ): Promise<AVFileDocument|PromiseLike<AVFileDocument>> {
    // If we have a backup, read that. Otherwise read the resource from the
    // workspace
    const dataFile =
        typeof backupId === 'string' ? vscode.Uri.parse(backupId) : uri;
    const fileData = new Uint8Array();
    // don't read file directly, use delegate
    return new AVFileDocument(uri, fileData, delegate);
  }



  private readonly _uri: vscode.Uri;

  private _documentData: Uint8Array;

  private readonly _delegate: AVFileDocumentDelegate;

  private constructor(
      uri: vscode.Uri, initialContent: Uint8Array,
      delegate: AVFileDocumentDelegate) {
    super();
    this._uri = uri;
    this._documentData = initialContent;
    this._delegate = delegate;
  }

  public get uri() {
    return this._uri;
  }

  public get documentData(): Uint8Array {
    return this._documentData;
  }

  private readonly _onDidDispose =
      this._register(new vscode.EventEmitter<void>());
  /**
   * Fired when the document is disposed of.
   */
  public readonly onDidDispose = this._onDidDispose.event;

  private readonly _onDidChangeDocument = this._register(
      new vscode.EventEmitter<{readonly content?: Uint8Array;}>());
  /**
   * Fired to notify webviews that the document has changed.
   */
  public readonly onDidChangeContent = this._onDidChangeDocument.event;

  private readonly _onDidChange = this._register(new vscode.EventEmitter<{
    readonly label: string,
    undo(): void,
    redo(): void,
  }>());
  /**
   * Fired to tell VS Code that an edit has occurred in the document.
   *
   * This updates the document's dirty indicator.
   */
  public readonly onDidChange = this._onDidChange.event;

  /**
   * Called by VS Code when there are no more references to the document.
   *
   * This happens when all editors for it have been closed.
   */
  dispose(): void {
    this._onDidDispose.fire();
    super.dispose();
  }
}

export class AVProbeEditorProvider implements
    vscode.CustomReadonlyEditorProvider<AVFileDocument> {

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.window.registerCustomEditorProvider(
        AVProbeEditorProvider.viewType, new AVProbeEditorProvider(context), {
          // For this demo extension, we enable `retainContextWhenHidden` which
          // keeps the webview alive even when it is not visible. You should
          // avoid using this setting unless is absolutely required as it does
          // have memory overhead.
          webviewOptions: {
            retainContextWhenHidden: true,
          },
          supportsMultipleEditorsPerDocument: false,
        });
  }

  private static readonly viewType = 'xueshi.io.avprobe';

  /**
   * Tracks all known webviews
   */
  private readonly webviews = new WebviewCollection();

  constructor(private readonly _context: vscode.ExtensionContext) {}

  //#region CustomEditorProvider

  async openCustomDocument(
      uri: vscode.Uri, openContext: {backupId?: string},
      _token: vscode.CancellationToken): Promise<AVFileDocument> {
    const document: AVFileDocument =
        await AVFileDocument.create(uri, openContext.backupId, {
          getFileData: async () => {
            const webviewsForDocument =
                Array.from(this.webviews.get(document.uri));
            if (!webviewsForDocument.length) {
              throw new Error('Could not find webview to save for');
            }
            const panel = webviewsForDocument[0];
            const response = await this.postMessageWithResponse<number[]>(
                panel, 'getFileData', {});
            return new Uint8Array(response);
          }
        });
    console.log('openCustomDocument: ' + uri.path);

    const listeners: vscode.Disposable[] = [];

    listeners.push(document.onDidChange(
        e => {
            // Tell VS Code that the document has been edited by the use.
            /* 			this._onDidChangeCustomDocument.fire({
                                            document,
                                            ...e,
                                    });
             */
        }));

    document.onDidDispose(() => disposeAll(listeners));
    return document;
  }

  async resolveCustomEditor(
      document: AVFileDocument, webviewPanel: vscode.WebviewPanel,
      _token: vscode.CancellationToken): Promise<void> {
    // Add the webview to our internal set of active webviews
    this.webviews.add(document.uri, webviewPanel);

    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(
            path.join(this._context.extensionPath, 'vue-dist-avprobe', 'assets')),
      ],
    };
    webviewPanel.webview.html =
        this.getHtmlForWebview(webviewPanel.webview, webviewPanel, document);

    webviewPanel.webview.onDidReceiveMessage(
        e => this.onMessage(document, e, webviewPanel));
  }

  /**
   * Get the static HTML used for in our editor's webviews.
   */
  private getHtmlForWebview(
      webview: vscode.Webview, webviewPanel: vscode.WebviewPanel,
      document: AVFileDocument): string {
    // Local path to script and css for the webview
    const scriptUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._context.extensionUri, 'media', 'avprobe.js'));
    const scriptJsonViewUri = webview.asWebviewUri(vscode.Uri.joinPath(
        this._context.extensionUri, 'media',
        '3rd_party/json_view/jsonview.js'));


    const styleResetUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._context.extensionUri, 'media', 'reset.css'));

    const styleVSCodeUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._context.extensionUri, 'media', 'vscode.css'));

    const styleTableUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._context.extensionUri, 'media', 'table.css'));

    //const filePath = document.uri.path;

    const dependencyNameList: string[] = [
      'index.css',
      'index.js',
    ];
    const dependencyList: vscode.Uri[] = dependencyNameList.map(
        (item) => webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join(
            this._context.extensionPath, 'vue-dist-avprobe', 'assets', item))));

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    // <link href="${styleResetUri}" rel="stylesheet" />
    // <link href="${styleVSCodeUri}" rel="stylesheet" />
    // <link href="${styleTableUri}" rel="stylesheet" />
    // <script nonce="${nonce}" src="${scriptJsonViewUri}"></script>

    return /* html */ `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>AVProbe extension</title>
				<style>
					body {
						padding: 20px;
					}
				</style>
				<script>
					const vscode = acquireVsCodeApi();
				</script>
				<link href="${styleVSCodeUri}" rel="stylesheet" />
				<script type="module" crossorigin src="${dependencyList[1]}"></script>
				<link rel="stylesheet" href="${dependencyList[0]}" />
			</head>
			<body>
				<div id="app"></div>
			</body>
		</html>
			`;
  }

  private _requestId = 1;
  private readonly _callbacks = new Map<number, (response: any) => void>();

  private postMessageWithResponse<R = unknown>(
      panel: vscode.WebviewPanel, type: string, body: any): Promise<R> {
    const requestId = this._requestId++;
    const p =
        new Promise<R>(resolve => this._callbacks.set(requestId, resolve));
    panel.webview.postMessage({type, requestId, body});
    return p;
  }

  private postMessage(panel: vscode.WebviewPanel, type: string, body: any):
      void {
    panel.webview.postMessage({type, body});
  }

  private onMessage(
      document: AVFileDocument, message: any,
      webviewPanel: vscode.WebviewPanel) {
    // get file size of the media file
    const filePath = document.uri.fsPath;
    switch (message.type) {
      case 'ready': {
        vscode.workspace.fs.stat(document.uri).then((stat) => {
          const fileSize = stat.size;
          console.log('fileSize: ', fileSize);
          if (document.uri.scheme === 'untitled') {
            this.postMessage(webviewPanel, 'init', {
              untitled: true,
              editable: true,
              filePath: '',
              fileSize: 0,
            });
          } else {
            const editable =
                vscode.workspace.fs.isWritableFileSystem(document.uri.scheme);

            this.postMessage(webviewPanel, 'init', {
              value: document.documentData,
              editable,
              filePath,
              fileSize,
            });
          }
        });
        return;
      }
      case 'probe': {
        FFProbe.probeMediaInfo(filePath)
            .then((info) => {
              console.log('probeMediaInfo: ', info);
              this.postMessage(
                  webviewPanel, 'media_info', JSON.stringify(info));
            })
            .catch((err) => {
              console.log('probeMediaInfo error: ', err);
            });

        return;
      }
      case 'show_packets': {
        const streamIndex = message.streamIndex;
        let args = '-v quiet -hide_banner -print_format json -show_packets';
        if (streamIndex !== undefined && Number(streamIndex) >= 0) {
          args += ' -select_streams ' + streamIndex;
        } else {
          // nop, select all streams for default
        }
        FFProbe.probeMediaInfoWithCustomArgs(filePath, args)
            .then((info) => {
              console.log('probeMediaInfo: ', info);
              this.postMessage(webviewPanel, 'packets', JSON.stringify(info));
            })
            .catch((err) => {
              console.log('probeMediaInfo error: ', err);
            });

        return;
      }
      case 'show_frame': {
        const framePtsString = message.framePts;
        FFmpeg.extractFrameAsBmp(filePath, framePtsString).then((info: FFmpegBMPFrame) => {
          console.log("extractFrameAsBmp: ", info);
          this.postMessage(webviewPanel, 'bmp_frame', info);
        }).catch((error) => {
          console.error("extractFrameAsBmp error: ", error);
        });
        return;
      }
      case "get_extension_options": {
        console.log("options: ", message);
        this.postMessage(webviewPanel, 'extension_options', {
          "ffmpegPath": ExtensionOptions.getFFmpegPath(),
          "ffprobePath": ExtensionOptions.getFFprobePath(),
          "tablePageSize": ExtensionOptions.getTablePageSize(),
        });
        return;
      }
    }
  }
}

/**
 * Tracks all webviews.
 */
class WebviewCollection {
  private readonly _webviews = new Set<{
    readonly resource: string; readonly webviewPanel: vscode.WebviewPanel;
  }>();

  /**
   * Get all known webviews for a given uri.
   */
  public * get(uri: vscode.Uri): Iterable<vscode.WebviewPanel> {
    const key = uri.toString();
    for (const entry of this._webviews) {
      if (entry.resource === key) {
        yield entry.webviewPanel;
      }
    }
  }

  /**
   * Add a new webview to the collection.
   */
  public add(uri: vscode.Uri, webviewPanel: vscode.WebviewPanel) {
    const entry = {resource: uri.toString(), webviewPanel};
    this._webviews.add(entry);

    webviewPanel.onDidDispose(() => {
      this._webviews.delete(entry);
    });
  }
}
