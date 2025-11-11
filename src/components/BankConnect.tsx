import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './BankConnect.css';

interface BankAccount {
  id: string;
  bank_name: string;
  account_number_last4: string;
  account_type: string;
  is_verified: boolean;
}

interface BankConnectProps {
  userId: string;
}

export default function BankConnect({ userId }: BankConnectProps) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadAccounts();
    }
  }, [userId]);

  const loadAccounts = async () => {
    const { data } = await supabase
      .from('bank_accounts')
      .select('*')
      .eq('user_id', userId);

    if (data) {
      setAccounts(data);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const last4 = accountNumber.slice(-4);

    const { error } = await supabase.from('bank_accounts').insert({
      user_id: userId,
      bank_name: bankName,
      account_number_last4: last4,
      account_type: accountType,
      is_verified: false
    });

    if (!error) {
      setBankName('');
      setAccountNumber('');
      setShowAddAccount(false);
      loadAccounts();
    }

    setLoading(false);
  };

  const handleRemoveAccount = async (accountId: string) => {
    await supabase.from('bank_accounts').delete().eq('id', accountId);
    loadAccounts();
  };

  return (
    <div className="bank-connect">
      <div className="bank-header">
        <h3>Bank Accounts</h3>
        <button
          onClick={() => setShowAddAccount(!showAddAccount)}
          className="add-bank-btn"
        >
          {showAddAccount ? 'Cancel' : '+ Add Bank'}
        </button>
      </div>

      {showAddAccount && (
        <form onSubmit={handleAddAccount} className="add-bank-form">
          <div className="form-group">
            <label>Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g., Chase, Bank of America"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="form-select"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>

          <div className="form-group">
            <label>Account Number</label>
            <input
              type="password"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              className="form-input"
              required
              minLength={8}
            />
            <span className="form-hint">Only last 4 digits will be stored</span>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding...' : 'Connect Bank Account'}
          </button>
        </form>
      )}

      <div className="accounts-list">
        {accounts.length === 0 ? (
          <div className="empty-state">
            <p>No bank accounts connected</p>
          </div>
        ) : (
          accounts.map((account) => (
            <div key={account.id} className="account-item">
              <div className="account-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V10H22V7L12 2ZM4 12V17H6V12H4ZM9 12V17H11V12H9ZM13 12V17H15V12H13ZM18 12V17H20V12H18ZM2 19V21H22V19H2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="account-details">
                <span className="account-bank">{account.bank_name}</span>
                <span className="account-info">
                  {account.account_type} •••• {account.account_number_last4}
                </span>
              </div>
              <button
                onClick={() => handleRemoveAccount(account.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
