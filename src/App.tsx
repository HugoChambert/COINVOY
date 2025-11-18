import { useEffect, useRef, useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Features from './components/Features'
import Countries from './components/Countries'
import CallToAction from './components/CallToAction'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import { supabase } from './lib/supabase'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'dashboard'>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      setIsAuthenticated(true)
      setCurrentPage('dashboard')
    }

    setLoading(false)

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
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const dotSpacing = 40
    const dotRadius = 3
    const maxDistance = 150
    const mouse = { x: -1000, y: -1000 }

    interface Dot {
      x: number
      y: number
      baseX: number
      baseY: number
    }

    const dots: Dot[] = []

    for (let x = 0; x < canvas.width; x += dotSpacing) {
      for (let y = 0; y < canvas.height; y += dotSpacing) {
        dots.push({
          x,
          y,
          baseX: x,
          baseY: y
        })
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      dots.forEach(dot => {
        const dx = mouse.x - dot.baseX
        const dy = mouse.y - dot.baseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 15
          dot.x = dot.baseX + (dx / distance) * force
          dot.y = dot.baseY + (dy / distance) * force
        } else {
          dot.x += (dot.baseX - dot.x) * 0.1
          dot.y += (dot.baseY - dot.y) * 0.1
        }

        const distanceFromBase = Math.sqrt(
          Math.pow(dot.x - dot.baseX, 2) + Math.pow(dot.y - dot.baseY, 2)
        )
        const intensity = Math.min(distanceFromBase / 15, 1)

        if (distance < maxDistance) {
          ctx.shadowBlur = 15
          ctx.shadowColor = 'rgba(30, 215, 96, 1)'
          ctx.fillStyle = `rgba(30, 215, 96, ${0.8 + intensity * 0.2})`
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dotRadius + intensity * 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = 'rgba(30, 215, 96, 0.6)'
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      dots.length = 0
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (loading) {
    return (
      <>
        <canvas ref={canvasRef} className="background-canvas" />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ color: 'white' }}>Loading...</div>
        </div>
      </>
    )
  }

  if (currentPage === 'dashboard' && isAuthenticated) {
    return (
      <>
        <canvas ref={canvasRef} className="background-canvas" />
        <Dashboard onLogout={() => {
          setIsAuthenticated(false)
          setCurrentPage('home')
        }} />
      </>
    )
  }

  if (currentPage === 'auth') {
    return (
      <>
        <canvas ref={canvasRef} className="background-canvas" />
        <Auth />
      </>
    )
  }

  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas" />
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
