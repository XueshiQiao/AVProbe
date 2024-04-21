import * as vscode from 'vscode';

export class ExtensionOptions {
	public static FFmpegPathOptionKey 		= 'avprobe.ffmpegPath';
	public static FFprobePathOptionKey 		= 'avprobe.ffprobePath';
	public static TablePageSizeOptionKey 	= 'avprobe.packetInfo.pageSize';

	public static kDefaultPageSize = 10;

	public static getFFmpegPath(): string {
		return vscode.workspace.getConfiguration().get(ExtensionOptions.FFmpegPathOptionKey) as string;
	}

	public static getFFprobePath(): string {
		return vscode.workspace.getConfiguration().get(ExtensionOptions.FFprobePathOptionKey) as string;
	}

	public static getTablePageSize(): number {
		const pageSize =  vscode.workspace.getConfiguration().get(ExtensionOptions.TablePageSizeOptionKey) as number;
		return pageSize > 0 ? pageSize : ExtensionOptions.kDefaultPageSize;
	}
}
