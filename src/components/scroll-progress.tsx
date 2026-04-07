'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const barOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])

  return (
    <motion.div
      className="fixed left-0 right-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        opacity: barOpacity,
      }}
      aria-hidden="true"
    >
      {/* Gold gradient bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
      {/* Subtle glow */}
      <div className="absolute -bottom-1 inset-x-0 h-2 bg-gradient-to-r from-gold-dark/20 via-gold/30 to-gold-light/20 blur-sm" />
    </motion.div>
  )
}
