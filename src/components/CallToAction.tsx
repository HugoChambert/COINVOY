import { useRef, useState } from 'react'
import './CallToAction.css'

interface CallToActionProps {
  onNavigateToAuth: () => void
}

function CallToAction({ onNavigateToAuth }: CallToActionProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setBtnPosition({ x, y })
  }

  return (
    <section id="contact" className="cta">
      <div className="cta-container glass-card">
        <h2 className="cta-title">Ready to Start Transferring?</h2>
        <p className="cta-description">
          Join thousands of users who trust CoinVoy for their international money transfers.
          Get started today and experience the future of cross-border payments.
        </p>
        <button
          ref={btnRef}
          className="cta-button"
          onClick={onNavigateToAuth}
          onMouseMove={handleMouseMove}
          style={{
            '--x': `${btnPosition.x}px`,
            '--y': `${btnPosition.y}px`,
          } as React.CSSProperties}
        >
          Get Started Now
        </button>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">CoinVoy</div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#support">Support</a>
          </div>
          <p className="footer-copyright">
            © 2025 CoinVoy. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  )
}

export default CallToAction
