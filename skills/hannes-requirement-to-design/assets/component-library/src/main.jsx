import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Alert, App, Button, Empty, Input, Modal, Select, Space, Tabs, Tag } from 'antd';
import { LibraryProvider } from './theme.jsx';
import { demoCatalog } from './demos.jsx';
import Workbench from './Workbench.jsx';
import './styles.css';

const sources = __SOURCES__;
const versions = __VERSIONS__;
const licenses = __LICENSE_TEXT__;
const catalog = [...demoCatalog, { id: 'workbench', title: '组合工作台', en: 'COMPOSITION', description: '将筛选、表格、详情与编辑串成同一条交互链路。组件负责呈现，页面管理共享数据。', components: ['FilterBar', 'ItemTable', 'ItemDrawer', 'ItemEditForm'], Component: Workbench }];
const rules = {
  inputs: ['持续标签与输入边界保持清晰；只读内容仍可选择与复制。', '操作中的按钮防止重复提交；禁用状态说明原因。'],
  dates: ['仅日期使用 YYYY-MM-DD；此处不模拟时区换算。', '快捷周期基于固定演示日期；逆序、禁用日期仍需在提交入口验证。'],
  selects: ['选择对象 ID 与搜索词分别管理；自由输入不冒充已选对象。', '清空、无匹配、加载失败及重试均具有明确状态。'],
  hierarchy: ['上级变更清理已经失效的下级值。', '树选择为叶子独立勾选；级联路径与对象 ID 可追溯。'],
  forms: ['错误显示在字段旁，提交后定位首个错误并保留草稿。', '控件约束之外，处理函数再次校验；保存失败可以重试。'],
  tables: ['使用稳定行 ID；排序、分页和选择由受控状态驱动。', '批量操作明确跨页选中范围，取消确认不改变数据。'],
  switches: ['开关即时生效；失败恢复原值。复选与单选在提交后生效。', '页签和分段选择属于局部视图，不增加业务返回层级。'],
  overlays: ['Esc 仅关闭最上层弹层；关闭后焦点返回触发入口。', '抽屉内日期和选择器需验证浮层层级、定位及裁切。'],
  feedback: ['重要结果持续显示；短暂消息不承担唯一的信息反馈。', 'Tooltip 提供辅助说明，交互内容使用 Popover，关键提示不只依赖悬停。'],
  upload: ['仅本地选择与模拟上传，不会将文件发送至服务器。', '离开示例或移除附件释放预览资源；失败保留文件并提供重试。'],
  states: ['区分加载中、初始无数据、筛选无结果与失败。', '错误提供恢复入口，不用无期限转圈代替失败反馈。'],
  workbench: ['列表、详情、表单与统计读取同一份记录。', '导出的组合组件使用受控 props；业务规则和保存逻辑由目标页面提供。'],
};
function readRoute() {
  const match = location.hash.match(/^#\/([a-z-]+)(?:\/([^/]+))?$/);
  if (!location.hash || location.hash === '#/') return { id: 'inputs' };
  if (!match || !catalog.some(item => item.id === match[1]) || (match[2] && match[1] !== 'workbench')) return { id: 'invalid' };
  try { return { id: match[1], itemId: match[2] ? decodeURIComponent(match[2]) : undefined }; } catch { return { id: 'invalid' }; }
}
class DemoBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Alert type="error" title="示例未能显示" description="请使用重置当前示例恢复；如果持续出现，请检查构建与组件版本。" showIcon /> : this.props.children; }
}
function SourcePanel({ id }) {
  const defaultFile = id === 'workbench' ? 'Workbench.jsx' : 'demos.jsx';
  const [file, setFile] = useState(defaultFile);
  const [fallback, setFallback] = useState(false);
  const { message } = App.useApp();
  const area = useRef(null);
  useEffect(() => { if (fallback) { area.current?.focus(); area.current?.select(); } }, [fallback]);
  const copy = async () => {
    try { if (!navigator.clipboard?.writeText) throw new Error(); await navigator.clipboard.writeText(sources[file]); message.success('完整模块源码已复制'); }
    catch { setFallback(true); message.info('已选中源码，可按 Ctrl/Cmd+C 复制'); }
  };
  return <div className="source-panel"><div className="source-toolbar"><Space wrap><span>构建时从维护源逐字读取</span><Select aria-label="源码文件" value={file} onChange={file => { setFile(file); setFallback(false); }} style={{ minWidth: 170 }} options={Object.keys(sources).map(value => ({ value, label: `src/${value}` }))} /></Space><Button onClick={copy}>复制源码</Button></div>
    <Alert type="info" title="复制的是完整源模块" description="保留对应导入和相邻模块，并安装匹配版本的依赖。目标页面只引入需要的组件，不引入整个目录；复用说明见 references/component-library.md。" showIcon style={{ marginBottom: 16 }} />
    {fallback ? <textarea ref={area} aria-label="可复制源码" readOnly value={sources[file]} /> : <pre tabIndex={0} aria-label="组件源码"><code>{sources[file]}</code></pre>}
  </div>;
}
function Gallery() {
  const [route, setRoute] = useState(readRoute);
  const [query, setQuery] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [tab, setTab] = useState('live');
  const [showLicenses, setShowLicenses] = useState(false);
  const search = useRef(null);
  useEffect(() => { const update = () => setRoute(readRoute()); window.addEventListener('hashchange', update); window.addEventListener('popstate', update); return () => { window.removeEventListener('hashchange', update); window.removeEventListener('popstate', update); }; }, []);
  useEffect(() => { setTab('live'); }, [route.id]);
  useEffect(() => { const shortcut = event => { if ((event.ctrlKey || event.metaKey) && event.key === 'k') { event.preventDefault(); search.current?.focus(); } }; window.addEventListener('keydown', shortcut); return () => window.removeEventListener('keydown', shortcut); }, []);
  const entry = catalog.find(entry => entry.id === route.id);
  const matching = catalog.filter(entry => `${entry.title} ${entry.en} ${entry.components.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  const closeItem = () => {
    if (history.state?.hannesItem) history.back();
    else { history.replaceState(null, '', '#/workbench'); setRoute(readRoute()); }
  };
  const openItem = id => { history.pushState({ hannesItem: true }, '', `#/workbench/${encodeURIComponent(id)}`); setRoute(readRoute()); };
  const Demo = entry?.Component;
  return <><header className="site-header"><a className="brand" href="#/inputs"><span className="brand-mark" aria-hidden="true"><i/><i/><i/><i/></span><span><strong>Hannes · 组件实验室</strong><small>INTERACTION COMPONENT LIBRARY</small></span></a>
    <Input ref={search} className="header-search" aria-label="搜索组件" placeholder="搜索组件或交互…" allowClear suffix={<span className="keyboard-hint">⌘ K</span>} value={query} onChange={event => setQuery(event.target.value)} style={{ maxWidth: 320 }} />
    <div className="header-meta"><a href="style-preview.html">风格预览 ↗</a><span className="version">Ant Design <strong>{versions.antd}</strong></span></div></header>
    <div className="site-shell"><aside className="sidebar"><div className="nav-caption">COMPONENTS <span className="result-counter">{matching.length} / {catalog.length}</span></div><nav className="side-nav" aria-label="组件分类">{matching.map(entry => <React.Fragment key={entry.id}>{entry.id === 'workbench' && <div className="nav-divider" />}<a href={`#/${entry.id}`} className={entry.id === route.id ? 'active' : ''} aria-current={entry.id === route.id ? 'page' : undefined}><span className="nav-number">{String(catalog.indexOf(entry) + 1).padStart(2, '0')}</span>{entry.title}</a></React.Fragment>)}</nav>
      {!matching.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有匹配组件"><Button size="small" onClick={() => setQuery('')}>清空搜索</Button></Empty>}
      <div className="side-footer"><strong>真实控件 · 可复用源码</strong><br/>本地演示 / 无运行时网络依赖<br/>React {versions.react} · Ant Design {versions.antd}</div></aside>
      <main className="main"><div className="breadcrumb"><a href="#/inputs">组件实验室</a><span>/</span><span>{entry?.title || '无效链接'}</span></div>
        {!entry ? <Empty description="没有这个组件示例，链接可能有误。"><Button type="primary" onClick={() => { location.hash = '/inputs'; }}>返回组件目录</Button></Empty> : <>
          <div className="page-heading"><div><div className="eyebrow">{entry.en} / ANT DESIGN</div><h1>{entry.title}</h1><p className="page-description">{entry.description}</p></div><Space className="heading-actions"><Tag color="blue">真实组件</Tag><Button onClick={() => { setResetKey(key => key + 1); if (route.itemId) { history.replaceState(null, '', '#/workbench'); setRoute(readRoute()); } }}>重置当前示例</Button></Space></div>
          <section className="content-card"><div className="card-top"><span className="card-title"><span className="live-dot"/>交互试验区</span><div className="component-tags">{entry.components.map(name => <code key={name}>{name}</code>)}</div></div>
            <Tabs className="code-tab" activeKey={tab} onChange={setTab} items={[
              { key: 'live', label: '交互示例', forceRender: true, children: <div className="demo-canvas"><DemoBoundary key={`${entry.id}-${resetKey}`}><Demo itemId={route.itemId} onOpenItem={openItem} onCloseItem={closeItem} /></DemoBoundary></div> },
              { key: 'source', label: '源码与复用', children: <SourcePanel key={entry.id} id={entry.id} /> },
            ]} />
            <div className="demo-footer"><span>所有操作仅影响本地演示数据，刷新即重置。</span><span>实现：官方 Ant Design 组件 + 自编示例</span></div></section>
          <div className="usage-grid"><section className="note-panel"><h3>交互契约</h3><ul>{(rules[entry.id] || []).map(rule => <li key={rule}>{rule}</li>)}</ul></section><section className="note-panel"><h3>如何用于下一份 PRD</h3><p>先沿用目标项目的组件与版本。新建 React 原型时，可复用主题和所需组件；业务权限、校验、保存与路由仍由目标项目提供。</p></section></div>
        </>}
        <footer className="page-footer"><span>HANNES DESIGN RESOURCES　/　虚构事项数据 · PC 优先</span><button onClick={() => setShowLicenses(true)}>依赖版本与完整许可声明</button></footer>
      </main></div>
    <Modal title="依赖版本与许可声明" open={showLicenses} onCancel={() => setShowLicenses(false)} footer={<Button onClick={() => setShowLicenses(false)}>关闭</Button>} width={780}><p className="subtle">以下为实际打包运行时模块的版权与许可。它们不代表本 Skill 整体已采用同一许可证。</p><pre className="license-text">{licenses}</pre></Modal>
  </>;
}
createRoot(document.getElementById('root')).render(<LibraryProvider><Gallery /></LibraryProvider>);
