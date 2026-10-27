import React, { useEffect, useRef, useState } from 'react';
import { App, Alert, Button, Checkbox, Space, Statistic } from 'antd';
import { FilterBar, ItemTable, ItemDrawer, ItemEditForm } from './components.jsx';
import { filterItems, seedItems, validateDraft } from './data.mjs';

// A composition example: state and persistence belong to the page, not the exported controls.
export default function Workbench({ itemId, onOpenItem, onCloseItem }) {
  const { message, modal } = App.useApp();
  const [items, setItems] = useState(() => structuredClone(seedItems));
  const [filters, setFilters] = useState({ keyword: '' });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editing, setEditing] = useState(null);
  const [failNext, setFailNext] = useState(false);
  const [saved, setSaved] = useState('');
  const live = useRef(true);
  const cancelDelay = useRef(null);
  const trigger = useRef(null);
  const scrollBefore = useRef(0);
  const editTrigger = useRef(null);
  useEffect(() => { live.current = true; return () => { live.current = false; cancelDelay.current?.(); }; }, []);
  const rows = filterItems(items, filters);
  const item = items.find(item => item.id === itemId);
  const delay = () => new Promise(resolve => { const timer = setTimeout(() => { cancelDelay.current = null; resolve(); }, 650); cancelDelay.current = () => { clearTimeout(timer); resolve(); }; });
  const save = async draft => {
    if (!items.some(item => item.id === draft.id)) throw new Error('事项已经失效，请关闭编辑重新选择');
    if (Object.keys(validateDraft(draft)).length) throw new Error('提交内容不符合约束');
    await delay();
    if (!live.current) return;
    if (failNext) { setFailNext(false); throw new Error('模拟保存失败：内容已保留，请再次保存'); }
    setItems(current => current.map(item => item.id === draft.id ? draft : item));
    setEditing(null); setSaved(`已保存 ${draft.id}，列表、详情及统计已同步`);
    message.success('事项已更新');
  };
  useEffect(() => {
    if (!itemId) {
      requestAnimationFrame(() => { trigger.current?.focus({ preventScroll: true }); window.scrollTo(0, scrollBefore.current); });
    }
  }, [itemId]);
  useEffect(() => {
    if (!editing) requestAnimationFrame(() => editTrigger.current?.focus({ preventScroll: true }));
  }, [editing]);
  const bulk = () => {
    const ids = selectedIds.filter(id => items.some(item => item.id === id));
    if (!ids.length) return;
    modal.confirm({ title: `将 ${ids.length} 条事项标记为已完成？`, content: '范围为当前跨页已选事项。此处仅修改本地演示数据。', okText: '确认完成', cancelText: '取消',
      onOk: () => {
        setItems(current => current.map(item => ids.includes(item.id) ? { ...item, status: '已完成' } : item));
        setSelectedIds([]); setSaved(`已完成 ${ids.length} 条事项，统计已同步`); message.success('批量操作完成');
      },
    });
  };
  return <div className="workbench" data-testid="workbench">
    <Alert type="info" title="同一份状态，贯通完整操作" description="筛选、分页、跨页选择和列表位置在关闭详情后保留。编辑与批量操作即时同步；刷新或重置恢复初始数据。" showIcon />
    <div className="metrics">
      <Statistic title="事项总数" value={items.length} suffix="条" />
      <Statistic title="进行中" value={items.filter(item => item.status === '进行中').length} suffix="条" />
      <Statistic title="已完成" value={items.filter(item => item.status === '已完成').length} suffix="条" />
      <Statistic title="预算合计 · USD" value={items.reduce((sum, item) => sum + item.budget, 0)} precision={2} />
    </div>
    <FilterBar value={filters} onChange={value => { setFilters(value); setPage(1); }} onReset={() => { setFilters({ keyword: '' }); setPage(1); }} />
    <div className="table-toolbar"><Space><span>当前匹配 <strong>{rows.length}</strong> 条</span><span className="subtle">已选 {selectedIds.length} 条（跨页保留）</span></Space><Space><Button disabled={!selectedIds.length} onClick={bulk}>批量完成</Button><Button disabled={!selectedIds.length} onClick={() => setSelectedIds([])}>清空选择</Button></Space></div>
    <ItemTable items={rows} page={Math.min(page, Math.max(1, Math.ceil(rows.length / 5)))} onPageChange={setPage} selectedIds={selectedIds} onSelectionChange={setSelectedIds}
      onOpen={(id, button) => { trigger.current = button; scrollBefore.current = window.scrollY; onOpenItem(id); }} />
    <div className="demo-options"><Checkbox checked={failNext} onChange={event => setFailNext(event.target.checked)}>下一次保存模拟失败</Checkbox><span className="subtle">失败不丢草稿，可直接重试。</span></div>
    {saved && <Alert role="status" title={saved} type="success" showIcon closable onClose={() => setSaved('')} />}
    <ItemDrawer open={Boolean(itemId)} item={item} onClose={() => { if (!editing) onCloseItem(); }}
      onEdit={(item, button) => { editTrigger.current = button; setEditing(item); }} />
    <ItemEditForm open={Boolean(editing)} item={editing} onCancel={() => setEditing(null)} onSubmit={save} />
  </div>;
}
