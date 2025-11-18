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
    const maxPoints = 40
    const minDistance = 3

    const addPoint = (x: number, y: number) => {
      if (points.length > 0) {
        const lastPoint = points[points.length - 1]
        const distance = Math.sqrt(
          Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2)
        )

        if (distance < minDistance) return
      }

      points.push({ x, y, alpha: 1 })

      if (points.length > maxPoints) {
        points.shift()
      }
    }

    const drawSmoothCurve = (points: Point[]) => {
      if (points.length < 2) return

      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      for (let layer = 0; layer < 3; layer++) {
        const blur = layer === 0 ? 25 : layer === 1 ? 40 : 60
        const widthMultiplier = layer === 0 ? 1 : layer === 1 ? 1.8 : 2.8
        const alphaMultiplier = layer === 0 ? 0.9 : layer === 1 ? 0.5 : 0.25

        ctx.shadowBlur = blur
        ctx.shadowColor = 'rgba(30, 215, 96, 1)'

        ctx.beginPath()

        for (let i = 0; i < points.length - 1; i++) {
          const point = points[i]
          const nextPoint = points[i + 1]

          const progress = i / (points.length - 1)
          const lineWidth = 10 * (1 - progress * 0.5) * point.alpha * widthMultiplier

          ctx.strokeStyle = `rgba(30, 215, 96, ${point.alpha * alphaMultiplier})`
          ctx.lineWidth = lineWidth
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          }

          if (i < points.length - 2) {
            const midX = (nextPoint.x + points[i + 1].x) / 2
            const midY = (nextPoint.y + points[i + 1].y) / 2
            ctx.quadraticCurveTo(nextPoint.x, nextPoint.y, midX, midY)
          } else {
            ctx.lineTo(nextPoint.x, nextPoint.y)
          }
        }

        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < points.length; i++) {
        points[i].alpha -= 0.012
      }

      for (let i = points.length - 1; i >= 0; i--) {
        if (points[i].alpha <= 0) {
          points.splice(i, 1)
        }
      }

      drawSmoothCurve(points)

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

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" />
}
