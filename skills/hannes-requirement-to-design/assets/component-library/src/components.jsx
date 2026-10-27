import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Select, Space, Table, Tag, Drawer, Descriptions, Modal, Form, DatePicker, InputNumber, Alert } from 'antd';
import dayjs from 'dayjs';
import { owners, statuses, validateDraft } from './data.mjs';
export { LibraryProvider } from './theme.jsx';

export function FilterBar({ value, onChange, onReset }) {
  return <div className="filter-bar" role="search" aria-label="事项筛选">
    <Input aria-label="事项关键词" placeholder="搜索名称或编号" allowClear value={value.keyword}
      onChange={event => onChange({ ...value, keyword: event.target.value })} style={{ width: 230 }} />
    <Select aria-label="筛选负责人" placeholder="全部负责人" allowClear value={value.owner} options={owners}
      onChange={owner => onChange({ ...value, owner })} style={{ width: 150 }} />
    <Select aria-label="筛选状态" placeholder="全部状态" allowClear value={value.status} options={statuses.map(value => ({ value, label: value }))}
      onChange={status => onChange({ ...value, status })} style={{ width: 150 }} />
    <Button onClick={onReset}>清空筛选</Button>
  </div>;
}
export function ItemTable({ items, page, pageSize = 5, onPageChange, selectedIds, onSelectionChange, onOpen }) {
  const columns = [
    { title: '事项 / 编号', dataIndex: 'title', width: 310, render: (title, item) => <><Button type="link" className="item-link" onClick={event => onOpen(item.id, event.currentTarget)}>{title}</Button><div className="subtle row-id">{item.id}</div></> },
    { title: '负责人', dataIndex: 'owner', width: 110, render: value => owners.find(o => o.value === value)?.label || value },
    { title: '状态', dataIndex: 'status', width: 110, render: value => <Tag color={value === '已完成' ? 'success' : value === '进行中' ? 'processing' : 'default'}>{value}</Tag> },
    { title: '截止日期', dataIndex: 'due', width: 140, sorter: (a, b) => a.due.localeCompare(b.due) },
    { title: '预算 · USD', dataIndex: 'budget', width: 130, align: 'right', render: value => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
  ];
  return <Table aria-label="事项列表" rowKey="id" columns={columns} dataSource={items} scroll={{ x: 850 }}
    rowSelection={{ selectedRowKeys: selectedIds, preserveSelectedRowKeys: true, onChange: onSelectionChange }}
    pagination={{ current: page, pageSize, total: items.length, showSizeChanger: false, onChange: onPageChange, showTotal: total => `共 ${total} 条` }} />;
}
export function ItemDrawer({ open, item, onClose, onEdit }) {
  return <Drawer title="事项详情" open={open} onClose={onClose} size={520} destroyOnHidden
    extra={item && <Button type="primary" onClick={event => onEdit(item, event.currentTarget)}>编辑事项</Button>}>
    {item ? <><Tag>{item.id}</Tag><h2 className="detail-title">{item.title}</h2><Descriptions column={1} bordered items={[
      { key: 'owner', label: '负责人', children: owners.find(o => o.value === item.owner)?.label || item.owner },
      { key: 'status', label: '状态', children: <Tag>{item.status}</Tag> },
      { key: 'due', label: '截止日期', children: item.due },
      { key: 'budget', label: '预算', children: `${item.budget.toFixed(2)} USD` },
      { key: 'description', label: '事项说明', children: <span style={{ whiteSpace: 'pre-wrap' }}>{item.description}</span> },
    ]} /><p className="subtle">关闭详情会回到原列表。筛选、页码与选择不会丢失。</p></> : <Alert type="warning" title="未找到该事项" description="该链接可能已经失效，请关闭详情返回列表。" showIcon />}
  </Drawer>;
}
// The caller owns persistence. onSubmit receives plain serializable values and must resolve or throw.
export function ItemEditForm({ open, item, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const submitting = useRef(false);
  const mounted = useRef(true);
  const session = useRef(0);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; session.current++; }; }, []);
  useEffect(() => {
    session.current++; submitting.current = false; setSaving(false); setError('');
    if (open && item) { form.resetFields(); form.setFieldsValue({ ...item, due: dayjs(item.due) }); }
  // A session starts on opening or switching IDs. Unrelated parent renders must not erase drafts.
  }, [open, item?.id, form]);
  const cancel = () => { if (!submitting.current) onCancel(); };
  const submit = async values => {
    if (submitting.current || !item) return;
    const draft = { ...item, ...values, title: values.title?.trim(), due: values.due?.format('YYYY-MM-DD') };
    const errors = validateDraft(draft);
    if (Object.keys(errors).length) { form.setFields(Object.entries(errors).map(([name, message]) => ({ name, errors: [message] }))); return; }
    submitting.current = true; setSaving(true); setError(''); const current = session.current;
    try { await onSubmit(draft); }
    catch (error) { if (mounted.current && current === session.current) setError(error.message || '保存失败，请重试'); }
    finally { if (mounted.current && current === session.current) { submitting.current = false; setSaving(false); } }
  };
  return <Modal title="编辑事项" open={open} onCancel={cancel} footer={null} mask={{ closable: !saving }} keyboard={!saving} destroyOnHidden focusable={{ focusTriggerAfterClose: true }}>
    <Form form={form} layout="vertical" disabled={saving} onFinish={submit} scrollToFirstError={{ focus: true }} preserve={false}>
      {error && <Alert showIcon type="error" title={error} style={{ marginBottom: 16 }} />}
      <Form.Item label="事项名称" name="title" rules={[{ required: true, whitespace: true, message: '请输入事项名称' }, { max: 80, message: '最多 80 字' }]}><Input maxLength={80} showCount /></Form.Item>
      <div className="form-two"><Form.Item label="负责人" name="owner" rules={[{ required: true, message: '请选择负责人' }]}><Select options={owners} /></Form.Item>
      <Form.Item label="状态" name="status" rules={[{ required: true }]}><Select options={statuses.map(value => ({ value, label: value }))} /></Form.Item></div>
      <div className="form-two"><Form.Item label="截止日期" name="due" rules={[{ required: true, message: '请选择截止日期' }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
      <Form.Item label="预算（USD）" name="budget" rules={[{ required: true, message: '请输入预算' }]}><InputNumber min={0} max={100000} precision={2} style={{ width: '100%' }} /></Form.Item></div>
      <Form.Item label="事项说明" name="description"><Input.TextArea rows={3} maxLength={1000} showCount /></Form.Item>
      <div className="form-footer"><Button onClick={cancel} disabled={saving}>取消编辑</Button><Button type="primary" htmlType="submit" loading={saving}>保存修改</Button></div>
    </Form>
  </Modal>;
}
