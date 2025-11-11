import { useRef, useState } from 'react'
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

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mousePositions, setMousePositions] = useState<{ x: number; y: number }[]>(
    features.map(() => ({ x: 0, y: 0 }))
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePositions(prev => {
      const newPositions = [...prev]
      newPositions[index] = { x, y }
      return newPositions
    })
  }

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 className="section-title">Why Choose CoinVoy</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="feature-card glass-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={{
                '--x': `${mousePositions[index].x}px`,
                '--y': `${mousePositions[index].y}px`,
              } as React.CSSProperties}
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
