import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ExchangeRates from './ExchangeRates';
import WalletConnect from './WalletConnect';
import BankConnect from './BankConnect';
import Transfer from './Transfer';
import Transactions from './Transactions';
import Settings from './Settings';
import { useLanguage } from '../contexts/LanguageContext';
import './Dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const { t, language, setLanguage } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'transactions' | 'settings'>('dashboard');

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'th' as const, name: 'ไทย', flag: '🇹🇭' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.from('user_profiles').insert({
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
          <div
            className="dashboard-lang-dropdown"
            onMouseEnter={() => setShowLangDropdown(true)}
            onMouseLeave={() => setShowLangDropdown(false)}
          >
            <button className="lang-btn">
              <span className="lang-flag">{currentLanguage.flag}</span>
              <span>{currentLanguage.code.toUpperCase()}</span>
            </button>
            {showLangDropdown && (
              <div className="lang-dropdown-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="lang-dropdown-item"
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="logout-btn">{t('nav.signOut')}</button>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <nav className="dashboard-nav">
            <button
              className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              {t('dashboard.title')}
            </button>
            <button
              className={`nav-item ${currentView === 'transactions' ? 'active' : ''}`}
              onClick={() => setCurrentView('transactions')}
            >
              {t('dashboard.transactions')}
            </button>
            <button
              className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
              onClick={() => setCurrentView('settings')}
            >
              {t('dashboard.settings')}
            </button>
          </nav>
        </div>

        <main className="dashboard-main">
          {currentView === 'dashboard' && (
            <div className="dashboard-grid">
              <div className="dashboard-section rates-section">
                <h2>{t('dashboard.liveRates')}</h2>
                <ExchangeRates />
              </div>

              <div className="dashboard-section accounts-section">
                <h2>{t('dashboard.connectedAccounts')}</h2>
                <div className="accounts-grid">
                  <WalletConnect userId={user?.id} />
                  <BankConnect userId={user?.id} />
                </div>
              </div>

              <div className="dashboard-section transfer-section">
                <h2>{t('dashboard.sendMoney')}</h2>
                <Transfer />
              </div>
            </div>
          )}

          {currentView === 'transactions' && user?.id && (
            <Transactions userId={user.id} />
          )}

          {currentView === 'settings' && user?.id && (
            <Settings userId={user.id} />
          )}
        </main>
      </div>
    </div>
  );
}
