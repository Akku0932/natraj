'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown, Calendar, Package, Award } from 'lucide-react'

const TOTAL_FRAMES = 239

function getFramePath(index: number): string {
  return `/frames/ezgif-frame-${String(index).padStart(3, '0')}.png`
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [currentFrame, setCurrentFrame] = useState(1)
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map())

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
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0])

  // Preload frames progressively
  useEffect(() => {
    const preloadInitialFrames = () => {
      // Preload first 10 frames immediately
      for (let i = 1; i <= 10; i++) {
        if (!frameCache.current.has(i)) {
          const img = new Image()
          img.src = getFramePath(i)
          frameCache.current.set(i, img)
        }
      }
    }

    preloadInitialFrames()

    // Then preload the rest in batches
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

  // Preload adjacent frames for smoothness
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
            alt="Natraj Electricals"
            className="h-full w-full object-cover will-change-transform"
            loading="eager"
            draggable={false}
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="hero-overlay absolute inset-0 z-10" />

        {/* Subtle animated gradient overlay */}
        <div className="hero-gradient-animated absolute inset-0 z-[9]" />

        {/* Top: Logo */}
        <motion.div
          className="absolute left-0 right-0 top-0 z-20 flex justify-center pt-8 md:pt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-dark rounded-full px-8 py-3">
            <h1 className="text-2xl font-bold tracking-wider md:text-3xl">
              <span className="gradient-text">NATRAJ</span>{' '}
              <span className="text-white/90 font-light tracking-widest">ELECTRICALS</span>
            </h1>
          </div>
        </motion.div>

        {/* Center: Main heading */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <motion.p
            style={{ opacity: titleOpacity, y: titleY }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold-light/80 md:text-base"
          >
            Established Since 1998
          </motion.p>
          <motion.h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          >
            Precision
            <br />
            <span
              className="gradient-text"
              style={{
                textShadow: '0 0 40px rgba(200, 150, 62, 0.3), 0 0 80px rgba(200, 150, 62, 0.15)',
                WebkitTextStroke: '0.5px transparent',
                filter: 'brightness(1.1)',
              }}
            >
              Engineering
            </span>
          </motion.h2>
          <motion.p
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="mt-6 max-w-md text-center text-lg text-white/70 md:text-xl"
          >
            For Every Connection
          </motion.p>
        </div>

        {/* Bottom: Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/50 animate-text-pulse">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-gold/70" />
          </motion.div>
        </motion.div>

        {/* Floating badge widgets */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-4 z-20 hidden md:block animate-float-slow"
        >
          <div className="glass-dark flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg shadow-black/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15">
              <Calendar className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">25+ Years</p>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Experience</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-24 left-12 z-20 hidden md:block animate-float-medium"
        >
          <div className="glass-dark flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg shadow-black/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15">
              <Package className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">5000+ Panels</p>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Delivered</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-16 right-4 z-20 hidden md:block animate-float-fast"
        >
          <div className="glass-dark flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg shadow-black/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15">
              <Award className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">ISO Certified</p>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Quality</p>
            </div>
          </div>
        </motion.div>

        {/* Animated gold line on left edge */}
        <div className="absolute left-0 top-0 z-20 hidden h-full w-1 md:block">
          <div className="animate-gold-line-trace h-full w-full bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0" />
        </div>

        {/* Side decorations */}
        <div className="absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-px bg-gradient-to-b from-transparent to-gold/40" />
            <span className="text-[10px] uppercase tracking-widest text-white/30" style={{ writingMode: 'vertical-lr' }}>
              ISO 9001:2015
            </span>
            <div className="h-20 w-px bg-gradient-to-b from-gold/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
