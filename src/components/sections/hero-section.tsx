'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Mouse } from 'lucide-react'
import { useStore } from '@/store/use-store'
import { Button } from '@/components/ui/button'

const TOTAL_FRAMES = 239

function getFramePath(index: number): string {
  return `/frames/ezgif-frame-${String(index).padStart(3, '0')}.png`
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [currentFrame, setCurrentFrame] = useState(1)
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map())
  const { setCurrentPage } = useStore()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
  })

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES])

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.15, 0.25], [60, 0, -40])
  const subtitleOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.3], [0, 1, 0])
  const subtitleY = useTransform(scrollYProgress, [0.05, 0.2, 0.3], [40, 0, -30])
  const ctaOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.32], [0, 1, 0])
  const ctaY = useTransform(scrollYProgress, [0.08, 0.22, 0.32], [30, 0, -25])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0])

  // Preload frames progressively
  useEffect(() => {
    const preloadInitialFrames = () => {
      for (let i = 1; i <= 10; i++) {
        if (!frameCache.current.has(i)) {
          const img = new Image()
          img.src = getFramePath(i)
          frameCache.current.set(i, img)
        }
      }
    }

    preloadInitialFrames()

    let batchStart = 11
    const batchSize = 20

    const interval = setInterval(() => {
      if (batchStart > TOTAL_FRAMES) {
        clearInterval(interval)
        return
      }
      const end = Math.min(batchStart + batchSize, TOTAL_FRAMES)
      for (let i = batchStart; i <= end; i++) {
        if (!frameCache.current.has(i)) {
          const img = new Image()
          img.src = getFramePath(i)
          frameCache.current.set(i, img)
        }
      }
      batchStart = end + 1
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Update current frame based on scroll progress
  useEffect(() => {
    const unsubscribe = frameIndex.on('change', (latest) => {
      const index = Math.round(latest)
      if (index >= 1 && index <= TOTAL_FRAMES && index !== currentFrame) {
        setCurrentFrame(index)
      }
    })
    return unsubscribe
  }, [frameIndex, currentFrame])

  // Preload adjacent frames
  const preloadAdjacent = useCallback((frame: number) => {
    for (let offset = -3; offset <= 3; offset++) {
      const targetFrame = frame + offset
      if (targetFrame >= 1 && targetFrame <= TOTAL_FRAMES && !frameCache.current.has(targetFrame)) {
        const img = new Image()
        img.src = getFramePath(targetFrame)
        frameCache.current.set(targetFrame, img)
      }
    }
  }, [])

  useEffect(() => {
    preloadAdjacent(currentFrame)
  }, [currentFrame, preloadAdjacent])

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]"
    >
      {/* Sticky frame container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
        {/* Frame image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            ref={imgRef}
            src={getFramePath(currentFrame)}
            alt="Natraj Electricals - Premium Electrical Panels"
            className="h-full w-full object-cover will-change-transform"
            loading="eager"
            draggable={false}
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />

        {/* Top: Logo - with extra padding to avoid navbar overlap */}
        <div className="absolute left-0 right-0 top-0 z-20 flex justify-center pt-28 md:pt-32">
          <div className="rounded-full border border-white/10 bg-black/30 px-8 py-3 backdrop-blur-md">
            <h1 className="text-2xl font-bold tracking-wider md:text-3xl">
              <span className="gradient-text">NATRAJ</span>{' '}
              <span className="text-white/90 font-light tracking-widest">ELECTRICALS</span>
            </h1>
          </div>
        </div>

        {/* Center: Main heading - CLEAN supplier-focused */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <motion.p
            style={{ opacity: titleOpacity, y: titleY }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold-light/80 md:text-base"
          >
            Trusted Since 1998
          </motion.p>
          <motion.h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Trusted
            <br />
            <span className="gradient-text">
              Electrical Partner
            </span>
          </motion.h2>
          <motion.p
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="mt-6 max-w-xl text-center text-lg text-white/70 md:text-xl"
          >
            Quality electrical panels and products — handpicked from India&apos;s leading brands, delivered to your doorstep.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button
              onClick={() => setCurrentPage('products')}
              size="lg"
              className="min-w-[220px] gold-gradient border-0 text-white shadow-lg shadow-gold/30 hover:shadow-gold/40 font-semibold"
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrentPage('contact')}
              size="lg"
              variant="outline"
              className="min-w-[220px] border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>

        {/* Bottom: Scroll to explore indicator */}
        <div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          {/* Mouse icon */}
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Mouse className="h-5 w-5 text-gold/60" strokeWidth={1.5} />
            {/* Scroll dot inside mouse */}
            <motion.div
              className="h-1.5 w-1 rounded-full bg-gold/60"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-light">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  )
}
