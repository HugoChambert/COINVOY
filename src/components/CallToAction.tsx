import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './CallToAction.css'

interface CallToActionProps {
  onNavigateToAuth: () => void
}

function CallToAction({ onNavigateToAuth }: CallToActionProps) {
  const { t } = useLanguage()
  const btnRef = useRef<HTMLButtonElement>(null)
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setBtnPosition({ x, y })
  }

  return (
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
            <a href="#privacy">{t('footer.privacy')}</a>
            <a href="#terms">{t('footer.terms')}</a>
            <a href="#support">{t('footer.support')}</a>
          </div>
          <p className="footer-copyright">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </section>
  )
}

export default CallToAction
