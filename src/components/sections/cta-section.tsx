'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/use-store'
import { FloatingParticles } from '@/components/floating-particles'

export default function CTASection() {
  const { setCurrentPage } = useStore()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const orbYReverse = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      {/* Gold gradient background */}
      <div className="absolute inset-0 gold-gradient" />

      {/* Glowing border animation */}
      <motion.div
        className="absolute inset-0 rounded-none pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px rgba(200,150,62,0.15), inset 0 0 80px rgba(200,150,62,0.05)',
        }}
        animate={{
          boxShadow: [
            'inset 0 0 40px rgba(200,150,62,0.15), inset 0 0 80px rgba(200,150,62,0.05)',
            'inset 0 0 60px rgba(200,150,62,0.25), inset 0 0 120px rgba(200,150,62,0.1)',
            'inset 0 0 40px rgba(200,150,62,0.15), inset 0 0 80px rgba(200,150,62,0.05)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Decorative elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs with parallax */}
        <motion.div
          className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          style={{ y: orbY }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-copper/20 blur-3xl"
          style={{ y: orbYReverse }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-gold-light/15 blur-2xl"
          style={{ y: orbY }}
        />

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating particles */}
        <FloatingParticles count={5} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon with slow rotation */}
          <div className="mx-auto mb-8 inline-flex rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="h-8 w-8 text-white" />
            </motion.div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Ready to Power Up
            <br />
            Your Project?
          </h2>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80 md:text-xl">
            Contact us today for custom solutions tailored to your exact requirements.
            Let&apos;s build something exceptional together.
          </p>

          {/* Buttons with hover scale */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Button
                onClick={() => setCurrentPage('contact')}
                size="lg"
                className="min-w-[200px] bg-charcoal text-white hover:bg-charcoal/90"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Button
                onClick={() => setCurrentPage('products')}
                size="lg"
                variant="outline"
                className="min-w-[200px] border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Browse Products
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
