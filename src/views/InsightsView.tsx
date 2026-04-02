import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { useTransactions } from '@/context/AppContext';
import { LineTooltip } from '@/components/charts/ChartTooltips';
import { CAT_COLORS } from '@/data/seed';
import { fmt, fmtFull, sumIncome, sumExpense, getCategoryTotals } from '@/utils/helpers';

export function InsightsView() {
  const txs = useTransactions();

  const months = [
    { key: '2026-01', label: 'January' },
    { key: '2026-02', label: 'February' },
    { key: '2026-03', label: 'March' },
  ];

  const barData = months.map(({ key, label }) => {
    const t = txs.filter(x => x.date.startsWith(key));
    const income  = sumIncome(t);
    const expense = sumExpense(t);
    return { month: label.slice(0, 3), income, expense, saved: Math.max(0, income - expense) };
  });

  const catTotals = getCategoryTotals(txs);
  const topCats   = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const maxCat    = topCats[0]?.[1] ?? 1;

  const cur = barData[2], prv = barData[1];
  const expChg = cur.expense - prv.expense;
  const incChg = cur.income  - prv.income;

  const totalExp = Object.values(catTotals).reduce((a, b) => a + b, 0);
  const rentPct  = Math.round(((catTotals['Rent'] ?? 0) / totalExp) * 100);

  const textLo = 'var(--text-lo)';

  return (
    <div className="tab-view">
      <div className="ins-grid">

        {/* Monthly bar chart */}
        <div className="ins-card full">
          <div className="chart-title">Monthly Income vs Expenses</div>
          <div className="chart-sub">3-month comparison · January – March 2026</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: textLo, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: textLo, fontSize: 10, fontFamily: 'JetBrains Mono,monospace' }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip content={<LineTooltip />} />
              <Legend formatter={(v: string) => <span style={{ color: 'var(--text-lo)', fontSize: 12 }}>{v}</span>} />
              <Bar dataKey="income"  name="Income"   fill="var(--green)" radius={[5, 5, 0, 0]} />
              <Bar dataKey="expense" name="Expenses" fill="var(--red)"   radius={[5, 5, 0, 0]} />
              <Bar dataKey="saved"   name="Saved"    fill="var(--gold)"  radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top spending categories */}
        <div className="ins-card">
          <div className="chart-title">Top Spending Categories</div>
          <div className="chart-sub" style={{ marginBottom: 18 }}>All-time breakdown</div>

          {topCats.length === 0 ? (
            <div className="empty">
              <div className="empty-ico">📊</div>
              <div className="empty-ttl">No expense data</div>
            </div>
          ) : topCats.map(([cat, amt]) => (
            <div key={cat} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: CAT_COLORS[cat] ?? '#888', display: 'inline-block',
                  }} />
                  {cat}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-hi)', fontWeight: 600 }}>
                  {fmt(amt)}
                </span>
              </div>
              <div className="prog">
                <div className="prog-fill" style={{
                  width: `${(amt / maxCat) * 100}%`,
                  background: CAT_COLORS[cat] ?? '#888',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Key insight KPIs */}
        <div className="ins-card">
          <div className="chart-title">Key Insights</div>
          <div className="chart-sub" style={{ marginBottom: 14 }}>March vs February</div>

          <div className="ins-kpi">
            <div className="ins-kpi-lbl">Expense Change</div>
            <div className="ins-kpi-val" style={{ color: expChg > 0 ? 'var(--red)' : 'var(--green)' }}>
              {expChg > 0 ? '+' : ''}{fmt(expChg)}
            </div>
            <div className="ins-kpi-note">
              {expChg > 0 ? '↑ Spending increased' : '↓ Spending decreased'} vs last month
            </div>
          </div>

          <div className="ins-kpi">
            <div className="ins-kpi-lbl">Income Change</div>
            <div className="ins-kpi-val" style={{ color: incChg >= 0 ? 'var(--green)' : 'var(--red)' }}>
              {incChg >= 0 ? '+' : ''}{fmt(incChg)}
            </div>
            <div className="ins-kpi-note">
              {incChg >= 0 ? '↑ Income grew' : '↓ Income dropped'} vs last month
            </div>
          </div>

          <div className="ins-kpi">
            <div className="ins-kpi-lbl">Highest Expense Category</div>
            <div className="ins-kpi-val" style={{
              fontSize: 19, fontFamily: 'var(--head)',
              color: topCats[0] ? (CAT_COLORS[topCats[0][0]] ?? 'var(--text-hi)') : 'var(--text-hi)',
            }}>
              {topCats[0]?.[0] ?? '—'}
            </div>
            <div className="ins-kpi-note" style={{ fontFamily: 'var(--mono)' }}>
              {fmtFull(topCats[0]?.[1] ?? 0)} total spent
            </div>
          </div>

          <div className="tip-card">
            <div className="tip-lbl">💡 Smart Tip</div>
            <div className="tip-txt">
              Rent is <strong>{rentPct}%</strong> of total spending. Reducing dining out
              and shopping could free up ₹5–8K monthly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
