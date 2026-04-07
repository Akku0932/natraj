'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedCounter } from '@/components/animated-counter'

const stats = [
  { value: 5000, suffix: '+', label: 'Projects Completed', decimals: 0 },
  { value: 200, suffix: '+', label: 'Happy Clients', decimals: 0 },
  { value: 25, suffix: '+', label: 'Years Experience', decimals: 0 },
  { value: 99.9, suffix: '%', label: 'Quality Rate', decimals: 1 },
]

const floatClasses = [
  'animate-float',
  'animate-float-slow',
  'animate-float-medium',
  'animate-float-fast',
]

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

      {/* Decorative dot pattern with slow drift animation */}
      <div className="absolute inset-0 dot-pattern opacity-60 animate-dot-drift" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Animated shimmer gold line at top */}
        <div className="relative mb-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{ transformOrigin: 'center' }}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '100%' } : {}}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            className="absolute top-0 left-0 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-6 md:gap-12 lg:grid-cols-4 stagger-in"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="animated-gradient-border"
            >
              <div className={`card-shine spotlight-card relative text-center rounded-2xl py-8 px-4 ${floatClasses[index]}`}
                style={{ background: 'rgba(26, 26, 26, 0.85)' }}
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
                  {/* Third ring with breathing animation */}
                  <div className="absolute h-36 w-36 rounded-full border border-gold/[0.03] md:h-44 md:w-44 lg:h-48 lg:w-48 animate-breathe" />
                  <div className="relative text-4xl font-bold md:text-5xl lg:text-6xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      className="gold-shimmer-text tabular-nums text-gold-glow"
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
