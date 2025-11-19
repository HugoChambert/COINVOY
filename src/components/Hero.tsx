import { useRef, useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import { useLanguage } from '../contexts/LanguageContext'
import './Hero.css'

interface HeroProps {
  onNavigateToAuth: () => void
}

function Hero({ onNavigateToAuth }: HeroProps) {
  const { t, setLanguage } = useLanguage()
  const [showContactForm, setShowContactForm] = useState(false)
  const primaryBtnRef = useRef<HTMLButtonElement>(null)
  const getStartedBtnRef = useRef<HTMLButtonElement>(null)
  const [primaryBtnPosition, setPrimaryBtnPosition] = useState({ x: 0, y: 0 })
  const [getStartedBtnPosition, setGetStartedBtnPosition] = useState({ x: 0, y: 0 })
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'th' as const, name: 'ไทย', flag: '🇹🇭' }
  ]

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
              <button className="nav-link-button language-icon-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
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
