import { useEffect, useRef } from 'react'
import './InteractiveBackground.css'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const isMobileRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      isMobileRef.current = window.innerWidth <= 768
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024

      let densityFactor = 12000
      if (isMobileRef.current) {
        densityFactor = 20000
      } else if (isTablet) {
        densityFactor = 15000
      }

      const particleCount = Math.floor((canvas.width * canvas.height) / densityFactor)
      const maxParticles = isMobileRef.current ? 50 : isTablet ? 100 : 200
      const finalCount = Math.min(particleCount, maxParticles)

      for (let i = 0; i < finalCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height

        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          hue: Math.random() * 60 + 200
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const drawConnections = () => {
      if (isMobileRef.current) return

      const particles = particlesRef.current
      const maxDistance = 120
      const maxConnections = window.innerWidth <= 1024 ? 3 : 5

      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3
            ctx.beginPath()
            ctx.strokeStyle = `hsla(${particles[i].hue}, 70%, 60%, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connections++
          }
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const particles = particlesRef.current
      const interactionDistance = isMobileRef.current ? 150 : 200
      const forceMultiplier = isMobileRef.current ? 0.3 : 0.5

      particles.forEach((particle) => {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < interactionDistance) {
          const force = (interactionDistance - distance) / interactionDistance
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * forceMultiplier
          particle.vy += Math.sin(angle) * force * forceMultiplier
        }

        const baseDx = particle.baseX - particle.x
        const baseDy = particle.baseY - particle.y
        particle.vx += baseDx * 0.01
        particle.vy += baseDy * 0.01

        particle.vx *= 0.92
        particle.vy *= 0.92

        particle.x += particle.vx
        particle.y += particle.vy

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        const dynamicSize = particle.size + Math.min(speed * 0.3, 2)

        if (!isMobileRef.current) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, dynamicSize * 2
          )
          gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${particle.opacity})`)
          gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 50%, 0)`)

          ctx.beginPath()
          ctx.fillStyle = gradient
          ctx.arc(particle.x, particle.y, dynamicSize * 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 80%, ${particle.opacity * 0.8})`
        ctx.arc(particle.x, particle.y, dynamicSize, 0, Math.PI * 2)
        ctx.fill()
      })

      drawConnections()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="interactive-background" />
}
