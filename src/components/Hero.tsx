import { useRef, useState } from 'react'
import './Hero.css'

function Hero() {
  const primaryBtnRef = useRef<HTMLButtonElement>(null)
  const getStartedBtnRef = useRef<HTMLButtonElement>(null)
  const [primaryBtnPosition, setPrimaryBtnPosition] = useState({ x: 0, y: 0 })
  const [getStartedBtnPosition, setGetStartedBtnPosition] = useState({ x: 0, y: 0 })

  const handlePrimaryMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!primaryBtnRef.current) return
    const rect = primaryBtnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPrimaryBtnPosition({ x, y })
  }

  const handleGetStartedMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!getStartedBtnRef.current) return
    const rect = getStartedBtnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGetStartedBtnPosition({ x, y })
  }

  return (
    <section className="hero">
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">CoinVoy</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#countries">Countries</a>
            <a href="#contact">Contact</a>
            <button
              ref={getStartedBtnRef}
              className="nav-button glass-card"
              onMouseMove={handleGetStartedMouseMove}
              style={{
                '--x': `${getStartedBtnPosition.x}px`,
                '--y': `${getStartedBtnPosition.y}px`,
              } as React.CSSProperties}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <div className="hero-content">
        <h1 className="hero-title">
          Transfer Money Globally
          <br />
          <span className="gradient-text">With Crypto Speed</span>
        </h1>
        <p className="hero-description">
          Send money to France, America, and Thailand instantly using cryptocurrency.
          Fast, secure, and transparent international transfers.
        </p>
        <div className="hero-buttons">
          <button
            ref={primaryBtnRef}
            className="primary-button"
            onMouseMove={handlePrimaryMouseMove}
            style={{
              '--x': `${primaryBtnPosition.x}px`,
              '--y': `${primaryBtnPosition.y}px`,
            } as React.CSSProperties}
          >
            Start Transfer
          </button>
          <button className="secondary-button glass-card">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default Hero
