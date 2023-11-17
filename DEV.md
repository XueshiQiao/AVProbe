## dev notes

### extension 目录。
	该目录是该 extension 的工程根目录
### UI 目录
	该目录主要是生成前端页面，基于 vue + Ant Design vue 项目，最终会转成 js/css 等文件，放到 extension/vue-dist 中，extension 里会 import 到 html 页面中
## publish note
 1. GitHub 上有 CI，在页面上创建 Release 会自动触发构建(创建 tag 并不会出发），并自动部署到 VSCode extension Market	.
 2. 需要注意的是部署时候 extension 的版本号是根据 extension/package.json 里设置，与 GitHub 上 Release 的版本号没有直接关系。但是为了方便理解，最好保持相同。
 3. 不熟需要 VSCE_PAT key，这个 key 在该项目的 Actions secrets 里已设置
