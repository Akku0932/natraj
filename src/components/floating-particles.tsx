'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface FloatingParticlesProps {
  count?: number
  className?: string
}

interface Particle {
  id: number
  size: number
  x: string
  y: string
  opacity: number
  duration: number
  delay: number
}

export function FloatingParticles({ count = 6, className = '' }: FloatingParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 4 + Math.random() * 4,
      x: `${10 + Math.random() * 80}%`,
      y: `${10 + Math.random() * 80}%`,
      opacity: 0.05 + Math.random() * 0.1,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 5,
    }))
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -10, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
