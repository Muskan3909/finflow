import type { Transaction } from '@/types';

export function fmt(value: number): string {
  const a = Math.abs(value);
  if (a >= 100000) return `₹${(a / 100000).toFixed(2)}L`;
  if (a >= 1000)   return `₹${(a / 1000).toFixed(1)}K`;
  return `₹${a.toLocaleString('en-IN')}`;
}

export function fmtFull(value: number): string {
  return `₹${Math.abs(value).toLocaleString('en-IN')}`;
}

export function fmtDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(d)} ${months[+m - 1]} ${y}`;
}

export function sumIncome(txs: Transaction[]): number {
  return txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
}

export function sumExpense(txs: Transaction[]): number {
  return txs.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
}

export function getCategoryTotals(txs: Transaction[]): Record<string, number> {
  const map: Record<string, number> = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] ?? 0) + Math.abs(t.amount);
  });
  return map;
}

export function exportCSV(txs: Transaction[]): void {
  const header = 'Date,Description,Category,Type,Amount';
  const rows = txs.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`);
  download([header, ...rows].join('\n'), 'finflow-transactions.csv', 'text/csv');
}

export function exportJSON(txs: Transaction[]): void {
  download(JSON.stringify(txs, null, 2), 'finflow-transactions.json', 'application/json');
}

function download(content: string, filename: string, type: string): void {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = filename;
  a.click();
}
