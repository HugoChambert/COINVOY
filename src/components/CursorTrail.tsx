import { useEffect, useRef } from 'react'
import './CursorTrail.css'

interface Point {
  x: number
  y: number
  alpha: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
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
    const sparks: Spark[] = []
    const maxPoints = 40
    const minDistance = 3

    const addPoint = (x: number, y: number) => {
      if (points.length > 0) {
        const lastPoint = points[points.length - 1]
        const distance = Math.sqrt(
          Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2)
        )

        if (distance < minDistance) return

        if (Math.random() > 0.7) {
          for (let i = 0; i < 2; i++) {
            sparks.push({
              x,
              y,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 0.5) * 3,
              alpha: 1,
              size: Math.random() * 2 + 1
            })
          }
        }
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

      const darkOffset = 2
      ctx.shadowBlur = 15
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.beginPath()
      for (let i = 0; i < points.length - 1; i++) {
        const point = points[i]
        const nextPoint = points[i + 1]
        const progress = i / (points.length - 1)
        const lineWidth = 12 * (1 - progress * 0.5) * point.alpha

        ctx.strokeStyle = `rgba(10, 80, 35, ${point.alpha * 0.6})`
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        if (i === 0) {
          ctx.moveTo(point.x + darkOffset, point.y + darkOffset)
        }

        if (i < points.length - 2) {
          const midX = (nextPoint.x + points[i + 1].x) / 2 + darkOffset
          const midY = (nextPoint.y + points[i + 1].y) / 2 + darkOffset
          ctx.quadraticCurveTo(nextPoint.x + darkOffset, nextPoint.y + darkOffset, midX, midY)
        } else {
          ctx.lineTo(nextPoint.x + darkOffset, nextPoint.y + darkOffset)
        }
      }
      ctx.stroke()

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

    const drawSparks = () => {
      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      sparks.forEach(spark => {
        const gradient = ctx.createRadialGradient(
          spark.x, spark.y, 0,
          spark.x, spark.y, spark.size * 3
        )

        gradient.addColorStop(0, `rgba(30, 215, 96, ${spark.alpha})`)
        gradient.addColorStop(0.5, `rgba(30, 215, 96, ${spark.alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(30, 215, 96, 0)`)

        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(30, 215, 96, 1)'

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255, 255, 255, ${spark.alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        ctx.fill()
      })

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

      for (let i = 0; i < sparks.length; i++) {
        sparks[i].x += sparks[i].vx
        sparks[i].y += sparks[i].vy
        sparks[i].alpha -= 0.02
        sparks[i].vx *= 0.95
        sparks[i].vy *= 0.95
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        if (sparks[i].alpha <= 0) {
          sparks.splice(i, 1)
        }
      }

      drawSmoothCurve(points)
      drawSparks()

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
