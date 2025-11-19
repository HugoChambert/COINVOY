import { useEffect, useRef, useState } from 'react'
import './MagneticCursor.css'

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })
  const cursorPosition = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      const isInteractive = target.closest(
        'button, a, .country-path, .feature-card, .nav-link-button, .dropdown-item, input, textarea'
      )

      setIsHovering(!!isInteractive)

      if (isInteractive && isInteractive.classList.contains('magnetic')) {
        const rect = isInteractive.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const maxDistance = 100

        if (distance < maxDistance) {
          const strength = 0.3
          const offsetX = deltaX * strength
          const offsetY = deltaY * strength
          ;(isInteractive as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`
        }
      }
    }

    const handleMouseLeave = () => {
      document.querySelectorAll('.magnetic').forEach((el) => {
        ;(el as HTMLElement).style.transform = 'translate(0, 0)'
      })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const animate = () => {
      const smoothness = 0.15

      cursorPosition.current.x = lerp(cursorPosition.current.x, mousePosition.current.x, smoothness)
      cursorPosition.current.y = lerp(cursorPosition.current.y, mousePosition.current.y, smoothness)

      velocityRef.current.x = mousePosition.current.x - cursorPosition.current.x
      velocityRef.current.y = mousePosition.current.y - cursorPosition.current.y

      const velocity = Math.sqrt(
        velocityRef.current.x * velocityRef.current.x +
        velocityRef.current.y * velocityRef.current.y
      )

      const scale = Math.min(1 + velocity * 0.02, 1.5)

      cursor.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px) scale(${scale})`
      cursorDot.style.transform = `translate(${mousePosition.current.x}px, ${mousePosition.current.y}px)`

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`magnetic-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
      <div
        ref={cursorDotRef}
        className={`magnetic-cursor-dot ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  )
}
