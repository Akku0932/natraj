'use client'

import { motion } from 'framer-motion'

interface SectionDecoratorProps {
  variant?: 'dots' | 'lines' | 'circles'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'full'
}

const positionClasses: Record<string, string> = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'full': 'inset-0',
}

function DotsVariant() {
  return (
    <motion.div
      className="w-48 h-48"
      animate={{ opacity: [0.03, 0.06, 0.03] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(200,150,62,0.4) 1px, transparent 1px)',
        backgroundSize: '12px 12px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }}
    />
  )
}

function LinesVariant() {
  return (
    <motion.div
      className="w-48 h-48"
      animate={{ rotate: [0, 2, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" className="opacity-[0.06]">
        <line x1="0" y1="0" x2="192" y2="192" stroke="currentColor" className="text-gold" strokeWidth="1" />
        <line x1="40" y1="0" x2="192" y2="152" stroke="currentColor" className="text-gold" strokeWidth="1" />
        <line x1="80" y1="0" x2="192" y2="112" stroke="currentColor" className="text-gold" strokeWidth="1" />
        <line x1="0" y1="40" x2="152" y2="192" stroke="currentColor" className="text-gold" strokeWidth="1" />
        <line x1="0" y1="80" x2="112" y2="192" stroke="currentColor" className="text-gold" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}

function CirclesVariant() {
  return (
    <motion.div
      className="w-40 h-40 flex items-center justify-center"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute w-24 h-24 rounded-full border border-gold/[0.08]" />
      <div className="absolute w-36 h-36 rounded-full border border-gold/[0.05]" />
      <div className="absolute w-48 h-48 rounded-full border border-gold/[0.03]" />
    </motion.div>
  )
}

export function SectionDecorator({ variant = 'dots', position = 'top-left' }: SectionDecoratorProps) {
  const posClass = positionClasses[position] || 'inset-0'

  return (
    <div className={`absolute ${posClass} overflow-hidden pointer-events-none`}>
      {variant === 'dots' && <DotsVariant />}
      {variant === 'lines' && <LinesVariant />}
      {variant === 'circles' && <CirclesVariant />}
    </div>
  )
}
