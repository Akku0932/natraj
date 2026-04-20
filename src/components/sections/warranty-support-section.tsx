'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Headphones,
  Award,
  CheckCircle2,
} from 'lucide-react'

const warrantyFeatures = [
  {
    icon: Shield,
    title: 'Manufacturer Warranty',
    description: 'All products carry original manufacturer warranty',
  },
  {
    icon: Award,
    title: '25+ Year Track Record',
    description: 'Trusted since 1998',
  },
  {
    icon: Headphones,
    title: 'Pan-India Service Network',
    description: 'Service centers across major cities',
  },
  {
    icon: CheckCircle2,
    title: 'Easy Claims Process',
    description: 'We assist with warranty claims end-to-end',
  },
]

const supportDetails = [
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon – Sat 9:00 AM – 7:00 PM IST',
  },
  {
    icon: Phone,
    label: 'Phone Support',
    value: '011-23873532, 9868225911',
    href: 'tel:011-23873532',
  },
  {
    icon: Mail,
    label: 'Email Support',
    value: 'natrajenterprises14@gmail.com',
    href: 'mailto:natrajenterprises14@gmail.com',
  },
  {
    icon: Clock,
    label: 'Average Response Time',
    value: 'Under 2 hours',
  },
]

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

export default function WarrantySupportSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.06)_0%,transparent_70%)]" />
      <div className="absolute inset-0 dot-pattern opacity-60" />

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
            Customer Care
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Warranty &amp;{' '}
            <span className="gradient-text">Support</span>
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
            Comprehensive warranty coverage and dedicated support to keep your operations running smoothly
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Warranty Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {warrantyFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(200, 150, 62, 0.12)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="glass card-shine glow-hover group flex items-start gap-4 rounded-xl border border-white/[0.08] border-l-2 border-l-gold/40 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
                    <Icon className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right: Support Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass card-shine glow-hover flex flex-col justify-between rounded-xl border border-white/[0.08] p-6 lg:p-8"
          >
            <div className="space-y-5">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
                  <Headphones className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Get In Touch
                  </h3>
                  <p className="text-xs text-white/40">
                    We&apos;re here to help
                  </p>
                </div>
              </div>

              {supportDetails.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-gold/20 hover:bg-gold/[0.04]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/15 bg-gold/[0.06]">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-white/80 break-all">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )

                if ('href' in item && item.href) {
                  return (
                    <a key={item.label} href={item.href}>
                      {content}
                    </a>
                  )
                }
                return <div key={item.label}>{content}</div>
              })}
            </div>

            {/* After-hours emergency WhatsApp note */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 rounded-xl border border-green-500/20 bg-green-500/[0.06] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <MessageCircle className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-300">
                    After-hours Emergency?
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-green-300/60">
                    Reach us on WhatsApp anytime — our team monitors messages
                    around the clock for urgent enquiries.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
