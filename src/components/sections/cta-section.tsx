'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/use-store'

export default function CTASection() {
  const { setCurrentPage } = useStore()

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Gold gradient background */}
      <div className="absolute inset-0 gold-gradient" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Ready to Power Up
            <br />
            Your Project?
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-lg text-white/80">
            Contact us today for custom solutions tailored to your exact requirements.
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
        </motion.div>
      </div>
    </section>
  )
}
