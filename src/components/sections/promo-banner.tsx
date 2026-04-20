'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Truck, Users } from 'lucide-react'

const promos = [
  {
    icon: Sparkles,
    title: 'New Solar Panel Range',
    subtitle: 'Go Green with Natraj • Free Installation Support',
    accent: 'from-emerald-500/20 to-green-500/10',
  },
  {
    icon: Truck,
    title: 'Free Delivery Above ₹10,000',
    subtitle: 'Pan-India Shipping • Insured & Tracked',
    accent: 'from-sky-500/20 to-blue-500/10',
  },
  {
    icon: Users,
    title: 'Bulk Order Discounts',
    subtitle: '10+ Units Get 5% Extra Off • Contact Us',
    accent: 'from-violet-500/20 to-purple-500/10',
  },
]

export default function PromoBanner() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const check = () => setCanScroll(el.scrollWidth > el.clientWidth)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Auto-scroll on mobile every 5 seconds
  useEffect(() => {
    if (!canScroll) return
    const el = scrollRef.current
    if (!el) return

    let interval: ReturnType<typeof setInterval>
    let paused = false

    const start = () => {
      interval = setInterval(() => {
        if (paused) return
        const max = el.scrollWidth - el.clientWidth
        if (el.scrollLeft >= max - 1) {
          el.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          el.scrollBy({ left: el.clientWidth, behavior: 'smooth' })
        }
      }, 5000)
    }

    const pause = () => { paused = true }
    const resume = () => { paused = false }
    start()
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', resume, { passive: true })

    return () => {
      clearInterval(interval)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
    }
  }, [canScroll])

  return (
    <section className="relative overflow-hidden border-y border-gold/10 gold-gradient-subtle py-5">
      <div
        ref={scrollRef}
        className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide lg:overflow-visible"
      >
        {promos.map((promo, i) => {
          const Icon = promo.icon
          return (
            <motion.div
              key={i}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(200,150,62,0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`flex min-w-[280px] flex-1 snap-start items-center gap-4 rounded-xl border border-gold/10 bg-gradient-to-r ${promo.accent} p-4 shadow-sm backdrop-blur-sm lg:min-w-0`}
              style={{ borderLeft: '3px solid #C8963E' }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {promo.title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                  {promo.subtitle}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Fade edges on mobile when scrollable */}
      {canScroll && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent lg:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent lg:hidden" />
        </>
      )}
    </section>
  )
}
