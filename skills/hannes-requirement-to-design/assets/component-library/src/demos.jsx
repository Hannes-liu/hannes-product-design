import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert, App, Badge, Button, Cascader, Checkbox, DatePicker, Descriptions,
  Divider, Drawer, Empty, Form, Input, InputNumber, Modal, Popconfirm,
  Popover, Radio, Result, Segmented, Select, Skeleton, Space, Spin,
  Switch, Table, Tabs, Tag, TimePicker, Tooltip, TreeSelect, Typography, Upload,
} from 'antd';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;
const referenceDate = dayjs('2026-10-23');

// All asynchronous examples are local, cancellable, and make no network requests.
function useDelayedAction() {
  const timers = useRef(new Set());
  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);
  return useCallback((callback, delay = 850) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      callback();
    }, delay);
    timers.current.add(id);
    return () => {
      clearTimeout(id);
      timers.current.delete(id);
    };
  }, []);
}

function Example({ title, description, children }) {
  return <section className="example-box">
    <div className="example-heading"><h3>{title}</h3>{description && <p>{description}</p>}</div>
    <div className="demo-stack">{children}</div>
  </section>;
}

function Field({ id, label, hint, children }) {
  return <div className="demo-field"><label className="field-caption" htmlFor={id}>{label}</label>{children}{hint && <Text type="secondary">{hint}</Text>}</div>;
}

// @demo-start inputs
export function InputsDemo() {
  const { message } = App.useApp();
  const [name, setName] = useState('季度资料整理');
  const [note, setNote] = useState('汇总资料，并在提交前检查文件命名。');
  const [budget, setBudget] = useState(1280);
  const [saved, setSaved] = useState({ name: '季度资料整理', note: '汇总资料，并在提交前检查文件命名。', budget: 1280 });
  const [draftExists, setDraftExists] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const nextRecordId = useRef(1);
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const later = useDelayedAction();
  const restore = () => {
    setName(saved.name); setNote(saved.note); setBudget(saved.budget); setDraftExists(true);
  };
  const save = () => {
    if (busy.current || !draftExists) return;
    busy.current = true;
    setPending(true);
    const snapshot = { name, note, budget };
    later(() => { busy.current = false; setPending(false); setSaved(snapshot); message.success('草稿已保存'); });
  };
  const formatBudget = value => value === null ? '未填写' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  return <div className="demo-grid">
    <Example title="按钮与动作" description="主次动作、危险操作与提交反馈。">
      <Space wrap><Button type="primary" loading={pending} disabled={!draftExists} onClick={save}>保存草稿</Button><Button disabled={!draftExists} onClick={() => setPreviewOpen(true)}>预览</Button><Button type="dashed" disabled={!draftExists || pending} onClick={() => { const id = nextRecordId.current++; setRecords(current => [...current, { id, name: name.trim() || '未命名任务', budget }]); }}>添加记录</Button></Space>
      <Space wrap><Button type="link" aria-expanded={helpOpen} aria-controls="input-help" onClick={() => setHelpOpen(current => !current)}>{helpOpen ? '收起帮助' : '使用帮助'}</Button><Button type="text" disabled={pending || !draftExists} onClick={restore}>取消编辑</Button><Popconfirm title="删除这份示例草稿？" description="删除后可以恢复上次保存的内容。" onConfirm={() => { setDraftExists(false); setName(''); setNote(''); setBudget(null); setPreviewOpen(false); }} okText="删除" cancelText="保留"><Button danger disabled={!draftExists || pending}>删除草稿</Button></Popconfirm><Button disabled>暂无权限</Button></Space>
      {helpOpen && <div id="input-help"><Alert type="info" showIcon title="草稿操作说明" description="编辑下方内容后保存；取消编辑会恢复上次保存的内容。添加记录会把当前名称和预算加入列表，删除草稿后仍可恢复。" /></div>}
      <div className="demo-stack" aria-live="polite"><Text type="secondary">已添加 {records.length} 条记录</Text>{records.map(record => <div className="local-file-row" key={record.id}><div><Text>{record.name}</Text><div><Text type="secondary">{formatBudget(record.budget)}</Text></div></div><Button size="small" danger onClick={() => setRecords(current => current.filter(item => item.id !== record.id))} aria-label={`删除记录 ${record.name}`}>删除记录</Button></div>)}</div>
      <Modal title="草稿预览" open={previewOpen} onCancel={() => setPreviewOpen(false)} footer={<Button onClick={() => setPreviewOpen(false)}>关闭预览</Button>}><Descriptions column={1} items={[{ key: 'name', label: '任务名称', children: name || '未填写' }, { key: 'note', label: '补充说明', children: note || '未填写' }, { key: 'budget', label: '预算', children: formatBudget(budget) }]} /></Modal>
    </Example>
    <Example title="文本输入" description="可清空、计数、多行与只读状态。">
      {draftExists ? <><Field id="input-name" label="任务名称"><Input id="input-name" value={name} disabled={pending} onChange={e => setName(e.target.value)} allowClear maxLength={30} showCount placeholder="输入任务名称" /></Field>
      <Field id="input-note" label="补充说明"><Input.TextArea id="input-note" value={note} disabled={pending} onChange={e => setNote(e.target.value)} maxLength={160} showCount autoSize={{ minRows: 3, maxRows: 5 }} /></Field>
      <div className="demo-grid"><Field id="input-readonly" label="记录编号 · 只读"><Input id="input-readonly" value="TASK-2026-042" readOnly /></Field><Field id="input-disabled" label="归档备注 · 禁用"><Input id="input-disabled" value="已归档后不可编辑" disabled /></Field></div></> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="示例草稿已删除"><Button onClick={restore}>恢复上次保存的草稿</Button></Empty>}
    </Example>
    <Example title="数字与金额" description="金额只接受 0–100,000，可通过步进器或键盘调整。">
      <Field id="input-budget" label="预算（USD）"><InputNumber id="input-budget" aria-label="预算（美元）" value={budget} disabled={pending || !draftExists} min={0} max={100000} precision={2} step={100} prefix="$" suffix="USD" onChange={setBudget} style={{ width: '100%' }} /></Field>
      <div className="demo-summary" aria-live="polite">当前预算：{formatBudget(budget)}</div>
    </Example>
  </div>;
}
// @demo-end inputs

