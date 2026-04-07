'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Shield,
  Award,
  CheckCircle2,
  Globe,
  Building2,
  TrendingUp,
  Zap,
  Factory,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const certifications = [
  {
    icon: Shield,
    label: 'ISO 9001:2015',
    description: 'Quality Management System',
  },
  {
    icon: CheckCircle2,
    label: 'ISI Mark',
    description: 'Indian Standards Certified',
  },
  {
    icon: Award,
    label: 'BIS',
    description: 'Bureau of Indian Standards',
  },
  {
    icon: Globe,
    label: 'CE Certified',
    description: 'European Conformity',
  },
]

const brandPartners = [
  { name: 'Siemens', tagline: 'Electrical Engineering' },
  { name: 'Schneider Electric', tagline: 'Energy Management' },
  { name: 'ABB', tagline: 'Power & Automation' },
  { name: 'L&T', tagline: 'Engineering & Construction' },
  { name: 'Havells', tagline: 'Switchgear & Lighting' },
  { name: 'Legrand', tagline: 'Electrical Infrastructure' },
]

const associations = [
  {
    icon: Building2,
    label: 'IEEMA',
    description: 'Indian Electrical & Electronics Manufacturers\' Association',
  },
  {
    icon: TrendingUp,
    label: 'CII',
    description: 'Confederation of Indian Industry',
  },
  {
    icon: Factory,
    label: 'FICCI',
    description: 'Federation of Indian Chambers of Commerce & Industry',
  },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CertificationBadge({
  cert,
}: {
  cert: (typeof certifications)[0]
}) {
  const Icon = cert.icon
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(200,150,62,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="glass-gold card-shine glow-hover group relative flex flex-col items-center gap-3 rounded-xl border border-gold/20 p-5 sm:p-6"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gradient-to-br from-gold/15 to-copper/10 transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-lg group-hover:shadow-gold/10">
        <Icon className="h-7 w-7 text-gold transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-center text-base font-semibold leading-tight gradient-text sm:text-lg">
        {cert.label}
      </h3>
      <p className="text-center text-xs leading-relaxed text-white/50 sm:text-sm">
        {cert.description}
      </p>
    </motion.div>
  )
}

function BrandCard({ brand }: { brand: (typeof brandPartners)[0] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(200,150,62,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="glass-gold card-shine glow-hover group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-gold/20 px-4 py-6 sm:px-6 sm:py-8"
    >
      {/* Stylized initial monogram */}
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/25 bg-gradient-to-br from-gold/15 to-copper/10 transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-lg group-hover:shadow-gold/10 sm:h-14 sm:w-14">
        <span className="text-lg font-bold text-gold sm:text-xl">
          {brand.name.charAt(0)}
        </span>
      </div>

      <h3 className="text-center text-sm font-bold tracking-wide text-white/85 transition-colors duration-300 group-hover:text-white sm:text-base">
        {brand.name}
      </h3>
      <p className="text-center text-[10px] font-medium uppercase tracking-widest text-gold/50 transition-colors duration-300 group-hover:text-gold/70 sm:text-xs">
        {brand.tagline}
      </p>

      {/* Decorative bottom accent line */}
      <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0 transition-all duration-500 group-hover:w-3/4" />
    </motion.div>
  )
}

function AssociationBadge({
  association,
}: {
  association: (typeof associations)[0]
}) {
  const Icon = association.icon
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(200,150,62,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="glass-gold card-shine glow-hover group relative flex flex-col items-center gap-3 rounded-xl border border-gold/20 p-5 sm:p-6"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gradient-to-br from-gold/15 to-copper/10 transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-lg group-hover:shadow-gold/10 sm:h-14 sm:w-14">
        <Icon className="h-6 w-6 text-gold transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7" />
      </div>
      <h3 className="text-center text-lg font-bold tracking-wide gradient-text sm:text-xl">
        {association.label}
      </h3>
      <p className="text-center text-xs leading-relaxed text-white/45 sm:text-sm">
        {association.description}
      </p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Gold gradient divider                                              */
/* ------------------------------------------------------------------ */

function GoldDivider() {
  return (
    <div className="premium-divider mx-auto my-10 max-w-xl sm:my-12 md:my-14">
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/40" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function PartnerLogosSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 dot-pattern opacity-50" />

      {/* Gold gradient divider at top of section */}
      <div className="absolute left-0 top-0 h-px w-full section-divider" />
      <div className="absolute left-1/2 top-0 z-20 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---- Section header ---- */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          {/* Decorative rotating ring */}
          <div className="pointer-events-none absolute left-1/2 top-8 z-0 -translate-x-1/2">
            <motion.div
              className="h-28 w-28 rounded-full border border-gold/10"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.25, 0.5, 0.25],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border border-gold/5"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.15, 0.4, 0.15],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Partnerships &amp; Certifications
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Trusted By Industry{' '}
            <span className="gradient-text">Leaders</span>
          </motion.h2>
          <div className="premium-divider relative z-10 mx-auto mt-6 w-32">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/50" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 mt-4 text-white/55"
          >
            Certified quality, global partnerships, and active industry membership
            that reflect our commitment to excellence
          </motion.p>
        </div>

        {/* ---- Row 1: Certification Badges ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6"
        >
          {certifications.map((cert) => (
            <CertificationBadge key={cert.label} cert={cert} />
          ))}
        </motion.div>

        <GoldDivider />

        {/* ---- Row 2: Brand Partner Logos ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-5"
        >
          {brandPartners.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </motion.div>

        <GoldDivider />

        {/* ---- Row 3: Association Badges ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6"
        >
          {associations.map((association) => (
            <AssociationBadge key={association.label} association={association} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
