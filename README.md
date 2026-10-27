# Hannes Product Design

**简体中文** | [English](README.en.md)

> 将初步需求转化为业务逻辑一致、交互可运行、结果可验证的产品方案。

一套面向产品建模与交互原型设计的 Agent Skill 工具包。你可以从一句需求、已有规格、参考截图或现有页面开始，按当前问题完成业务分析、页面设计或原型迭代。

**当前状态：** 主要在 Codex 中实践，持续完善中。包含两个可独立使用的 Skill、三个虚构案例、三套风格预览和一个 Ant Design 交互组件目录；其他 Agent 环境尚未独立验证。

[定位与能力](#定位与能力) · [选择 Skill](#选择-skill) · [下载与使用](#下载与使用) · [快速开始](#快速开始) · [使用示例](#使用示例) · [设计资源](#设计资源) · [常见问题](#常见问题) · [开发与维护](#开发与维护) · [许可](#许可与来源)

## 定位与能力

本工具包解决的核心问题，是把**“已经有方向的需求”，推进到“可以操作、检查和讨论的产品方案”**。

以用户体验要素五层次为参照，深耕中间三层：

| 层次 | 要解决的问题 | 核心能力与产物 |
| --- | --- | --- |
| **范围层** | 需求有哪些？边界在哪里？本次优先做什么？ | 收敛核心任务与主要角色，明确功能和内容要求、纳入／排除范围、优先级与验收预期 |
| **结构层** | 对象、角色、规则与流程怎样关联？ | 梳理业务模型、角色权限、状态机、信息架构和用户任务，提供流程图或跨角色泳道表达 |
| **框架层** | 用户怎样理解页面信息、完成任务？ | 形成页面规格、页面与组件决策、可操作原型及验证结果，检查规则与交互是否一致 |

战略层提供用户、问题与目标依据；视觉层通过设计基线、排版与组件支持清晰一致的呈现。五层用于检查方案，不是每次任务都要重走的固定交付阶段。

两个 Skill 分别承接这些能力：**建模 Skill 把业务关系和规则讲清楚，设计 Skill 把规则落实为页面和交互，并验证是否一致。** 可以从初步需求开始，也可以复用已有规格或继续修改现有原型；产物随任务需要提供。设计交付聚焦可运行页面、组件复用和交互一致性，并提供对应维护源码与运行说明。

## 选择 Skill

| 你现在需要什么 | 选择哪个 Skill | 主要产物 |
| --- | --- | --- |
| 梳理对象、角色、权限、状态和业务规则，分析变更或检查矛盾 | [hannes-product-modeling](skills/hannes-product-modeling/README.md) | 业务模型、规则规格、变更影响、一致性评审 |
| 将需求落实为页面，制作或迭代可操作原型 | [hannes-requirement-to-design](skills/hannes-requirement-to-design/README.md) | 按需提供任务流程、页面规格、设计说明、交互原型与验证结果 |

**想先做出页面，从设计 Skill 开始；业务规则存在复杂关联时，再按需使用建模 Skill。** 两者都能独立使用，不必先学完或安装另一个。

## 下载与使用

### 1. 下载完整技能包

1. 在本仓库 GitHub 首页点击绿色 **Code** 按钮。
2. 选择 **Download ZIP**，下载后解压到自己方便保存的位置。
3. 打开解压目录，进入 `skills/`，找到 `hannes-product-modeling/` 或 `hannes-requirement-to-design/`。

每个 Skill 都可以单独取用，但请保留其**完整文件夹**，包括 `SKILL.md`、`agents/`、`references/` 和已有的 `assets/` 等资源。仅下载 `SKILL.md` 会缺少被引用的资料。读取 Skill 说明或打开随包 HTML 演示不需要安装 npm 依赖。

### 2. 先试用：直接读取本地 Skill

在支持读取本地文件的 Codex 会话中，提供入口文件的完整路径和本次任务。将下面路径替换为解压后的实际位置：

```text
请读取并使用：
/你的目录/hannes-product-design/skills/hannes-product-modeling/SKILL.md

分析共享资源预约的对象、主要角色、状态和冲突规则。
本轮只在对话中分析，未明确的业务规则列为待确认。
```

要制作页面，将入口换为 `skills/hannes-requirement-to-design/SKILL.md`，然后说明需求和产物位置。直接读取即可试用，不需要先复制到安装目录。

### 3. 经常使用：可选安装到 Codex

将需要的 **Skill 文件夹**复制到下面一个位置即可，按使用范围选择；安装后的直接子目录应是 Skill 名称，不要把整个仓库再套在里面。

| 使用范围 | 复制后的入口位置 |
| --- | --- |
| 只用于一个项目 | `<目标项目>/.agents/skills/<Skill 名称>/SKILL.md` |
| 用于个人的多个项目 | `~/.agents/skills/<Skill 名称>/SKILL.md` |

例如，项目内安装设计 Skill 后，入口为：

```text
<目标项目>/.agents/skills/hannes-requirement-to-design/SKILL.md
```

两种 Skill 可以一起复制，也可只安装一个。`~` 表示当前用户的主目录。在目标项目中打开 Codex，识别后即可显式调用：

```text
使用 $hannes-requirement-to-design，依据我提供的需求制作 PC 原型。
沿用项目已有设计规范，把产物保存在目标项目中，并说明实际验证结果。
```

Codex 会自动发现本地 Skill；未出现时可重启 Codex，再重新调用，也可继续使用完整路径。具体目录与识别方式依据 [Codex 官方 Skill 文档](https://learn.chatgpt.com/docs/build-skills)。本仓库目前提供直接 Skill 文件夹，尚未打包为插件。

## 快速开始

### 先体验案例，无需安装

1. 在已解压的仓库中，进入 `skills/hannes-requirement-to-design/assets/examples/`。
2. 用浏览器打开 `product-cases.html`，通过顶部导航切换三个案例。
3. 在预约案例中点击标有“可预约”的时段，填写用途并保存；在事项案例中打开详情并编辑。点击“重置本案例”可恢复数据。

这些 HTML 可双击离线运行，无需 Node.js 或 npm。**在 GitHub 中点击 HTML 链接通常显示源码，请先下载再打开。**

### 用自己的需求开始

完成上面的 Skill 读取或安装后，可以直接在对话中给出需求。下面是一条完整任务示例，将产物路径替换为自己的目标位置：

```text
使用 hannes-requirement-to-design。
为共享资源制作 PC 预约原型：查看资源占用、选择空闲时段、预约和取消。
同一资源不能重复占用，成员只能取消本人未开始的预约。
本次不做审批和资源管理。其他未明确规则请列出，不自行扩展角色。

先明确本次范围和关键流程，再制作可操作原型，说明实际验证结果。
产物保存到 /你的项目目录，不写入 Skill 目录。
```

已有规格时，将需求描述替换为**实际文档路径与本次任务**；已有项目时，补充项目位置、需修改的页面及保留范围。只做业务分析时，将入口换为 `skills/hannes-product-modeling/SKILL.md`，说明要分析的问题即可。

## 使用示例

以下短提示适用于已读取或已识别对应 Skill 的会话。案例均为自编虚构资料，截图来自随包 HTML 的实际运行；详细输入、决定与复现步骤见[案例索引](skills/hannes-requirement-to-design/references/examples/README.md)。

### 1. 初步需求 → 可操作方案

**看什么：** 围绕“找可用时间”，先通过资源时间轴比较占用，再选择空闲时段。斜纹表示未开放。

```text
使用 hannes-requirement-to-design，为共享资源制作预约原型。
成员需要查看占用、选择空闲时段、预约和取消；本次不做审批或资源管理。
先明确角色、范围和规则，再提供流程、页面与可操作演示。
```

![预约初版：资源时间轴、占用状态与可预约时段](skills/hannes-requirement-to-design/assets/examples/screenshots/reservation-v1-occupancy.png)

[阅读案例规格](skills/hannes-requirement-to-design/references/examples/reservation.md) · [查看 HTML 文件](skills/hannes-requirement-to-design/assets/examples/product-cases.html?case=reservation-v1#/list)（本地打开后选择“01 预约初版”）

<details>
<summary>2. 已有规格 → 查询、详情与编辑（展开提示词和截图）</summary>

**看什么：** 复用已确认规格，列表、详情和编辑共享同一份数据。截图展示第 2 页中的事项，表单修改尚未保存。

```text
使用 hannes-requirement-to-design，依据已确认事项规格制作查询、详情和编辑。
沿用既有设计基线；保留筛选和分页，保存后同步列表、详情与统计。
只补充本次缺失内容，不重写完整 PRD。
```

![事项页面：在详情上打开编辑表单，修改状态和说明](skills/hannes-requirement-to-design/assets/examples/screenshots/items-edit-dialog.png)

[阅读案例规格](skills/hannes-requirement-to-design/references/examples/existing-spec.md) · [查看 HTML 文件](skills/hannes-requirement-to-design/assets/examples/product-cases.html?case=items#/list)（本地打开后选择“02 已有规格”）

</details>

<details>
<summary>3. 规则变更 → 同步受影响页面（展开提示词和截图）</summary>

**看什么：** 将取消阈值调整为开始前至少 60 分钟。固定时钟为 09:00，09:30 开始的预约不可取消，10:00 开始的预约符合边界。

```text
使用 hannes-product-modeling，分析取消规则从“开始前可取消”
变更为“开始前至少 60 分钟可取消，含恰好 60 分钟”的影响。
再使用 hannes-requirement-to-design，同步现有规格、操作条件与反馈，
只修改受影响部分，并验证时间边界。
```

![规则变更：详情解释取消条件，并禁用不满足条件的操作](skills/hannes-requirement-to-design/assets/examples/screenshots/reservation-v2-cancel-rule.png)

[阅读变更案例](skills/hannes-requirement-to-design/references/examples/incremental-change.md) · [查看 HTML 文件](skills/hannes-requirement-to-design/assets/examples/product-cases.html?case=reservation-v2#/list)（本地打开后选择“03 增量变更”）

</details>

## 两个 Skill 如何协作

建模 Skill 讲清业务关系与约束，设计 Skill 将其落实为任务流程、页面与交互。从已有资料和已确认决定继续，按当前缺口使用能力。

**共同服务一个项目时，只维护同一份项目规格。** 业务规则在其定义处更新，页面说明引用；规则变化时同步相关页面、示例数据和验收条件。纯视觉调整集中修改设计变量与组件。

复杂项目在已有说明中保留“当前工作状态”：有效依据、已确认决定、未决问题、维护与预览入口、实际验证结果和下一步。新会话先读取这些资料，再处理差异。

任务交付后，可选择是否沉淀经验。先与既有经验比较，再选择完善、替换、调整、新增或暂不沉淀；共同使用时只问一次，未经授权不自动写入。

## 设计资源

| 资源 | 用途 |
| --- | --- |
| [三套风格预览](skills/hannes-requirement-to-design/assets/style-preview.html) | 比较 Ant Design、TDesign、Apple Web 的桌面与移动风格 |
| [Ant Design 组件目录](skills/hannes-requirement-to-design/assets/library.html) | 实际操作基础控件及筛选、表格、详情、编辑的组合示例 |
| [设计规范](skills/hannes-requirement-to-design/design-spec.md) | 查阅排版、色彩、间距与组件行为 |
| [设计知识](skills/hannes-requirement-to-design/references/design-knowledge.json) · [决策方法](skills/hannes-requirement-to-design/references/design-decisions.md) | 按任务选择方案，查阅适用条件、反模式和来源 |
| [组件复用与构建](skills/hannes-requirement-to-design/references/component-library.md) | 取用模块化源码、依赖与构建命令 |
| [预约业务建模案例](skills/hannes-product-modeling/references/examples/reservation-model.md) | 单独体验角色、对象、状态与规则分析 |

已有项目优先沿用自身技术栈与设计规范。Ant Design 组件目录使用实际组件依赖；三套风格预览与案例是自制实现，Apple Web 参考 Apple HIG，不代表相应官方组件库。

## 常见问题

**每次都要写完整 PRD、建立模型吗？**  
按任务复杂度补充所需资料。已有规格直接复用；局部修改只处理相关部分。建模还支持独立的规则规格、变更分析和一致性评审，详见其 README。

**需要准备什么？**  
至少说明想解决的问题和本次任务；有现成需求、规格、截图或项目时一并提供。目标端、输出位置和保留范围越明确，越容易直接开始，尚未确定的内容可以说明。

**原型是完整业务系统吗？**  
原型中的模拟数据、前端权限和保存反馈不代表真实接口、认证、持久化或生产系统。示例数据保存在内存中，刷新恢复初始状态。

**项目产物保存在哪里？**  
保存到用户指定的目标项目。工具包只维护通用方法、资源与虚构案例，不收录真实业务资料或原始聊天。

**如何判断验证是否充分？**  
查看实际执行的任务路径、环境与结果，并区分静态检查、场景演练、浏览器实测和独立行为评估。浏览器通过不等于真实用户可用性已验证；每次任务在对应项目中说明实际检查与限制。

## 开发与维护

<details>
<summary>仓库结构与维护入口</summary>

```text
hannes-product-design/
├── README.md
├── README.en.md
├── LICENSE
├── .gitignore
└── skills/
    ├── hannes-product-modeling/
    │   ├── SKILL.md
    │   ├── README.md
    │   ├── LICENSE
    │   ├── agents/openai.yaml
    │   └── references/
    └── hannes-requirement-to-design/
        ├── SKILL.md
        ├── README.md
        ├── LICENSE
        ├── agents/openai.yaml
        ├── design-spec.md
        ├── THIRD_PARTY_NOTICES.md
        ├── references/
        └── assets/
            ├── style-preview.html
            ├── library.html
            ├── component-library/
            └── examples/
                ├── product-cases.html
                └── screenshots/
```

`SKILL.md` 包含元数据与执行指引；`agents/openai.yaml` 提供界面展示和调用元数据，不是自动创建子 Agent 的编排配置。

- 技能规则与使用说明在对应目录维护，每个 Skill 保持自包含；两个 Skill 共用根目录的一份 Git 仓库。
- 仅分发通用规则、虚构案例、维护源码及必要许可。内部研究、测试脚本与用例、评估场景及输出、验证报告和摘要均留在已忽略的本地目录。
- 修改组件库源码后重新构建 `library.html`，不手工维护两套实现。命令与环境见[组件复用说明](skills/hannes-requirement-to-design/references/component-library.md)。
- 案例页面变化后同步截图与说明；行为变化时更新相关规则和案例验收步骤。

</details>

反馈建议附虚构或脱敏输入、预期与实际差异、涉及页面以及复现步骤。各 Skill 的 [建模说明](skills/hannes-product-modeling/README.md)与[设计说明](skills/hannes-requirement-to-design/README.md)提供详细用法与能力边界。

## 许可与来源

本工具包的自编代码、文档和虚构案例采用 [MIT License](LICENSE)，版权署名为 `Copyright (c) 2026 Hannes-liu`。允许在遵守许可条件并保留版权与许可声明的前提下使用、修改、分发及商用。第三方内容继续适用各自许可，详见 [THIRD_PARTY_NOTICES.md](skills/hannes-requirement-to-design/THIRD_PARTY_NOTICES.md)；MIT 不转授 Apple 或其他第三方的商标、字体及素材权利。两个 Skill 目录均附有同一份 MIT 许可，供单独取用时保留。

### 第三方版权与许可声明

以下按本包分发的内容、保留的许可文本和依赖锁文件汇总。第三方代码、文档及素材的权利仍属于相应权利人；本表是摘要，不替代完整许可，也不对上游内容重新授权。

| 第三方项目 | 本包中的用途与范围 | 版权与许可 |
| --- | --- | --- |
| **Ant Design** | 设计参考，以及组件目录实际使用的 `antd@6.6.7` | `Copyright (c) 2015-present Ant UED`；[MIT 原文](skills/hannes-requirement-to-design/references/licenses/ant-design-MIT.txt) |
| **React / React DOM** | 组件目录内嵌的 `react@19.2.0`、`react-dom@19.2.0` | `Copyright (c) Meta Platforms, Inc. and affiliates.`；MIT，完整文本保留在组件目录中 |
| **dayjs** | 组件目录使用的 `dayjs@1.11.13` | `Copyright (c) 2018-present, iamkun`；MIT，完整文本保留在组件目录中 |
| **TDesign** | 设计原则与主题组织参考；风格预览为自制实现，未打包官方 TDesign 运行时 | `Copyright (c) 2021-present TDesign`；[MIT 原文](skills/hannes-requirement-to-design/references/licenses/tdesign-MIT.txt) |
| **其他组件运行时依赖** | 随 `library.html` 实际分发的传递依赖 | 按各原作者的版权和许可保留；当前产物内嵌 54 个运行时包的完整声明，可在组件目录中查看 |

[组件目录](skills/hannes-requirement-to-design/assets/library.html)底部的“依赖版本与完整许可声明”可离线查看完整运行时版权与许可；HTML 内也保留同一份文本。精确版本见[依赖锁文件](skills/hannes-requirement-to-design/assets/component-library/package-lock.json)。构建工具 esbuild 使用 MIT，不作为该 HTML 的运行时分发；若另行分发工具本体，仍须遵守其许可。

### Apple 风格、文档与商标

本项目中的 **Apple Design / Apple Web** 指“参考 [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) 的自制 Web 风格”。它是本工具包自行实现的演示，不是 Apple 官方组件库或官方设计资源，也未获 Apple 认可、赞助或背书。Apple、相关产品名称及商标的权利属于 Apple Inc.；其他第三方标识的权利属于各自权利人。

Apple HIG 的原文、官方代码、截图、logo、字体、SF Symbols 和设计资源包不因本项目引用或采用 MIT 而变成 MIT 内容。本包不分发这些 Apple 官方素材或 HIG 正文镜像；预览调用设备已有系统字体，不附带字体文件。未来引入具体素材时，须另按其适用授权处理。通用设计原则的学习与自行实现，不等于取得复制 Apple 独特网站设计或品牌外观的授权。相关边界见 [Apple 商标使用指南](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)与 [Apple 网站条款](https://www.apple.com/legal/internet-services/terms/site.html)。


### 复制、分发与后续使用

- 复制或分发第三方代码及其许可涵盖的实质部分时，须保留适用的版权、完整许可与必要声明；打包、压缩或改写文件格式不会自动消除这些义务。
- 本 README 的来源说明和非官方声明，不会转授第三方商标、专利、字体或素材权利，也不能替代尚未取得的授权；对每个文件仍以适用许可为准。
- 第三方来源、版本、采用范围及完整许可文件统一见 [THIRD_PARTY_NOTICES.md](skills/hannes-requirement-to-design/THIRD_PARTY_NOTICES.md)。本工具包自编内容采用 [MIT](LICENSE)，第三方内容按各自许可处理。
