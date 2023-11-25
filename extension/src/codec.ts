import * as vscode from 'vscode';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';
import * as fs from 'fs';

class FFProbe {
  public static async showDecodersInfo(): Promise<string> {
    return await this.execFFmpegCmd('ffmpeg -decoders');
  }

  public static async execFFmpegCmd(params: any): Promise<string> {
    const execPromise = util.promisify(child_process.exec);
    let cmd = null;
    const custom_ffmpeg_path: any =
        vscode.workspace.getConfiguration().get('avprobe.ffmpegPath');
    if (custom_ffmpeg_path) {
      if (custom_ffmpeg_path.length > 0 && fs.existsSync(custom_ffmpeg_path)) {
        cmd = custom_ffmpeg_path;
        console.log('use custom ffmpeg path: ', custom_ffmpeg_path);
      }
    }

    if (custom_ffmpeg_path == null || custom_ffmpeg_path.length == 0) {
      vscode.window.showErrorMessage(
          'Custom FFmpeg path may not exist: ' + custom_ffmpeg_path +
          ', please make sure it is a valid path.');
      return Promise.reject(
          'Custom FFmpeg path may not exist: ' + custom_ffmpeg_path +
          ', please configure it in setting with key \'avprobe.ffmpegPath\'');
    }

		cmd += " -hide_banner -v quiet ";

    if (typeof params === 'string') {
      cmd += ` ${params}`;
    } else if (Array.isArray(params)) {
      cmd += ` ${params.join(' ')}`;
    }

    console.log('cmd: ', cmd);

    const options = {
      maxBuffer: 1024 * 1024 * 100
    };  // Increasing maxBuffer to 100MB
    const {stdout, stderr} = await execPromise(cmd, options);
    console.log('stdout size:', stdout.length);
    if (stderr) {
      return Promise.reject(stderr);
    } else {
      return Promise.resolve(stdout);
    }
  }

  public static async probeMediaInfo(path: string): Promise<JSON> {
    return await this.probeMediaInfoWithCustomArgs(
        path,
        '-hide_banner -v quiet -print_format json -show_format -show_streams');
  }

  /**
   * Probe media files using ffprobe
   * @param path media file path, e.g. /home/super_hero/1.mp4
   * @param params string or array of string, e.g. ['-v', 'quiet',
   *     '-print_format', 'json', '-show_format', '-show_streams']
   * @returns
   */
  public static async probeMediaInfoWithCustomArgs(path: string, params: any):
      Promise<JSON> {
    const execPromise = util.promisify(child_process.exec);

    let cmd = null;
    const custom_ffprobe_path: any =
        vscode.workspace.getConfiguration().get('avprobe.ffprobePath');
    if (custom_ffprobe_path) {
      if (custom_ffprobe_path.length > 0 &&
          fs.existsSync(custom_ffprobe_path)) {
        cmd = custom_ffprobe_path;
        console.log('use custom ffprobe path: ', custom_ffprobe_path);
      }
    }

    if (custom_ffprobe_path == null || custom_ffprobe_path.length == 0) {
      vscode.window.showErrorMessage(
          'Custom ffprobe path may not exist: ' + custom_ffprobe_path +
          ', please make sure it is a valid path.');
      return Promise.reject(
          'Custom ffprobe path may not exist: ' + custom_ffprobe_path +
          ', please configure it in setting with key \'avprobe.ffprobePath\'');
    }

    if (typeof params === 'string') {
      cmd += ` ${params}`;
    } else if (Array.isArray(params)) {
      cmd += ` ${params.join(' ')}`;
    }
    cmd += ` "${path}"`;
    console.log('cmd: ', cmd);

    const options = {
      maxBuffer: 1024 * 1024 * 100
    };  // Increasing maxBuffer to 100MB
    const {stdout, stderr} = await execPromise(cmd, options);
    console.log('stdout size:', stdout.length);
    if (stderr) {
      return Promise.reject(stderr);
    } else {
      return Promise.resolve(JSON.parse(stdout));
    }
  }
}

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
        FFProbe.execFFmpegCmd(['-decoders'])
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
        FFProbe.execFFmpegCmd(['-encoders'])
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
					FFProbe.execFFmpegCmd(['-help', 'decoder', decoderName])
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
