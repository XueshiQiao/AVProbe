import * as vscode from 'vscode';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';
import * as fs from 'fs';
import { ExtensionOptions } from './extension_options';

// import * as ffmpeg from '@ffmpeg-installer/ffmpeg';
// import * as ffprobe from '@ffprobe-installer/ffprobe';

export class FFProbe {
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
    const custom_ffprobe_path: any = ExtensionOptions.getFFprobePath();
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
          ', please configure it in setting with key \''+ ExtensionOptions.FFprobePathOptionKey +'\'');
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

export type FFmpegBMPFrame = {
  base64ImageData: string,
  pts: string,
  status: boolean
};

export class FFmpeg {
  public static async showDecodersInfo(): Promise<string> {
    return await this.execFFmpegCmd('ffmpeg -decoders');
  }

  public static async extractFrameAsBmp(filePath: string, framePts: string): Promise<FFmpegBMPFrame> {
    const first_workspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "";
    const temp_file_path = path.join(first_workspace, "avprobe_extracted_frame.bmp");
    console.log("temp_file_path: ", temp_file_path);

    return new Promise((resolve, reject) => {
      FFmpeg.execFFmpegCmd(["-i", filePath, "-ss", framePts, "-vsync vfr", "-vframes 1", temp_file_path, "-y"])
        .then((result) => {
          // check if temp file exists
          const temp_file_exists = fs.existsSync(temp_file_path);
          if (temp_file_exists) {
            const base64ed_image_buffer = fs.readFileSync(temp_file_path).toString('base64');
            fs.rmSync(temp_file_path);
            resolve({"base64ImageData" : base64ed_image_buffer, pts: framePts, "status" : true});
          } else {
            reject("Failed to extract frame from file, file not exists " + filePath);
          }
      }).catch((err) => {
        reject("Failed to extract frame from file, err: " + err);
      });
    });
  }

  public static async execFFmpegCmd(params: any): Promise<string> {
    const execPromise = util.promisify(child_process.exec);
    let cmd = null;
    const custom_ffmpeg_path: any = ExtensionOptions.getFFmpegPath();
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
          ', please configure it in setting with key \'' + ExtensionOptions.FFmpegPathOptionKey + '\'');
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
}
