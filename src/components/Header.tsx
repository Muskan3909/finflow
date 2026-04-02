import { useActiveTab, useRole, useTheme, useDispatch } from '@/context/AppContext';

const TITLE_MAP: Record<string, string> = {
  dashboard:    'Dashboard',
  transactions: 'Transactions',
  insights:     'Insights',
};

interface Props { onMenuClick: () => void; }

export function Header({ onMenuClick }: Props) {
  const activeTab = useActiveTab();
  const role      = useRole();
  const theme     = useTheme();
  const dispatch  = useDispatch();

  return (
    <header className="app-header">
      <div className="h-left">
        <button className="hamburger" onClick={onMenuClick}>☰</button>
        <div className="h-title">{TITLE_MAP[activeTab]}</div>
      </div>

      <div className="h-right">
        {/* Role switcher */}
        <div className="ctrl-grp">
          <button
            className={`ctrl-btn${role === 'viewer' ? ' active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
          >
            Viewer
          </button>
          <button
            className={`ctrl-btn${role === 'admin' ? ' active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
          >
            Admin
          </button>
        </div>

        {/* Theme toggle */}
        <div
          className="icon-btn"
          role="button"
          title="Toggle theme"
          onClick={() => dispatch({ type: 'SET_THEME', payload: theme === 'dark' ? 'light' : 'dark' })}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </div>
      </div>
    </header>
  );
}
