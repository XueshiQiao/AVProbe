import * as vscode from 'vscode';
import { Disposable, disposeAll } from './dispose';
import { getNonce } from './util';
import * as child_process from 'child_process';
import * as util from 'util';
import * as ffmpeg from '@ffmpeg-installer/ffmpeg';
import * as ffprobe from '@ffprobe-installer/ffprobe';

interface AVFileDocumentDelegate {
	getFileData(): Promise<Uint8Array>;
}

class FFProbe {
	public static async probeMediaInfo(path: string): Promise<JSON> {
		return await this.probeMediaInfoWithCustomArgs(path, "-hide_banner -v quiet -print_format json -show_format -show_streams");
	}

	/**
	 * Probe media files using ffprobe
	 * @param path media file path, e.g. /home/super_hero/1.mp4
	 * @param params string or array of string, e.g. ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams']
	 * @returns
	 */
	public static async probeMediaInfoWithCustomArgs(path: string, params: any): Promise<JSON> {
		console.log("ffprobe path: " , ffprobe.path, ", version: ", ffprobe.version);

		// call ffmpeg to probe the file
		// set maxBuffer to 100MB

		const execPromise = util.promisify(child_process.exec);
		let cmd = `${ffprobe.path}`;
		// check whether params is array or string

		if (typeof params === 'string') {
			cmd += ` ${params}`;
		} else if (Array.isArray(params)) {
			cmd += ` ${params.join(' ')}`;
		}
		cmd += ` ${path}`;
		console.log("cmd: ", cmd);

		const options = { maxBuffer: 1024 * 1024 * 100 }; // Increasing maxBuffer to 100MB
		const { stdout, stderr } = await execPromise(cmd, options);
		console.log("stdout size:", stdout.length);
		if (stderr) {
			return Promise.reject(stderr);
		} else {
			return Promise.resolve(JSON.parse(stdout));
		}
	}
}

/**
 * Define the document (the data model) used for paw draw files.
 */
class AVFileDocument extends Disposable implements vscode.CustomDocument {

	static async create(
		uri: vscode.Uri,
		backupId: string | undefined,
		delegate: AVFileDocumentDelegate,
	): Promise<AVFileDocument | PromiseLike<AVFileDocument>> {
		// If we have a backup, read that. Otherwise read the resource from the workspace
		const dataFile = typeof backupId === 'string' ? vscode.Uri.parse(backupId) : uri;
		const fileData = new Uint8Array();
		// don't read file directly, use delegate
		return new AVFileDocument(uri, fileData, delegate);
	}



	private readonly _uri: vscode.Uri;

	private _documentData: Uint8Array;

	private readonly _delegate: AVFileDocumentDelegate;

	private constructor(
		uri: vscode.Uri,
		initialContent: Uint8Array,
		delegate: AVFileDocumentDelegate
	) {
		super();
		this._uri = uri;
		this._documentData = initialContent;
		this._delegate = delegate;
	}

	public get uri() { return this._uri; }

	public get documentData(): Uint8Array { return this._documentData; }

	private readonly _onDidDispose = this._register(new vscode.EventEmitter<void>());
	/**
	 * Fired when the document is disposed of.
	 */
	public readonly onDidDispose = this._onDidDispose.event;

	private readonly _onDidChangeDocument = this._register(new vscode.EventEmitter<{
		readonly content?: Uint8Array;
	}>());
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

class MessagePoster {
	public constructor(private readonly webviewPanel: vscode.WebviewPanel) {
		this._webViewPanel = webviewPanel;
	}
	public postMessage(message: any) {
		this._webViewPanel.webview.postMessage(message);
	}
	private _webViewPanel: vscode.WebviewPanel;
}

/**
 * Provider for paw draw editors.
 *
 * Paw draw editors are used for `.pawDraw` files, which are just `.png` files with a different file extension.
 *
 * This provider demonstrates:
 *
 * - How to implement a custom editor for binary files.
 * - Setting up the initial webview for a custom editor.
 * - Loading scripts and styles in a custom editor.
 * - Communication between VS Code and the custom editor.
 * - Using CustomDocuments to store information that is shared between multiple custom editors.
 * - Implementing save, undo, redo, and revert.
 * - Backing up a custom editor.
 */
export class AVProbeEditorProvider implements vscode.CustomReadonlyEditorProvider<AVFileDocument> {

	private static newPawDrawFileId = 1;

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		vscode.commands.registerCommand('catCustoms.pawDraw.new', () => {
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (!workspaceFolders) {
				vscode.window.showErrorMessage("Creating new Paw Draw files currently requires opening a workspace");
				return;
			}

			const uri = vscode.Uri.joinPath(workspaceFolders[0].uri, `new-${AVProbeEditorProvider.newPawDrawFileId++}.pawdraw`)
				.with({ scheme: 'untitled' });

			vscode.commands.executeCommand('vscode.openWith', uri, AVProbeEditorProvider.viewType);
		});

