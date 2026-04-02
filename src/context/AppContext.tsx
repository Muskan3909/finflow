import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, Transaction, Role, Theme } from '@/types';
import { SEED_TRANSACTIONS } from '@/data/seed';

// ── Helpers ───────────────────────────────────────────────────────
function loadState(): AppState {
  try {
    const txRaw   = localStorage.getItem('ff-txs');
    const role    = (localStorage.getItem('ff-role')  as Role)  ?? 'viewer';
    const theme   = (localStorage.getItem('ff-theme') as Theme) ?? 'dark';
    return {
      transactions: txRaw ? (JSON.parse(txRaw) as Transaction[]) : SEED_TRANSACTIONS,
      role,
      theme,
      activeTab: 'dashboard',
    };
  } catch {
    return {
      transactions: SEED_TRANSACTIONS,
      role: 'viewer',
      theme: 'dark',
      activeTab: 'dashboard',
    };
  }
}

function saveState(state: AppState): void {
  try {
    localStorage.setItem('ff-txs',   JSON.stringify(state.transactions));
    localStorage.setItem('ff-role',  state.role);
    localStorage.setItem('ff-theme', state.theme);
  } catch { /* quota exceeded – silently ignore */ }
}

// ── Reducer ───────────────────────────────────────────────────────
function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    document.documentElement.className = state.theme === 'light' ? 'light' : '';
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}

// ── Convenience hooks ─────────────────────────────────────────────
export function useTransactions()  { return useAppContext().state.transactions; }
export function useRole()          { return useAppContext().state.role; }
export function useTheme()         { return useAppContext().state.theme; }
export function useActiveTab()     { return useAppContext().state.activeTab; }
export function useDispatch()      { return useAppContext().dispatch; }
