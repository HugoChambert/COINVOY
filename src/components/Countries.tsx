import { useRef, useState } from 'react'
import './Countries.css'

function Countries() {
  const countries = [
    {
      name: 'France',
      flag: '🇫🇷',
      currency: 'EUR',
      description: 'Fast transfers to all major French banks',
    },
    {
      name: 'United States',
      flag: '🇺🇸',
      currency: 'USD',
      description: 'Instant deposits across the United States',
    },
    {
      name: 'Thailand',
      flag: '🇹🇭',
      currency: 'THB',
      description: 'Quick and reliable transfers throughout Thailand',
    },
  ]

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mousePositions, setMousePositions] = useState<{ x: number; y: number }[]>(
    countries.map(() => ({ x: 0, y: 0 }))
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
    <section id="countries" className="countries">
      <div className="countries-container">
        <h2 className="section-title">Supported Countries</h2>
        <p className="countries-subtitle">
          Send money to these countries with ease
        </p>
        <div className="countries-grid">
          {countries.map((country, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="country-card glass-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={{
                '--x': `${mousePositions[index].x}px`,
                '--y': `${mousePositions[index].y}px`,
              } as React.CSSProperties}
            >
              <div className="country-flag">{country.flag}</div>
              <h3 className="country-name">{country.name}</h3>
              <div className="country-currency">{country.currency}</div>
              <p className="country-description">{country.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countries
