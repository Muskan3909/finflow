import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header }  from '@/components/Header';
import { DashboardView }    from '@/views/DashboardView';
import { TransactionsView } from '@/views/TransactionsView';
import { InsightsView }     from '@/views/InsightsView';
import { useActiveTab }     from '@/context/AppContext';

export function App() {
  const activeTab = useActiveTab();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Mobile backdrop */}
      <div
        className={`mob-overlay${sidebarOpen ? ' show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main">
        <Header onMenuClick={() => setSidebarOpen(o => !o)} />
        <div className="content">
          {activeTab === 'dashboard'    && <DashboardView />}
          {activeTab === 'transactions' && <TransactionsView />}
          {activeTab === 'insights'     && <InsightsView />}
        </div>
      </main>
    </div>
  );
}
