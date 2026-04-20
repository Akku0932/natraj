'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const accepted = getCookie('natraj_cookies_accepted')
    if (!accepted) {
      // Small delay to let the page load before showing the banner
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    setCookie('natraj_cookies_accepted', 'true', 365)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 z-[60] w-full max-w-lg -translate-x-1/2 px-4"
        >
          <div className="rounded-2xl border border-border/50 bg-background/90 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-copper/10">
                <Cookie className="h-5 w-5 text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  We value your privacy
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    onClick={handleAcceptAll}
                    size="sm"
                    className="gold-gradient border-0 text-white shadow-lg shadow-gold/20 hover:shadow-gold/30"
                  >
                    Accept All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/50 text-muted-foreground hover:text-foreground"
                    onClick={handleAcceptAll}
                  >
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
