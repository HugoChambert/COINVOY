import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './Features.css'

function Features() {
  const { t } = useLanguage()

  const features = [
    {
      title: t('featuresNew.instantTransfers.title'),
      description: t('featuresNew.instantTransfers.description'),
    },
    {
      title: t('featuresNew.multiCurrency.title'),
      description: t('featuresNew.multiCurrency.description'),
    },
    {
      title: t('featuresNew.bankIntegration.title'),
      description: t('featuresNew.bankIntegration.description'),
    },
    {
      title: t('featuresNew.cryptoWallets.title'),
      description: t('featuresNew.cryptoWallets.description'),
    },
    {
      title: t('featuresNew.realTimeRates.title'),
      description: t('featuresNew.realTimeRates.description'),
    },
    {
      title: t('featuresNew.secureTransactions.title'),
      description: t('featuresNew.secureTransactions.description'),
    },
  ]

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mousePositions, setMousePositions] = useState<{ x: number; y: number }[]>(
    features.map(() => ({ x: 0, y: 0 }))
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePositions(prev => {
      const newPositions = [...prev]
      newPositions[index] = { x, y }
      return newPositions
    })
  }

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 className="section-title">{t('featuresNew.title')}</h2>
        <p className="section-description">{t('featuresNew.description')}</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="feature-card glass-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={{
                '--x': `${mousePositions[index].x}px`,
                '--y': `${mousePositions[index].y}px`,
              } as React.CSSProperties}
            >
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
