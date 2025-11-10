import { useEffect, useRef } from 'react'
import './Features.css'

interface FeaturesProps {
  mousePosition: { x: number; y: number }
}

function Features({ mousePosition }: FeaturesProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return

      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2

      const deltaX = (mousePosition.x - cardCenterX) / 60
      const deltaY = (mousePosition.y - cardCenterY) / 60

      card.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    })
  }, [mousePosition])

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 className="section-title">Why Choose CoinVoy</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="feature-card glass-card"
            >
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
