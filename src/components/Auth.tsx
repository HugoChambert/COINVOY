import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../contexts/LanguageContext'
import './Auth.css'

function Auth() {
  const { t } = useLanguage()
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (isSignUp && password !== confirmPassword) {
      setMessage({ type: 'error', text: t('auth.passwordsDoNotMatch') })
      return
    }

    setIsSubmitting(true)

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        })

        if (error) {
          setMessage({
            type: 'error',
            text: error.message || 'Signup failed. Please try again.'
          })
        } else if (data.user) {
          setMessage({
            type: 'success',
            text: t('auth.accountCreated')
          })
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          setMessage({
            type: 'error',
            text: error.message || 'Sign in failed. Please check your credentials.'
          })
        } else if (data.session) {
          setMessage({
            type: 'success',
            text: 'Successfully signed in!'
          })
        }
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container glass-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {isSignUp ? t('auth.createAccount') : t('auth.welcomeBack')}
          </h1>
          <p className="auth-description">
            {isSignUp
              ? t('auth.signUpDescription')
              : t('auth.signInDescription')
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('auth.emailPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t('auth.passwordPlaceholder')}
              minLength={6}
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder={t('auth.passwordPlaceholder')}
                minLength={6}
              />
            </div>
          )}

          {message && (
            <div className={`auth-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="auth-submit-button" disabled={isSubmitting}>
            {isSubmitting ? t('auth.processing') : (isSignUp ? t('auth.createAccount') : t('auth.signIn'))}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setMessage(null)
                setEmail('')
                setPassword('')
                setConfirmPassword('')
              }}
              className="toggle-button"
            >
              {isSignUp ? t('auth.signIn') : t('auth.signUp')}
            </button>
          </p>
        </div>

        <a href="/" className="back-home">{t('auth.backHome')}</a>
      </div>
    </div>
  )
}

export default Auth
