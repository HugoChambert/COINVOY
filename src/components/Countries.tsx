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
          <svg viewBox="0 0 2000 857" className="world-map" xmlns="http://www.w3.org/2000/svg">
            <g className="world-base">
              <path d="M392.3 161.1l1.7 1.4 2.3-.2.9.5 3.4-1.5 1.6.9 1.2-.7 1.4.4.3-.9 1.9-.1 1.8-1.5.8.2 1.3-1.7 2.3-.8 1.7.3 2.9-.9 1.3.3 2.9-1 1.8.6.4 1.5.9.2-.3 1.6.8 1.5-1.4 1.8.7.6-.3 1.3.9 1.9.7.4-.4 1.5.5.9 1.5-.5 2-.9-1.5 1.3-2 1.3.9 1.3-.9 2.6 1.6 1.3-.3.6.7-.1 1.6 1.1.5-1.8.7-1 1.6-.1 1.4-1.5-.3-1.3.8-.7-.1-1.8-1.7-.7-1-.2-.5 1-1.3-.2-.9.8-1.7-1.5-.6.2-1.6-.7-.2-.1-1.4-1.6-.7-.5-1.3-1-.7-.7-1.3-1.8-.7-1.3-1.9-.6-1-.8-1.8-1.5-.3-2 .2-1.5-.5-.5-1.1-1.6.1-1.4-.6-1.4 1.1-.5.5-2.1-.6-1.7.5-.2-.9-1.4-.6-.8-1.4-1.3-.4-.4-.9z"/>
              <path d="M200.7 267.3l2.1.8 3.3-.1 2.5 1.7 2.7 1.1 3.8 3.2 1.7 2.3.6 3.1 2.8 2.6 3.5.3 2.2 1.8 1.5 2.7 3.3 1.5 2.8 3.1 3.7 2.4 4.2 1.2 2.6-.5 3.9 1.3 4.8-.8 3.5 1.5 2.4-.3 3.1 1.9 4.3-.2 2.9 2.1 1.8-.6 3.2 1.4 2.6-.9 3.8.7 2.1 2.3 3.5-.1 2.7 1.8-2.9 1.5-3.6-.2-2.1 1.7-3.8.1-2.9-1.3-4.2.5-3.3-1.1-2.8 1.4-4.1-.7-3.5.9-2.6-1.5-3.9.3-2.4-2.1-4.3.2-3.1-1.8-2.7.6-3.8-1.4-4.5.1-2.8-2.7-3.6.9-2.1-1.9-4.8-.3-3.2-2.4-1.5-3.3-2.9-1.6-3.7-3.5z"/>
              <path d="M1270.5 360.8l1.8.6 2.1-.7 1.9.9 1.4 1.8.2 2.3-1.1 2.6-.8 1.4-1.8.3-2.3-.6-1.6-1.4-.5-2.1.2-2.8.9-1.4.6-.9z"/>
              <path d="M1100.3 450.7l3.2 1.8 2.8-.5 2.1 2.3 3.6.9 2.4 2.1 1.8-.3 2.9 1.7 1.5 2.8 2.7 1.3 1.9 2.4 3.1.6 2.3 1.9 1.2 2.6-.5 3.1-1.8 2.4-2.6.8-3.2-.7-2.8 1.4-3.5-.9-2.1 1.7-3.6-.4-2.9-1.8-2.4.6-3.1-1.3-1.9 1.2-3.3-.5-2.6 1.8-3.8-.2-2.1-2.4-3.4.3-2.8-1.6-1.5 2.1-2.9-.8z"/>
              <path d="M800.4 550.2l2.6 1.4 3.1-.8 2.8 1.9 1.5 2.7 3.4.5 2.1 2.3 3.7-.1 2.4 1.8-.6 3.2 1.9 2.4 3.1.3 1.8 2.6-1.2 2.9-2.8 1.5-3.4-.7-2.6 1.9-3.8-.4-2.3 2.1-3.6-.9-2.1-2.4-3.2.6-2.7-1.8-1.9 1.3-3.1-1.5z"/>
            </g>

            <path
              className="country-path"
              d="M392.3 161.1l1.7 1.4 2.3-.2.9.5 3.4-1.5 1.6.9 1.2-.7 1.4.4.3-.9 1.9-.1 1.8-1.5.8.2 1.3-1.7 2.3-.8 1.7.3 2.9-.9 1.3.3 2.9-1 1.8.6.4 1.5.9.2-.3 1.6.8 1.5-1.4 1.8.7.6-.3 1.3.9 1.9.7.4-.4 1.5.5.9 1.5-.5 2-.9-1.5 1.3-2 1.3.9 1.3-.9 2.6 1.6 1.3-.3.6.7-.1 1.6 1.1.5-1.8.7-1 1.6-.1 1.4-1.5-.3-1.3.8-.7-.1-1.8-1.7-.7-1-.2-.5 1-1.3-.2-.9.8-1.7-1.5-.6.2-1.6-.7-.2-.1-1.4-1.6-.7-.5-1.3-1-.7-.7-1.3-1.8-.7-1.3-1.9-.6-1-.8-1.8-1.5-.3-2 .2-1.5-.5-.5-1.1-1.6.1-1.4-.6-1.4 1.1-.5.5-2.1-.6-1.7.5-.2-.9-1.4-.6-.8-1.4-1.3-.4-.4-.9z"
              onMouseEnter={() => setHoveredCountry('france')}
              onMouseLeave={() => setHoveredCountry(null)}
              data-country="france"
            />

            <path
              className="country-path"
              d="M200.7 267.3l2.1.8 3.3-.1 2.5 1.7 2.7 1.1 3.8 3.2 1.7 2.3.6 3.1 2.8 2.6 3.5.3 2.2 1.8 1.5 2.7 3.3 1.5 2.8 3.1 3.7 2.4 4.2 1.2 2.6-.5 3.9 1.3 4.8-.8 3.5 1.5 2.4-.3 3.1 1.9 4.3-.2 2.9 2.1 1.8-.6 3.2 1.4 2.6-.9 3.8.7 2.1 2.3 3.5-.1 2.7 1.8-2.9 1.5-3.6-.2-2.1 1.7-3.8.1-2.9-1.3-4.2.5-3.3-1.1-2.8 1.4-4.1-.7-3.5.9-2.6-1.5-3.9.3-2.4-2.1-4.3.2-3.1-1.8-2.7.6-3.8-1.4-4.5.1-2.8-2.7-3.6.9-2.1-1.9-4.8-.3-3.2-2.4-1.5-3.3-2.9-1.6-3.7-3.5z M150.2 230.5l1.8 1.2 2.1-.3 1.6 1.4 1.9-.6 2.3 1.1-.8 2.4 1.4 1.8-1.2 1.9-2.1-.4-1.8 1.3-2.4-.8-1.5 1.6-2.3-.5-.9-2.1-1.6.7-1.1-1.8.8-2.3-1.4-1.2z"
              onMouseEnter={() => setHoveredCountry('usa')}
              onMouseLeave={() => setHoveredCountry(null)}
              data-country="usa"
            />

            <path
              className="country-path"
              d="M1270.5 360.8l1.8.6 2.1-.7 1.9.9 1.4 1.8.2 2.3-1.1 2.6-.8 1.4-1.8.3-2.3-.6-1.6-1.4-.5-2.1.2-2.8.9-1.4.6-.9z"
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
