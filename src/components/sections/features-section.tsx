'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Shield, PackageCheck, Truck, Headphones, Handshake } from 'lucide-react'

const features = [
  {
    icon: PackageCheck,
    title: 'Handpicked Products',
    stat: '50+',
    description:
      'Every product in our catalog is carefully selected from India\'s top brands — ensuring you get only the best quality electrical panels and components.',
  },
  {
    icon: Shield,
    title: 'Certified Quality',
    stat: '99.9%',
    description:
      'We source only ISI-marked and certified products from trusted manufacturers. Quality is non-negotiable.',
  },
  {
    icon: Handshake,
    title: 'Trusted Partnerships',
    stat: '25+ Years',
    description:
      'Over two decades of trusted relationships with leading brands like Siemens, Schneider, ABB, Havells, and more.',
  },
  {
    icon: Award,
    title: 'Competitive Pricing',
    stat: 'Best Value',
    description:
      'As an authorized distributor, we offer the most competitive prices in the market — no middlemen, no inflated costs.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    stat: '5000+',
    description:
      'From Delhi to any corner of India — safe, insured, and timely delivery with proper packaging and tracking.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    stat: '24/7',
    description:
      'Our knowledgeable team is always ready to help you choose the right products and provide technical guidance.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-warm-gray" />
      <div className="gold-gradient-subtle absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            What Sets Us Apart
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Why Choose <span className="gradient-text text-shadow-gold">Natraj</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed tracking-wide"
          >
            India&apos;s trusted electrical panel distributor — quality products, competitive prices, reliable delivery.
          </motion.p>
          <div className="section-divider-elegant" />
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="glass shadow-card-refined card-hover-gold-border card-shine shimmer-hover group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10"
              >
                {/* Icon */}
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 p-3 transition-all duration-300 group-hover:from-gold/20 group-hover:to-copper/20 group-hover:scale-105">
                  <Icon className="h-6 w-6 text-gold" />
                </div>

                {/* Content */}
                <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
                  {feature.title}
                </h3>
                <span className="mb-3 inline-block text-sm font-bold gradient-text">
                  {feature.stat}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground prose-subtle">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-300 group-hover:via-gold/30" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
