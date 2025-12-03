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
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000)

      for (let i = 0; i < particleCount; i++) {
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

    const drawConnections = () => {
      const particles = particlesRef.current
      const maxDistance = 120

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
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
          }
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const particles = particlesRef.current

      particles.forEach((particle) => {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * 0.5
          particle.vy += Math.sin(angle) * force * 0.5
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
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="interactive-background" />
}