// @demo-start dates
export function DatesDemo() {
  const [date, setDate] = useState(referenceDate);
  const [range, setRange] = useState([referenceDate, referenceDate.add(3, 'day')]);
  const [time, setTime] = useState(dayjs('2026-10-23T09:30:00'));
  const [restricted, setRestricted] = useState(referenceDate);
  const [month, setMonth] = useState(dayjs('2026-10-01'));
  return <div className="demo-grid">
    <Example title="日期与时间" description="独立受控状态，清空后显示未选择。">
      <Field id="date-single" label="执行日期"><DatePicker id="date-single" value={date} onChange={setDate} placeholder="选择日期" /></Field>
      <Field id="date-time" label="开始时间"><TimePicker id="date-time" value={time} onChange={setTime} format="HH:mm" minuteStep={15} placeholder="选择时间" /></Field>
      <Text type="secondary" aria-live="polite">{date ? date.format('YYYY年MM月DD日') : '未选择日期'} · {time ? time.format('HH:mm') : '未选择时间'}</Text>
    </Example>
    <Example title="日期范围与快捷项" description="快捷范围基于固定演示日期 2026-10-23。">
      <DatePicker.RangePicker aria-label="执行日期范围" value={range} onChange={setRange} presets={[
        { label: '未来 7 天', value: [referenceDate, referenceDate.add(6, 'day')] },
        { label: '本月剩余', value: [referenceDate, referenceDate.endOf('month')] },
      ]} placeholder={['开始日期', '结束日期']} />
      <Text aria-live="polite">{range?.[0] && range?.[1] ? `${range[0].format('MM月DD日')} — ${range[1].format('MM月DD日')}` : '尚未选择完整范围'}</Text>
    </Example>
    <Example title="受限日期与月份" description="灰色日期不可选：仅开放 2026-10-23 至 2026-10-31。">
      <Field id="date-restricted" label="预约日期"><DatePicker id="date-restricted" value={restricted} onChange={setRestricted} defaultPickerValue={referenceDate} minDate={referenceDate.startOf('month')} maxDate={referenceDate.endOf('month')} disabledDate={current => current.isBefore(referenceDate, 'day') || current.month() !== 9 || current.year() !== 2026} /></Field>
      <Field id="date-month" label="归档月份"><DatePicker id="date-month" picker="month" value={month} onChange={setMonth} /></Field>
    </Example>
  </div>;
}
// @demo-end dates

const teamOptions = [
  { value: 'design', label: '设计协作组' }, { value: 'product', label: '产品协作组' },
  { value: 'engineering', label: '工程协作组' }, { value: 'research', label: '研究协作组' },
];

// @demo-start selects
export function SelectsDemo() {
  const [team, setTeam] = useState('design');
  const [members, setMembers] = useState(['林青', '周屿']);
  const [remoteState, setRemoteState] = useState('idle');
  const [remoteValue, setRemoteValue] = useState();
  const later = useDelayedAction();
  const load = () => {
    if (remoteState === 'loading') return;
    setRemoteState('loading');
    later(() => setRemoteState(remoteState === 'error' ? 'ready' : 'error'));
  };
  return <div className="demo-grid">
    <Example title="单选与多选" description="输入关键词筛选；无匹配时可以清除关键词。">
      <Field id="select-team" label="协作分组"><Select id="select-team" value={team} onChange={setTeam} options={teamOptions} showSearch={{ optionFilterProp: 'label' }} allowClear placeholder="选择分组" notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有匹配分组" />} /></Field>
      <Field id="select-members" label="参与成员"><Select id="select-members" mode="multiple" value={members} onChange={setMembers} options={['林青', '周屿', '许禾', '陈墨', '苏遥'].map(value => ({ value, label: value }))} showSearch={{ optionFilterProp: 'label' }} allowClear placeholder="可选择多位成员" notFoundContent="没有匹配成员" /></Field>
      <Text aria-live="polite">已选择 {members.length} 位成员</Text>
    </Example>
    <Example title="加载、失败与重试" description="点击加载，第一次模拟失败；重试后恢复选项。">
      <Field id="select-local-load" label="可用模板"><Select id="select-local-load" value={remoteValue} onChange={setRemoteValue} placeholder={remoteState === 'ready' ? '选择模板' : '请先加载选项'} loading={remoteState === 'loading'} disabled={remoteState !== 'ready'} allowClear options={remoteState === 'ready' ? [{ value: 'weekly', label: '每周清单' }, { value: 'review', label: '评审清单' }] : []} /></Field>
      <Button onClick={load} loading={remoteState === 'loading'} disabled={remoteState === 'ready'}>{remoteState === 'error' ? '重新加载' : remoteState === 'ready' ? '选项已就绪' : '加载选项'}</Button>
      {remoteState === 'loading' && <div role="status"><Spin size="small" /> 正在准备选项…</div>}
      {remoteState === 'error' && <Alert type="error" showIcon title="选项加载失败" description="模拟失败，点击重新加载即可恢复。" />}
      {remoteState === 'ready' && <Alert type="success" showIcon title="选项已加载" />}
    </Example>
  </div>;
}
// @demo-end selects

