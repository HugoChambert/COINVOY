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

  const filteredTransactions = transactions.filter(tx =>
    filter === 'all' ? true : tx.type === filter
  )

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
            <div key={tx.id} className="transaction-item glass-card">
              <div className="transaction-icon">
                {tx.type === 'send' ? '↑' : '↓'}
              </div>
              <div className="transaction-details">
                <div className="transaction-main">
                  <span className="transaction-type">
                    {tx.type === 'send' ? 'Sent to' : 'Received from'}
                  </span>
                  <span className="transaction-recipient">
                    {tx.recipient_email || tx.recipient_wallet || 'Unknown'}
                  </span>
                </div>
                <div className="transaction-date">{formatDate(tx.created_at)}</div>
              </div>
              <div className="transaction-amount-wrapper">
                <div className={`transaction-amount ${tx.type}`}>
                  {tx.type === 'send' ? '-' : '+'}
                  {tx.amount.toFixed(2)} {tx.currency}
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
    </div>
  )
}
