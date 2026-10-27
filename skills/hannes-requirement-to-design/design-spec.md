# 三种设计风格规范

核实日期：2026-10-22。适用范围：本 Skill 的 PC／移动端 Web 原型，以及[风格预览](assets/style-preview.html)。这是独立实现的设计基线，不是三个官方组件库的完整规格，也不替代目标项目已确认的规范。

## 1. 使用方式与依据

先沿用项目已有设计体系；没有基线时展示三套示例，选择后按业务组织页面。采用一种风格时读取本文件的共同规则及对应章节，不把三套导航、表单和反馈随意拼接。

本文件区分两类内容：

- **官方依据**：已在官方设计文档或固定提交源码中核实的原则、默认 token。
- **本模板选择**：针对此虚构事项 Web 示例的布局、数值和适配方案，可按业务覆盖。表中未特别注明的页面级参数均属此类。

[风格预览](assets/style-preview.html)使用自制 HTML/CSS/JavaScript；另有使用真实 React／Ant Design 的[组件目录](assets/library.html)，入口和复用方法见[组件库说明](references/component-library.md)。系统字体由设备已有字体提供，不附带字体或品牌图片。来源及许可保留于[第三方记录](THIRD_PARTY_NOTICES.md)，纯风格调整不要求重新开展全面许可审查；引入第三方文件时再核对该文件的授权。

## 场景选择与项目覆盖

[设计决策与说明](references/design-decisions.md)解释如何从任务、目标端和密度选择页面与组件；[结构化知识](references/design-knowledge.json)提供可定位的建议、反模式和来源。知识参数引用本文件，不再维护第二套尺寸或色值。官方来源与自编建议分别记录，三套示例骨架不约束所有产品。

项目设计说明优先沿用已有文档；未约定时用 `design/design-notes.md`，将全局基线、页面决策和局部覆盖放在同一文档。页面覆盖只更改明确列出的设计项，其余继承全局；权限、状态和业务流程仍在 PRD 及业务规则定义处维护。

## 2. 快速比较

| 维度 | Ant Design | TDesign | Apple Design · Web 适配 |
| --- | --- | --- | --- |
| 表达重点 | 有序比较、明确操作 | 模块分工、协作效率 | 内容层级、轻量分组 |
| 示例桌面骨架 | 侧栏＋面包屑＋表格 | 产品顶栏＋统计＋协作卡片 | 轻量工具栏＋内容列表 |
| 桌面正文 | 14 / 22px | 14 / 22px | 15 / 22px |
| 桌面页面标题 | 24 / 32px，600 | 24 / 32px，600 | 32 / 40px，700 |
| 正文字间距 | 0 | 0 | 0 |
| 页面标题字间距 | 0 | 0 | −0.02em |
| 桌面控件高度 / 圆角 | 32 / 6px | 32 / 3px | 36 / 9px |
| 内容容器圆角 | 8px | 3px | 12px |
| 桌面页面边距 | 24px | 24px | 32px |
| 移动页面标题 | 24 / 32px | 24 / 32px | 28 / 34px |
| 移动正文 / 条目标题 | 14 / 22px；条目 15 / 24px | 14 / 22px；条目 16 / 24px | 17 / 24px |
| 移动主要控件高度 | 44px | 44px | 44px |
| 示例详情 | 侧边抽屉 | 侧边分组面板 | 居中内容面板 |
| 移动详情 / 编辑 | 全屏面板 | 全屏面板 | 全屏面板 |

本次为便于对比，Ant 采用深色侧栏管理表格、TDesign 采用协作卡片、Apple 采用轻量内容列表。三者共享业务含义与数据，但列表分别渲染，避免只替换颜色。

三个体系都能构建其他布局。侧栏、顶栏、分组列表是便于比较的示例选择，不是品牌独占或必须遵守的骨架。

## 3. 共同规则

### 字体、字间距与排版

