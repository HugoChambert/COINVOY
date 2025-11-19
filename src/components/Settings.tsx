import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../contexts/LanguageContext'
import './Settings.css'

interface SettingsProps {
  userId: string
}

export default function Settings({ userId }: SettingsProps) {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [userId])

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      setEmail(user.email || '')

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (profile) {
        setProfile(profile)
        setFullName(profile.full_name || '')
      }
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    const { error } = await supabase
      .from('user_profiles')
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully' })
      setIsEditing(false)
      loadProfile()
    }

    setIsSaving(false)
  }

  const handleChangePassword = async () => {
    setMessage(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setMessage({ type: 'error', text: 'Failed to send password reset email' })
    } else {
      setMessage({ type: 'success', text: 'Password reset email sent to your inbox' })
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setMessage(null)

    const { error: deleteError } = await supabase.rpc('delete_user')

    if (deleteError) {
      setMessage({ type: 'error', text: 'Failed to delete account. Please contact support.' })
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    } else {
      await supabase.auth.signOut()
      window.location.href = '/'
    }
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>{t('dashboard.settings')}</h1>
      </div>

      <div className="settings-sections">
        <div className="settings-section glass-card">
          <div className="section-header">
            <h2>Profile Information</h2>
            {!isEditing ? (
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false)
                    setFullName(profile?.full_name || '')
                  }}
                >
                  Cancel
                </button>
                <button
                  className="save-btn"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          {message && (
            <div className={`settings-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="settings-form">
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="disabled-input"
              />
              <span className="field-help">Email cannot be changed</span>
            </div>

            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>
          </div>
        </div>

        <div className="settings-section glass-card">
          <div className="section-header">
            <h2>Security</h2>
          </div>

          <div className="settings-form">
            <div className="form-field">
              <label>Password</label>
              <div className="password-field">
                <input
                  type="password"
                  value="••••••••"
                  disabled
                  className="disabled-input"
                />
                <button
                  className="change-password-btn"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
              <span className="field-help">We'll send you an email with a reset link</span>
            </div>
          </div>
        </div>

        <div className="settings-section glass-card">
          <div className="section-header">
            <h2>Account</h2>
          </div>

          <div className="settings-form">
            <div className="form-field">
              <label>User ID</label>
              <input
                type="text"
                value={userId}
                disabled
                className="disabled-input"
              />
            </div>

            <div className="form-field">
              <label>Member Since</label>
              <input
                type="text"
                value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                disabled
                className="disabled-input"
              />
            </div>
          </div>
        </div>

        <div className="settings-section danger-section glass-card">
          <div className="section-header">
            <h2>Danger Zone</h2>
          </div>

          <div className="danger-actions">
            <div className="danger-action">
              <div>
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all associated data</p>
              </div>
              {!showDeleteConfirm ? (
                <button
                  className="danger-btn"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete Account
                </button>
              ) : (
                <div className="delete-confirm">
                  <p className="confirm-text">Are you sure? This cannot be undone.</p>
                  <div className="confirm-actions">
                    <button
                      className="cancel-delete-btn"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      className="confirm-delete-btn"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
