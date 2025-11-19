import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermsOfService'
import './CallToAction.css'

interface CallToActionProps {
  onNavigateToAuth: () => void
}

function CallToAction({ onNavigateToAuth }: CallToActionProps) {
  const { t } = useLanguage()
  const btnRef = useRef<HTMLButtonElement>(null)
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 })
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setBtnPosition({ x, y })
  }

  return (
    <>
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      <section id="contact" className="cta">
        <div className="cta-container glass-card">
          <h2 className="cta-title">{t('cta.title')}</h2>
          <p className="cta-description">
            {t('cta.description')}
          </p>
          <button
            ref={btnRef}
            className="cta-button"
            onClick={onNavigateToAuth}
            onMouseMove={handleMouseMove}
            style={{
              '--x': `${btnPosition.x}px`,
              '--y': `${btnPosition.y}px`,
            } as React.CSSProperties}
          >
            {t('cta.button')}
          </button>
        </div>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">CoinVoy</div>
            <div className="footer-links">
              <button onClick={() => setShowPrivacy(true)} className="footer-link-button">{t('footer.privacy')}</button>
              <button onClick={() => setShowTerms(true)} className="footer-link-button">{t('footer.terms')}</button>
              <a href="#support">{t('footer.support')}</a>
            </div>
            <p className="footer-copyright">
              {t('footer.copyright')}
            </p>
          </div>
        </footer>
      </section>
    </>
  )
}

export default CallToAction
