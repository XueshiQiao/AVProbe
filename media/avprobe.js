// @ts-check

// This script is run within the webview itself
(function () {
	// @ts-ignore
	const vscode = acquireVsCodeApi();

	let mediaInfoTree = null;

	document.querySelector('#probe_btn')?.addEventListener('click', e => {
		vscode.postMessage({ type: 'probe' });
	});

	document.querySelector('#show_packets_btn')?.addEventListener('click', e => {
		vscode.postMessage({ type: 'show_packets' });
	});
	// Handle messages from the extension
	window.addEventListener('message', async e => {
		const { type, body, requestId } = e.data;
		switch (type) {
			case 'init':
				{
					return;
				}
			case "media_info":
				{
					console.log("media_info: ", body);
					if (mediaInfoTree) {
						jsonview.destroy(mediaInfoTree);
					}
					mediaInfoTree = jsonview.renderJSON(body, document.querySelector('#media_info_json'));
					if (body.length <= 1024 * 1024 * 1) { // > 1M
						jsonview.expand(mediaInfoTree);
					}
					return;
				}
		}
	});

	// Signal to VS Code that the webview is initialized.
	vscode.postMessage({ type: 'ready' });
}());
