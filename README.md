# WatcheRobot Docs

WatcheRobot 面向用户和开发者的官方文档站，使用 VitePress 构建并通过 GitHub Pages 发布。

## 本地开发

```bash
npm ci
npm run docs:dev
```

## 质量门禁

```bash
npm run check
```

`check` 会依次验证页面与导航契约、Markdown 本地链接、发布工作流和生产构建。

## 内容边界

- 本仓库维护公开的产品使用、SDK 接入和故障排查文档。
- 模块内部设计、实验记录和硬件调试材料继续保留在对应源码仓库。
- 文档中只描述已经发布的能力；规划能力必须明确标注状态，不能写成已经可用。
