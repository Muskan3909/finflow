import { useState, useMemo } from 'react';
import type { Transaction, SortField, SortDir } from '@/types';
import { useTransactions, useRole, useDispatch } from '@/context/AppContext';
import { AddEditModal } from '@/components/modals/AddEditModal';
import { CAT_COLORS, ALL_CATS } from '@/data/seed';
import { fmtFull, fmtDate, exportCSV, exportJSON } from '@/utils/helpers';

export function TransactionsView() {
  const txs      = useTransactions();
  const role     = useRole();
  const dispatch = useDispatch();

  const [search,     setSearch]     = useState('');
  const [filterCat,  setFilterCat]  = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortField,  setSortField]  = useState<SortField>('date');
  const [sortDir,    setSortDir]    = useState<SortDir>('desc');
  const [modal,      setModal]      = useState<Transaction | null | 'add'>(null);

  function toggleSort(f: SortField) {
    if (sortField === f) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(f); setSortDir('desc'); }
  }

  const filtered = useMemo(() => {
    let rows = [...txs];
    if (search)           rows = rows.filter(t => t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));
    if (filterCat  !== 'All') rows = rows.filter(t => t.category === filterCat);
    if (filterType !== 'All') rows = rows.filter(t => t.type === filterType);
    rows.sort((a, b) => {
      const cmp = sortField === 'amount' ? Math.abs(a.amount) - Math.abs(b.amount) : a.date.localeCompare(b.date);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return rows;
  }, [txs, search, filterCat, filterType, sortField, sortDir]);

  function handleSave(tx: Transaction) {
    if (modal === 'add') dispatch({ type: 'ADD_TRANSACTION', payload: tx });
    else dispatch({ type: 'EDIT_TRANSACTION', payload: tx });
  }

  function handleDelete(id: number) {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  }

  const Arrow = ({ f }: { f: SortField }) => (
    <span style={{ opacity: sortField === f ? 1 : 0.25, marginLeft: 3 }}>
      {sortField === f && sortDir === 'asc' ? '↑' : '↓'}
    </span>
  );

  return (
    <div className="tab-view">
      {/* Export bar */}
      <div className="export-bar">
        <span className="export-lbl">Export:</span>
        <button className="btn btn-ghost" onClick={() => exportCSV(txs)}>⬇ CSV</button>
        <button className="btn btn-ghost" onClick={() => exportJSON(txs)}>⬇ JSON</button>
      </div>

      <div className="tx-panel">
        <div className="tx-toolbar">
          <div>
            <div className="chart-title">Transactions</div>
            <div className="chart-sub" style={{ marginBottom: 0 }}>{filtered.length} of {txs.length} records</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="tx-filters">
              <input
                className="f-input"
                placeholder="🔍 Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: 170 }}
              />
              <select className="f-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                <option>All</option>
                {ALL_CATS.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="f-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option>All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            {role === 'admin' && (
              <button className="btn btn-primary" onClick={() => setModal('add')}>+ Add</button>
            )}
          </div>
        </div>

        {/* Column headers */}
        <div className="tx-head">
          <div>Description</div>
          <div>Category</div>
          <div className="th-sort" onClick={() => toggleSort('date')}>Date <Arrow f="date" /></div>
          <div className="th-sort" style={{ textAlign: 'right' }} onClick={() => toggleSort('amount')}>Amount <Arrow f="amount" /></div>
          <div style={{ textAlign: 'center' }}>Act.</div>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-ico">🔍</div>
            <div className="empty-ttl">No transactions found</div>
            <div style={{ fontSize: 13 }}>Try adjusting your search or filters</div>
          </div>
        ) : filtered.map(tx => {
          const clr = tx.type === 'income' ? 'var(--green)' : 'var(--red)';
          return (
            <div key={tx.id} className="tx-row">
              <div className="tx-desc-wrap">
                <div className="tx-dot" style={{ background: clr }} />
                <div>
                  <div className="tx-main">{tx.description}</div>
                  <div className="tx-sub">{tx.type === 'income' ? '↑ Income' : '↓ Expense'}</div>
                </div>
              </div>
              <div>
                <span className="cat-badge" style={{
                  background: `${CAT_COLORS[tx.category] ?? '#888'}22`,
                  color: CAT_COLORS[tx.category] ?? '#888',
                }}>
                  {tx.category}
                </span>
              </div>
              <div className="tx-date">{fmtDate(tx.date)}</div>
              <div className="tx-amt" style={{ color: clr }}>
                {tx.type === 'income' ? '+' : '-'}{fmtFull(tx.amount)}
              </div>
              <div className="tx-acts">
                {role === 'admin' ? (
                  <>
                    <button className="tx-act-btn" title="Edit"   onClick={() => setModal(tx)}>✏️</button>
                    <button className="tx-act-btn del" title="Delete" onClick={() => handleDelete(tx.id)}>🗑️</button>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-lo)', fontSize: 11 }}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal && (
        <AddEditModal
          existing={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
