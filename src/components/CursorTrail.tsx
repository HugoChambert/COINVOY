import { useEffect, useRef } from 'react'
import './CursorTrail.css'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const points: Point[] = []
    const maxPoints = 30
    const mouse = { x: 0, y: 0 }

    const addPoint = (x: number, y: number) => {
      if (points.length > 0) {
        const lastPoint = points[points.length - 1]
        const dx = x - lastPoint.x
        const dy = y - lastPoint.y

        points.push({
          x,
          y,
          vx: dx * 0.3,
          vy: dy * 0.3,
          life: 1
        })
      } else {
        points.push({
          x,
          y,
          vx: 0,
          vy: 0,
          life: 1
        })
      }

      if (points.length > maxPoints) {
        points.shift()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        point.life -= 0.02

        if (i > 0) {
          const prevPoint = points[i - 1]
          const dx = prevPoint.x - point.x
          const dy = prevPoint.y - point.y

          point.vx += dx * 0.15
          point.vy += dy * 0.15

          point.vx *= 0.85
          point.vy *= 0.85

          point.x += point.vx
          point.y += point.vy
        }
      }

      points.forEach((point, index) => {
        if (point.life <= 0) return

        const nextPoint = points[index + 1]
        if (!nextPoint) return

        const progress = index / points.length
        const size = 20 * (1 - progress) * point.life

        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size
        )

        const alpha = point.life * (1 - progress)
        gradient.addColorStop(0, `rgba(30, 215, 96, ${alpha * 0.8})`)
        gradient.addColorStop(0.5, `rgba(30, 215, 96, ${alpha * 0.4})`)
        gradient.addColorStop(1, `rgba(30, 215, 96, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(30, 215, 96, ${alpha * 0.6})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(nextPoint.x, nextPoint.y)
        ctx.stroke()
      })

      points.forEach((point, index) => {
        if (point.life <= 0) return

        const progress = index / points.length
        const glowSize = 30 * (1 - progress) * point.life

        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(30, 215, 96, 0.8)'

        const glowGradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, glowSize
        )

        const alpha = point.life * (1 - progress) * 0.3
        glowGradient.addColorStop(0, `rgba(30, 215, 96, ${alpha})`)
        glowGradient.addColorStop(1, `rgba(30, 215, 96, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0
      })

      for (let i = points.length - 1; i >= 0; i--) {
        if (points[i].life <= 0) {
          points.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      addPoint(mouse.x, mouse.y)
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

  return <canvas ref={canvasRef} className="cursor-trail" />
}
