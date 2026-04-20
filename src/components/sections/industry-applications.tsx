'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Building2,
  Store,
  Factory,
  HeartPulse,
  GraduationCap,
  Server,
  Hotel,
  Landmark,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const industries = [
  {
    icon: Building2,
    title: 'Residential Buildings',
    description:
      'Comprehensive electrical distribution and safety solutions for apartments, villas, housing complexes, and gated communities.',
    products: ['Distribution Boards', 'Main Switches', 'Water Level Controllers', 'Single Phase Panels'],
  },
  {
    icon: Store,
    title: 'Commercial Complexes',
    description:
      'Reliable power management panels for shopping malls, retail spaces, office buildings, and mixed-use commercial developments.',
    products: ['Three Phase Panels', 'Busbar Systems', 'Power Factor Correction', 'Distribution Boards'],
  },
  {
    icon: Factory,
    title: 'Industrial Plants',
    description:
      'Heavy-duty motor control and power distribution panels engineered for continuous operation in demanding manufacturing environments.',
    products: ['Air Break Starters', 'Oil Immersed Starters', 'Busbar Systems', 'Power Factor Correction'],
  },
  {
    icon: HeartPulse,
    title: 'Hospitals & Healthcare',
    description:
      'Critical power backup and distribution systems ensuring uninterrupted electricity for life-saving medical equipment and facilities.',
    products: ['Automatic Changeovers', 'Distribution Boards', 'Three Phase Panels', 'Temperature Control'],
  },
  {
    icon: GraduationCap,
    title: 'Educational Institutions',
    description:
      'Safe and efficient electrical solutions for schools, colleges, universities, and research laboratories with varied power demands.',
    products: ['Distribution Boards', 'Main Switches', 'Power Factor Correction', 'Digital Instruments'],
  },
  {
    icon: Server,
    title: 'IT Parks & Data Centers',
    description:
      'Precision-engineered panels for critical IT infrastructure with emphasis on power quality, redundancy, and continuous uptime.',
    products: ['Automatic Changeovers', 'Power Factor Correction', 'Busbar Systems', 'Digital Instruments'],
  },
  {
    icon: Hotel,
    title: 'Hotels & Hospitality',
    description:
      'Elegant power distribution and control solutions for hotels, resorts, restaurants, and entertainment venues.',
    products: ['Distribution Boards', 'Three Phase Panels', 'Temperature Control', 'Sequence Timers'],
  },
  {
    icon: Landmark,
    title: 'Government Projects',
    description:
      'ISI-marked panels meeting stringent government standards for public infrastructure, municipal buildings, and PSU projects.',
    products: ['Three Phase Panels', 'Distribution Boards', 'Automatic Changeovers', 'Main Switches'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function IndustryCard({
  industry,
  index,
}: {
  industry: (typeof industries)[0]
  index: number
}) {
  const Icon = industry.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="group relative"
    >
      {/* Gold border glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/40 group-hover:via-gold/20 group-hover:to-gold/40 group-hover:shadow-[0_0_24px_rgba(200,150,62,0.15)]" />

      <div className="glass card-shine relative rounded-2xl p-6 transition-all duration-500">
        {/* Icon */}
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 transition-all duration-300 group-hover:from-gold/20 group-hover:to-copper/20 group-hover:scale-110">
          <Icon className="h-6 w-6 text-gold" />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-gold">
          {industry.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {industry.description}
        </p>

        {/* Product badges */}
        <div className="flex flex-wrap gap-1.5">
          {industry.products.map((product) => (
            <Badge
              key={product}
              className="rounded-full border-gold/20 bg-gold/5 text-[11px] font-medium text-gold/80 transition-colors duration-300 group-hover:border-gold/40 group-hover:bg-gold/10 group-hover:text-gold"
              variant="outline"
            >
              {product}
            </Badge>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/40" />
      </div>
    </motion.div>
  )
}

export default function IndustryApplications() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="industry-applications"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-warm-gray" />
      <div className="gold-gradient-subtle absolute inset-0" />
      <div className="dot-pattern absolute inset-0" />

      {/* Top divider */}
      <div className="absolute left-0 top-0 h-px w-full section-divider" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Trusted Across Sectors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
          >
            Industry <span className="gradient-text">Applications</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mt-6 w-24"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-muted-foreground"
          >
            From residential complexes to government infrastructure, Natraj
            Electrical Control Panel powers critical facilities across every major industry
            sector in India.
          </motion.p>
        </div>

        {/* Industry Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.title}
              industry={industry}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
