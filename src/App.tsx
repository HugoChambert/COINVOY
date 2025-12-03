import { useEffect, useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Features from './components/Features'
import Countries from './components/Countries'
import CallToAction from './components/CallToAction'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import MagneticCursor from './components/MagneticCursor'
import InteractiveBackground from './components/InteractiveBackground'
import { supabase } from './lib/supabase'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'dashboard'>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        setIsAuthenticated(true)
        setCurrentPage('dashboard')
      }

      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true)
        setCurrentPage('dashboard')
      } else {
        setIsAuthenticated(false)
        setCurrentPage('home')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}>
        <div style={{ color: 'white' }}>Loading...</div>
      </div>
    )
  }

  if (currentPage === 'dashboard' && isAuthenticated) {
    return (
      <Dashboard onLogout={() => {
        setIsAuthenticated(false)
        setCurrentPage('home')
      }} />
    )
  }

  if (currentPage === 'auth') {
    return <Auth />
  }

  return (
    <div className="app">
      <InteractiveBackground />
      <MagneticCursor />
      <div className="content">
        <Hero onNavigateToAuth={() => setCurrentPage('auth')} />
        <Features />
        <Countries />
        <CallToAction onNavigateToAuth={() => setCurrentPage('auth')} />
      </div>
    </div>
  )
}

export default App
