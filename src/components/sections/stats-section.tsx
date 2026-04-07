'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedCounter } from '@/components/animated-counter'

const stats = [
  { value: 5000, suffix: '+', label: 'Products Delivered', decimals: 0 },
  { value: 200, suffix: '+', label: 'Happy Clients', decimals: 0 },
  { value: 25, suffix: '+', label: 'Years Trusted', decimals: 0 },
  { value: 99.9, suffix: '%', label: 'Satisfaction Rate', decimals: 1 },
]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const pulseTriggered = useRef<Record<string, boolean>>({})

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Gold line at top */}
        <div className="relative mb-10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{ transformOrigin: 'center' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-6 md:gap-10 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center rounded-2xl border border-white/[0.06] bg-white/[0.03] py-8 px-4 transition-all duration-300 hover:border-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="relative text-4xl font-bold md:text-5xl lg:text-6xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  className="gold-shimmer-text tabular-nums text-gold-glow"
                />
              </div>

              <p className="mt-4 text-sm font-medium uppercase tracking-wider text-white/60 md:text-base leading-relaxed">
                {stat.label}
              </p>

              {/* Mobile divider dots */}
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
