import './Features.css'

function Features() {
  const features = [
    {
      title: 'Lightning Fast',
      description: 'Complete transfers in minutes, not days. Cryptocurrency enables instant cross-border transactions.',
    },
    {
      title: 'Low Fees',
      description: 'Save on traditional banking fees. Our crypto-powered system keeps costs minimal.',
    },
    {
      title: 'Secure & Transparent',
      description: 'Track your transfer in real-time. Blockchain technology ensures security and transparency.',
    },
    {
      title: 'Simple Process',
      description: 'Easy to use interface. Send money in three simple steps without technical knowledge.',
    },
  ]

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 className="section-title">Why Choose CoinVoy</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
