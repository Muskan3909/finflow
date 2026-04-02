export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Food'
  | 'Rent'
  | 'Transport'
  | 'Entertainment'
  | 'Shopping'
  | 'Utilities'
  | 'Health';

export type Role = 'viewer' | 'admin';
export type Theme = 'dark' | 'light';
export type TabId = 'dashboard' | 'transactions' | 'insights';
export type SortField = 'date' | 'amount';
export type SortDir = 'asc' | 'desc';

export interface Transaction {
  id: number;
  date: string;       // YYYY-MM-DD
  amount: number;     // positive = income, negative = expense
  category: Category;
  type: TransactionType;
  description: string;
}

export interface AppState {
  transactions: Transaction[];
  role: Role;
  theme: Theme;
  activeTab: TabId;
}

export type AppAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: number }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_TAB'; payload: TabId };
