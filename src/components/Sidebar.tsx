import type { TabId } from '@/types';
import { useActiveTab, useRole, useDispatch } from '@/context/AppContext';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'dashboard',    label: 'Dashboard',    icon: '▦' },
  { id: 'transactions', label: 'Transactions', icon: '⇄' },
  { id: 'insights',     label: 'Insights',     icon: '⌇' },
];

interface Props { isOpen: boolean; onClose: () => void; }

export function Sidebar({ isOpen, onClose }: Props) {
  const activeTab = useActiveTab();
  const role      = useRole();
  const dispatch  = useDispatch();

  function goTab(id: TabId) {
    dispatch({ type: 'SET_TAB', payload: id });
    onClose();
  }

  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}>
      <div className="s-logo">
        <div className="logo-word">Fin<span className="logo-dot">flow</span></div>
        <div className="logo-sub">Finance Tracker</div>
      </div>

      <nav className="s-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-btn${activeTab === t.id ? ' active' : ''}`}
            onClick={() => goTab(t.id)}
          >
            <span style={{ fontFamily: 'monospace', fontSize: 16 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      <div className="s-foot">
        <div className="role-chip">
          <div className={`role-pip${role === 'admin' ? ' admin' : ''}`} />
          <div>
            <div className="role-lbl">{role === 'admin' ? 'Admin' : 'Viewer'}</div>
            <div className="role-sub">{role === 'admin' ? 'Full access' : 'Read only'}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