const hierarchyOptions = [
  { value: 'studio', label: '工作室', children: [{ value: 'design', label: '设计组', children: [{ value: 'visual', label: '视觉小组' }, { value: 'interaction', label: '交互小组' }] }, { value: 'content', label: '内容组', children: [{ value: 'editorial', label: '编辑小组' }] }] },
  { value: 'lab', label: '实验室', children: [{ value: 'research', label: '研究组', children: [{ value: 'insights', label: '洞察小组' }] }] },
];
const childOptions = { studio: [{ value: 'design', label: '设计组' }, { value: 'content', label: '内容组' }], lab: [{ value: 'research', label: '研究组' }, { value: 'prototype', label: '原型组' }] };

// @demo-start hierarchy
export function HierarchyDemo() {
  const [path, setPath] = useState(['studio', 'design', 'visual']);
  const [tree, setTree] = useState(['visual']);
  const [parent, setParent] = useState('studio');
  const [child, setChild] = useState('design');
  const treeData = hierarchyOptions.map(item => ({ title: item.label, value: item.value, selectable: false, checkable: false, children: item.children.map(group => ({ title: group.label, value: group.value, selectable: false, checkable: false, children: group.children.map(leaf => ({ title: leaf.label, value: leaf.value })) })) }));
  return <div className="demo-grid">
    <Example title="级联选择" description="按组织层级逐级定位，支持搜索完整路径。">
      <Field id="hierarchy-cascader" label="所属团队"><Cascader id="hierarchy-cascader" options={hierarchyOptions} value={path} onChange={setPath} showSearch={{ filter: (input, items) => items.some(item => item.label.includes(input)) }} placeholder="选择团队路径" /></Field>
      <Text type="secondary">{path?.length ? path.join(' / ') : '尚未选择团队'}</Text>
    </Example>
    <Example title="树选择" description="选择多个末级小组，可通过名称检索。">
      <Field id="hierarchy-tree" label="协作小组"><TreeSelect id="hierarchy-tree" treeData={treeData} value={tree} onChange={setTree} treeCheckable showSearch={{ treeNodeFilterProp: 'title' }} treeDefaultExpandAll allowClear placeholder="选择协作小组" /></Field>
    </Example>
    <Example title="父子联动" description="切换上级组织时，子级选择立即清空。">
      <Field id="hierarchy-parent" label="上级组织"><Select id="hierarchy-parent" value={parent} onChange={value => { setParent(value); setChild(undefined); }} options={[{ value: 'studio', label: '工作室' }, { value: 'lab', label: '实验室' }]} /></Field>
      <Field id="hierarchy-child" label="下级分组"><Select id="hierarchy-child" value={child} onChange={setChild} options={childOptions[parent]} allowClear placeholder="请重新选择下级分组" /></Field>
      <Text aria-live="polite" type="secondary">{child ? `已选择：${childOptions[parent].find(item => item.value === child)?.label}` : '子级选择已清空，请选择一个分组。'}</Text>
    </Example>
  </div>;
}
// @demo-end hierarchy

