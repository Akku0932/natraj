'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Award, PackageCheck, Truck, Headphones, TrendingDown } from 'lucide-react'

const advantages = [
  {
    icon: Calendar,
    title: '25+ Years Experience',
    description: 'Serving businesses across India since 1998 with trusted electrical distribution',
  },
  {
    icon: Award,
    title: 'Authorized Distributor',
    description: 'Official partner of top brands — ISI, BIS, and CE certified products only',
  },
  {
    icon: PackageCheck,
    title: 'Wide Product Range',
    description: '16+ categories of electrical panels and components from leading manufacturers',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    description: 'Safe and insured delivery to every corner of India with tracking',
  },
  {
    icon: Headphones,
    title: 'Expert Guidance',
    description: 'Knowledgeable team to help you select the right products for your needs',
  },
  {
    icon: TrendingDown,
    title: 'Best Prices',
    description: 'Competitive wholesale pricing — direct from brands, no extra markups',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Why Choose
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            <span className="gradient-text">Natraj</span> Electrical Control Panel
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60"
          >
            Your reliable distribution partner for quality electrical products
          </motion.p>
        </div>

        {/* Advantage cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.title}
              variants={itemVariants}
              whileHover={{
                borderColor: 'rgba(200, 150, 62, 0.3)',
                boxShadow: '0 4px 20px rgba(200, 150, 62, 0.1)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 transition-colors duration-300"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                <advantage.icon className="h-6 w-6 text-gold" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-white">
                {advantage.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseSection
