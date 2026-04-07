'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, FileText, Settings, Truck } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Browse & Select',
    subtitle: 'Discover Your Solution',
    description:
      'Explore our comprehensive catalog of 16+ product categories and select the electrical panels that match your requirements.',
  },
  {
    number: 2,
    icon: FileText,
    title: 'Get Custom Quote',
    subtitle: 'Tailored Pricing',
    description:
      'Request a tailored quotation based on your specifications. Our team responds within 24 hours with competitive pricing.',
  },
  {
    number: 3,
    icon: Settings,
    title: 'Quality Assurance',
    subtitle: 'Certified Products',
    description:
      'Every product is sourced from certified manufacturers and undergoes quality checks before dispatch to ensure reliability.',
  },
  {
    number: 4,
    icon: Truck,
    title: 'Delivery & Support',
    subtitle: 'End-to-End Service',
    description:
      'Receive timely pan-India delivery with full after-sales support, installation guidance, and warranty coverage.',
  },
]

const floatAnimations = [
  'animate-float-slow',
  'animate-float-medium',
  'animate-float-fast',
  'animate-float-slow',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const stepVariants = {
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

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) {
  const Icon = step.icon

  return (
    <motion.div
      variants={stepVariants}
      className="relative flex flex-col items-center text-center"
    >
      {/* Step number badge */}
      <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold via-gold-light to-copper shadow-lg shadow-gold/20">
        <span className="text-lg font-bold text-white">{step.number}</span>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-gold/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{
            duration: 2.5,
            delay: index * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Connecting line - hidden on last step */}
      {!isLast && (
        <div className="absolute top-7 left-[calc(50%+1.75rem)] hidden h-0.5 w-[calc(100%-3.5rem)] lg:block">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-gold/60 via-gold/30 to-gold/60 shadow-[0_0_8px_rgba(200,150,62,0.25)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
            style={{ transformOrigin: 'left' }}
          />
          {/* Arrow dot at end */}
          <motion.div
            className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold/40"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.1 + index * 0.2 }}
          />
        </div>
      )}

      {/* Vertical connecting line for mobile */}
      {!isLast && (
        <div className="absolute top-[4.5rem] left-1/2 h-16 w-0.5 -translate-x-1/2 lg:hidden">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-gold/50 via-gold/25 to-gold/50 shadow-[0_0_6px_rgba(200,150,62,0.2)]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      )}

      {/* Icon container with float animation */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20 ${floatAnimations[index]}`}
      >
        <Icon className="h-7 w-7 text-gold" />
      </motion.div>

      {/* Card with card-shine, glow-hover, and enhanced hover */}
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass card-shine glow-hover w-full max-w-xs rounded-2xl p-6 transition-all duration-500 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5"
      >
        <h3 className="smooth-underline mb-1 text-lg font-semibold text-foreground transition-colors duration-300 hover:text-gold">
          {step.title}
        </h3>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold/70">
          {step.subtitle}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-warm-gray" />
      <div className="gold-gradient-subtle absolute inset-0" />

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
            Simple & Seamless
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
          >
            How It <span className="gradient-text">Works</span>
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
            From browsing our catalog to receiving your custom-built panels,
            our streamlined process ensures a hassle-free experience at every
            step.
          </motion.p>
        </div>

        {/* Steps Grid with stagger-in */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="stagger-in grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6"
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
