import { fmt, fmtFull } from '@/utils/helpers';

interface LinePayload { name?: string; value: number; color: string; }
interface TooltipProps { active?: boolean; payload?: LinePayload[]; label?: string; }

export function LineTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-hi)',
      borderRadius: 8, padding: '10px 14px',
    }}>
      <div style={{ color: 'var(--text-lo)', fontSize: 11, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13 }}>
          {p.name && <span style={{ color: 'var(--text)', marginRight: 6, fontSize: 11 }}>{p.name}</span>}
          {fmt(p.value)}
        </div>
      ))}
    </div>
  );
}

interface PiePayload { name: string; value: number; payload: { fill: string }; }
interface PieTooltipProps { active?: boolean; payload?: PiePayload[]; }

export function PieTooltip({ active, payload }: PieTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-hi)',
      borderRadius: 8, padding: '8px 13px',
    }}>
      <div style={{ color: d.payload.fill, fontWeight: 700, fontSize: 13 }}>{d.name}</div>
      <div style={{ color: 'var(--text-hi)', fontFamily: 'var(--mono)', fontSize: 13 }}>{fmtFull(d.value)}</div>
    </div>
  );
}
