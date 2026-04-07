'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, BadgeCheck, Zap, Globe, Calendar, Package } from 'lucide-react'
import { FloatingParticles } from '@/components/floating-particles'

const certifications = [
  {
    icon: Shield,
    title: 'ISO 9001:2015',
    description: 'Quality Management System Certified',
  },
  {
    icon: BadgeCheck,
    title: 'ISI Mark',
    description: 'Indian Standards Institute Marked Products',
  },
  {
    icon: Zap,
    title: 'BEE Rated',
    description: 'Bureau of Energy Efficiency Rated',
  },
  {
    icon: Globe,
    title: 'CE Compliant',
    description: 'European Conformity Standards',
  },
  {
    icon: Calendar,
    title: '25+ Years',
    description: 'Industry Experience Since 1998',
  },
  {
    icon: Package,
    title: '5000+ Panels',
    description: 'Successfully Delivered Projects',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
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

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.06)_0%,transparent_70%)]" />

      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 dot-pattern opacity-60"
      />

      {/* Floating particles */}
      <FloatingParticles count={4} />

      {/* Section divider */}
      <div className="absolute left-0 top-0 h-px w-full section-divider" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Certifications &amp; Compliance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Quality You Can{' '}
            <span className="gradient-text">Trust</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60"
          >
            Backed by industry-leading certifications and decades of proven
            excellence in electrical panel manufacturing
          </motion.p>
        </div>

        {/* Certification cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 40px rgba(200, 150, 62, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass group relative border-l-2 border-gold/30 rounded-xl p-6 cursor-default"
              >
                {/* Gold tinted icon container */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
                  <Icon className="h-6 w-6 text-gold transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title in gradient text */}
                <h3 className="mb-2 text-lg font-semibold gradient-text">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {cert.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
