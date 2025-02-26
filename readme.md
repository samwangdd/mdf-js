### 目录说明
- core 核心代码 @mdf/core
- plugins 插件集
- mdf 对外使用的主要 pkg，命令都由这个包提供
- runtime 运行时，主要处理浏览器里面的框架功能
- create-mdf-app 脚手架
- types 都懂的
- plugins-react 框架层
- plugins-web 应用层
- bundler-webpack 构建层
- plugins-domain 业务层
- plugins-deploy 部署层

#### mdf
整个框架对外的模块，提供全局的 namespace mdf
- 项目运行时，编译时都有这个模块导出

#### create-mdf-app
主要用于创建项目，会为项目自动安装 mdf
通过 yarn create mdf 启动

#### yarn
yarn 的 workespace，将 npm 统一安装到 root 模块中
本地 yarn link 调试比较方便，npm link 要解决很多路径的问题

### 构建
dev & build 时一定要有 MDF_ENV 变量
约定这个变量完全由脚本命令传入，不传就是 dev
内部使用该变量进行判断！！

### 开发模式
使用 father-build 构建代码，通过 yarn link 到目标模块进行调试

#### 构建
两种方式全包构建（发布）和单模块构建（开发），不要改动 scripts 里面的脚本！
- yarn build
- yarn build runtime，直接输入目录名不是 package name
- watch 模式：yarn build --w

#### 体验开发流程
- npm i lerna yarn -g
- git clone https://github.com/aJean/mdf-js.git
- git clone medgit@git.medlinker.com:dcm-frontend/mdf-demo.git
- cd mdf-js
- yarn install & yarn link
- yarn build
- cd mdf-demo
- yarn link mdfjs
- yarn build / dev / create

#### 发布流程
注意开发完发布一定要整体 build 一次，因为不是所有的模块都使用了 cjs，records 模块必须手动修改并且记录 release！！
- yarn build
- yarn pub

### 控制台优化
参考 nest.js cli 和 vue cli，优化输出
- 举个例子 actions/new.action.ts/printCollective