'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrollY > 300)
      if (docHeight > 0) {
        setScrollPercent(Math.round((scrollY / docHeight) * 100))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white shadow-lg shadow-black/20 md:bottom-8 md:left-8 md:h-12 md:w-12"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Gold ring on hover */}
          <span className="absolute inset-0 rounded-full border-2 border-transparent transition-colors duration-300 group-hover:border-gold/60 group-hover:shadow-[0_0_12px_rgba(200,150,62,0.25)]" />
          <ArrowUp className="h-5 w-5 transition-colors duration-300 group-hover:text-gold md:h-5 md:w-5" />

          {/* Tooltip with scroll percentage */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -8, scale: 0.9 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-charcoal px-3 py-1.5 text-xs font-medium text-gold shadow-lg border border-gold/20"
              >
                {scrollPercent}% scrolled
                {/* Arrow pointing left */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 bg-charcoal border-l border-b border-gold/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
