import { useState } from 'react'
import './Auth.css'

function Auth() {
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
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    setIsSubmitting(true)

    try {
      const endpoint = isSignUp ? '/auth/v1/signup' : '/auth/v1/token?grant_type=password'
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: isSignUp ? 'Account created successfully!' : 'Signed in successfully!'
        })
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else {
        setMessage({
          type: 'error',
          text: data.error_description || data.msg || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container glass-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="auth-description">
            {isSignUp
              ? 'Sign up to start transferring money globally'
              : 'Sign in to continue your transfers'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
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
            {isSubmitting ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
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
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <a href="/" className="back-home">← Back to Home</a>
      </div>
    </div>
  )
}

export default Auth
