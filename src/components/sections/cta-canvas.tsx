'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

const PARTICLE_COUNT = 120
const CONNECTION_DISTANCE = 120
const MOUSE_RADIUS = 200
const MOUSE_ATTRACTION = 0.02

/** Gold / copper color palette for particles */
const GOLD_COLORS = [
  [212, 175, 55],   // classic gold
  [218, 165, 32],   // goldenrod
  [184, 134, 11],   // dark goldenrod
  [205, 127, 50],   // peru (copper-ish)
  [192, 150, 80],   // warm copper
  [230, 200, 120],  // light gold
]

function createParticle(width: number, height: number): Particle {
  const color = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)]
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.4,
    // Store the rgb channels directly on the particle for fast rendering
    color,
  } as Particle & { color: number[] }
}

export function CtaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<(Particle & { color: number[] })[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef<number>(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement
    if (!container) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = container.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    const newWidth = rect.width
    const newHeight = rect.height
    dimensionsRef.current = { width: newWidth, height: newHeight }

    // Re-seed particles if dimensions changed significantly
    const particles = particlesRef.current
    if (particles.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle(newWidth, newHeight))
      }
    } else {
      // Clamp existing particles within new bounds
      for (const p of particles) {
        if (p.x > newWidth) p.x = Math.random() * newWidth
        if (p.y > newHeight) p.y = Math.random() * newHeight
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    /** Handle mouse movement over the section */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    /** Reset mouse position when it leaves the section */
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    // Attach mouse listeners to the parent section (canvas itself is pointer-events-none)
    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove)
      parent.addEventListener('mouseleave', handleMouseLeave)
    }

    /** Main animation loop */
    const animate = () => {
      const { width, height } = dimensionsRef.current
      if (width === 0 || height === 0) {
        animFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Clear with semi-transparent fill for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, width, height)

      // Update particle positions
      for (const p of particles) {
        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_ATTRACTION
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Apply velocity with slight damping
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
      }

      // Draw connections between nearby particles (constellation effect)
      // Use grid-based spatial partitioning for efficient lookups
      const cellSize = CONNECTION_DISTANCE
      const grid: Map<string, number[]> = new Map()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const cellX = Math.floor(p.x / cellSize)
        const cellY = Math.floor(p.y / cellSize)
        const key = `${cellX},${cellY}`
        if (!grid.has(key)) grid.set(key, [])
        grid.get(key)!.push(i)
      }

      // Iterate and draw connections only within neighboring cells
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const cellX = Math.floor(p.x / cellSize)
        const cellY = Math.floor(p.y / cellSize)

        for (let cx = cellX - 1; cx <= cellX + 1; cx++) {
          for (let cy = cellY - 1; cy <= cellY + 1; cy++) {
            const key = `${cx},${cy}`
            const cell = grid.get(key)
            if (!cell) continue

            for (const j of cell) {
              if (j <= i) continue // Avoid duplicate connections
              const q = particles[j]
              const ddx = p.x - q.x
              const ddy = p.y - q.y
              const d = Math.sqrt(ddx * ddx + ddy * ddy)
              if (d < CONNECTION_DISTANCE) {
                const alpha = (1 - d / CONNECTION_DISTANCE) * 0.25
                const color = p.color
                ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(q.x, q.y)
                ctx.stroke()
              }
            }
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const color = p.color
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resizeCanvas)
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
        parent.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [resizeCanvas])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
