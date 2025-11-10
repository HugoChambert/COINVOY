import { useEffect, useRef } from 'react'
import './FeeComparison.css'

interface FeeComparisonProps {
  mousePosition: { x: number; y: number }
}

function FeeComparison({ mousePosition }: FeeComparisonProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const sectionCenterX = rect.left + rect.width / 2
    const sectionCenterY = rect.top + rect.height / 2

    const deltaX = (mousePosition.x - sectionCenterX) / 50
    const deltaY = (mousePosition.y - sectionCenterY) / 50

    section.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }, [mousePosition])

  const competitors = [
    { name: 'Traditional Bank', fee: '$45', time: '3-5 days' },
    { name: 'Western Union', fee: '$35', time: '1-2 days' },
    { name: 'PayPal', fee: '$25', time: '1-3 days' },
  ]

  return (
    <section className="fee-comparison">
      <div ref={sectionRef} className="fee-comparison-container">
        <div className="fee-header">
          <h2 className="section-title">Stop Overpaying for Transfers</h2>
          <p className="fee-subtitle">
            Save up to 90% on international transfer fees
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

        <div className="savings-highlight glass-card">
          <div className="savings-text">
            <span className="savings-amount">Save $42.50</span> on every $1,000 transfer
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeeComparison
