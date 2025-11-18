import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './Countries.css'

function Countries() {
  const { t } = useLanguage()
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const countries = [
    {
      id: 'france',
      name: 'France',
      flag: '🇫🇷',
      currency: 'EUR',
      description: t('countries.france.description'),
    },
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      currency: 'USD',
      description: t('countries.usa.description'),
    },
    {
      id: 'thailand',
      name: 'Thailand',
      flag: '🇹🇭',
      currency: 'THB',
      description: t('countries.thailand.description'),
    },
  ]

  const currentCountry = countries.find(c => c.id === hoveredCountry)

  return (
    <section id="countries" className="countries">
      <div className="countries-container">
        <h2 className="section-title">{t('countries.title')}</h2>
        <p className="countries-subtitle">
          {t('countries.subtitle')}
        </p>
        <div className="world-map-container glass-card">
          <svg viewBox="0 0 1200 600" className="world-map">
            <path
              className="country-path"
              d="M 180 200 L 200 180 L 220 190 L 240 200 L 250 220 L 240 240 L 220 250 L 200 240 L 180 220 Z"
              onMouseEnter={() => setHoveredCountry('france')}
              onMouseLeave={() => setHoveredCountry(null)}
              data-country="france"
            />
            <path
              className="country-path"
              d="M 100 250 L 180 220 L 200 230 L 220 250 L 230 280 L 200 320 L 160 330 L 120 310 L 90 280 Z"
              onMouseEnter={() => setHoveredCountry('usa')}
              onMouseLeave={() => setHoveredCountry(null)}
              data-country="usa"
            />
            <path
              className="country-path"
              d="M 800 340 L 830 330 L 860 340 L 880 360 L 870 390 L 850 400 L 820 390 L 800 370 Z"
              onMouseEnter={() => setHoveredCountry('thailand')}
              onMouseLeave={() => setHoveredCountry(null)}
              data-country="thailand"
            />
          </svg>

          <div className={`country-info ${currentCountry ? 'visible' : ''}`}>
            {currentCountry && (
              <>
                <div className="country-flag">{currentCountry.flag}</div>
                <h3 className="country-name">{currentCountry.name}</h3>
                <div className="country-currency">{currentCountry.currency}</div>
                <p className="country-description">{currentCountry.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Countries