- 优先使用目标设备系统字体。Ant 使用系统 UI 栈；TDesign 优先 `PingFang SC, Microsoft YaHei, Arial, sans-serif`；Apple Web 使用 `-apple-system, BlinkMacSystemFont` 等回退栈。回退字体不保证跨设备字宽完全一致。
- 正文不人为增加中文字间距。`letter-spacing: 0` 在此作为明确、可比较的基线；不能用全局紧缩字距制造所谓品牌感。
- 标题、正文、辅助信息分别使用字重、字号与间距表达层级。普通数据页面优先保持 3–5 层，不给每个字段创建新字号。
- 编号、日期、统计使用 `font-variant-numeric: tabular-nums`，不改变中文正文；长标题允许换行，不让文本推宽容器。
- Apple 标题的 −0.02em 仅用于本模板的大标题；不套用到正文、表单或所有中文。不把原生 SF 字体跟踪表机械转换成通用 Web CSS。

### 色彩与反馈

主题色和小字号白字按钮填色分开：保留所学体系的主题色，必要时采用更深的操作填色。本预览 Ant 为 `#0958d9`、Apple 为 `#0066cc`，均是本地对比度选择，非官方默认值；TDesign 使用 `#0052d9`。在白底上白字对比度分别约 6.2:1、5.6:1、6.5:1（按 sRGB 计算，具体实测见验证记录）。

状态同时使用文字。通用完成状态选择深绿文字 `#226840`、浅绿背景 `#e9f7ef`；错误选择 `#b42836`；Apple 列表用状态圆点加文字、弱化背景。以上为此预览的语义选值，不声称分别复现三家完整语义色阶。

焦点有明显轮廓；错误放在相关输入区域，保存成功更新原内容并辅助提示。空数据、无匹配、加载失败分别解释，失败有可用重试。不把所有按钮都做成同一条 toast。

### 间距、密度与适配

- 常用布局节奏为 8、16、24px；Apple 内容区补充 32px。控件内部可使用 4px／12px 等细分值。区分布局网格、控件 token 与点击区域。
- 本例 Ant 桌面事项行最小 64px；TDesign 桌面协作卡片最小 234px、移动卡片最小 220px；Apple 桌面内容行最小 86px。高度由真实文字和换行继续撑开。这不是组件库的默认表格行高。
- 本例移动布局断点为浏览器 760px；宽屏可切换到 390px 产品画布。不是任何上游的通用断点规范。
- 移动页面边距 16px；去掉侧栏和表格列头，分别使用紧凑条目、单列协作卡片、轻量内容列表；底部分类替代桌面导航。
- 移动输入为 16px／24px，主要操作、关闭和行操作至少 44px CSS 高度，避免直接缩小桌面控件。正文和标签不要求全都等于 16px。
- 320px 宽度保留阅读、筛选和保存路径；不使用固定宽内容撑破页面。弹层可滚动，底部操作考虑安全区；目标设备的软键盘仍需实机核验。
- 保留浏览器缩放，遵守 `prefers-reduced-motion`；不以微弱透明文字或动画承担重要信息。

### 组件控件的选择与实现

本节补充核实日期：2026-10-23。组件承担选择、校验、导航和反馈等行为；采用一种设计风格，不等于已经使用了该体系的官方组件库。以下为选型与行为契约，不是可以跨框架直接粘贴的 API 手册。

- **已有项目优先复用。** 使用项目现有组件、封装、主题和版本。确需补充时，选择适配当前框架与目标端的成熟组件；不要为一个日期框切换技术栈或并装另一整套设计体系。
- **按交互复杂度选择。** 普通按钮、少量选项和简单文本输入可使用原生控件；日期范围、可搜索多选、复杂表格、关联选择和表单校验优先复用成熟组件。自制复杂控件时补齐相同行为，不以 CSS 外观代替能力。
- **离线与单文件是打包条件。** 单 HTML 可以内嵌构建后的组件代码、样式和必要资源，不必使用 CDN。用户明确要求纯原生实现时继续遵守；未限制技术栈时，不因“单文件”默认放弃成熟组件。只为离线交付构建所需依赖，不维护另一套手写控件版本。
- **区分平台和实现。** Ant 的下表名称按 React 实现举例；TDesign 按已核实的 Vue Next 实现举例。选用其他实现或版本时核对实际导出、属性和事件，不能互抄 API。Apple 栏是参考 HIG 的 Web 选择，不是 Apple 官方 Web 组件库；不自动引入原生平台 API。

### 任务型复合控件

