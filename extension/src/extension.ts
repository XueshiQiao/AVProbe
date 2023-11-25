import * as vscode from 'vscode';
/* import { CatScratchEditorProvider } from './catScratchEditor';
import { PawDrawEditorProvider } from './pawDrawEditor';
 */
import {AVProbeEditorProvider} from './avprobeEditor';
import { CatCodingPanel } from './codec';

export function activate(context: vscode.ExtensionContext) {
	// Register our custom editor providers
	context.subscriptions.push(AVProbeEditorProvider.register(context));
	context.subscriptions.push(
	vscode.commands.registerCommand('avprobe.decoders', () => {
		CatCodingPanel.createOrShow(context);
	})
);
}
