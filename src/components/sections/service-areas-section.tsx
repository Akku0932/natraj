'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Building, Truck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { FloatingParticles } from '@/components/floating-particles'
import { Button } from '@/components/ui/button'

interface ServiceArea {
  city: string
  tagline: string
  isHeadquarters?: boolean
}

const serviceAreas: ServiceArea[] = [
  { city: 'Delhi NCR', tagline: 'Bhagirath Place, Delhi', isHeadquarters: true },
  { city: 'Mumbai', tagline: 'Commercial Capital' },
  { city: 'Bangalore', tagline: 'Silicon Valley of India' },
  { city: 'Chennai', tagline: 'Manufacturing Hub' },
  { city: 'Hyderabad', tagline: 'Tech City' },
  { city: 'Kolkata', tagline: 'Eastern Gateway' },
  { city: 'Pune', tagline: 'Industrial Center' },
  { city: 'Ahmedabad', tagline: 'Growth Engine' },
  { city: 'Jaipur', tagline: 'Pink City' },
  { city: 'Lucknow', tagline: 'City of Nawabs' },
  { city: 'Chandigarh', tagline: 'Beautiful City' },
  { city: 'Gurugram', tagline: 'Millennium City' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ServiceAreasSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="service-areas"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Warm gray background */}
      <div className="absolute inset-0 bg-warm-gray" />
      <div className="absolute inset-0 gold-gradient-subtle" />

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Floating particles */}
      <FloatingParticles count={3} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Pan-India Service Network
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
          >
            Serving <span className="gradient-text">Pan-India</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            From Kashmir to Kanyakumari
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>

        {/* Service area cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {serviceAreas.map((area) => (
            <motion.div
              key={area.city}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -4,
                borderColor: 'rgba(200, 150, 62, 0.3)',
                boxShadow: '0 0 30px rgba(200, 150, 62, 0.15)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="card-shine group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-colors duration-300 dark:bg-white/[0.03] dark:border-white/[0.06]"
            >
              {/* Icon in gold circle */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {area.city}
                    </h3>
                    {area.isHeadquarters && (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold ring-1 ring-gold/20">
                        Headquarters
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {area.tagline}
                  </p>
                </div>
              </div>

              {/* Check indicator */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-gold/70" />
                <span>Active service area</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14"
        >
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold/15 bg-white/60 px-6 py-8 backdrop-blur-sm sm:flex-row dark:bg-charcoal/60 dark:border-gold/10">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <Truck className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Don&apos;t see your city?
                </p>
                <p className="text-sm text-muted-foreground">
                  We deliver nationwide!
                </p>
              </div>
            </div>
            <Button className="gap-2 gold-gradient text-white hover:opacity-90 dark:text-charcoal shrink-0">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
