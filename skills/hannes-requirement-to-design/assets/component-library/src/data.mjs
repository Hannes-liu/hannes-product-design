export const owners = [
  { value: 'member-a', label: '成员 A' },
  { value: 'member-b', label: '成员 B' },
  { value: 'member-c', label: '成员 C' },
];
export const statuses = ['待处理', '进行中', '已完成'];
const titles = ['整理周计划', '更新资料目录', '完善使用说明', '准备交流提纲', '汇总阶段反馈', '核对交付清单', '梳理协作事项', '补充异常处理说明', '回访使用体验', '归档项目资料', '调整检索条件', '校对长标题在列表与详情中的换行表现：用于检查信息密度与可读性的虚构事项'];
export const seedItems = titles.map((title, i) => ({
  id: `ITEM-${String(i + 1).padStart(3, '0')}`, title,
  owner: owners[i % 3].value, status: statuses[Math.floor(i / 3) % 3],
  due: `2026-10-${String(20 + i).padStart(2, '0')}`, budget: (i + 1) * 125.5,
  description: '这是一条虚构协作事项。数据只保存在当前页面内存中。\n编辑后列表、详情和统计同步更新。',
}));
// Queries use object IDs; labels are for display only.
export function filterItems(items, { keyword = '', owner, status } = {}) {
  const q = keyword.trim().toLocaleLowerCase();
  return items.filter(item => (!q || `${item.title} ${item.id}`.toLocaleLowerCase().includes(q))
    && (!owner || item.owner === owner) && (!status || item.status === status));
}
export function validateDraft(value) {
  const errors = {};
  if (!value.title?.trim() || value.title.trim().length > 80) errors.title = '请输入 1–80 字的事项名称';
  if (!owners.some(o => o.value === value.owner)) errors.owner = '请选择有效负责人';
  if (!statuses.includes(value.status)) errors.status = '请选择有效状态';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value.due || '') ? new Date(`${value.due}T00:00:00Z`) : null;
  if (!date || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value.due) errors.due = '请选择有效日期';
  if (typeof value.budget !== 'number' || !Number.isFinite(value.budget) || value.budget < 0 || value.budget > 100000 || Math.abs(value.budget * 100 - Math.round(value.budget * 100)) > 1e-6) errors.budget = '金额须在 0–100,000 USD，最多两位小数';
  if (typeof value.description !== 'string' || value.description.length > 1000) errors.description = '事项说明应为不超过 1000 字的文本';
  return errors;
}
