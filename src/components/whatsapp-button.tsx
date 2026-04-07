'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'

const TOOLTIP_KEY = 'natraj-whatsapp-tooltip-dismissed'

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [showPing, setShowPing] = useState(true)
  const [showPreChat, setShowPreChat] = useState(false)
  const [showReengagement, setShowReengagement] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  // Check if tooltip was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(TOOLTIP_KEY)
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowPreChat(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Auto-dismiss ping notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPing(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  // Re-engagement pulse when user scrolls past 50% of the page
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    if (scrollPercent > 0.5 && !showReengagement) {
      setShowReengagement(true)
      // Auto-hide after 4 seconds
      setTimeout(() => {
        setShowReengagement(false)
      }, 4000)
    }
  }, [showReengagement])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(true)
    }, 200)
    setHoverTimeout(timeout)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setShowTooltip(false)
  }

  const dismissPreChat = () => {
    setShowPreChat(false)
    localStorage.setItem(TOOLTIP_KEY, 'true')
  }

  return (
    <>
      {/* Pre-chat tooltip for first visit */}
      <AnimatePresence>
        {showPreChat && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[260px] md:bottom-[88px] md:right-8"
          >
            <div className="relative rounded-xl border border-gold/20 bg-card p-4 shadow-xl shadow-black/10 dark:bg-charcoal">
              {/* Close button */}
              <button
                onClick={dismissPreChat}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              {/* Green dot */}
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">Online now</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Need help? Chat with us!</p>
              <p className="mt-1 text-xs text-muted-foreground">We typically reply within minutes during business hours.</p>
              <a
                href="https://wa.me/919868225911?text=Hello%20Natraj%20Electricals"
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismissPreChat}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1da851]"
              >
                <MessageCircle className="h-4 w-4" />
                Start Chat
              </a>
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-gold/20 bg-card dark:bg-charcoal" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-engagement tooltip when scrolled past 50% */}
      <AnimatePresence>
        {showReengagement && !showPreChat && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: 5 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 5, x: 5 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 md:bottom-[88px] md:right-8"
          >
            <div className="relative whitespace-nowrap rounded-lg bg-charcoal px-3 py-2 text-sm font-medium text-white shadow-lg border border-gold/20 dark:bg-card">
              Questions? We&apos;re here! 💬
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 bg-charcoal border-r border-t border-gold/20 dark:bg-card" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp button */}
      <motion.a
        href="https://wa.me/919868225911?text=Hello%20Natraj%20Electricals"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 md:h-14 md:w-14 md:bottom-8 md:right-8 ${
          showReengagement ? 'animate-bounce' : ''
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-6 w-6 md:h-7 md:w-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Pulse ring - smooth continuous pulse */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />

        {/* Ping notification dot */}
        <AnimatePresence>
          {showPing && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center md:h-3.5 md:w-3.5"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-600 md:h-2 md:w-2" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Hover tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-charcoal px-3 py-2 text-sm font-medium text-white shadow-lg border border-gold/10"
            >
              Chat with us!
              {/* Arrow pointing right */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 bg-charcoal border-l border-b border-gold/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </>
  )
}