		return vscode.window.registerCustomEditorProvider(
			AVProbeEditorProvider.viewType,
			new AVProbeEditorProvider(context),
			{
				// For this demo extension, we enable `retainContextWhenHidden` which keeps the
				// webview alive even when it is not visible. You should avoid using this setting
				// unless is absolutely required as it does have memory overhead.
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

	constructor(
		private readonly _context: vscode.ExtensionContext
	) { }

	//#region CustomEditorProvider

	async openCustomDocument(
		uri: vscode.Uri,
		openContext: { backupId?: string },
		_token: vscode.CancellationToken
	): Promise<AVFileDocument> {
		const document: AVFileDocument = await AVFileDocument.create(uri, openContext.backupId, {
			getFileData: async () => {
				const webviewsForDocument = Array.from(this.webviews.get(document.uri));
				if (!webviewsForDocument.length) {
					throw new Error('Could not find webview to save for');
				}
				const panel = webviewsForDocument[0];
				const response = await this.postMessageWithResponse<number[]>(panel, 'getFileData', {});
				return new Uint8Array(response);
			}
		});
		console.log("openCustomDocument: " + uri.path);

		const listeners: vscode.Disposable[] = [];

		listeners.push(document.onDidChange(e => {
			// Tell VS Code that the document has been edited by the use.
/* 			this._onDidChangeCustomDocument.fire({
				document,
				...e,
			});
 */
		}));

		listeners.push(document.onDidChangeContent(e => {
			// Update all webviews when the document changes
			for (const webviewPanel of this.webviews.get(document.uri)) {
				this.postMessage(webviewPanel, 'update', {
					content: e.content,
				});
			}
		}));

		document.onDidDispose(() => disposeAll(listeners));

		return document;
	}

	async resolveCustomEditor(
		document: AVFileDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		// Add the webview to our internal set of active webviews
		this.webviews.add(document.uri, webviewPanel);

		// Setup initial content for the webview
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document);

		webviewPanel.webview.onDidReceiveMessage(e => this.onMessage(document, e, webviewPanel));

		// Wait for the webview to be properly ready before we init
		webviewPanel.webview.onDidReceiveMessage(e => {
			if (e.type === 'ready') {
				if (document.uri.scheme === 'untitled') {
					this.postMessage(webviewPanel, 'init', {
						untitled: true,
						editable: true,
					});
				} else {
					const editable = vscode.workspace.fs.isWritableFileSystem(document.uri.scheme);

					this.postMessage(webviewPanel, 'init', {
						value: document.documentData,
						editable,
					});
				}
			}
		});
	}

	/**
	 * Get the static HTML used for in our editor's webviews.
	 */
	private getHtmlForWebview(webview: vscode.Webview, document: AVFileDocument): string {
		// Local path to script and css for the webview
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', 'avprobe.js'));
		const scriptJsonViewUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', '3rd_party/json_view/jsonview.js'));


		const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', 'reset.css'));

		const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', 'vscode.css'));

		const styleTableUri = webview.asWebviewUri(vscode.Uri.joinPath(
			this._context.extensionUri, 'media', 'table.css'));

		const filePath = document.uri.path;

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return /* html */`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<!--<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} blob:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet" />
				<link href="${styleVSCodeUri}" rel="stylesheet" />
				<link href="${styleTableUri}" rel="stylesheet" />
				<script nonce="${nonce}" src="${scriptJsonViewUri}"></script>
				<title>Paw Draw</title>
			</head>
			<body>
				<div>
					<h3>video path: ${filePath}</h3>
					<div id="buttons">
						<button id="probe_btn" class="button">Probe</button>
						<button id="show_packets_btn" class="button">Packets Info</button>
					</div>

					<hr />
					<div id="media_info_tree" class="description"></div>
					<div id="packets_info_table" class="description"></div>
					<dir>
					</dir>
				</div>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}

	private _requestId = 1;
	private readonly _callbacks = new Map<number, (response: any) => void>();

	private postMessageWithResponse<R = unknown>(panel: vscode.WebviewPanel, type: string, body: any): Promise<R> {
		const requestId = this._requestId++;
		const p = new Promise<R>(resolve => this._callbacks.set(requestId, resolve));
		panel.webview.postMessage({ type, requestId, body });
		return p;
	}

	private postMessage(panel: vscode.WebviewPanel, type: string, body: any): void {
		panel.webview.postMessage({ type, body });
	}

	private onMessage(document: AVFileDocument, message: any, webviewPanel: vscode.WebviewPanel) {
		switch (message.type) {
			case 'stroke':
				//document.makeEdit(message as PawDrawEdit);
				return;

			case 'response':
				{
					const callback = this._callbacks.get(message.requestId);
					callback?.(message.body);
					return;
				}

			case 'probe':
				{
					FFProbe.probeMediaInfo(document.uri.path).then((info) => {
						console.log("probeMediaInfo: ", info);
						this.postMessage(webviewPanel, 'media_info', JSON.stringify(info));
					}).catch((err) => {
						console.log("probeMediaInfo error: ", err);
					});

					return;
				}
			case 'show_packets':
				{
					FFProbe.probeMediaInfoWithCustomArgs(document.uri.path, "-v quiet -hide_banner -print_format json -show_packets").then((info) => {
						console.log("probeMediaInfo: ", info);
						this.postMessage(webviewPanel, 'packets', JSON.stringify(info));
					}).catch((err) => {
						console.log("probeMediaInfo error: ", err);
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
		readonly resource: string;
		readonly webviewPanel: vscode.WebviewPanel;
	}>();

	/**
	 * Get all known webviews for a given uri.
	 */
	public *get(uri: vscode.Uri): Iterable<vscode.WebviewPanel> {
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
		const entry = { resource: uri.toString(), webviewPanel };
		this._webviews.add(entry);

		webviewPanel.onDidDispose(() => {
			this._webviews.delete(entry);
		});
	}
}
