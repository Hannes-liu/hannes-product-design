# Ant Design 模板

## 来源与适用范围

核实日期：2026-10-22。官方 React 仓库 `master` 的包元数据为 `antd 6.6.7`；这是本次读取的源码版本，不代表目标项目应升级或所有框架实现具有相同版本/API。

- [官方设计介绍](https://ant.design/docs/spec/introduce)
- [官方仓库设计介绍](https://github.com/ant-design/ant-design/blob/master/docs/spec/introduce.en-US.md)：已核实，自然、确定、意义、生长的设计价值。
- [官方主题 seed](https://github.com/ant-design/ant-design/blob/master/components/theme/themes/seed.ts)：已核实主色、基础字号、圆角、控件高度等默认值。
- [版本元数据](https://github.com/ant-design/ant-design/blob/master/package.json)：已核实。官网介绍页在本次环境返回 403，以官方仓库为补充依据。

本模板是参考上述体系的 Web 原型方案。预览不引入 `antd`，不代表官方完整组件或像素级复刻。

用户指定的[官方仓库](https://github.com/ant-design/ant-design/)已补充许可核查。此次固定提交为 `f8f5595ab5e891fff6a2a06c5b3b98af643d008e`，根许可证为 MIT。复用代码或实质部分时保留版权与完整许可；字体、图片、图标和品牌素材按实际来源另核对。详情见[来源与许可记录](../../THIRD_PARTY_NOTICES.md)，本包附有[原始 MIT 文本](../licenses/ant-design-MIT.txt)。

## 参数与实现规范

采用此风格时读取根目录 [design-spec.md](../../design-spec.md) 的共同规则及「4. Ant Design」章节。该文件统一维护字体、行高、字间距、色彩、尺寸、布局、弹层与移动适配，区分官方依据和本模板选择。

[离线预览](../../assets/style-preview.html)的参数面板与实际页面由同一组变量驱动，切换到 Ant Design 即可比较。预览是自制 Web 实现，不含官方组件库运行时；已有项目优先沿用实际组件版本和已确认覆盖值。
