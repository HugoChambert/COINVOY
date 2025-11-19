import { useRef, useState } from 'react'
import './Features.css'

function Features() {

  const features = [
    {
      title: 'Instant Transfers',
      description: 'Send money globally in seconds with our lightning-fast transfer system. No more waiting days for your money to arrive.',
    },
    {
      title: 'Multi-Currency Support',
      description: 'Support for over 150 currencies worldwide. Exchange between currencies with competitive rates instantly.',
    },
    {
      title: 'Bank Integration',
      description: 'Connect your bank accounts seamlessly. Link multiple accounts and manage all your finances in one place.',
    },
    {
      title: 'Crypto Wallets',
      description: 'Store and manage your cryptocurrency safely. Support for Bitcoin, Ethereum, and other major cryptocurrencies.',
    },
    {
      title: 'Real-Time Exchange Rates',
      description: 'Get live exchange rates updated every minute. Always know the exact amount you will receive.',
    },
    {
      title: 'Secure Transactions',
      description: 'Bank-level security with end-to-end encryption. Your money and data are always protected.',
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
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-description">Everything you need to manage your money globally</p>
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