// @demo-start forms
export function FormsDemo() {
  const [form] = Form.useForm();
  const [state, setState] = useState('idle');
  const [attempts, setAttempts] = useState(0);
  const [saved, setSaved] = useState(null);
  const lock = useRef(false);
  const later = useDelayedAction();
  const submit = values => {
    if (lock.current) return;
    // Recheck at the action boundary, independent of the visible Form rules.
    const errors = [];
    const title = typeof values.title === 'string' ? values.title.trim() : '';
    const email = typeof values.email === 'string' ? values.email.trim() : '';
    if (!title || title.length > 40) errors.push({ name: 'title', errors: [!title ? '请填写任务名称' : '任务名称不能超过 40 个字'] });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push({ name: 'email', errors: ['请输入有效的邮箱地址'] });
    const validStart = dayjs.isDayjs(values.start) && values.start.isValid();
    const validEnd = dayjs.isDayjs(values.end) && values.end.isValid();
    if (!validStart) errors.push({ name: 'start', errors: ['请选择有效的开始日期'] });
    if (!validEnd) errors.push({ name: 'end', errors: ['请选择有效的结束日期'] });
    else if (validStart && values.end.isBefore(values.start, 'day')) errors.push({ name: 'end', errors: ['结束日期不能早于开始日期'] });
    if (errors.length) {
      form.setFields(errors);
      form.scrollToField(errors[0].name, { focus: true });
      return;
    }
    lock.current = true;
    setState('loading');
    later(() => {
      lock.current = false;
      if (attempts === 0) { setState('error'); setAttempts(1); }
      else { setState('success'); setSaved({ ...values, title, email }); }
    }, 1100);
  };
  return <div className="demo-grid">
    <Example title="完整校验与安全提交" description="尝试留空或输入错误邮箱。第一次有效提交模拟失败，内容保留以便重试。">
      <Form form={form} name="task-application" layout="vertical" onFinish={submit} disabled={state === 'loading'} scrollToFirstError={{ focus: true }} onFinishFailed={({ errorFields }) => { if (errorFields[0]) form.scrollToField(errorFields[0].name, { focus: true }); }} initialValues={{ title: '', email: '', start: referenceDate, end: referenceDate.add(2, 'day') }}>
        <Form.Item name="title" label="任务名称" rules={[{ required: true, whitespace: true, message: '请填写任务名称' }, { max: 40, message: '任务名称不能超过 40 个字' }]}><Input placeholder="例如：资料归档检查" maxLength={40} /></Form.Item>
        <Form.Item name="email" label="联系邮箱" rules={[{ required: true, message: '请填写联系邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}><Input type="email" placeholder="name@example.com" /></Form.Item>
        <div className="demo-grid">
          <Form.Item name="start" label="开始日期" rules={[{ required: true, message: '请选择开始日期' }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="end" label="结束日期" dependencies={['start']} rules={[{ required: true, message: '请选择结束日期' }, ({ getFieldValue }) => ({ validator(_, value) { const start = getFieldValue('start'); return !value || !start || !value.isBefore(start, 'day') ? Promise.resolve() : Promise.reject(new Error('结束日期不能早于开始日期')); } })]}><DatePicker style={{ width: '100%' }} /></Form.Item>
        </div>
        {state === 'error' && <Alert type="error" showIcon title="提交未成功，填写内容已保留" description="这是一次本地模拟失败，请再次提交。" style={{ marginBottom: 16 }} />}
        <Space wrap><Button type="primary" htmlType="submit" loading={state === 'loading'}>{state === 'error' ? '重试提交' : '提交申请'}</Button><Button htmlType="button" onClick={() => { form.resetFields(); setState('idle'); setAttempts(0); setSaved(null); }}>重置表单</Button></Space>
      </Form>
    </Example>
    <Example title="提交结果" description="通过校验并重试成功后，在这里查看提交快照。">
      {saved && state === 'success' ? <><Alert type="success" showIcon title="申请已提交" /><Descriptions column={1} items={[{ key: 'title', label: '任务名称', children: saved.title }, { key: 'email', label: '联系邮箱', children: saved.email }, { key: 'dates', label: '执行日期', children: `${saved.start.format('YYYY-MM-DD')} 至 ${saved.end.format('YYYY-MM-DD')}` }]} /></> : state === 'loading' ? <div role="status"><Skeleton active paragraph={{ rows: 4 }} /><Text type="secondary">正在提交，请稍候…</Text></div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="完成表单后查看提交结果" />}
    </Example>
  </div>;
}
// @demo-end forms

const initialRows = Array.from({ length: 28 }, (_, index) => ({ id: `TASK-${String(index + 1).padStart(3, '0')}`, name: index === 4 ? '跨团队协作资料归档与季度交付清单完整性复核任务（长文本展示示例）' : ['资料整理', '体验评审', '原型校对', '文案检查'][index % 4] + ` ${String(index + 1).padStart(2, '0')}`, owner: ['林青', '周屿', '许禾', '陈墨'][index % 4], status: ['pending', 'active', 'done'][index % 3], hours: 2 + (index * 7) % 23, updated: `2026-10-${String(28 - index % 20).padStart(2, '0')}` }));
const statusLabels = { pending: '待处理', active: '进行中', done: '已完成' };

// @demo-start tables
export function TablesDemo() {
  const { message } = App.useApp();
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState({ current: 1, pageSize: 5 });
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState({});
  const columns = [
    { title: '任务编号', dataIndex: 'id', width: 130 },
    { title: '任务名称', dataIndex: 'name', width: 180, ellipsis: true, sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN'), sortOrder: sorter.field === 'name' ? sorter.order : null },
    { title: '负责人', dataIndex: 'owner', width: 100 },
    { title: '状态', dataIndex: 'status', width: 120, filters: Object.entries(statusLabels).map(([value, text]) => ({ text, value })), filteredValue: filters.status || null, onFilter: (value, record) => record.status === value, render: value => <Tag color={{ pending: 'default', active: 'processing', done: 'success' }[value]}>{statusLabels[value]}</Tag> },
    { title: '预计工时', dataIndex: 'hours', width: 130, sorter: (a, b) => a.hours - b.hours, sortOrder: sorter.field === 'hours' ? sorter.order : null, render: value => `${value} 小时` },
    { title: '更新日期', dataIndex: 'updated', width: 130, sorter: (a, b) => a.updated.localeCompare(b.updated), sortOrder: sorter.field === 'updated' ? sorter.order : null },
  ];
  const archive = () => {
    setRows(current => current.map(row => selected.includes(row.id) ? { ...row, status: 'done' } : row));
    message.success(`已将 ${selected.length} 项任务标记为完成`);
    setSelected([]);
  };
  return <Example title="受控数据表格" description="排序、筛选、分页与跨页勾选。每条记录使用稳定编号；筛选后仍保留已选记录。">
    <div className="table-toolbar"><Space wrap><Badge count={selected.length} showZero color="#537D68" /><Text>项已选择</Text><Button size="small" disabled={!selected.length} onClick={() => setSelected([])}>清空选择</Button></Space><Space wrap><Button onClick={() => { setFilters({}); setSorter({}); setPage(current => ({ ...current, current: 1 })); }}>重置筛选与排序</Button><Popconfirm title={`完成已选的 ${selected.length} 项任务？`} description="此操作包含其他分页中勾选的记录。" disabled={!selected.length} onConfirm={archive} okText="确认完成" cancelText="取消"><Button type="primary" disabled={!selected.length}>批量完成</Button></Popconfirm></Space></div>
    <Table rowKey="id" columns={columns} dataSource={rows} rowSelection={{ selectedRowKeys: selected, onChange: setSelected, preserveSelectedRowKeys: true }} pagination={{ ...page, showSizeChanger: true, pageSizeOptions: [5, 10, 20], showTotal: total => `共 ${total} 项` }} onChange={(pagination, nextFilters, nextSorter, extra) => { setPage({ current: extra.action === 'filter' ? 1 : pagination.current, pageSize: pagination.pageSize }); setFilters(nextFilters); setSorter(Array.isArray(nextSorter) ? nextSorter[0] || {} : nextSorter); }} scroll={{ x: 850 }} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有符合筛选条件的任务" /> }} />
    <Text type="secondary" aria-live="polite">{selected.length ? `已选编号：${selected.join('、')}` : '尚未选择记录，可以切换分页继续勾选。'}</Text>
  </Example>;
}
// @demo-end tables

// @demo-start switches
export function SwitchesDemo() {
  const { message } = App.useApp();
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const switchLock = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [channels, setChannels] = useState(['站内消息']);
  const [frequency, setFrequency] = useState('daily');
  const [saved, setSaved] = useState(null);
  const [tab, setTab] = useState('summary');
  const [view, setView] = useState('周');
  const later = useDelayedAction();
  const change = next => {
    if (switchLock.current) return;
    switchLock.current = true;
    const previous = enabled;
    setEnabled(next); setBusy(true);
    later(() => { setBusy(false); switchLock.current = false; if (attempt === 0) { setEnabled(previous); setAttempt(1); message.error('设置保存失败，已恢复原状态；可再次尝试'); } else message.success('设置已立即生效'); });
  };
  return <div className="demo-grid">
    <Example title="开关：立即生效" description="第一次切换模拟失败并恢复原状态，再次切换成功。">
      <Space><Switch aria-label="自动提醒" checked={enabled} onChange={change} loading={busy} checkedChildren="开" unCheckedChildren="关" /><Text>自动提醒</Text></Space>
      <div aria-live="polite"><Badge status={enabled ? 'success' : 'default'} text={busy ? '正在保存…' : enabled ? '自动提醒已开启' : '自动提醒已关闭'} /></div>
    </Example>
    <Example title="复选与单选：提交后生效" description="修改选项后点击保存，底部显示已保存的快照。">
      <div role="group" aria-labelledby="channels-label"><div className="field-caption" id="channels-label">通知渠道</div><Checkbox.Group value={channels} onChange={setChannels} options={['站内消息', '邮件', '桌面通知']} /></div>
      <div role="group" aria-labelledby="frequency-label"><div className="field-caption" id="frequency-label">汇总频率</div><Radio.Group value={frequency} onChange={e => setFrequency(e.target.value)} options={[{ label: '每天', value: 'daily' }, { label: '每周', value: 'weekly' }, { label: '不汇总', value: 'never' }]} /></div>
      <Button type="primary" onClick={() => { setSaved({ channels: [...channels], frequency }); message.success('通知偏好已保存'); }}>保存偏好</Button>
      <Text aria-live="polite" type="secondary">{saved ? `已保存：${saved.channels.join('、') || '无通知渠道'} / ${{ daily: '每天', weekly: '每周', never: '不汇总' }[saved.frequency]}` : '尚未保存偏好'}</Text>
    </Example>
    <Example title="页签与分段选择" description="切换内容视图并保留当前分段状态。">
      <Segmented aria-label="统计周期" value={view} onChange={setView} options={['日', '周', '月']} />
      <Tabs activeKey={tab} onChange={setTab} items={[{ key: 'summary', label: '概览', children: <div className="demo-summary">当前周期：{view} · 已完成 {view === '日' ? 3 : view === '周' ? 12 : 38} 项任务</div> }, { key: 'details', label: '详情', children: <div className="demo-summary">按{view}展示任务明细，当前选择会在页签间保留。</div> }, { key: 'disabled', label: '归档（不可用）', disabled: true }]} />
    </Example>
  </div>;
}
// @demo-end switches

// @demo-start overlays
export function OverlaysDemo() {
  const { message } = App.useApp();
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [archived, setArchived] = useState(false);
  const [date, setDate] = useState(referenceDate);
  const [owner, setOwner] = useState('林青');
  const [saved, setSaved] = useState(null);
  const drawerButton = useRef(null);
  const modalButton = useRef(null);
  const drawerRoot = useRef(null);
  const popupInDrawer = trigger => drawerRoot.current || trigger.parentElement;
  return <div className="demo-grid">
    <Example title="抽屉与嵌套对话框" description="抽屉内选择日期或负责人。确认框打开时，Escape 只关闭最上层。">
      <Button ref={drawerButton} type="primary" onClick={() => setDrawer(true)}>编辑任务</Button>
      {saved && <Text aria-live="polite">最近保存：{saved.owner} · {saved.date || '未指定日期'}</Text>}
      <Drawer title="编辑任务安排" open={drawer} onClose={() => setDrawer(false)} keyboard={!modal} afterOpenChange={open => { if (!open) drawerButton.current?.focus(); }} size="default" styles={{ body: { padding: 24 } }} extra={<Button ref={modalButton} type="primary" onClick={() => setModal(true)}>保存安排</Button>}>
        <div ref={drawerRoot} className="demo-stack" style={{ position: 'relative' }}>
          <Alert showIcon type="info" title="先调整安排，再点击保存" />
          <Field id="drawer-owner" label="负责人"><Select id="drawer-owner" value={owner} onChange={setOwner} getPopupContainer={popupInDrawer} options={['林青', '周屿', '许禾'].map(value => ({ value, label: value }))} /></Field>
          <Field id="drawer-date" label="执行日期"><DatePicker id="drawer-date" value={date} onChange={setDate} getPopupContainer={popupInDrawer} /></Field>
          <Paragraph type="secondary">按 Escape 关闭抽屉，焦点回到“编辑任务”按钮。</Paragraph>
          <Modal title="确认保存安排？" open={modal} onCancel={() => setModal(false)} onOk={() => { setSaved({ owner, date: date?.format('YYYY-MM-DD') }); setModal(false); message.success('任务安排已保存'); }} okText="确认保存" cancelText="返回编辑" keyboard focusable={{ focusTriggerAfterClose: false }} afterClose={() => modalButton.current?.focus()}>
            <Paragraph>负责人：{owner}</Paragraph><Paragraph>执行日期：{date?.format('YYYY-MM-DD') || '未指定'}</Paragraph><Text type="secondary">取消或按 Escape 会回到抽屉，保留编辑内容。</Text>
          </Modal>
        </div>
      </Drawer>
    </Example>
    <Example title="明确确认与取消" description="确认操作前说明后果，取消后保留当前状态。">
      {archived ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前列表暂无任务，示例任务已归档"><Button onClick={() => setArchived(false)}>恢复示例任务</Button></Empty> : <div className="local-file-row"><Text>资料归档检查</Text><Tag>待处理</Tag></div>}
      <Button danger disabled={archived} onClick={() => setConfirmOpen(true)}>归档示例任务</Button>
      <Modal title="归档这项任务？" open={confirmOpen} onCancel={() => { setConfirmOpen(false); message.info('已取消归档'); }} onOk={() => { setConfirmOpen(false); setArchived(true); message.success('示例任务已归档'); }} okText="确认归档" cancelText="继续保留" okButtonProps={{ danger: true }}>
        <Paragraph>归档后，这项示例任务会移出当前工作列表。请确认任务已经完成。</Paragraph>
      </Modal>
    </Example>
  </div>;
}
// @demo-end overlays

// @demo-start feedback
export function FeedbackDemo() {
  const { message, notification } = App.useApp();
  const [alertVisible, setAlertVisible] = useState(true);
  const [completed, setCompleted] = useState(false);
  useEffect(() => () => notification.destroy(), [notification]);
  return <div className="demo-grid">
    <Example title="即时提示" description="适合短暂的操作结果与进度说明。">
      <Space wrap><Button onClick={() => message.success('修改已保存')}>成功提示</Button><Button onClick={() => message.error('保存失败，请重试')}>失败提示</Button><Button onClick={() => message.warning('还有 2 个字段未填写')}>警告提示</Button><Button onClick={() => message.info('当前为本地交互示例')}>一般提示</Button></Space>
    </Example>
    <Example title="通知与页面反馈" description="重要结果提供可操作入口，关闭提示后可以恢复。">
      <Button onClick={() => notification.success({ title: '导出文件已准备好', description: '本地示例已完成，无需离开当前页面。', duration: 0, actions: <Button size="small" onClick={() => { notification.destroy(); message.success('已查看导出结果'); }}>查看结果</Button> })}>打开通知</Button>
      {alertVisible ? <Alert type="warning" showIcon closable={{ onClose: () => setAlertVisible(false) }} title="部分记录缺少说明" description="可以继续编辑，补齐说明后再提交。" /> : <Button type="dashed" onClick={() => setAlertVisible(true)}>恢复页面提示</Button>}
      <Alert type="success" showIcon title="所有更改已保存" />
    </Example>
    <Example title="辅助说明" description="鼠标悬停或键盘聚焦触发；操作内容使用点击式气泡。">
      <Space wrap><Tooltip title="只有负责人可以修改任务日期" trigger={['hover', 'focus']}><Button>日期权限说明</Button></Tooltip><Popover trigger="click" title="快捷操作说明" content={<div className="demo-stack"><Text>示例任务会在本地标记完成。</Text><Button size="small" type="primary" disabled={completed} onClick={() => { setCompleted(true); message.success('示例任务已完成'); }}>{completed ? '已完成' : '标记完成'}</Button></div>}><Button>更多帮助</Button></Popover><Tag color={completed ? 'success' : 'default'}>{completed ? '示例任务已完成' : '示例任务待处理'}</Tag></Space>
    </Example>
  </div>;
}
// @demo-end feedback

// @demo-start upload
export function UploadDemo() {
  const { message } = App.useApp();
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [failureUsed, setFailureUsed] = useState(false);
  const failedOnce = useRef(false);
  const urls = useRef(new Map());
  const pending = useRef(new Map());
  const acceptedFiles = useRef(new Set());
  const later = useDelayedAction();
  useEffect(() => () => { urls.current.forEach(URL.revokeObjectURL); urls.current.clear(); }, []);
  const beforeUpload = file => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const supported = ['png', 'jpg', 'jpeg', 'txt'].includes(extension) && (!file.type || ['image/png', 'image/jpeg', 'text/plain'].includes(file.type));
    if (!supported) { message.error(`${file.name}：只支持 PNG、JPEG 和 TXT`); return Upload.LIST_IGNORE; }
    if (file.size > 2 * 1024 * 1024) { message.error(`${file.name}：文件不能超过 2 MB`); return Upload.LIST_IGNORE; }
    // Reserve a slot synchronously so batches and consecutive selections cannot replace earlier files.
    if (acceptedFiles.current.size >= 3) { message.warning(`${file.name}：最多保留 3 个文件，请先移除一个`); return Upload.LIST_IGNORE; }
    acceptedFiles.current.add(file.uid);
    return true;
  };
  const request = ({ file, onSuccess, onError }) => {
    const shouldFail = !failedOnce.current;
    if (shouldFail) failedOnce.current = true;
    const cancel = later(() => {
      pending.current.delete(file.uid);
      if (shouldFail) { setFailureUsed(true); onError(new Error('模拟上传失败，请点击重试')); }
      else onSuccess({ local: true });
    }, 1200);
    pending.current.set(file.uid, cancel);
    return { abort() { cancel(); pending.current.delete(file.uid); } };
  };
  const retry = file => {
    setFiles(current => current.map(item => item.uid === file.uid ? { ...item, status: 'uploading', percent: 0 } : item));
    const cancel = later(() => { pending.current.delete(file.uid); setFiles(current => current.map(item => item.uid === file.uid ? { ...item, status: 'done', percent: 100, error: undefined } : item)); message.success(`${file.name} 已重试成功`); }, 900);
    pending.current.set(file.uid, cancel);
  };
  const remove = file => {
    acceptedFiles.current.delete(file.uid);
    pending.current.get(file.uid)?.(); pending.current.delete(file.uid);
    const url = urls.current.get(file.uid);
    if (url) { URL.revokeObjectURL(url); urls.current.delete(file.uid); }
    if (preview?.uid === file.uid) setPreview(null);
    return true;
  };
  const showPreview = file => {
    let url = urls.current.get(file.uid);
    if (!url && file.originFileObj) { url = URL.createObjectURL(file.originFileObj); urls.current.set(file.uid, url); }
    setPreview({ uid: file.uid, name: file.name, url, image: /\.(png|jpe?g)$/i.test(file.name) });
  };
  return <div className="demo-grid">
    <Example title="本地文件上传" description="PNG / JPEG / TXT，单个不超过 2 MB，最多 3 个。文件只保留在当前页面。">
      <Upload.Dragger accept=".png,.jpg,.jpeg,.txt,image/png,image/jpeg,text/plain" multiple fileList={files} beforeUpload={beforeUpload} customRequest={request} onChange={({ fileList }) => setFiles(fileList)} onRemove={remove} onPreview={showPreview} disabled={files.length >= 3} showUploadList={false}>
        <p className="upload-symbol" aria-hidden="true">↑</p><p className="ant-upload-text">点击选择，或将文件拖到这里</p><p className="ant-upload-hint">支持图片与纯文本 · 最多 3 个文件</p>
      </Upload.Dragger>
      <div className="demo-stack" aria-live="polite">{files.map(file => <div className="local-file-row" key={file.uid}><div><Text ellipsis={{ tooltip: file.name }} style={{ maxWidth: 220 }}>{file.name}</Text><div><Text type={file.status === 'error' ? 'danger' : 'secondary'}>{file.status === 'uploading' ? '正在处理…' : file.status === 'error' ? '模拟失败，可重试' : '已就绪'}</Text></div></div><Space wrap><Button size="small" onClick={() => showPreview(file)} aria-label={`预览 ${file.name}`}>预览</Button>{file.status === 'error' && <Button size="small" type="primary" onClick={() => retry(file)} aria-label={`重试 ${file.name}`}>重试</Button>}<Button size="small" danger onClick={() => { remove(file); setFiles(current => current.filter(item => item.uid !== file.uid)); }} aria-label={`移除 ${file.name}`}>移除</Button></Space></div>)}</div>
      <Text type="secondary">{files.length}/3 个文件{failureUsed ? ' · 失败文件可单独重试' : ' · 第一个文件会模拟失败，以便体验重试'}</Text>
      <Modal open={!!preview} title={preview?.name} footer={<Button onClick={() => setPreview(null)}>关闭预览</Button>} onCancel={() => setPreview(null)} width={680}>
        {preview?.url ? preview.image ? <img alt={preview.name} src={preview.url} style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain' }} /> : <iframe title={`文本预览：${preview.name}`} src={preview.url} sandbox="" style={{ width: '100%', height: 360, border: '1px solid #e5e7eb', background: '#fff' }} /> : <Empty description="暂无预览内容" />}
      </Modal>
    </Example>
    <Example title="文件生命周期" description="可预览、单独重试和移除；离开当前分类即释放本地文件。">
      <Alert type="info" showIcon title="无需服务器" description="选择文件后模拟一次处理过程。移除文件会取消该文件的处理并释放预览资源。" />
      <Descriptions column={1} items={[{ key: 'types', label: '文件格式', children: 'PNG、JPEG、TXT' }, { key: 'size', label: '大小限制', children: '单个文件 ≤ 2 MB' }, { key: 'count', label: '数量限制', children: '最多 3 个，满额后移除再添加' }]} />
    </Example>
  </div>;
}
// @demo-end upload

// @demo-start states
export function StatesDemo() {
  const [state, setState] = useState('ready');
  const [filter, setFilter] = useState('');
  const [retried, setRetried] = useState(false);
  const later = useDelayedAction();
  const examples = ['资料归档', '界面评审', '内容校对'];
  const visible = examples.filter(item => item.includes(filter.trim()));
  const load = () => { if (state === 'loading') return; setState('loading'); later(() => setState('ready'), 1600); };
  const retry = () => { setState('loading'); later(() => { setState('ready'); setRetried(true); }, 1000); };
  return <div className="demo-stack">
    <Example title="统一状态切换" description="比较加载、空白、筛选无结果与错误恢复。所有状态都可主动触发。">
      <Space wrap><Button onClick={load} loading={state === 'loading'}>模拟加载</Button><Button onClick={() => setState('empty')} disabled={state === 'loading'}>查看空状态</Button><Button onClick={() => { setState('ready'); setFilter('不存在的任务'); }} disabled={state === 'loading'}>筛选无结果</Button><Button danger onClick={() => { setState('error'); setRetried(false); }} disabled={state === 'loading'}>模拟错误</Button><Button onClick={() => { setState('ready'); setFilter(''); }} disabled={state === 'loading'}>恢复默认</Button></Space>
    </Example>
    <div className="example-box state-stage" aria-live="polite" aria-busy={state === 'loading'}>
      {state === 'loading' ? <><div role="status"><Spin size="small" /> 正在加载任务…</div><Divider /><Skeleton active title={{ width: '35%' }} paragraph={{ rows: 4 }} /></> : state === 'error' ? <Result status="error" title="任务加载失败" subTitle="这是一次模拟错误。已输入的筛选条件会保留，点击重试恢复。" extra={<Button type="primary" onClick={retry}>重新加载</Button>} /> : state === 'empty' ? <Empty description="还没有任务"><Button type="primary" onClick={() => { setState('ready'); setFilter(''); }}>创建示例任务</Button></Empty> : <div className="demo-stack">
        {retried && <Alert type="success" showIcon title="重试成功，内容已恢复" />}
        <Field id="states-filter" label="筛选任务"><Input id="states-filter" value={filter} onChange={e => setFilter(e.target.value)} allowClear placeholder="输入任务关键词" /></Field>
        {visible.length ? visible.map((item, index) => <div className="local-file-row" key={item}><Space><Badge status={index === 0 ? 'processing' : 'default'} /><Text>{item}</Text></Space><Tag>{index === 0 ? '进行中' : '待处理'}</Tag></div>) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有符合条件的任务"><Button onClick={() => setFilter('')}>清除筛选</Button></Empty>}
      </div>}
    </div>
  </div>;
}
// @demo-end states

// The build injects the actual source text; snippets must never drift from these demos.
export const demoCatalog = [
  { id: 'inputs', title: '基础输入', en: 'Inputs & actions', description: '按钮、文本、数字与只读状态', components: ['Button', 'Input', 'InputNumber'], Component: InputsDemo },
  { id: 'dates', title: '日期时间', en: 'Date & time', description: '日期、范围、时间与可选区间', components: ['DatePicker', 'RangePicker', 'TimePicker'], Component: DatesDemo },
  { id: 'selects', title: '选择器', en: 'Select', description: '搜索、多选与加载失败恢复', components: ['Select', 'Spin', 'Empty'], Component: SelectsDemo },
  { id: 'hierarchy', title: '层级选择', en: 'Hierarchy', description: '级联、树选择与父子联动', components: ['Cascader', 'TreeSelect', 'Select'], Component: HierarchyDemo },
  { id: 'forms', title: '表单校验', en: 'Forms', description: '规则校验、跨字段验证与重试提交', components: ['Form', 'Input', 'DatePicker'], Component: FormsDemo },
  { id: 'tables', title: '数据表格', en: 'Data table', description: '排序、筛选、分页与跨页批量操作', components: ['Table', 'Tag', 'Popconfirm'], Component: TablesDemo },
  { id: 'switches', title: '切换与偏好', en: 'Toggles & tabs', description: '即时设置、提交偏好与内容切换', components: ['Switch', 'Checkbox', 'Radio', 'Tabs', 'Segmented'], Component: SwitchesDemo },
  { id: 'overlays', title: '弹层交互', en: 'Overlays', description: '抽屉、嵌套对话框与操作确认', components: ['Drawer', 'Modal', 'DatePicker', 'Select'], Component: OverlaysDemo },
  { id: 'feedback', title: '反馈提示', en: 'Feedback', description: '操作结果、页面提示与辅助说明', components: ['message', 'notification', 'Alert', 'Tooltip', 'Popover'], Component: FeedbackDemo },
  { id: 'upload', title: '文件上传', en: 'Upload', description: '格式校验、本地预览、移除与失败重试', components: ['Upload', 'Modal', 'Alert'], Component: UploadDemo },
  { id: 'states', title: '页面状态', en: 'Page states', description: '加载、空白、筛选无结果与错误恢复', components: ['Skeleton', 'Spin', 'Empty', 'Result'], Component: StatesDemo },
];
