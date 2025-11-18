import { useRef, useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import { useLanguage } from '../contexts/LanguageContext'
import './Hero.css'

interface HeroProps {
  onNavigateToAuth: () => void
}

function Hero({ onNavigateToAuth }: HeroProps) {
  const { t, language, setLanguage } = useLanguage()
  const [showContactForm, setShowContactForm] = useState(false)
  const primaryBtnRef = useRef<HTMLButtonElement>(null)
  const getStartedBtnRef = useRef<HTMLButtonElement>(null)
  const [primaryBtnPosition, setPrimaryBtnPosition] = useState({ x: 0, y: 0 })
  const [getStartedBtnPosition, setGetStartedBtnPosition] = useState({ x: 0, y: 0 })
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const countries = [
    { name: 'France', flag: '🇫🇷' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Thailand', flag: '🇹🇭' },
  ]

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'th' as const, name: 'ไทย', flag: '🇹🇭' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePrimaryMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!primaryBtnRef.current) return
    const rect = primaryBtnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPrimaryBtnPosition({ x, y })
  }

  const handleGetStartedMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!getStartedBtnRef.current) return
    const rect = getStartedBtnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGetStartedBtnPosition({ x, y })
  }

  return (
    <section className="hero">
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">CoinVoy</div>
          <div className="nav-links">
            <div
              className="nav-dropdown"
              onMouseEnter={() => setOpenDropdown('features')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="nav-link-button">
                {t('nav.features')}
              </button>
              {openDropdown === 'features' && (
                <div className="dropdown-menu">
                  <div className="dropdown-empty">{t('nav.comingSoon')}</div>
                </div>
              )}
            </div>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setOpenDropdown('countries')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="nav-link-button">
                {t('nav.countries')}
              </button>
              {openDropdown === 'countries' && (
                <div className="dropdown-menu">
                  {countries.map((country, index) => (
                    <a key={index} href="#countries" className="dropdown-item">
                      <span className="dropdown-flag">{country.flag}</span>
                      {country.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setOpenDropdown('contact')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="nav-link-button">
                {t('nav.contact')}
              </button>
              {openDropdown === 'contact' && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => setShowContactForm(true)}
                  >
                    {t('nav.contactUs')}
                  </button>
                </div>
              )}
            </div>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setOpenDropdown('language')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="nav-link-button">
                <span className="dropdown-flag">{currentLanguage.flag}</span>
                {currentLanguage.code.toUpperCase()}
              </button>
              {openDropdown === 'language' && (
                <div className="dropdown-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="dropdown-item"
                      onClick={() => setLanguage(lang.code)}
                    >
                      <span className="dropdown-flag">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              ref={getStartedBtnRef}
              className="nav-button"
              onClick={onNavigateToAuth}
              onMouseMove={handleGetStartedMouseMove}
              style={{
                '--x': `${getStartedBtnPosition.x}px`,
                '--y': `${getStartedBtnPosition.y}px`,
              } as React.CSSProperties}
            >
              {t('nav.getStarted')}
            </button>
          </div>
        </div>
      </nav>

      <div className="hero-content">
        <h1 className="hero-title">
          {t('hero.title')}
          <br />
          <span className="gradient-text">{t('hero.subtitle')}</span>
        </h1>
        <p className="hero-description">
          {t('hero.description')}
        </p>
        <div className="hero-buttons">
          <button
            ref={primaryBtnRef}
            className="primary-button"
            onClick={onNavigateToAuth}
            onMouseMove={handlePrimaryMouseMove}
            style={{
              '--x': `${primaryBtnPosition.x}px`,
              '--y': `${primaryBtnPosition.y}px`,
            } as React.CSSProperties}
          >
            {t('hero.startTransfer')}
          </button>
          <button className="secondary-button glass-card">{t('hero.learnMore')}</button>
        </div>
      </div>
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </section>
  )
}

export default Hero
