# TDesign 模板

## 来源与适用范围

核实日期：2026-10-22。以用户指定的 [TDesign 主仓库](https://github.com/Tencent/tdesign)作为设计体系与官方实现的总入口；它覆盖多个框架及桌面、移动实现，使用时按目标项目选择组件库。此前核实的 `tdesign-vue-next 1.20.10` 仅是 Vue 3 桌面组件库源码快照，不是整个 TDesign 的统一版本，也不要求项目升级。

- [官方 Web Vue Next 文档](https://tdesign.tencent.com/vue-next/overview)：入口已访问，内容由 JavaScript 加载。
- [官方仓库介绍](https://github.com/Tencent/tdesign-vue-next)：已核实桌面 Vue 3 组件、可定制主题及跨实现一致性说明。
- [版本元数据](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/tdesign-vue-next/package.json)：已核实。
- [官方通用样式变量](https://github.com/Tencent/tdesign-common/blob/develop/style/web/_variables.less)：已核实品牌色、语义色、字体、控件尺寸和圆角使用主题变量；项目使用时以对应依赖源码为准。

主仓库本次固定提交为 `522dcfd95b1ec5077a4d7c3fc5ff2bd1bd6cc3d0`，已核实根许可证为 MIT。Vue Next 与 Common 的根许可证也已分别核实；实际采用其他实现或独立资源时仍按其版本检查。复用代码或实质部分须保留版权与完整许可，见[来源与许可记录](../../THIRD_PARTY_NOTICES.md)和[原始 MIT 文本](../licenses/tdesign-MIT.txt)。

本模板为自制 Web 示例，不引入 TDesign 运行时。下列视觉参数是本模板选值，未声称所有官方版本都采用这些数值。

## 参数与实现规范

采用此风格时读取根目录 [design-spec.md](../../design-spec.md) 的共同规则及「5. TDesign」章节。该文件统一维护字体、行高、字间距、色彩、尺寸、布局、弹层与移动适配，区分官方依据和本模板选择。

[离线预览](../../assets/style-preview.html)的参数面板与实际页面由同一组变量驱动，切换到 TDesign 即可比较。预览是自制 Web 实现，不含官方组件库运行时；已有项目优先沿用实际组件版本和已确认覆盖值。
