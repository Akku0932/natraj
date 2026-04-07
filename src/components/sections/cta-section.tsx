'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/use-store'

export default function CTASection() {
  const { setCurrentPage } = useStore()

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Gold gradient background */}
      <div className="absolute inset-0 gold-gradient" />

      {/* Dot-pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative floating Zap icon */}
      <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.06] md:-right-20">
        <Zap className="h-64 w-64 text-white md:h-96 md:w-96" strokeWidth={1.2} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              Looking for Quality
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              Electrical Products?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-lg text-white/80">
            Browse our catalog or get in touch — we&apos;re here to help you find exactly what you need.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => setCurrentPage('contact')}
              size="lg"
              className="min-w-[200px] bg-charcoal text-white hover:bg-charcoal/90 transition-colors"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrentPage('products')}
              size="lg"
              variant="outline"
              className="min-w-[200px] border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white transition-colors"
            >
              Browse Products
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-gold/60" />
              <span>ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-gold/60" />
              <span>50+ Products</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-gold/60" />
              <span>Pan-India Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-gold/60" />
              <span>Expert Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
