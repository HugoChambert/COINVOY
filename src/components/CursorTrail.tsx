import { useEffect, useRef } from 'react'
import './CursorTrail.css'

interface Point {
  x: number
  y: number
  alpha: number
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
    const maxPoints = 50

    const addPoint = (x: number, y: number) => {
      points.push({ x, y, alpha: 1 })

      if (points.length > maxPoints) {
        points.shift()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < points.length; i++) {
        points[i].alpha -= 0.015
      }

      for (let i = points.length - 1; i >= 0; i--) {
        if (points[i].alpha <= 0) {
          points.splice(i, 1)
        }
      }

      if (points.length < 2) {
        requestAnimationFrame(animate)
        return
      }

      for (let i = 0; i < points.length - 1; i++) {
        const point = points[i]
        const nextPoint = points[i + 1]

        const progress = i / (points.length - 1)
        const lineWidth = 12 * (1 - progress) * point.alpha

        ctx.save()
        ctx.globalCompositeOperation = 'screen'

        ctx.shadowBlur = 30
        ctx.shadowColor = 'rgba(30, 215, 96, 1)'

        ctx.strokeStyle = `rgba(30, 215, 96, ${point.alpha * 0.9})`
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(nextPoint.x, nextPoint.y)
        ctx.stroke()

        ctx.shadowBlur = 50
        ctx.shadowColor = 'rgba(30, 215, 96, 0.8)'
        ctx.strokeStyle = `rgba(30, 215, 96, ${point.alpha * 0.5})`
        ctx.lineWidth = lineWidth * 2
        ctx.stroke()

        ctx.shadowBlur = 80
        ctx.shadowColor = 'rgba(30, 215, 96, 0.4)'
        ctx.strokeStyle = `rgba(30, 215, 96, ${point.alpha * 0.2})`
        ctx.lineWidth = lineWidth * 3
        ctx.stroke()

        ctx.restore()
      }

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      addPoint(e.clientX, e.clientY)
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
