import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import './Transfer.css';

interface Wallet {
  id: string;
  wallet_address: string;
  wallet_type: string;
}

interface BankAccount {
  id: string;
  bank_name: string;
  account_number_last4: string;
  account_type: string;
}

export default function Transfer() {
  const { t } = useLanguage();
  const [transferType, setTransferType] = useState<'crypto' | 'fiat'>('crypto');
  const [fromAccount, setFromAccount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: walletsData } = await supabase
      .from('crypto_wallets')
      .select('*')
      .eq('user_id', user.id);

    const { data: banksData } = await supabase
      .from('bank_accounts')
      .select('*')
      .eq('user_id', user.id);

    if (walletsData) setWallets(walletsData);
    if (banksData) setBankAccounts(banksData);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      type: 'send',
      amount: parseFloat(amount),
      currency: currency,
      recipient_email: transferType === 'fiat' ? toAddress : null,
      recipient_wallet: transferType === 'crypto' ? toAddress : null,
      status: 'completed'
    });

    if (!error) {
      setSuccess(true);
      setAmount('');
      setToAddress('');
      setFromAccount('');

      setTimeout(() => setSuccess(false), 3000);
    }

    setLoading(false);
  };

  return (
    <div className="transfer">
      <div className="transfer-tabs">
        <button
          className={`tab ${transferType === 'crypto' ? 'active' : ''}`}
          onClick={() => setTransferType('crypto')}
        >
          {t('transfer.cryptoTransfer')}
        </button>
        <button
          className={`tab ${transferType === 'fiat' ? 'active' : ''}`}
          onClick={() => setTransferType('fiat')}
        >
          {t('transfer.bankTransfer')}
        </button>
      </div>

      <form onSubmit={handleTransfer} className="transfer-form">
        <div className="form-group">
          <label>{t('transfer.from')}</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            className="form-select"
            required
          >
            <option value="">{t('transfer.selectSource')}</option>
            {transferType === 'crypto' ? (
              wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.wallet_type} - {wallet.wallet_address.slice(0, 6)}...{wallet.wallet_address.slice(-4)}
                </option>
              ))
            ) : (
              bankAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.bank_name} - {account.account_type} •••• {account.account_number_last4}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label>{transferType === 'crypto' ? t('transfer.to') : t('transfer.toAccount')}</label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder={transferType === 'crypto' ? '0x...' : t('transfer.toPlaceholder')}
            className="form-input"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('transfer.amount')}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="form-input"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>{t('transfer.currency')}</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-select"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="THB">THB</option>
              {transferType === 'crypto' && (
                <>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="USDT">USDT</option>
                </>
              )}
            </select>
          </div>
        </div>

        {success && (
          <div className="success-message">
            {t('transfer.success')}
          </div>
        )}

        <button type="submit" disabled={loading} className="transfer-btn">
          {loading ? t('transfer.processing') : t('transfer.send')}
        </button>
      </form>

      <div className="transfer-info">
        <div className="info-item">
          <span className="info-label">{t('transfer.networkFee')}</span>
          <span className="info-value">{transferType === 'crypto' ? '~$2.50' : '$0.00'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">{t('transfer.estimatedTime')}</span>
          <span className="info-value">{transferType === 'crypto' ? '10-30 min' : '1-3 days'}</span>
        </div>
      </div>
    </div>
  );
}
