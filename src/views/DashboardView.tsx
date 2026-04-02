import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { useTransactions } from '@/context/AppContext';
import { SummaryCard } from '@/components/ui/SummaryCard';
import { LineTooltip, PieTooltip } from '@/components/charts/ChartTooltips';
import { CAT_COLORS } from '@/data/seed';
import { fmt, fmtFull, fmtDate, sumIncome, sumExpense } from '@/utils/helpers';

export function DashboardView() {
  const txs = useTransactions();

  const curTx = txs.filter(t => t.date.startsWith('2026-03'));
  const prvTx = txs.filter(t => t.date.startsWith('2026-02'));
  const janTx = txs.filter(t => t.date.startsWith('2026-01'));

  const curInc = sumIncome(curTx);
  const curExp = sumExpense(curTx);
  const janBal = 120000 + sumIncome(janTx) - sumExpense(janTx);
  const febBal = janBal  + sumIncome(prvTx) - sumExpense(prvTx);
  const marBal = febBal  + curInc - curExp;
  const savRate = curInc > 0 ? Math.round(((curInc - curExp) / curInc) * 100) : 0;

  const trend = [
    { m: 'Oct', bal: 45000 },
    { m: 'Nov', bal: 65000 },
    { m: 'Dec', bal: 120000 },
    { m: 'Jan', bal: janBal },
    { m: 'Feb', bal: febBal },
    { m: 'Mar', bal: marBal },
  ];

  const catMap: Record<string, number> = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    catMap[t.category] = (catMap[t.category] ?? 0) + Math.abs(t.amount);
  });
  const pieData = Object.entries(catMap)
    .map(([name, value]) => ({ name, value, fill: CAT_COLORS[name] ?? '#888' }))
    .sort((a, b) => b.value - a.value);

  const recent = [...txs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  const textLo = 'var(--text-lo)';

  return (
    <div className="tab-view">
      {/* Summary cards */}
      <div className="cards-grid">
        <SummaryCard label="Total Balance"    value={fmt(marBal)} icon="💰" color="var(--green)" sub="All-time net" />
        <SummaryCard label="Monthly Income"   value={fmt(curInc)} icon="📈" color="var(--green)" sub="March 2026" />
        <SummaryCard label="Monthly Expenses" value={fmt(curExp)} icon="📉" color="var(--red)"   sub="March 2026" />
        <SummaryCard label="Savings Rate"     value={`${savRate}%`} icon="🎯" color="var(--gold)" sub="This month" />
      </div>

      {/* Charts */}
      <div className="charts-row">
        {/* Line chart */}
        <div className="chart-card">
          <div className="chart-title">Balance Trend</div>
          <div className="chart-sub">6-month portfolio growth</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="m" tick={{ fill: textLo, fontSize: 11, fontFamily: 'JetBrains Mono,monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: textLo, fontSize: 10, fontFamily: 'JetBrains Mono,monospace' }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip content={<LineTooltip />} />
              <Line
                type="monotone" dataKey="bal" name="Balance"
                stroke="var(--green)" strokeWidth={2.5}
                dot={{ fill: 'var(--green)', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 1.5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="chart-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            <div className="chart-title">Spending Breakdown</div>
            <div className="chart-sub">By category · all time</div>
          </div>
          <PieChart width={190} height={190}>
            <Pie data={pieData} cx={95} cy={95} innerRadius={54} outerRadius={82} paddingAngle={3} dataKey="value">
              {pieData.map((d, i) => <Cell key={i} fill={d.fill} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
          <div className="pie-legend" style={{ width: '100%' }}>
            {pieData.slice(0, 6).map(d => (
              <div key={d.name} className="leg-item">
                <div className="leg-dot" style={{ background: d.fill }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="chart-card">
        <div className="chart-title">Recent Transactions</div>
        <div className="chart-sub">Latest 6 entries</div>
        {recent.length === 0 ? (
          <div className="empty">
            <div className="empty-ico">📭</div>
            <div className="empty-ttl">No transactions yet</div>
          </div>
        ) : recent.map(tx => (
          <div key={tx.id} className="recent-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 9, height: 9, borderRadius: '50%', flexShrink: 0,
                background: tx.type === 'income' ? 'var(--green)' : 'var(--red)',
              }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-hi)' }}>{tx.description}</div>
                <div style={{ fontSize: 11, color: 'var(--text-lo)' }}>{tx.category} · {fmtDate(tx.date)}</div>
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13,
              color: tx.type === 'income' ? 'var(--green)' : 'var(--red)',
            }}>
              {tx.type === 'income' ? '+' : '-'}{fmtFull(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
