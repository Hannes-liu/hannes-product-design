# 第三方版权与许可声明

本 Skill 的自编代码、文档和虚构案例采用 [MIT License](LICENSE)。第三方内容继续适用各自许可；本声明不重新授权上游代码、商标、字体或素材。

## 随组件目录分发的依赖

[离线组件目录](assets/library.html)包含以下运行时及实际使用的传递依赖。完整版权与许可原文内嵌在 HTML 中，可通过“依赖版本与完整许可声明”离线查看。

| 依赖 | 版本 | 版权与许可 |
| --- | --- | --- |
| Ant Design | `antd@6.6.7` | `Copyright (c) 2015-present Ant UED`；[MIT 原文](references/licenses/ant-design-MIT.txt) |
| React / React DOM | `19.2.0` | `Copyright (c) Meta Platforms, Inc. and affiliates.`；MIT，完整文本内嵌于组件目录 |
| dayjs | `1.11.13` | `Copyright (c) 2018-present, iamkun`；MIT，完整文本内嵌于组件目录 |
| 其他实际打包的运行时包 | 见产物与锁文件 | 各原作者的版权与完整许可均保留于组件目录；当前产物涵盖 54 个运行时包 |

精确版本见 [package-lock.json](assets/component-library/package-lock.json)。[构建脚本](assets/component-library/scripts/build.mjs)按实际打包模块收集许可；缺失声明时终止构建，不能用“MIT”标签代替完整文本。

`@ant-design/icons-svg@4.6.0` 的许可补充保存在[图标 MIT 原文](assets/component-library/licenses/ant-design-icons-MIT.txt)，由[固定版本补充表](assets/component-library/licenses/overrides.json)参与构建；该表保留对应上游提交和来源。`is-mobile@5.0.0` 的完整许可从随包 README 的 License 小节提取并嵌入产物。

esbuild（MIT）用于本地构建，不作为该 HTML 的浏览器运行时分发。重新安装或另行分发工具本体时，按其许可处理。

## 风格规范与预览

Ant Design 与 TDesign 风格预览使用自制 HTML/CSS，并非官方组件库运行时。相关设计依据在 [design-spec.md](design-spec.md)；保留 [Ant Design MIT](references/licenses/ant-design-MIT.txt) 与 [TDesign MIT](references/licenses/tdesign-MIT.txt)。TDesign 许可声明为 `Copyright (c) 2021-present TDesign`。

Apple Design / Apple Web 是参考 [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)的自制 Web 风格，并非 Apple 官方产品，也未获 Apple 认可、赞助或背书。Apple 及其相关商标属于 Apple Inc.。本包不分发 Apple HIG 正文镜像、官方截图、logo、字体文件、SF Symbols 或官方设计资源；预览仅调用设备已有系统字体。Apple 官方材料和标识不因本包采用 MIT 而获得重新授权。适用条款见 [Apple 商标使用指南](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)与 [Apple 网站条款](https://www.apple.com/legal/internet-services/terms/site.html)。

## 分发时保留

复制、修改、压缩或分发第三方代码及其许可覆盖的实质部分时，保留适用版权、完整许可及必要声明。单文件交付也须保留产物内的完整许可，不以本说明摘要替代。新增依赖或素材时，按实际采用范围更新来源与声明。
