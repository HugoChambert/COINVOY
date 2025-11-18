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
          <svg viewBox="0 0 2000 1001" className="world-map">
            <path
              className="world-base"
              d="M 1 1 L 1999 1 L 1999 1000 L 1 1000 Z M 250 250 Q 300 200 350 250 T 450 250 L 500 300 L 450 350 L 350 350 Z M 100 350 L 200 300 L 250 350 L 250 450 L 200 500 L 100 450 Z M 50 200 Q 100 150 150 200 L 200 250 L 150 300 L 100 300 L 50 250 Z M 600 200 L 700 150 L 800 200 L 850 300 L 800 400 L 700 450 L 600 400 L 550 300 Z M 900 250 L 1000 200 L 1100 250 L 1150 350 L 1100 450 L 1000 500 L 900 450 L 850 350 Z M 1200 300 L 1300 250 L 1400 300 L 1450 400 L 1400 500 L 1300 550 L 1200 500 L 1150 400 Z M 1500 350 L 1600 300 L 1700 350 L 1750 450 L 1700 550 L 1600 600 L 1500 550 L 1450 450 Z M 200 550 L 300 500 L 400 550 L 450 650 L 400 750 L 300 800 L 200 750 L 150 650 Z M 500 600 L 600 550 L 700 600 L 750 700 L 700 800 L 600 850 L 500 800 L 450 700 Z M 800 650 L 900 600 L 1000 650 L 1050 750 L 1000 850 L 900 900 L 800 850 L 750 750 Z"
            />
            <path
              className="country-path"
              d="M 465 215 L 475 212 L 485 215 L 495 220 L 500 230 L 498 240 L 492 248 L 485 252 L 475 255 L 465 252 L 458 245 L 455 235 Z"
              onMouseEnter={() => setHoveredCountry('france')}
              onMouseLeave={() => setHoveredCountry(null)}
              data-country="france"
            />
            <path
              className="country-path"
              d="M 150 280 L 180 270 L 210 275 L 240 285 L 270 300 L 290 320 L 300 340 L 295 360 L 280 375 L 260 385 L 235 390 L 210 388 L 185 380 L 165 365 L 150 345 L 145 325 L 148 305 Z M 200 250 L 220 245 L 235 248 L 240 255 L 235 262 L 220 265 L 205 262 Z M 165 305 L 180 300 L 195 305 L 198 315 L 190 322 L 175 320 Z"
              onMouseEnter={() => setHoveredCountry('usa')}
              onMouseLeave={() => setHoveredCountry(null)}
              data-country="usa"
            />
            <path
              className="country-path"
              d="M 1270 330 L 1285 325 L 1300 328 L 1312 335 L 1320 345 L 1322 355 L 1318 365 L 1310 372 L 1298 375 L 1285 373 L 1272 368 L 1265 358 L 1263 345 Z"
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
