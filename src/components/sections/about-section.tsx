'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import {
  Award,
  Lightbulb,
  ShieldCheck,
  Heart,
  Target,
  Eye,
  Calendar,
  MapPin,
  Check,
  X as XIcon,
} from 'lucide-react'
import { FloatingParticles } from '@/components/floating-particles'

const milestones = [
  {
    year: '1998',
    title: 'Foundation',
    description:
      'Natraj Electricals was founded in the heart of Delhi with a vision to deliver premium electrical control panels to the Indian market.',
  },
  {
    year: '2008',
    title: 'ISO Certification',
    description:
      'Achieved ISO 9001:2015 certification, validating our commitment to quality management and international manufacturing standards.',
  },
  {
    year: '2018',
    title: 'Pan-India Expansion',
    description:
      'Expanded operations to serve clients across India, with over 5000+ panels delivered to industrial and commercial projects nationwide.',
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description:
      'Launched smart control panel solutions and embraced modern automation technologies to meet the evolving needs of our clients.',
  },
  {
    year: '2024 - Present',
    title: 'Smart Manufacturing',
    current: true,
    description:
      'Pioneering IoT-enabled smart panels and digital manufacturing to lead the next era of electrical control solutions in India.',
  },
]

const values = [
  {
    icon: Award,
    title: 'Quality',
    description: 'Uncompromising quality in every panel we manufacture, backed by rigorous testing and certification.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Continuously evolving our designs and adopting new technologies to deliver cutting-edge solutions.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliability',
    description: 'Building panels that stand the test of time, with a proven track record spanning over 25 years.',
  },
  {
    icon: Heart,
    title: 'Customer Focus',
    description: 'Every panel is built around our customers\' needs, with personalized service and dedicated support.',
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const inlineStats = [
  { value: '25+', label: 'Years' },
  { value: '5000+', label: 'Panels' },
  { value: '200+', label: 'Clients' },
  { value: '16', label: 'Categories' },
]

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -6
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 6
      x.set(rotateX)
      y.set(rotateY)
    },
    [x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      style={{ rotateX: springX, rotateY: springY, perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Timeline scroll-based progress bar
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  })
  const timelineHeight = useTransform(timelineProgress, [0.1, 0.8], ['0%', '100%'])

  return (
    <div ref={ref}>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-charcoal py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,150,62,0.1)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Learn About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            About <span className="gradient-text">Natraj</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mt-6 w-24"
          />
        </div>
      </section>

      {/* Company Story */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-warm-gray" />
        <div className="gold-gradient-subtle absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <div className="mx-auto mb-8 flex justify-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium text-gold">Delhi, India</span>
              </div>
              <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
                Founded with a vision to deliver premium electrical control panels,{' '}
                <strong className="text-foreground">Natraj Electricals</strong> has grown into one of
                Delhi&apos;s most trusted names in electrical panel manufacturing. As an{' '}
                <strong className="text-foreground">ISO 9001:2015 certified</strong> company, we
                specialize in a wide range of electrical panels designed for industrial and
                commercial applications.
              </p>

              {/* Inline stats row with gold separators */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6"
              >
                {inlineStats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <div className="text-center">
                      <span className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</span>
                      <span className="ml-1 text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    {i < inlineStats.length - 1 && (
                      <div className="h-4 w-[2px] rounded-full bg-gold/30" />
                    )}
                  </div>
                ))}
              </motion.div>

              <p className="mt-8 text-lg leading-relaxed text-foreground/80 md:text-xl">
                With over <strong className="gradient-text">25 years</strong> of expertise, we
                combine traditional craftsmanship with modern engineering to create panels that are
                safe, reliable, and built to last. Our commitment to{' '}
                <strong className="text-foreground">quality, innovation, and customer satisfaction</strong>{' '}
                drives everything we do — from the initial design consultation to the final delivery
                and after-sales support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-background" />
        <FloatingParticles count={4} className="z-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 md:p-10"
            >
              <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 p-3">
                <Target className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="text-foreground/70 leading-relaxed">
                To engineer and deliver electrical control panels of uncompromising quality that
                empower industries and businesses across India. We are committed to providing
                innovative, safe, and reliable solutions that exceed our clients&apos; expectations
                while maintaining the highest standards of manufacturing excellence.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-2xl p-8 md:p-10"
            >
              <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 p-3">
                <Eye className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">Our Vision</h3>
              <p className="text-foreground/70 leading-relaxed">
                To be India&apos;s most trusted and preferred electrical panel manufacturer, recognized
                for our engineering excellence, customer-centric approach, and sustainable practices.
                We envision a future where every connection is powered by Natraj — delivering
                reliability that industries can count on, day after day, year after year.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Our Journey
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Key Milestones</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline base line (always visible, faded) */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-translate-x-px" />

            {/* Animated progress bar that fills as user scrolls */}
            <motion.div
              className="absolute left-4 top-0 w-px bg-gradient-to-b from-gold/60 via-gold/40 to-gold/20 md:left-1/2 md:-translate-x-px"
              style={{ height: timelineHeight }}
            />

            {/* Small gold dot that moves with scroll progress */}
            <motion.div
              className="absolute left-4 -translate-x-1/2 md:left-1/2"
              style={{ top: timelineHeight }}
            >
              <div className="h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gold shadow-lg shadow-gold/50">
                <div className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-12"
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content - Glass card effect */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className={`relative overflow-hidden rounded-xl p-5 md:p-6 transition-all duration-300 ${
                        milestone.current
                          ? 'bg-gold/10 border border-gold/30 shadow-lg shadow-gold/10'
                          : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-gold/20'
                      }`}
                    >
                      {/* Gold gradient top border for glass card */}
                      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                      <div className="flex items-center gap-2 mb-3" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1">
                          <Calendar className="h-3.5 w-3.5 text-gold" />
                          <span className="text-sm font-semibold text-gold">{milestone.year}</span>
                        </div>
                        {milestone.current && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-400 border border-green-500/30">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white">{milestone.title}</h3>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline dot with pulse animation */}
                  <div className="absolute left-4 top-1 -translate-x-1/2 md:left-1/2">
                    <motion.div
                      className={`rounded-full border-2 ${
                        milestone.current
                          ? 'h-4 w-4 border-gold bg-gold'
                          : 'h-3 w-3 border-gold bg-charcoal'
                      }`}
                      animate={
                        milestone.current
                          ? {
                              boxShadow: [
                                '0 0 0 0 rgba(200,150,62,0.5)',
                                '0 0 0 10px rgba(200,150,62,0)',
                                '0 0 0 0 rgba(200,150,62,0.5)',
                              ],
                              scale: [1, 1.1, 1],
                            }
                          : {
                              boxShadow: [
                                '0 0 0 0 rgba(200,150,62,0)',
                                '0 0 0 6px rgba(200,150,62,0.3)',
                                '0 0 0 0 rgba(200,150,62,0)',
                              ],
                            }
                      }
                      transition={{
                        duration: milestone.current ? 1.5 : 2.5,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    {!milestone.current && (
                      <motion.div
                        className="absolute inset-0 h-3 w-3 rounded-full bg-gold/40"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                          duration: 2.5,
                          delay: index * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Natraj Advantage - Comparison Table */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-warm-gray" />
        <div className="gold-gradient-subtle absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
              The Natraj Advantage
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why We <span className="gradient-text">Stand Out</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl glass rounded-2xl p-6 sm:p-8"
          >
            {/* Column headers */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr]">
              <div />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="text-sm font-bold gradient-text">Natraj Electricals</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-muted-foreground">Typical Competitors</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="section-divider mb-6" />

            {/* Comparison rows */}
            <div className="space-y-0">
              {[
                {
                  label: 'Quality Standards',
                  natraj: 'ISO 9001:2015 Certified',
                  others: 'Basic Compliance',
                },
                {
                  label: 'Customization',
                  natraj: '100% Tailored to Your Needs',
                  others: 'Standard Options Only',
                },
                {
                  label: 'After-Sales Support',
                  natraj: '24/7 Dedicated Support',
                  others: 'Limited Business Hours',
                },
                {
                  label: 'Delivery',
                  natraj: 'Pan-India with Tracking',
                  others: 'Regional Only',
                },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`grid grid-cols-1 gap-3 py-4 ${i < 3 ? 'border-b border-border/30' : ''} sm:grid-cols-[1fr_1fr]`}
                >
                  {/* Label */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground/80">{row.label}</span>
                  </div>
                  {/* Values */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Natraj column */}
                    <div className="flex items-center gap-2 rounded-lg border-l-2 border-gold/50 bg-gold/5 px-3 py-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-xs font-medium gradient-text leading-tight">{row.natraj}</span>
                    </div>
                    {/* Others column */}
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                      <XIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                      <span className="text-xs text-muted-foreground leading-tight">{row.others}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-warm-gray" />
        <div className="gold-gradient-subtle absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
              What Drives Us
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Our Core <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                >
                  <TiltCard className="glass group rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/10">
                    <div className="mx-auto mb-4 inline-flex rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 p-3 transition-all duration-300 group-hover:from-gold/20 group-hover:to-copper/20 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </TiltCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
