'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
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
  Linkedin,
  Twitter,
} from 'lucide-react'

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
    year: 'Present',
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

const teamMembers = [
  {
    name: 'Rajesh Kumar',
    initials: 'RK',
    title: 'Founder & Managing Director',
    description: 'With over 25 years of industry experience, Rajesh founded Natraj Electricals with a vision to revolutionize electrical panel manufacturing in India.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Amit Sharma',
    initials: 'AS',
    title: 'Head of Engineering',
    description: 'A seasoned engineer specializing in control panel design and automation, Amit leads our innovation initiatives and ensures top-notch quality standards.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Priya Mehta',
    initials: 'PM',
    title: 'Director of Operations',
    description: 'Priya oversees end-to-end operations, from procurement to delivery, ensuring every Natraj panel meets our promise of excellence and reliability.',
    linkedin: '#',
    twitter: '#',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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

function useSpotlightMouse() {
  return useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }, [])
}

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const spotlightMouse = useSpotlightMouse()

  return (
    <div ref={ref}>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-charcoal py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,150,62,0.1)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Learn About Us
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            About <span className="gradient-text">Natraj</span>
          </h1>
          <div className="section-divider mx-auto mt-6 w-24" />
        </div>
      </section>

      {/* Company Story - CLEAN, no animated gradient border */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-warm-gray" />
        <div className="gold-gradient-subtle absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gold/10 bg-background/80 p-6 backdrop-blur-sm sm:p-10">
            <div className="text-center">
              <div className="mx-auto mb-8 flex justify-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium text-gold">Delhi, India</span>
              </div>

              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gradient-to-r from-gold/5 to-copper/5 px-5 py-2">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Est. 1998</span>
              </div>

              <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
                Founded with a vision to deliver premium electrical control panels,{' '}
                <strong className="text-foreground">Natraj Electricals</strong> has grown into one of
                Delhi&apos;s most trusted names in electrical panel manufacturing. As an{' '}
                <strong className="text-foreground">ISO 9001:2015 certified</strong> company, we
                specialize in a wide range of electrical panels designed for industrial and
                commercial applications.
              </p>

              {/* Inline stats row */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {inlineStats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="text-xl font-bold gradient-text">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    {i < inlineStats.length - 1 && (
                      <div className="h-4 w-px bg-gold/20" />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-8 text-lg leading-relaxed text-foreground/80 md:text-xl">
                With over <strong className="gradient-text">25 years</strong> of expertise, we
                combine traditional craftsmanship with modern engineering to create panels that are
                safe, reliable, and built to last. Our commitment to{' '}
                <strong className="text-foreground">quality, innovation, and customer satisfaction</strong>{' '}
                drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseMove={spotlightMouse}
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onMouseMove={spotlightMouse}
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

      {/* Team / Leadership */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Our Leadership
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Meet the <span className="gradient-text">Team</span>
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="glass group rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/10"
              >
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/50 bg-gradient-to-br from-gold/10 to-copper/10">
                  <span className="text-2xl font-bold gradient-text">{member.initials}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-gold">{member.title}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{member.description}</p>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <a
                    href={member.linkedin}
                    aria-label={`${member.name} LinkedIn`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={member.twitter}
                    aria-label={`${member.name} Twitter`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                  >
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Our Journey
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Key Milestones</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-px" />

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
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`rounded-xl p-5 md:p-6 transition-all duration-300 ${
                      milestone.current
                        ? 'bg-gold/10 border border-gold/30'
                        : 'bg-white/[0.03] border border-white/[0.06]'
                    }`}>
                      <div className="mb-3 flex items-center gap-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
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
                    </div>
                  </div>

                  <div className="absolute left-4 top-1 -translate-x-1/2 md:left-1/2">
                    <div className={`rounded-full border-2 ${
                      milestone.current
                        ? 'h-4 w-4 border-gold bg-gold'
                        : 'h-3 w-3 border-gold bg-charcoal'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Natraj Advantage */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-warm-gray" />
        <div className="gold-gradient-subtle absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
              The Natraj Advantage
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why We <span className="gradient-text">Stand Out</span>
            </h2>
          </div>

          <div className="mx-auto max-w-3xl glass rounded-2xl p-6 sm:p-8">
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

            <div className="section-divider mb-6" />

            <div className="space-y-0">
              {[
                { label: 'Quality Standards', natraj: 'ISO 9001:2015 Certified', others: 'Basic Compliance' },
                { label: 'Customization', natraj: '100% Tailored to Your Needs', others: 'Standard Options Only' },
                { label: 'After-Sales Support', natraj: '24/7 Dedicated Support', others: 'Limited Business Hours' },
                { label: 'Delivery', natraj: 'Pan-India with Tracking', others: 'Regional Only' },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`grid grid-cols-1 gap-3 py-4 ${i < 3 ? 'border-b border-border/30' : ''} sm:grid-cols-[1fr_1fr]`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground/80">{row.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 rounded-lg border-l-2 border-gold/50 bg-gold/5 px-3 py-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-xs font-medium gradient-text leading-tight">{row.natraj}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                      <XIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                      <span className="text-xs text-muted-foreground leading-tight">{row.others}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-warm-gray" />
        <div className="gold-gradient-subtle absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold">
              What Drives Us
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Our Core <span className="gradient-text">Values</span>
            </h2>
          </div>

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
                  className="glass group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/10"
                >
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 p-3 transition-all duration-300 group-hover:from-gold/20 group-hover:to-copper/20">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mb-2 font-semibold gradient-text">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
