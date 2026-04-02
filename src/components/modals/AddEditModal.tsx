import { useState, useEffect } from 'react';
import type { Transaction, TransactionType, Category } from '@/types';
import { INCOME_CATS, EXPENSE_CATS } from '@/data/seed';

interface Props {
  existing: Transaction | null;
  onClose: () => void;
  onSave: (tx: Transaction) => void;
}

interface FormState {
  description: string;
  amount: string;
  date: string;
  type: TransactionType;
  category: Category;
}

const DEFAULT: FormState = {
  description: '',
  amount: '',
  date: '2026-03-31',
  type: 'expense',
  category: 'Food',
};

export function AddEditModal({ existing, onClose, onSave }: Props) {
  const [form, setForm] = useState<FormState>(DEFAULT);

  useEffect(() => {
    if (existing) {
      setForm({
        description: existing.description,
        amount: String(Math.abs(existing.amount)),
        date: existing.date,
        type: existing.type,
        category: existing.category,
      });
    } else {
      setForm(DEFAULT);
    }
  }, [existing]);

  const cats = form.type === 'income' ? INCOME_CATS : EXPENSE_CATS;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleTypeChange(t: TransactionType) {
    const defaultCat: Category = t === 'income' ? 'Salary' : 'Food';
    setForm(prev => ({ ...prev, type: t, category: defaultCat }));
  }

  function handleSave() {
    const amt = parseFloat(form.amount);
    if (!form.description.trim() || !amt) return;
    const amount = form.type === 'expense' ? -amt : amt;
    onSave({
      id: existing?.id ?? Date.now(),
      date: form.date,
      amount,
      category: form.category,
      type: form.type,
      description: form.description,
    });
    onClose();
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{existing ? 'Edit Transaction' : 'Add Transaction'}</div>

        <div className="form-grp">
          <label className="form-lbl">Description</label>
          <input
            className="form-inp"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="e.g. Grocery shopping"
          />
        </div>

        <div className="form-row2">
          <div className="form-grp">
            <label className="form-lbl">Amount (₹)</label>
            <input
              className="form-inp"
              type="number"
              min="0"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="form-grp">
            <label className="form-lbl">Date</label>
            <input
              className="form-inp"
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row2">
          <div className="form-grp">
            <label className="form-lbl">Type</label>
            <select
              className="form-sel"
              value={form.type}
              onChange={e => handleTypeChange(e.target.value as TransactionType)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-grp">
            <label className="form-lbl">Category</label>
            <select
              className="form-sel"
              value={form.category}
              onChange={e => set('category', e.target.value as Category)}
            >
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-acts">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            {existing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
