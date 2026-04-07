'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap,
  Plug,
  RefreshCw,
  Timer,
  Thermometer,
  Droplets,
  Network,
  Wind,
  ToggleLeft,
  LayoutGrid,
  Waves,
  BarChart3,
  Activity,
  Sun,
  Cpu,
  Radio,
  ArrowRight,
  Package,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/store/use-store'

const categories = [
  { name: 'Three Phase Panels', slug: 'three-phase-panels', icon: Zap, description: 'Industrial-grade motor starters for heavy-duty applications with overload protection.', count: 8 },
  { name: 'Single Phase Summersible Panels', slug: 'single-phase-summersible-panels', icon: Plug, description: 'Reliable single-phase panels for residential and light commercial use.', count: 5 },
  { name: 'Automatic Changeovers', slug: 'automatic-changeovers', icon: RefreshCw, description: 'Seamless power transfer between mains and generator sources.', count: 4 },
  { name: 'Automatic Sequence Timer Panels', slug: 'automatic-sequence-timer-panels', icon: Timer, description: 'Timed sequencing control for multi-stage industrial processes.', count: 3 },
  { name: 'Automatic Temperature Control Panels', slug: 'automatic-temperature-control-panels', icon: Thermometer, description: 'Precision temperature monitoring and control for industrial processes.', count: 3 },
  { name: 'Oil Immersed Starters', slug: 'oil-immersed-starters', icon: Droplets, description: 'Oil-cooled starters for high-power motor applications and heavy loads.', count: 4 },
  { name: 'Busbar', slug: 'busbar', icon: Network, description: 'Efficient power distribution systems for industrial and commercial setups.', count: 3 },
  { name: 'Air Break Starters & Switches', slug: 'air-break-starters-switches', icon: Wind, description: 'Air circuit breakers for reliable short-circuit and overload protection.', count: 4 },
  { name: 'Main Switches & Changeovers', slug: 'main-switches-changeovers', icon: ToggleLeft, description: 'Isolator switches for safe electrical isolation during maintenance.', count: 4 },
  { name: 'A.C. Box & Socket Type Distribution Panels', slug: 'ac-box-socket-type-distribution-panels', icon: LayoutGrid, description: 'Organized power distribution boards for multi-circuit management.', count: 3 },
  { name: 'Automatic Water Level Controllers', slug: 'automatic-water-level-controllers', icon: Waves, description: 'Automatic water level controllers for tanks and overhead storage.', count: 2 },
  { name: 'Digital Measuring Instruments', slug: 'digital-measuring-instruments', icon: BarChart3, description: 'Digital instruments for accurate voltage, current, and power measurement.', count: 4 },
  { name: 'Power Factor Correction Panels', slug: 'power-factor-correction-panels', icon: Activity, description: 'Capacitor banks and APFC panels for power factor improvement.', count: 3 },
  { name: 'Solar Panels', slug: 'solar-panels', icon: Sun, description: 'Solar power panels and inverters for renewable energy solutions.', count: 3 },
  { name: 'VFD & Soft Starters', slug: 'vfd-soft-starters', icon: Cpu, description: 'Variable frequency drives for energy-efficient motor speed control.', count: 4 },
  { name: 'Synchronizing Panels', slug: 'synchronizing-panels', icon: Radio, description: 'Panels for synchronizing multiple power sources seamlessly.', count: 2 },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function CategoriesShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { setCurrentPage, setSelectedCategory } = useStore()

  const handleExplore = (slug: string) => {
    setSelectedCategory(slug)
    setCurrentPage('products')
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Browse All
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Our Product <span className="gradient-text">Range</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-white/50 md:text-lg"
          >
            From basic distribution panels to advanced control systems
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-divider mx-auto mt-6 w-24"
          />
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.slug}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 card-shine"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/10 group-hover:via-transparent group-hover:to-copper/10" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-copper/15 transition-colors group-hover:from-gold/25 group-hover:to-copper/25">
                      <Icon className="h-5 w-5 text-gold transition-transform group-hover:scale-110" />
                    </div>
                    <Badge className="bg-white/[0.06] text-white/60 border-white/[0.08] text-[10px] font-medium">
                      <Package className="mr-1 h-3 w-3" />
                      {cat.count}
                    </Badge>
                  </div>

                  <h3 className="mb-1.5 text-sm font-semibold text-white/90 leading-tight transition-colors group-hover:text-gold">
                    {cat.name}
                  </h3>

                  <p className="mb-4 flex-1 text-xs leading-relaxed text-white/40 line-clamp-2">
                    {cat.description}
                  </p>

                  <button
                    onClick={() => handleExplore(cat.slug)}
                    className="flex items-center gap-1 text-xs font-medium text-gold/60 transition-colors group-hover:text-gold w-fit"
                  >
                    Explore
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
