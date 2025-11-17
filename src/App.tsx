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
    if (!canvas) {
      console.error('Canvas ref not found')
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Canvas context not found')
      return
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    console.log('Canvas initialized:', canvas.width, 'x', canvas.height)

    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    ctx.fillRect(50, 50, 100, 100)
    console.log('Drew test rectangle')

    const particles: Particle[] = []
    const particleCount = 100
    const mouse = { x: 0, y: 0 }
    const connectionDistance = 150

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number

      constructor() {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = (200 - distance) / 200
          this.vx += dx * force * 0.001
          this.vy += dy * force * 0.001
        }

        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1

        this.vx *= 0.99
        this.vy *= 0.99
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.update()
        particle.draw()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x
          const dy = particle.y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              0.5 * (1 - distance / connectionDistance)
            })`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
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
