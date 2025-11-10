import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">CoinVoy</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#countries">Countries</a>
            <a href="#contact">Contact</a>
            <button className="nav-button">Get Started</button>
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
          <button className="primary-button">Start Transfer</button>
          <button className="secondary-button">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default Hero
