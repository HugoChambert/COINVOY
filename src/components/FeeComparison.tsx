import './FeeComparison.css'

interface FeeComparisonProps {
  mousePosition: { x: number; y: number }
}

function FeeComparison({}: FeeComparisonProps) {
  const competitors = [
    { name: 'Traditional Bank', fee: '$45', time: '3-5 days' },
    { name: 'Western Union', fee: '$35', time: '1-2 days' },
    { name: 'PayPal', fee: '$25', time: '1-3 days' },
  ]

  return (
    <section className="fee-comparison">
      <div className="fee-comparison-container">
        <div className="fee-header">
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="fee-subtitle">
            Compare our low fees with traditional services
          </p>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card coinvoy-card glass-card">
            <div className="card-badge">Recommended</div>
            <h3 className="provider-name">CoinVoy</h3>
            <div className="fee-amount">$2.50</div>
            <div className="fee-label">Transfer Fee</div>
            <div className="transfer-time">5-10 minutes</div>
            <ul className="features-list">
              <li>Real-time tracking</li>
              <li>24/7 support</li>
              <li>Bank-level security</li>
              <li>No hidden fees</li>
            </ul>
          </div>

          <div className="competitors-wrapper">
            {competitors.map((competitor, index) => (
              <div key={index} className="comparison-card competitor-card glass-card">
                <h3 className="provider-name">{competitor.name}</h3>
                <div className="fee-amount competitor-fee">{competitor.fee}</div>
                <div className="fee-label">Transfer Fee</div>
                <div className="transfer-time">{competitor.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeeComparison
