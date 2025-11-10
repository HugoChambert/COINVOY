import { useEffect, useRef } from 'react'
import './CallToAction.css'

interface CallToActionProps {
  mousePosition: { x: number; y: number }
}

function CallToAction({ mousePosition }: CallToActionProps) {
  const ctaContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ctaContainerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (mousePosition.x - centerX) / 100
    const deltaY = (mousePosition.y - centerY) / 100

    container.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }, [mousePosition])

  return (
    <section id="contact" className="cta">
      <div ref={ctaContainerRef} className="cta-container glass-card">
        <h2 className="cta-title">Ready to Start Transferring?</h2>
        <p className="cta-description">
          Join thousands of users who trust CoinVoy for their international money transfers.
          Get started today and experience the future of cross-border payments.
        </p>
        <button className="cta-button">Get Started Now</button>
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
