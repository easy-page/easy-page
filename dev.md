# EasyPage

## 仓库创建

- Monorepo: `npx create-nx-workspace@latest easy-page --preset=ts`
  - packages:(先创建：`packages` 目录)
    - easy-page-core: `nx g @nx/js:lib easy-page-core --publishable --importPath=@easy-page/core`
    - easy-page-react-ui: `nx g @nx/react:library easy-page-react-ui --publishable --importPath=@easy-page/react-ui`
      - 创建之前，执行：`pnpm add @nx/react -D`
    - easy-page-antd-ui: `nx g @nx/react:library easy-page-antd-ui --publishable --importPath=@easy-page/antd-ui`
  - apps: (先创建：`apps` 目录)
    - playground: `nx g @nx/react:app playground --bundler=vite`
    - docsite: `nx g @nx-plus/docusaurus:app docsite --bundler=vite`
      - 安装：`pnpm add @nx-plus/docusaurus -D --registry=https://registry.npm.taobao.org`
      - 安装：`pnpm add @nrwl/workspace@^15.0.0 -D --registry=https://registry.npm.taobao.org`

## 环境

- node: 16

> - 查看可启动项目：`nx show projects`

### playground

1. 启动：`nx serve playground`

### easy-page-core

1. 编译并监听文件变化：`nx build easy-page-core --watch`

### easy-page-react-ui

1. 编译并监听文件变化 `nx build easy-page-react-ui --watch`

## 发包

- packages: `nx publish easy-page-core --args="--ver=0.0.1 --tag=alpha"`

## 安装问题

- 如果安装 nx 遇到：“Error: Cannot find module '@nx/nx-darwin-arm64'”
  - 可以先安装：`npm install -g @nx/nx-darwin-arm64`
  - 再安装：`npm install --global nx@latest` 即可。
- 遇到构建问题，提示： path is undefind 啥的，执行下：`nx g @nrwl/workspace:fix-configuration`
  - 原因是去找一个叫：`tsconfig.app.json` 的文件不存在，nx bug。
