# 真实组件库与按需复用

## 两个预览入口

- [风格预览](../assets/style-preview.html)：自制原生 HTML/CSS/JavaScript，用于比较 Ant Design、TDesign 和参考 Apple HIG 的 Web 风格。
- [真实组件目录](../assets/library.html)：内嵌运行时的 Ant Design 单文件展示，含控件场景、受控业务组件和完整事项工作台。目前只提供 Ant Design 实现。

目录用于选择和验证交互；业务项目从源码取需要的组件。已有项目的框架、组件封装、版本和主题优先，不因目录使用 React 而迁移项目，也不把整个展示页作为业务依赖。

## 从哪里取

| 需要 | 入口 |
| --- | --- |
| 查找某类控件的用法 | 目录中的输入、日期时间、选择、层级选择、表单、表格、开关、弹层、反馈、上传、状态 11 类；源码 [src/demos.jsx](../assets/component-library/src/demos.jsx) |
| 筛选、列表、详情和编辑的受控封装 | [src/components.jsx](../assets/component-library/src/components.jsx) |
| 完整组合及页面状态组织 | [src/Workbench.jsx](../assets/component-library/src/Workbench.jsx) |
| 中文、日期语言与主题配置 | [src/theme.jsx](../assets/component-library/src/theme.jsx) |
| 虚构数据、筛选与校验示例 | [src/data.mjs](../assets/component-library/src/data.mjs) |
| 精确依赖及可复现安装 | [package.json](../assets/component-library/package.json)、[package-lock.json](../assets/component-library/package-lock.json) |

先按页面场景选控件，再读对应 JSX 与所用包版本。单个日期范围或多选示例可直接取相应 Ant Design 用法；业务封装可选取所需导出，连同其实际 import、样式与数据契约一起适配。不要复制 `node_modules`，也不要从生成 HTML 中反向提取源码。

`demos.jsx` 中的 `demoCatalog` 以 `inputs`、`dates`、`selects`、`hierarchy`、`forms`、`tables`、`switches`、`overlays`、`feedback`、`upload`、`states` 标识场景；可搜索同名 `@demo-start` 标记，只读取所需示例。布局样式在 [src/styles.css](../assets/component-library/src/styles.css)，复用时保留需要的规则并适配项目命名。

## 受控组件契约

`components.jsx` 导出以下组件；字段、选项与样式属于虚构事项示例，复用时按真实业务替换。

| 导出 | 主要 props 与职责 |
| --- | --- |
| `LibraryProvider` | 接受 `children`，集中配置 Ant Design 中文语言、主题、`App` 上下文及 dayjs 中文语言；由 `theme.jsx` 实现并重新导出。已有项目通常复用其 Provider |
| `FilterBar` | `value` 包含 `keyword`、`owner`、`status`；`onChange(nextValue)` 回传完整查询对象，`onReset()` 请求清空。页面决定更新查询和重置页码 |
| `ItemTable` | `items`、`page`、`pageSize`（默认 5）、`selectedIds` 为输入；`onPageChange`、`onSelectionChange` 回传分页与选中值，`onOpen(id, trigger)` 请求打开详情。`id` 是稳定行键 |
| `ItemDrawer` | `open`、`item` 控制显隐和详情；`onClose()` 请求关闭，`onEdit(item, trigger)` 请求编辑；找不到对象时显示失效提示 |
| `ItemEditForm` | `open`、`item` 控制编辑会话；`onCancel()` 取消，异步 `onSubmit(draft)` 接收普通对象。调用者负责持久化和成功后关闭；抛错会保留输入并显示错误。打开或切换事项 ID 开始新会话，同 ID 的新对象不会覆盖未保存草稿 |

事项对象使用 `id`、`title`、`owner`、`status`、`due`、`budget`、`description`。`due` 为 `YYYY-MM-DD` 日期字符串；编辑表单内部转换 dayjs，提交时转回字符串。负责人用 ID 保存、标签显示。演示金额单位为 USD，不代表真实产品的币种与精度规则。

以下是按实际接口编写的筛选接线示例；完整列表、编辑与焦点恢复组合见 `Workbench.jsx`：

```jsx
import React, { useMemo, useState } from 'react';
import { LibraryProvider, FilterBar } from './components.jsx';
import { filterItems, seedItems } from './data.mjs';

function FilterExample() {
  const [query, setQuery] = useState({ keyword: '' });
  const items = useMemo(() => filterItems(seedItems, query), [query]);
  return <LibraryProvider>
    <FilterBar value={query} onChange={setQuery}
      onReset={() => setQuery({ keyword: '' })} />
    <p>匹配 {items.length} 条事项</p>
  </LibraryProvider>;
}
```

页面持有记录、查询、分页、选中 ID 和当前对象；列表、详情与统计读取同一份数据。保存时更新该数据源，失败时抛错交给表单反馈；接真实接口后补上实际权限、持久化及业务校验。演示上传不代表服务器接收或保存了文件。

## 本地维护与离线构建

维护源在 [assets/component-library/](../assets/component-library/)，要求 Node.js 20 或以上。命令均在此目录执行：

```sh
cd assets/component-library
npm ci
npm run dev
```

`dev` 的访问地址以终端输出为准。修改源码后运行：

```sh
npm run build
```

`build` 使用 esbuild 0.25.11 生成上一级 `assets/library.html`，将实际所需代码、样式和适用生产依赖许可纳入产物。不要手改生成文件。构建后按目标环境实际检查关键操作和打开方式。

版本固定为 React／React DOM 19.2.0、Ant Design 6.6.7、dayjs 1.11.13；构建开发依赖为 esbuild 0.25.11。npm 包只安装到此源码目录，不安装到全局，也不安装或发布 Skill。真实项目复用时优先保留其兼容版本并核对 API，不盲目覆盖锁文件。

首次 `npm ci` 通常需要网络；构建产物面向离线运行，可直接本地打开。交付前仍需实测 `file://`、外部请求、浮层、关键路径和目标视口，不能从构建成功推断交互已通过。源码、生成产物和复制到项目的实质代码均须保留适用声明，具体范围见[第三方来源与许可记录](../THIRD_PARTY_NOTICES.md)。

