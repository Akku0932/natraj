'use client'

import { motion } from 'framer-motion'

interface SectionTransitionProps {
  variant?: 'gold-line' | 'gradient' | 'dots' | 'zigzag'
  className?: string
}

export function SectionTransition({ variant = 'gold-line', className = '' }: SectionTransitionProps) {
  if (variant === 'gold-line') {
    return (
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto max-w-7xl flex items-center justify-center py-8 ${className}`}
      >
        <div className="relative h-px flex-1 max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          {/* Center diamond */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-gold rounded-[2px] shadow-sm shadow-gold/50"
          />
        </div>
      </motion.div>
    )
  }

  if (variant === 'gradient') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className={`h-10 relative overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(200,150,62,0.08) 40%, rgba(232,199,123,0.12) 50%, rgba(200,150,62,0.08) 60%, transparent 100%)',
          }}
        />
        {/* Subtle horizontal line in center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-7xl w-full">
          <div className="mx-auto h-px max-w-xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </motion.div>
    )
  }

  if (variant === 'dots') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-7xl flex items-center justify-center py-8 ${className}`}
      >
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
              className="rounded-full bg-gradient-to-br from-gold to-copper"
              style={{
                width: i === 1 ? '8px' : '6px',
                height: i === 1 ? '8px' : '6px',
              }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  if (variant === 'zigzag') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className={`relative h-6 overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, transparent 25%, rgba(200,150,62,0.1) 25%, rgba(200,150,62,0.1) 50%, transparent 50%, transparent 75%, rgba(200,150,62,0.1) 75%)`,
            backgroundSize: '20px 20px',
          }}
        />
      </motion.div>
    )
  }

  return null
}
