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

  return (
    <section id="countries" className="countries">
      <div className="countries-container">
        <h2 className="section-title">Supported Countries</h2>
        <p className="countries-subtitle">
          Send money to these countries with ease
        </p>
        <div className="countries-grid">
          {countries.map((country, index) => (
            <div key={index} className="country-card">
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
