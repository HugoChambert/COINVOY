import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function Earth3D() {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001
    }
  })

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#1e4d7b"
          emissive="#0a1f3d"
          emissiveIntensity={0.2}
          shininess={10}
          map={createEarthTexture()}
        />
      </Sphere>
    </group>
  )
}

function createEarthTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  )
  gradient.addColorStop(0, '#2563a8')
  gradient.addColorStop(1, '#0a1f3d')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#4a9d5f'

  const landmasses = [
    { x: 0.2, y: 0.3, w: 0.15, h: 0.25 },
    { x: 0.65, y: 0.25, w: 0.2, h: 0.15 },
    { x: 0.45, y: 0.6, w: 0.12, h: 0.2 },
    { x: 0.15, y: 0.55, w: 0.18, h: 0.18 },
    { x: 0.8, y: 0.35, w: 0.15, h: 0.2 },
    { x: 0.55, y: 0.15, w: 0.12, h: 0.18 },
    { x: 0.35, y: 0.75, w: 0.15, h: 0.15 }
  ]

  landmasses.forEach(land => {
    const x = land.x * canvas.width
    const y = land.y * canvas.height
    const w = land.w * canvas.width
    const h = land.h * canvas.height

    ctx.beginPath()
    ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.strokeStyle = 'rgba(150, 200, 255, 0.15)'
  ctx.lineWidth = 2

  for (let i = 0; i < 18; i++) {
    const y = (canvas.height / 18) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }

  for (let i = 0; i < 36; i++) {
    const x = (canvas.width / 36) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}
