import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './WalletConnect.css';

interface Wallet {
  id: string;
  wallet_address: string;
  wallet_type: string;
  is_verified: boolean;
}

interface WalletConnectProps {
  userId: string;
}

export default function WalletConnect({ userId }: WalletConnectProps) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('MetaMask');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadWallets();
    }
  }, [userId]);

  const loadWallets = async () => {
    const { data } = await supabase
      .from('crypto_wallets')
      .select('*')
      .eq('user_id', userId);

    if (data) {
      setWallets(data);
    }
  };

  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('crypto_wallets').insert({
      user_id: userId,
      wallet_address: walletAddress,
      wallet_type: walletType,
      is_verified: false
    });

    if (!error) {
      setWalletAddress('');
      setShowAddWallet(false);
      loadWallets();
    }

    setLoading(false);
  };

  const handleRemoveWallet = async (walletId: string) => {
    await supabase.from('crypto_wallets').delete().eq('id', walletId);
    loadWallets();
  };

  return (
    <div className="wallet-connect">
      <div className="wallet-header">
        <h3>Crypto Wallets</h3>
        <button
          onClick={() => setShowAddWallet(!showAddWallet)}
          className="add-wallet-btn"
        >
          {showAddWallet ? 'Cancel' : '+ Add Wallet'}
        </button>
      </div>

      {showAddWallet && (
        <form onSubmit={handleAddWallet} className="add-wallet-form">
          <div className="form-group">
            <label>Wallet Type</label>
            <select
              value={walletType}
              onChange={(e) => setWalletType(e.target.value)}
              className="form-select"
            >
              <option value="MetaMask">MetaMask</option>
              <option value="Coinbase">Coinbase Wallet</option>
              <option value="Trust Wallet">Trust Wallet</option>
              <option value="Ledger">Ledger</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="form-input"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding...' : 'Connect Wallet'}
          </button>
        </form>
      )}

      <div className="wallets-list">
        {wallets.length === 0 ? (
          <div className="empty-state">
            <p>No wallets connected</p>
          </div>
        ) : (
          wallets.map((wallet) => (
            <div key={wallet.id} className="wallet-item">
              <div className="wallet-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.9 6 10 6.9 10 8V16C10 17.1 10.9 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="wallet-details">
                <span className="wallet-type">{wallet.wallet_type}</span>
                <span className="wallet-address">
                  {wallet.wallet_address.slice(0, 6)}...{wallet.wallet_address.slice(-4)}
                </span>
              </div>
              <button
                onClick={() => handleRemoveWallet(wallet.id)}
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
