'use client'

import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/use-store'

export default function CatalogDownloadSection() {
  const { setCurrentPage } = useStore()

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Dark charcoal background */}
      <div className="absolute inset-0 bg-charcoal" />

      {/* Subtle gold dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(200,150,62,1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Gold gradient top border */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/10"
          style={{
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
        >
          Product Catalog
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          Download Our Product{' '}
          <span className="gradient-text">Catalog</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-base text-white/60 sm:text-lg"
        >
          Get our complete product catalog with detailed specifications, pricing, and technical drawings
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="/images/Natraj Electrical Control Panel-4.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="gold-gradient border-0 px-8 py-6 text-base font-medium text-white shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF Catalog
              </Button>
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentPage('contact')}
              className="border-gold/30 px-8 py-6 text-base font-medium text-gold hover:bg-gold/10 hover:border-gold/50 transition-all"
            >
              <Mail className="mr-2 h-5 w-5" />
              Request Physical Copy
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
