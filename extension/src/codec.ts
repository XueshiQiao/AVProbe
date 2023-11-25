import * as vscode from 'vscode';
import * as path from 'path';

import {FFmpeg} from './avffmpeg';

/**
 * Manages cat coding webview panels
 */
export class CatCodingPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: CatCodingPanel | undefined;
	public static readonly viewType = 'catCoding';

	private readonly _context: vscode.ExtensionContext;
	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(context: vscode.ExtensionContext) {
		const extensionUri = context.extensionUri;
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (CatCodingPanel.currentPanel) {
			CatCodingPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			CatCodingPanel.viewType,
			'Cat Coding',
			column || vscode.ViewColumn.One,
			{}
		);
		CatCodingPanel.currentPanel = new CatCodingPanel(context, panel, extensionUri);
	}

	// public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
	// 	CatCodingPanel.currentPanel = new CatCodingPanel(panel, extensionUri);
	// }

	private constructor(context: vscode.ExtensionContext, panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._context = context;
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Setup initial content for the webview
    panel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(
            path.join(this._context.extensionPath, 'vue-dist-codec', 'assets')),
      ],
		};

		this._panel.webview.onDidReceiveMessage(e => this.onMessage(e, panel));

		this._panel.title = "ffmpeg codecs";
		this._panel.webview.html = this._getHtmlForWebview(this._panel.webview, panel);

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					// this._update();
				}
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public dispose() {
		CatCodingPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview, webviewPanel: vscode.WebviewPanel) {
   const styleVSCodeUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._context.extensionUri, 'media', 'vscode.css'));
		const dependencyNameList: string[] = [
      'index.css',
      'index.js',
    ];
		const dependencyList: vscode.Uri[] = dependencyNameList.map((item) =>
			webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join(this._context.extensionPath, 'vue-dist-codec', 'assets', item))));

		// Use a nonce to only allow specific scripts to be run
		const nonce = getNonce();

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

  private postMessage(panel: vscode.WebviewPanel, type: string, body: any):
      void {
    panel.webview.postMessage({type, body});
  }

  private onMessage(message: any,
		webviewPanel: vscode.WebviewPanel) {
		console.log('codec onMessage: ', message);
		switch (message.type) {
			case 'ready': {
				this.postMessage(webviewPanel, 'init', null);
				return;
			}
      case 'show_decoders': {
        FFmpeg.execFFmpegCmd(['-decoders'])
            .then((info) => {
              console.log('showDecodersInfo: ', info);
              this.postMessage(webviewPanel, 'show_decoders', info);
            })
            .catch((err) => {
              console.log('showDecodersInfo error: ', err);
            });
        return;
      }
      case 'show_encoders': {
        FFmpeg.execFFmpegCmd(['-encoders'])
            .then((info) => {
              console.log('showEncodersInfo: ', info);
              this.postMessage(webviewPanel, 'show_encoders', info);
            })
            .catch((err) => {
              console.log('showEncodersInfo error: ', err);
            });
        return;
      }
			case 'show_decoder_info': {
				const decoderName = message.decoderName;
				if (decoderName) {
					FFmpeg.execFFmpegCmd(['-help', 'decoder', decoderName])
						.then((info) => {
							console.log('showDecoderInfo: ', info);
							this.postMessage(webviewPanel, 'show_decoder_info', info);
						}
					)
						.catch((err) => {
							console.log('showDecoderInfo error: ', err);
						}
					);
				}
        return;
      }
    }
  }
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
