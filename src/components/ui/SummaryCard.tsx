interface Props {
  label: string;
  value: string;
  icon: string;
  color: string;
  sub?: string;
}

export function SummaryCard({ label, value, icon, color, sub }: Props) {
  return (
    <div className="sum-card">
      <div className="sum-icon" style={{ background: `${color}18` }}>{icon}</div>
      <div className="sum-label">{label}</div>
      <div className="sum-value" style={{ color }}>{value}</div>
      {sub && <div className="sum-sub">{sub}</div>}
    </div>
  );
}
