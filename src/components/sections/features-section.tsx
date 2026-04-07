'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Shield, Wrench, Settings, Truck, Headphones } from 'lucide-react'
import { FloatingParticles } from '@/components/floating-particles'

const features = [
  {
    icon: Award,
    title: 'ISO 9001:2015 Certified',
    stat: 'ISO Certified',
    description:
      'Our commitment to quality is backed by international certification, ensuring every panel meets the highest industry standards.',
  },
  {
    icon: Shield,
    title: 'Premium Quality Materials',
    stat: '99.9%',
    description:
      'We source only the finest components from trusted brands to build panels that last for decades with minimal maintenance.',
  },
  {
    icon: Wrench,
    title: 'Expert Engineering',
    stat: '25+ Years',
    description:
      'Our team of experienced engineers designs each panel with precision, optimizing for performance, safety, and efficiency.',
  },
  {
    icon: Settings,
    title: 'Custom Solutions',
    stat: '100% Custom',
    description:
      'Every project is unique. We specialize in designing and manufacturing panels tailored to your exact specifications.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    stat: '5000+ Delivered',
    description:
      'From Delhi to any corner of India, we ensure safe and timely delivery of your electrical panels with proper packaging.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    stat: '24/7',
    description:
      'Our dedicated support team is always ready to assist you with technical queries, installation guidance, and after-sales service.',
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

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-warm-gray" />
      <div className="gold-gradient-subtle absolute inset-0" />

      {/* Floating particles */}
      <FloatingParticles count={6} />

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
            Why Choose <span className="gradient-text">Natraj</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mt-6 w-24"
          />
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="glass group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{ boxShadow: '0 0 30px rgba(200,150,62,0.15), 0 0 60px rgba(200,150,62,0.05)' }}
                />

                {/* Icon with float animation */}
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 p-3 transition-all duration-300 group-hover:from-gold/20 group-hover:to-copper/20 group-hover:scale-110">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Icon className="h-6 w-6 text-gold" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
                    {feature.title}
                  </h3>
                  <span className="mb-3 inline-block text-sm font-bold gradient-text">{feature.stat}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/40" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
