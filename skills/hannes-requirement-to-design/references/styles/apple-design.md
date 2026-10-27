# Apple Design：参考 HIG 的 Web 风格

## 来源与适用范围

核实日期：2026-10-22。Apple HIG 为持续更新文档，没有对应的统一 Web 组件库或语义版本号。本次核实了 [HIG 官方入口](https://developer.apple.com/design/human-interface-guidelines/)及其[官方文档数据](https://developer.apple.com/tutorials/data/design/human-interface-guidelines.json)。

本次同时核实了 [布局](https://developer.apple.com/design/human-interface-guidelines/layout)、[色彩](https://developer.apple.com/design/human-interface-guidelines/color)与[字体](https://developer.apple.com/design/human-interface-guidelines/typography)的官方 Markdown 正文：按重要性组织与对齐内容、跨尺寸适配、颜色不单独传达含义、保持可读性与相对字体层级。HIG 对支持平台的系统材质与动态系统色也有专门要求，本 Web 模板未复刻这些系统能力。使用时继续按目标平台核对，不能把一次快照当作所有平台的统一规范。

本模板将内容层级、留白、直接操作和上下文反馈转为 Web 表达，既不声称原生 iOS/macOS，也不声称实现系统材质、系统权限、触觉或原生导航行为。预览采用普通 CSS 与 HTML 对话框，不依赖专有字体文件或 Apple 图标资源。

## 参数与实现规范

采用此风格时读取根目录 [design-spec.md](../../design-spec.md) 的共同规则及「6. Apple Design」章节。该文件统一维护字体、行高、字间距、色彩、尺寸、布局、弹层与移动适配，区分官方依据和本模板选择。

[离线预览](../../assets/style-preview.html)的参数面板与实际页面由同一组变量驱动，切换到 Apple Design 即可比较。预览是自制 Web 实现，不含官方组件库运行时；已有项目优先沿用实际组件版本和已确认覆盖值。
