import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ExchangeRates from './ExchangeRates';
import WalletConnect from './WalletConnect';
import BankConnect from './BankConnect';
import Transfer from './Transfer';
import './Dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.from('profiles').insert({
          id: user.id,
          email: user.email || '',
          full_name: ''
        });
        loadUser();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <h1>Coinvoy</h1>
        </div>
        <div className="dashboard-user">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">Sign Out</button>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <nav className="dashboard-nav">
            <button className="nav-item active">Dashboard</button>
            <button className="nav-item">Transactions</button>
            <button className="nav-item">Settings</button>
          </nav>
        </div>

        <main className="dashboard-main">
          <div className="dashboard-grid">
            <div className="dashboard-section rates-section">
              <h2>Live Exchange Rates</h2>
              <ExchangeRates />
            </div>

            <div className="dashboard-section transfer-section">
              <h2>Send Money</h2>
              <Transfer />
            </div>

            <div className="dashboard-section accounts-section">
              <h2>Connected Accounts</h2>
              <div className="accounts-grid">
                <WalletConnect userId={user?.id} />
                <BankConnect userId={user?.id} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
