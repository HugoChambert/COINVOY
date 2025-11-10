import { useEffect, useRef } from 'react'
import './Countries.css'

interface CountriesProps {
  mousePosition: { x: number; y: number }
}

function Countries({ mousePosition }: CountriesProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return

      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2

      const deltaX = (mousePosition.x - cardCenterX) / 70
      const deltaY = (mousePosition.y - cardCenterY) / 70

      card.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    })
  }, [mousePosition])

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
              ref={(el) => (cardsRef.current[index] = el)}
              className="country-card glass-card"
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
