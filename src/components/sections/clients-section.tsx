'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const clients = [
  { name: 'L&T Construction', industry: 'Engineering & Construction' },
  { name: 'Tata Projects', industry: 'Infrastructure' },
  { name: 'DLF Limited', industry: 'Real Estate' },
  { name: 'NHAI', industry: 'Highway Authority' },
  { name: 'Siemens', industry: 'Electrical Engineering' },
  { name: 'Schneider Electric', industry: 'Energy Management' },
  { name: 'Adani Group', industry: 'Conglomerate' },
  { name: 'Godrej & Boyce', industry: 'Industrial Solutions' },
  { name: 'Reliance Industries', industry: 'Diversified' },
  { name: 'Shapoorji Pallonji', industry: 'Construction' },
]

export function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative overflow-hidden bg-muted/30 py-16 md:py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Trusted By
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
          >
            Industry <span className="gradient-text">Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Proud partners with India&apos;s most prestigious organizations
          </motion.p>
        </div>
      </div>

      {/* Auto-scrolling logo strip with fade edges */}
      <div className="relative">
        {/* Left fade mask */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-muted/30 to-transparent md:w-32" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-muted/30 to-transparent md:w-32" />

        {/* Scrolling container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="stagger-in flex gap-4 md:gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 35,
                ease: 'linear',
              },
            }}
          >
            {/* First set of logos */}
            {clients.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
            {/* Duplicate set for seamless loop */}
            {clients.map((client) => (
              <ClientCard key={`${client.name}-dup`} client={client} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle gold gradient overlay at bottom for depth */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gold/[0.03] to-transparent" />
    </section>
  )
}

function ClientCard({ client }: { client: (typeof clients)[0] }) {
  const initial = client.name.charAt(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  return (
    <div
      onMouseMove={handleMouseMove}
      className="glass-gold card-shine spotlight-card glow-hover group flex h-24 w-40 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-border/50 px-4 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 md:h-28 md:w-52 md:px-6"
    >
      {/* Gold initial badge */}
      <div className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gradient-to-br from-gold/10 to-copper/10 transition-all duration-300 group-hover:from-gold/20 group-hover:to-copper/20 group-hover:border-gold/40 group-hover:shadow-md group-hover:shadow-gold/10">
        <span className="text-xs font-bold text-gold">{initial}</span>
      </div>
      <span className="smooth-underline text-sm font-bold text-muted-foreground transition-colors duration-300 group-hover:text-gold md:text-base text-center">
        {client.name}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors duration-300 group-hover:text-gold/60 md:text-xs">
        {client.industry}
      </span>
    </div>
  )
}

export default ClientsSection
