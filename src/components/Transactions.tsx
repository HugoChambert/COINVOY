import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../contexts/LanguageContext'
import './Transactions.css'

interface Transaction {
  id: string
  type: 'send' | 'receive'
  amount: number
  currency: string
  recipient_email?: string
  recipient_wallet?: string
  status: 'pending' | 'completed' | 'failed'
  transaction_hash?: string
  created_at: string
}

interface TransactionsProps {
  userId: string
}

export default function Transactions({ userId }: TransactionsProps) {
  const { t } = useLanguage()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'send' | 'receive'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    loadTransactions()
  }, [userId])

  const loadTransactions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setTransactions(data)
    }
    setLoading(false)
  }

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === 'all' ? true : tx.type === filter
    const matchesSearch = searchTerm === '' ||
      tx.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.recipient_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.recipient_wallet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.transaction_hash?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleTransactionClick = (tx: Transaction) => {
    setSelectedTx(tx)
    setShowDetails(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#1ed760'
      case 'pending': return '#ffa500'
      case 'failed': return '#ff4444'
      default: return '#888888'
    }
  }

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h1>{t('dashboard.transactions')}</h1>
        <div className="transactions-controls">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="transaction-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'send' ? 'active' : ''}`}
              onClick={() => setFilter('send')}
            >
              Sent
            </button>
            <button
              className={`filter-btn ${filter === 'receive' ? 'active' : ''}`}
              onClick={() => setFilter('receive')}
            >
              Received
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="transactions-loading">Loading transactions...</div>
      ) : filteredTransactions.length === 0 ? (
        <div className="transactions-empty glass-card">
          <div className="empty-state-content">
            <h3>No {filter === 'all' ? '' : filter === 'send' ? 'sent' : 'received'} transactions yet</h3>
            <p>Your transaction history will appear here</p>
          </div>
        </div>
      ) : (
        <div className="transactions-list">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="transaction-item glass-card"
              onClick={() => handleTransactionClick(tx)}
            >
              <div className="transaction-icon">
                {tx.type === 'send' ? '↑' : '↓'}
              </div>
              <div className="transaction-details">
                <div className="transaction-main">
                  <span className="transaction-type">
                    {tx.type === 'send' ? 'Sent to' : 'Received from'}
                  </span>
                  <span className="transaction-recipient">
                    {tx.recipient_email ||
                     (tx.recipient_wallet ? `${tx.recipient_wallet.slice(0, 8)}...${tx.recipient_wallet.slice(-6)}` : 'Unknown')}
                  </span>
                </div>
                <div className="transaction-date">{formatDate(tx.created_at)}</div>
              </div>
              <div className="transaction-amount-wrapper">
                <div className={`transaction-amount ${tx.type}`}>
                  {tx.type === 'send' ? '-' : '+'}
                  {tx.amount.toFixed(4)} {tx.currency}
                </div>
                <div
                  className="transaction-status"
                  style={{ color: getStatusColor(tx.status) }}
                >
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDetails && selectedTx && (
        <div className="transaction-detail-modal" onClick={() => setShowDetails(false)}>
          <div className="transaction-detail-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowDetails(false)}>×</button>
            <h3>Transaction Details</h3>

            <div className="detail-section">
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{selectedTx.type === 'send' ? 'Sent' : 'Received'}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className={`detail-value amount-${selectedTx.type}`}>
                  {selectedTx.type === 'send' ? '-' : '+'}
                  {selectedTx.amount.toFixed(4)} {selectedTx.currency}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value" style={{ color: getStatusColor(selectedTx.status) }}>
                  {selectedTx.status}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(selectedTx.created_at)}</span>
              </div>

              {selectedTx.recipient_email && (
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedTx.recipient_email}</span>
                </div>
              )}

              {selectedTx.recipient_wallet && (
                <div className="detail-row">
                  <span className="detail-label">Wallet:</span>
                  <div className="copyable-value">
                    <span className="detail-value wallet-address">{selectedTx.recipient_wallet}</span>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(selectedTx.recipient_wallet!)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              {selectedTx.transaction_hash && (
                <div className="detail-row">
                  <span className="detail-label">Transaction Hash:</span>
                  <div className="copyable-value">
                    <span className="detail-value hash">{selectedTx.transaction_hash.slice(0, 16)}...</span>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(selectedTx.transaction_hash!)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
