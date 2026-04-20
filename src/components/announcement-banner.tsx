'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const DISMISS_KEY = 'natraj-announcement-dismissed'
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours

const announcements = [
  '🔥 Special Offer: 15% Off on All Three Phase Panels — Limited Time!',
  '✨ New: Solar Panel Range Now Available — Go Green with Natraj',
  '📞 Free Consultation — Call +91 98682 25911 Today',
  '🚚 Free Delivery on Orders Above ₹10,000 — Pan-India',
  '⭐ ISO 9001:2015 Certified — Trusted Since 1998',
]

function checkDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    const dismissedAt = Number(raw)
    if (Number.isNaN(dismissedAt)) return false
    return Date.now() - dismissedAt < DISMISS_DURATION_MS
  } catch {
    return false
  }
}

function subscribe(onStoreChange: () => void): () => void {
  // Listen for storage events (cross-tab) and a custom event for same-tab updates
  const handler = (e: StorageEvent | CustomEvent) => {
    if (e instanceof StorageEvent) {
      if (e.key === DISMISS_KEY || e.key === null) onStoreChange()
    } else {
      onStoreChange()
    }
  }
  window.addEventListener('storage', handler as EventListener)
  window.addEventListener('announcement-dismissed', handler as EventListener)
  return () => {
    window.removeEventListener('storage', handler as EventListener)
    window.removeEventListener('announcement-dismissed', handler as EventListener)
  }
}

const SERVER_SNAPSHOT = false

export function AnnouncementBanner() {
  // Use useSyncExternalStore to read localStorage without an effect
  const dismissed = useSyncExternalStore(subscribe, checkDismissed, () => SERVER_SNAPSHOT)

  const handleDismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      // localStorage unavailable — silently ignore
    }
    window.dispatchEvent(new CustomEvent('announcement-dismissed'))
  }, [])

  const visible = !dismissed

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-[55] w-full overflow-hidden gold-gradient"
          style={{ boxShadow: '0 2px 8px rgba(200, 150, 62, 0.25)' }}
        >
          <div className="relative flex items-center">
            {/* Marquee container — takes full width minus close button */}
            <div className="flex-1 overflow-hidden py-2 pr-8">
              <div className="announcement-marquee">
                {/* Duplicate for seamless loop */}
                {[0, 1].map((groupIdx) => (
                  <span
                    key={groupIdx}
                    className="inline-flex items-center gap-4 whitespace-nowrap"
                    aria-hidden={groupIdx === 1 ? "true" : undefined}
                  >
                    {announcements.map((text, i) => (
                      <span key={`${groupIdx}-${i}`} className="inline-flex items-center">
                        <span className="text-xs font-medium uppercase tracking-wider text-white">
                          {text}
                        </span>
                        {i < announcements.length - 1 && (
                          <span className="ml-4 text-white/40 text-[10px]">◆</span>
                        )}
                      </span>
                    ))}
                    {/* Diamond at end of group for seamless loop */}
                    <span className="ml-4 text-white/40 text-[10px]">◆</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="absolute right-0 top-0 z-10 flex h-full w-8 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