基础控件目录不能代替任务设计。资源与时间比较按[任务与信息表达](references/task-representation.md)和 `PAT-SCHEDULE` 判断，选择资源占用视图、空闲候选与记录列表的组合；日期选择器与事件历史 Timeline 不自动具备资源占用、冲突和时长判断。优先核对目标项目已有实现及许可。本包[预约案例](assets/examples/product-cases.html?case=reservation-v1#/list)为自制预设时段演示，真实 Ant Design 组件目录未新增调度控件。

### 场景与组件映射

按当前页面需要选择下表中的控件，不要求每个项目实现完整组件目录。Apple Web 的表格、树选择等复杂控件可沿用项目已采用、交互成熟的 Web 组件，调整已确认主题；不必为了风格重写组件底层。

| 场景 | Ant Design · React | TDesign · Vue Next | Apple 风格 Web 选择与共同约束 |
| --- | --- | --- | --- |
| 日期、时间与周期 | `DatePicker`、`DatePicker.RangePicker`、`TimePicker` | `DatePicker`、`DateRangePicker`、`TimePicker` | 适合设备的日期／时间选择器；范围需明确起止和快捷周期。区分仅日期与带时区时间，显示格式不改变存储语义；禁止日期、逆序和边界须校验 |
| 搜索与选项选择 | `Input.Search`、`Select`、`AutoComplete` | `Input`、`Select`、`AutoComplete` | 搜索框或可搜索组合框。区分搜索词与选中对象 ID；按场景开启清空、搜索或多选，展示已选、无匹配及加载失败；自由输入不能冒充已选对象 |
| 层级与关联选择 | `Cascader`、`TreeSelect` | `Cascader`、`TreeSelect` | 采用项目可用的层级选择控件；展示路径，上级变化后清理失效下级值，说明父子勾选语义；大数据按需加载，不展开整个树 |
| 数量、金额与比例 | `InputNumber` | `InputNumber` | 带明确单位的数字输入。说明范围、小数精度及空值含义；格式化显示与实际数值分开。提交时仍校验边界、合计与精度，不能只依赖步进按钮或 `min`／`max` |
| 编辑与校验 | `Form`、`Form.Item`、`Input`、`Input.TextArea` | `Form`、`FormItem`、`Input`、`Textarea` | 有持续标签的分组表单；短输入与长说明分别组织。按场景选择失焦／提交校验，错误靠近字段并定位首个错误，保留已填值；只读仍可阅读和复制 |
| 列表、分页与批量操作 | `Table`、`Pagination`、`Checkbox` | `Table`，按需选 `BaseTable`／`EnhancedTable`；`Pagination` | 需要列比较时使用语义表格，内容浏览可用列表。以稳定对象 ID 标识行；筛选、排序、分页与选中项读取受控状态；明确跨页选择范围，批量前显示对象数量 |
| 即时开关与待提交选择 | `Switch`、`Checkbox`、`Radio.Group` | `Switch`、`Checkbox`、`RadioGroup` | 即时生效用开关；暂存到表单、提交后生效用勾选或单选。切换失败恢复原值；不能将“选择一个结论”做成会立即执行动作的开关 |
| 页签与局部视图切换 | `Tabs`、`Segmented` | `Tabs`、按钮式 `RadioGroup` | 页签或分段选择。切换同一对象的内容不误增业务返回层级；标明当前项，保留需要的筛选与草稿；大导航仍由路由承担 |
| 详情与局部编辑 | `Drawer`、`Modal` | `Drawer`、`Dialog` | 明确关联父页面的详情面板或对话框；参考 HIG 的 sheet 只承载聚焦的局部任务，复杂长流程优先独立页面。关闭、取消、保存和业务返回语义分别定义 |
| 重要操作确认 | `Modal`、`Popconfirm` | `Dialog`、`Popconfirm` | 需要中断确认时使用警示对话框；说明对象、范围和后果，按钮写具体动作并提供取消。普通可撤销操作不机械增加确认，危险动作不被意外回车触发 |
| 轻量反馈与持续告警 | `message`、`notification`、`Alert` | `Message`、`Notification`、`Alert` | 就近反馈、状态信息或持续告警；反馈方式随重要性与可操作性选择。成功后更新原记录，失败给出原因与重试；重要结果不能仅靠短暂 toast |
| 辅助说明与补充操作 | `Tooltip`、`Popover` | `Tooltip`、`Popup` | 简短提示与可交互浮层分开；提示可通过键盘获得，触屏有替代入口，关键说明不只在悬停时可见；不把复杂表单塞入提示气泡 |
| 附件与预览 | `Upload`，按类型配预览 | `Upload`、`ImageViewer`，按类型配预览 | 文件选择与独立预览；明确类型、数量、大小、进度、失败重试和移除。仅本地选择、读取或模拟上传时如实说明，不称为已保存到服务器 |
| 加载与空结果 | `Spin`、`Skeleton`、`Empty` | `Loading`、`Skeleton`、`Empty` | 根据等待时长和布局选进度或占位；区分初始无数据、筛选无结果、加载中和加载失败，提供对应下一步，不用无期限转圈掩盖错误 |

### 控件状态、数据与弹层契约

- 按控件需要覆盖默认、悬停、焦点、选中／展开、禁用、只读、加载与错误状态；不要求所有控件都有所有状态。禁用时说明原因，不能把权限不足、只读和暂时处理中都归为灰色按钮。
- 筛选选项、回显标签、行数量和结果来自同一份状态。更改查询条件后按当前约定重置分页；返回时恢复查询、页码及必要的选择和滚动。清空、全选和跨页保留应具有可解释的范围。
- 控件校验支持输入，业务处理函数仍检查权限、状态与数据约束。提交中反馈进度并防止重复动作；失败保留表单内容且允许重试。前端防重不代表已实现服务端幂等或权限。
- 弹层打开后将焦点移入，模态层约束焦点；关闭后恢复到当前有效的触发对象。Escape 只处理最上层可关闭浮层；取消不提交，未保存数据按场景提示。不要用连续堆叠的对话框代替多步页面导航。
- 使用组件库的弹层管理机制，核对日期面板、下拉框、提示和确认框的挂载容器、层级及滚动定位。尤其检查抽屉／对话框内的下拉面板是否被裁切、落在遮罩后或被焦点约束阻挡；主题、字号和语言也应覆盖挂载到页面根部的浮层。
- 表格固定列、固定表头和横向滚动按数据量启用，保证操作列可达；长文本可换行或截断后展开，不能遮住其他列。只有出现实际性能需要时启用虚拟列表，并核验自定义行高、选择、焦点及可访问性。
- 同一项目集中配置主题、密度、中文文案、日期格式和图标。组件默认值与本规范不一致时，通过目标库支持的主题能力统一覆盖；不靠广泛覆盖内部 DOM 类名维持效果。

### 选型记录与验证

在现有页面规格或交付说明中简记“场景 → 组件／原生控件 → 所用包与版本 → 必要行为及定制”。简单修改可直接在原规格补一行，不另建组件文档或增加确认阶段。

针对实际使用的控件检查：鼠标与键盘操作、清空／无匹配、边界值和错误恢复、加载与重复提交、受控值回显、浮层定位与关闭、目标视口及长内容。只有视觉说明或名称映射不算组件已实现；三风格预览为自制控件示例，真实 Ant Design 组件目录提供另一实现入口，二者均不声称覆盖上表所有能力。

采用组件代码并交付单文件时，将其必要代码、样式、图标和语言资源一同纳入构建，检查动态导入、字体和懒加载资源不依赖运行时网络；实际通过 `file://` 打开，并核对适用许可和依赖声明随产物保留。打包能力以目标库和实际构建结果为准，不能仅凭“已内嵌脚本”宣称离线可用。

## 4. Ant Design

### 官方依据

Ant Design 字体规范采用系统字体方案，常用正文 **14px／22px**；主要字重 400、500，英文可使用 600。布局规范提供 **8px 基础网格**及 **24 栅格**。主题 seed 的 **4px sizeUnit** 是 token 生成单位，与布局网格不是一回事。

本次源码默认值包括：主色 `#1677ff`、成功 `#52c41a`、警告 `#faad14`、错误 `#ff4d4f`、基础字号 14、圆角 6、控件高度 32。字体生成器围绕基础字号生成层级，行高按字号增加 8px。实际项目依赖可能覆盖这些值。

### 本模板选值

| token / 角色 | 值 | 用途 |
| --- | --- | --- |
| `accent` / `action` | `#1677ff` / `#0958d9` | 主题强调 / 小字号填色操作 |
| `accent-soft` | `#e6f4ff` | 分类选中、进行中底色 |
| `bg` / 内容底 | `#f5f5f5` / `#ffffff` | 页面 / 内容区 |
| `ink` / `muted` | `#1f1f1f` / `#666666` | 正文 / 辅助文字 |
| `line` / `border` | `#f0f0f0` / `#d9d9d9` | 内容分隔 / 控件边框 |
| `table-bg` / `hover` | `#fafafa` / `#fafcff` | 表头 / 行悬停 |
| 正文 / 辅助 | 14 / 22px；12 / 20px | 内容与编号、日期 |
| 页面标题 / 区块标题 | 24 / 32px，600；16 / 24px，600 | 页面与内容区层级 |
| 控件 / 容器 | 高 32px、圆角 6px；容器圆角 8px | 桌面按钮、输入与内容面板 |
| 页面 / 内容区内边距 | 24 / 24px | 主要布局；移动为 16 / 16px |

### 组件与交互

桌面侧栏宽 184px（较窄桌面 152px），顶栏 56px。本例选择深色导航：底色 `#001529`、白色文字、蓝色当前项；这是 Ant 支持的导航主题方向，本例不要求所有项目采用深色侧栏。分类导航、面包屑和页面标题分工清楚。表格列头明确，名称、负责人、状态、日期对齐；名称作为详情入口，行尾明确“查看”。编号作为次要信息而非页面主角。

筛选与数据区保留 24px 间距，字段持久显示标签。主要按钮与次要按钮层级明确；控件不通过放大圆角弱化边界。详情在右侧抽屉展开，编辑使用对话框，关闭和返回恢复原搜索与焦点。

移动改为事项条目与底部分类，详情和编辑全屏显示；不把桌面 React API 当作移动组件 API。

## 5. TDesign

### 官方依据

TDesign 是跨框架、跨端设计体系；用户提供的主仓库为总入口。本次具体参数以 `tdesign-common` 的 Web 主题源码为依据，不能把 Vue Next 的版本号称为整个体系的统一版本。

官方字体 token：正文小／中／大为 **12/20、14/22、16/24px**；标题小／中／大／特大为 **14/22、16/24、18/26、20/28px**，标题字重 600；headline-small 为 **24/32px**。默认圆角 3px，其他半径包括 2、6、9、12px；component-m 为 32px。

浅色主题品牌默认 `#0052d9`；页面使用 gray-2 `#eee`，容器为白色；主文字黑色 90%、次要文字黑色 60%。官方浅选中色为 `#f2f3ff`，一级分隔 `#e8e8e8`、二级边框 `#ddd`。本例采用这些已核实值。

### 本模板选值

| token / 角色 | 值 | 用途 |
| --- | --- | --- |
| `accent` / `action` | `#0052d9` / `#0052d9` | 主题与主要操作 |
| `accent-soft` | `#f2f3ff` | 选中态与进行中底色 |
| `bg` / 内容底 | `#eeeeee` / `#ffffff` | 页面 / 模块 |
| `ink` / `muted` | `#000000e6` / `#00000099` | 约 90% / 60% 黑色 |
| `line` / `border` | `#e8e8e8` / `#dddddd` | 分隔 / 控件边框 |
| `table-bg` / `hover` | `#f3f3f3` / `#f3f6fb` | 表头 / 自选行悬停 |
| 正文 / 辅助 | 14 / 22px；12 / 20px | 列表内容与次要信息 |
| 页面标题 / 区块标题 | 24 / 32px，600；16 / 24px，600 | headline-small / title-medium |
| 控件 / 模块 | 高 32px、圆角 3px；模块圆角 3px | 保留利落边界 |
| 页面 / 工作区内边距 | 24 / 24px | 模块间 16／24px；移动为 16 / 16px |

### 组件与交互

桌面顶栏 64px，产品身份与分类导航在同一区域；移动顶栏 56px。页面上方提供 3 个统计模块，全部、进行中、已完成取自同一份数据，不能写成无法同步的装饰数字。

工作区以“筛选 → 列表标题 → 协作卡片”组织，筛选区独立白底。宽桌面三列、较窄桌面两列、移动单列。每张卡片包含编号与状态、事项标题、两行说明、负责人及截止时间，卡片中的负责人头像为单字虚构示意，卡片标题为 16/24px、600 字重。详情侧边面板按信息分组，编辑保留固定保存／取消位置。

移动统计缩为三列摘要，协作卡片改为单列，顶部分类移到底部。实际使用官方移动库时读取其独立规范与 API，不能缩放 Web 控件冒充原生移动实现。

## 6. Apple Design · 参考 HIG 的 Web 风格

### 官方依据

Apple HIG 强调按重要性组织内容、对齐与分组、跨尺寸适配，以及相对字体层级、语义色和可访问性。字体跟踪依平台、字体和字号变化，原生单位 pt 也不普遍等同于 CSS px。

HIG 是持续更新的平台文档，没有一套官方通用的 Web CSS token。下表均为本模板的 Web 设计选择。系统材质、动态系统颜色、原生导航和触觉不由静态 HTML 自动获得；本例不模拟 Liquid Glass，也不附带 SF 字体或 SF Symbols。

### 本模板选值

| token / 角色 | 桌面 | 移动 |
| --- | --- | --- |
| `accent` / `action` | `#007aff` / `#0066cc` | 相同；蓝色为此浅色 Web 基线 |
| `accent-soft` / `bg` | `#eaf3ff` / `#fbfbfd` | 相同 |
| `ink` / `muted` | `#1d1d1f` / `#68686d` | 相同 |
| `line` / `border` | `#e5e5ea` / `#d2d2d7` | 相同 |
| `table-bg` / `hover` | `#f5f5f7` / `#f5f9ff` | 相同；不显示表头 |
| 正文 | 15 / 22px，400 | 17 / 24px，400 |
| 条目标题 | 17 / 24px，500 | 17 / 24px，500 |
| 页面标题 | 32 / 40px，700 | 28 / 34px，700 |
| 页面标题字间距 | −0.02em | −0.02em |
| 控件高度 / 圆角 | 36 / 9px | 44 / 9px |
| 容器圆角 | 12px | 12px；全屏详情无外圆角 |
| 页面边距 | 32px | 16px |

正文与辅助信息字间距为 0。辅助编号、日期、状态为 12/20px，不能将小字承担主要事项内容。移动输入为 16/24px；主要内容仍采用 17/24px。

### 组件与交互

桌面侧栏 196px，使用低对比度分组底色；轻量顶部工具栏 44px。标题比两套企业界面更大，搜索为轻量填充底色，正文列表隐藏表头，事项标题、编号、状态和进入箭头形成层级。

主内容区白底，列表没有整组卡片边框，条目之间使用细分隔；每条展示事项标题、负责人及截止时间，以大标题和留白区分层级。新建使用蓝色文字加图标的轻量操作，不使用企业工作台式实心按钮。状态以圆点加文字表达。减少边界不等于移除操作入口或焦点。

桌面详情采用居中内容面板，较大的事项标题和分组元信息；表单中的相关字段成组。移动全屏面板有明确关闭／取消，关闭编辑不触发业务返回；保存更新同一对象，底部操作考虑安全区。

此 Web 示例不等于 iOS 或 macOS 实现。未来真实原生开发应按对应平台和系统版本重新选组件、排版与导航方式。

## 7. 预览实现与维护契约

`assets/style-preview.html` 中的 `styleProfiles` 是本预览参数源。`applyProfile()` 将所选风格和视口映射为 CSS 变量，同时用于参数面板、产品区域、详情及编辑弹层。修改参数时同步本文件，避免显示的数值与页面实际样式分离。

主要映射：`font/leading` → 正文；`title/titleLeading/weight/titleTracking` → 页面标题；`control/radius` → 主要控件；`page` → 页面边距；`row` 为基础行参数，风格布局分别覆盖为 Ant 64px 行、TDesign 234px 卡片、Apple 86px 行。移动 `item/itemLeading` 单独控制主要条目文本。原生 `select`、日期输入和回退字体的渲染允许随浏览器变化。

布局结构使用 `data-style` 和 `data-screen` 切换；业务对象、筛选、统计和路由共用一份状态。纯样式切换不重置数据。新增视口或主题时检查参数面板、弹层、输入、溢出和对比度，不只检查主页截图。

验收重点：三种风格均可搜索、筛选、新建、编辑、切换状态、回退；移动／桌面保持可用；参数与计算样式对应；离线不发起外部资源请求。每次交付按当前实现与环境说明实际检查结果和未验证范围。

`assets/library.html` 是从 `assets/component-library/` 生成的独立 Ant Design 展示产物，使用 React 19.2.0、Ant Design 6.6.7、dayjs 1.11.13，由 esbuild 0.25.11 构建。通过 Provider 与组件库主题 API 配置自身参数，不由 `styleProfiles` 驱动；不要修改生成 HTML 来维护第二套源码。目录、受控组件接口和维护命令见[组件库与复用](references/component-library.md)。

## 8. 官方来源与版本

以下均于核实日期读取，固定提交用于复查，不要求实际项目升级。Apple 官方文档持续更新，以访问日期标记。

### Ant Design

固定提交 `f8f5595ab5e891fff6a2a06c5b3b98af643d008e`，读取包元数据 `antd 6.6.7`。

- [字体设计规范](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/docs/spec/font.zh-CN.md)
- [布局设计规范](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/docs/spec/layout.zh-CN.md)
- [主题 seed](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/components/theme/themes/seed.ts)
- [字体层级生成](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/components/theme/themes/shared/genFontSizes.ts)

### TDesign

主仓库固定提交 `522dcfd95b1ec5077a4d7c3fc5ff2bd1bd6cc3d0`；通用主题固定提交 `79d08951238a43eb0a799fc8ac3045c2e2381db6`。此前 Vue Next 实现快照 `8140f24d8d8a407d250b6a1aff79f8995438ca89` 的版本为 1.20.10，仅供该实现复查。

- [体系与实现入口](https://github.com/Tencent/tdesign/tree/522dcfd95b1ec5077a4d7c3fc5ff2bd1bd6cc3d0)
- [字体 token](https://github.com/Tencent/tdesign-common/blob/79d08951238a43eb0a799fc8ac3045c2e2381db6/style/web/theme/_font.less)
- [浅色主题](https://github.com/Tencent/tdesign-common/blob/79d08951238a43eb0a799fc8ac3045c2e2381db6/style/web/theme/_light.less)
- [尺寸 token](https://github.com/Tencent/tdesign-common/blob/79d08951238a43eb0a799fc8ac3045c2e2381db6/style/web/theme/_size.less)
- [圆角 token](https://github.com/Tencent/tdesign-common/blob/79d08951238a43eb0a799fc8ac3045c2e2381db6/style/web/theme/_radius.less)

### Apple HIG

- [官方入口](https://developer.apple.com/design/human-interface-guidelines/)
- [布局](https://developer.apple.com/design/human-interface-guidelines/layout)
- [色彩](https://developer.apple.com/design/human-interface-guidelines/color)
- [字体](https://developer.apple.com/design/human-interface-guidelines/typography)

本规范采用自行编写的表述与 Web 实现，官方资源的权利说明见[第三方版权与许可声明](THIRD_PARTY_NOTICES.md)。

### 组件补充来源（2026-10-23）

沿用上述固定提交复查组件，未将源码快照当作项目升级要求。以下名称、能力与原则由官方导出／类型／文档核对；具体使用仍读取目标项目版本。

- Ant Design：[组件导出](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/components/index.ts)、[日期选择](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/components/date-picker/index.en-US.md)、[选择器](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/components/select/index.en-US.md)、[表格](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/components/table/index.en-US.md)、[表单](https://github.com/ant-design/ant-design/blob/f8f5595ab5e891fff6a2a06c5b3b98af643d008e/components/form/index.en-US.md)。
- TDesign：从[主仓库](https://github.com/Tencent/tdesign/tree/522dcfd95b1ec5077a4d7c3fc5ff2bd1bd6cc3d0)进入对应实现；本次核对 Vue Next 的[组件导出](https://github.com/Tencent/tdesign-vue-next/blob/8140f24d8d8a407d250b6a1aff79f8995438ca89/packages/components/components.ts)、[日期范围导出](https://github.com/Tencent/tdesign-vue-next/blob/8140f24d8d8a407d250b6a1aff79f8995438ca89/packages/components/date-picker/index.ts)、[表格导出](https://github.com/Tencent/tdesign-vue-next/blob/8140f24d8d8a407d250b6a1aff79f8995438ca89/packages/components/table/index.ts)、[选择器类型](https://github.com/Tencent/tdesign-vue-next/blob/8140f24d8d8a407d250b6a1aff79f8995438ca89/packages/components/select/type.ts)。
- Apple HIG：[Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers)、[Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields)、[Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)、[Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)。本次通过官方文档数据读取正文，Web 选型由本规范自行归纳，不机械照搬原生按钮位置或呈现规则。
