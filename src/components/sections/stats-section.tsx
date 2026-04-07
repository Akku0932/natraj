'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 5000, suffix: '+', label: 'Panels Delivered' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 16, suffix: '', label: 'Product Categories' },
]

const floatClasses = [
  'animate-float',
  'animate-float-slow',
  'animate-float-medium',
  'animate-float-fast',
]

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number
  suffix: string
  isInView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const duration = 2000 // 2 seconds

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      setCount(Math.round(easedProgress * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <span className="gradient-text tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.08)_0%,transparent_70%)]" />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,150,62,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,62,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-6 md:gap-12 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative text-center ${floatClasses[index]}`}
            >
              {/* Decorative gold ring behind counter */}
              <div className="relative mx-auto flex items-center justify-center">
                <div
                  className="absolute h-24 w-24 rounded-full border border-gold/10 md:h-32 md:w-32"
                  style={{
                    background: 'radial-gradient(circle, rgba(200,150,62,0.03) 0%, transparent 70%)',
                  }}
                />
                <div className="absolute h-28 w-28 rounded-full border border-gold/5 md:h-36 md:w-36 lg:h-40 lg:w-40" />
                <div className="relative text-4xl font-bold md:text-5xl lg:text-6xl">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </div>
              </div>

              {/* Stat label with hover underline */}
              <p className="mt-4 text-sm font-medium uppercase tracking-wider text-white/60 transition-colors hover:text-white/80 md:text-base">
                <span className="stat-label-hover cursor-default">
                  {stat.label}
                </span>
              </p>

              {/* Mobile divider dots (between items in column direction) */}
              {index < stats.length - 1 && (
                <div className="mt-6 flex items-center justify-center gap-1.5 md:hidden">
                  <div className="h-1 w-1 rounded-full bg-gold/30" />
                  <div className="h-1 w-1 rounded-full bg-gold/20" />
                  <div className="h-1 w-1 rounded-full bg-gold/10" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
