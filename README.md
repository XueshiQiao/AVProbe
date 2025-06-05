# AVProbe (VSCode Extension)
Display the information of Audio/Video files using the built-in ffmpeg/ffprobe.

Core functionality is built upon FFmpeg, while the user interface leverages Vue and [Ant-Design-Vue](https://github.com/vueComponent/ant-design-vue).

## Features
* [x] Support macOS, Windows, Linux
* [x] Support VSCode Remote / Dev containers
* [x] Support mp4/mkv/mov/webm and others
* [x] Display basic information such as streams, formats, etc
* [x] Presents packets information in a table format
* [x] Enhanced User Interface (implemented using Vue3 + AntDesign for Vue)
* [x] Responsive Webview
* [x] Automatically switch between Light/Dark theme based on system settings
* [x] Support show decoder/encoder information supported by FFmpeg local/remote
  * [x] Show decoders/encoders list
  * [x] Support filtering by conditions like codec type and name
* [x] Preview specified frame
* [x] Support filter packets (Show key frames only)
* [ ] Support live streams like RTMP or http-flv

## Screenshots
### Stream info
note: (demo with light theme, support both light and dark)
![](https://images.xueshi.io/screenshots/screenshots_01.png)

### Packets info
![](https://images.xueshi.io/screenshots/screenshots_02.png)

### Decoders/Encoders info (demo with dark theme, support both light and dark)
![](https://images.xueshi.io/screenshots/codecs_list.png)

## How to use?

### 0. Prerequisite
Install the ffprobe / ffmpeg command-line tool.
AVProbe inspects media information through ffmpeg&ffprobe, so you need to install ffmpeg first.
### 1. Config `ffmpeg` path & `ffprobe`

![Alt text](https://images.xueshi.io/screenshots/set_custom_ffprobe_path.png)
Note: In the Windows system, the Ffmpeg Path and the Ffprobe Path need to use absolute paths, such as "D:\ffmpeg-7.1-full_build\bin\ffprobe.exe".

### 2. Open media files with 'AVProbe'
Simply right-click on the media file, then select ‘Audio/Video Probe’ to open it
![Alt text](https://images.xueshi.io/screenshots/open_with_avprobe.png)

### 3. Show decodes/encoders supported by FFmpeg on local/remote machine
Open Command Palette, input "AVProbe" or "encoders"/"decoders" to access the command as follows
![Alt text](https://images.xueshi.io/screenshots/codecs_command.png)


## Development

### DEBUG extension in VSCode

#### 1. Install dependencies:

```bash
# cd project_root;
cd extension; npm install; cd -
cd ui_avprobe; npm install; cd -
cd ui_codec; npm install; cd -
```

#### 2. Open with vscode
Open project folder with VSCode, then choose "Run -> Start Debugging" from menu bar

```bash
code .
```
