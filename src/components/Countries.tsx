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

  return (
    <section id="countries" className="countries">
      <div className="countries-container">
        <h2 className="section-title">{t('countries.title')}</h2>
        <p className="countries-subtitle">
          {t('countries.subtitle')}
        </p>
        <div className="countries-grid">
          {countries.map((country) => (
            <div
              key={country.id}
              className={`country-card glass-card ${hoveredCountry === country.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredCountry(country.id)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <div className="country-card-flag">{country.flag}</div>
              <h3 className="country-card-name">{country.name}</h3>
              <div className="country-card-currency">{country.currency}</div>
              <p className="country-card-description">{country.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countries
