import * as vscode from 'vscode';
import { AVProbeEditorProvider } from './avprobeEditor';
import { CatCodingPanel } from './codec';

export function activate(context: vscode.ExtensionContext) {
	// Register our custom editor providers
	context.subscriptions.push(AVProbeEditorProvider.register(context));
	context.subscriptions.push(
	vscode.commands.registerCommand('avprobe.codecs', () => {
		CatCodingPanel.createOrShow(context);
	})
);
}
