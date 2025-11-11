import { useState } from 'react'
import './ContactForm.css'

interface ContactFormProps {
  onClose: () => void
}

function ContactForm({ onClose }: ContactFormProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, phone, notes }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Contact Us</h2>
        <p className="modal-description">Fill out the form below and we'll get back to you soon.</p>

        <form onSubmit={handleSubmit} className="contact-form">
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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              placeholder="Tell us how we can help you..."
              rows={5}
            />
          </div>

          {submitStatus === 'success' && (
            <div className="submit-message success">Thank you! We'll be in touch soon.</div>
          )}

          {submitStatus === 'error' && (
            <div className="submit-message error">Something went wrong. Please try again.</div>
          )}

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
