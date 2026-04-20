'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Globe, CircuitBoard, Factory, Lightbulb, Plug } from 'lucide-react'

const partners = [
  {
    name: 'Siemens',
    description: 'Global leader in automation and digitalization for electrical infrastructure',
    initials: 'S',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'Schneider Electric',
    description: 'World specialist in energy management and automation solutions',
    initials: 'SE',
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    name: 'ABB',
    description: 'Pioneer in power and automation technologies for industrial efficiency',
    initials: 'ABB',
    gradient: 'from-red-500 to-orange-400',
  },
  {
    name: 'L&T',
    description: 'Indian multinational with cutting-edge electrical and automation divisions',
    initials: 'LT',
    gradient: 'from-navy-600 to-blue-500',
  },
  {
    name: 'Havells',
    description: 'Leading Indian brand for switches, cables, and consumer electricals',
    initials: 'H',
    gradient: 'from-amber-500 to-yellow-400',
  },
  {
    name: 'Legrand',
    description: 'Global specialist in electrical and digital building infrastructure',
    initials: 'L',
    gradient: 'from-orange-500 to-red-400',
  },
]

const partnerIcons = [Zap, Globe, CircuitBoard, Factory, Lightbulb, Plug]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function TechPartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      {/* Dark charcoal background with dot-pattern */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 dot-pattern opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.06)_0%,transparent_70%)]" />

      {/* Top divider */}
      <div className="absolute left-0 top-0 h-px w-full section-divider" />
      <div className="absolute left-1/2 top-0 z-20 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Our Partners
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Technology{' '}
            <span className="gradient-text">Partners</span>
          </motion.h2>
          <div className="premium-divider relative mx-auto mt-6 w-32">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/50" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60"
          >
            We partner with India&apos;s leading electrical brands
          </motion.p>
        </div>

        {/* Partner Brand Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {partners.map((partner, index) => {
            const PartnerIcon = partnerIcons[index]
            return (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 40px rgba(200, 150, 62, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass card-shine glow-hover group relative overflow-hidden rounded-xl border border-white/[0.08] p-6"
              >
                {/* Gold border glow overlay on hover */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/30 group-hover:via-gold/15 group-hover:to-gold/30" />

                <div className="relative z-10 flex items-start gap-4">
                  {/* Stylized monogram with gradient background */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-lg">
                    <div className="relative flex items-center justify-center">
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${partner.gradient} opacity-90`} />
                      <span className="relative text-white drop-shadow-sm">
                        {partner.initials}
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">
                        {partner.name}
                      </h3>
                      <PartnerIcon className="h-3.5 w-3.5 text-gold/60" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/45">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/30" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
