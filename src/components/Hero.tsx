import { useEffect, useRef } from 'react'
import './Hero.css'

interface HeroProps {
  mousePosition: { x: number; y: number }
}

function Hero({ mousePosition }: HeroProps) {
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heroContent = heroContentRef.current
    if (!heroContent) return

    const rect = heroContent.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (mousePosition.x - centerX) / 80
    const deltaY = (mousePosition.y - centerY) / 80

    heroContent.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }, [mousePosition])

  return (
    <section className="hero">
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">CoinVoy</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#countries">Countries</a>
            <a href="#contact">Contact</a>
            <button className="nav-button glass-card">Get Started</button>
          </div>
        </div>
      </nav>

      <div ref={heroContentRef} className="hero-content">
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
          <button className="primary-button">Start Transfer</button>
          <button className="secondary-button glass-card">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default Hero
