import type { Transaction } from '@/types';

export const SEED_TRANSACTIONS: Transaction[] = [
  { id: 1,  date: '2026-01-01', amount:  85000, category: 'Salary',        type: 'income',  description: 'Monthly Salary – TechCorp' },
  { id: 2,  date: '2026-01-03', amount: -25000, category: 'Rent',          type: 'expense', description: 'House Rent – January' },
  { id: 3,  date: '2026-01-05', amount:  -3400, category: 'Food',          type: 'expense', description: 'Grocery – More Supermarket' },
  { id: 4,  date: '2026-01-08', amount:  -1800, category: 'Transport',     type: 'expense', description: 'Ola rides – Week 1' },
  { id: 5,  date: '2026-01-10', amount:  -5500, category: 'Utilities',     type: 'expense', description: 'Electricity + Internet' },
  { id: 6,  date: '2026-01-12', amount:  -2200, category: 'Food',          type: 'expense', description: 'Swiggy orders' },
  { id: 7,  date: '2026-01-15', amount:  15000, category: 'Freelance',     type: 'income',  description: 'Design project – Client A' },
  { id: 8,  date: '2026-01-17', amount:  -4800, category: 'Shopping',      type: 'expense', description: 'Amazon – electronics' },
  { id: 9,  date: '2026-01-20', amount:  -1500, category: 'Health',        type: 'expense', description: 'Pharmacy + supplements' },
  { id: 10, date: '2026-01-22', amount:  -3200, category: 'Entertainment', type: 'expense', description: 'PVR + OTT subscriptions' },
  { id: 11, date: '2026-01-25', amount:  -2800, category: 'Food',          type: 'expense', description: 'Restaurant visits' },
  { id: 12, date: '2026-01-28', amount:  -1200, category: 'Transport',     type: 'expense', description: 'Petrol – January' },
  { id: 13, date: '2026-02-01', amount:  85000, category: 'Salary',        type: 'income',  description: 'Monthly Salary – TechCorp' },
  { id: 14, date: '2026-02-03', amount: -25000, category: 'Rent',          type: 'expense', description: 'House Rent – February' },
  { id: 15, date: '2026-02-06', amount:  -4100, category: 'Food',          type: 'expense', description: 'Grocery – Zepto + BigBasket' },
  { id: 16, date: '2026-02-08', amount:  -2400, category: 'Transport',     type: 'expense', description: 'Cab rides – February' },
  { id: 17, date: '2026-02-10', amount:  -5500, category: 'Utilities',     type: 'expense', description: 'Bills – February' },
  { id: 18, date: '2026-02-12', amount:  20000, category: 'Freelance',     type: 'income',  description: 'Web project – Client B' },
  { id: 19, date: '2026-02-14', amount:  -6800, category: 'Shopping',      type: 'expense', description: "Valentine's dining & gifts" },
  { id: 20, date: '2026-02-18', amount:  -2000, category: 'Health',        type: 'expense', description: 'Gym membership' },
  { id: 21, date: '2026-02-20', amount:  -2800, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
  { id: 22, date: '2026-02-22', amount:  -3100, category: 'Food',          type: 'expense', description: 'Swiggy + restaurants' },
  { id: 23, date: '2026-02-25', amount:  -1400, category: 'Transport',     type: 'expense', description: 'Metro + auto' },
  { id: 24, date: '2026-02-27', amount:  -3500, category: 'Shopping',      type: 'expense', description: 'Myntra – clothes' },
  { id: 25, date: '2026-03-01', amount:  85000, category: 'Salary',        type: 'income',  description: 'Monthly Salary – TechCorp' },
  { id: 26, date: '2026-03-03', amount: -25000, category: 'Rent',          type: 'expense', description: 'House Rent – March' },
  { id: 27, date: '2026-03-05', amount:  -3800, category: 'Food',          type: 'expense', description: 'Grocery – BigBasket' },
  { id: 28, date: '2026-03-07', amount:  25000, category: 'Freelance',     type: 'income',  description: 'Mobile app UI – Client C' },
  { id: 29, date: '2026-03-09', amount:  -2100, category: 'Transport',     type: 'expense', description: 'Ola + Rapido' },
  { id: 30, date: '2026-03-11', amount:  -5500, category: 'Utilities',     type: 'expense', description: 'Bills – March' },
  { id: 31, date: '2026-03-14', amount:  -7200, category: 'Shopping',      type: 'expense', description: 'Flipkart Big Sale' },
  { id: 32, date: '2026-03-16', amount:  -1800, category: 'Health',        type: 'expense', description: 'Doctor consultation' },
  { id: 33, date: '2026-03-19', amount:  -2900, category: 'Food',          type: 'expense', description: 'Dining out – weekend' },
  { id: 34, date: '2026-03-21', amount:  -3600, category: 'Entertainment', type: 'expense', description: 'Weekend trip + OTT' },
  { id: 35, date: '2026-03-25', amount:  -1600, category: 'Transport',     type: 'expense', description: 'Weekly commute' },
  { id: 36, date: '2026-03-28', amount:  -2400, category: 'Food',          type: 'expense', description: 'Swiggy Instamart' },
];

export const CAT_COLORS: Record<string, string> = {
  Salary:        '#00e676',
  Freelance:     '#69f0ae',
  Food:          '#ff6b6b',
  Rent:          '#4ecdc4',
  Transport:     '#45b7d1',
  Entertainment: '#f7dc6f',
  Shopping:      '#bb8fce',
  Utilities:     '#82e0aa',
  Health:        '#f0b27a',
};

export const INCOME_CATS  = ['Salary', 'Freelance'] as const;
export const EXPENSE_CATS = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Health', 'Rent'] as const;
export const ALL_CATS     = [...INCOME_CATS, ...EXPENSE_CATS] as const;
