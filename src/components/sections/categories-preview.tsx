'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Plug,
  RefreshCw,
  Thermometer,
  Droplets,
  Network,
  Wind,
  ToggleLeft,
  LayoutGrid,
  Waves,
  BarChart3,
  Activity,
  Power,
  Sun,
  Box,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/store/use-store'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  productCount: number
}

// Map category names to icons
function getCategoryIcon(name: string) {
  const lowerName = name.toLowerCase()

  if (lowerName.includes('three phase')) return Zap
  if (lowerName.includes('single phase')) return Plug
  if (lowerName.includes('automatic')) return RefreshCw
  if (lowerName.includes('temperature')) return Thermometer
  if (lowerName.includes('oil')) return Droplets
  if (lowerName.includes('busbar')) return Network
  if (lowerName.includes('air break')) return Wind
  if (lowerName.includes('main switch')) return ToggleLeft
  if (lowerName.includes('distribution')) return LayoutGrid
  if (lowerName.includes('water level')) return Waves
  if (lowerName.includes('measuring')) return BarChart3
  if (lowerName.includes('power factor')) return Activity
  if (lowerName.includes('mains')) return Power
  if (lowerName.includes('solar')) return Sun
  return Box
}

// Map category names to short descriptions
function getCategoryDescription(name: string): string {
  const lowerName = name.toLowerCase()

  if (lowerName.includes('three phase')) return 'Industrial-grade motor starters for heavy-duty applications with overload protection.'
  if (lowerName.includes('single phase')) return 'Reliable single-phase panels for residential and light commercial use.'
  if (lowerName.includes('automatic')) return 'Seamless power transfer between mains and generator sources automatically.'
  if (lowerName.includes('temperature')) return 'Precision temperature monitoring and control for industrial processes.'
  if (lowerName.includes('oil')) return 'Oil-cooled starters for high-power motor applications and heavy loads.'
  if (lowerName.includes('busbar')) return 'Efficient power distribution systems for industrial and commercial setups.'
  if (lowerName.includes('air break')) return 'Air circuit breakers for reliable short-circuit and overload protection.'
  if (lowerName.includes('main switch')) return 'Isolator switches for safe electrical isolation during maintenance.'
  if (lowerName.includes('distribution')) return 'Organized power distribution boards for multi-circuit management.'
  if (lowerName.includes('water level')) return 'Automatic water level controllers for tanks and overhead storage.'
  if (lowerName.includes('measuring')) return 'Digital instruments for accurate voltage, current, and power measurement.'
  if (lowerName.includes('power factor')) return 'Capacitor banks and APFC panels for power factor improvement.'
  if (lowerName.includes('mains')) return 'Main incoming panels for total building or facility power management.'
  if (lowerName.includes('solar')) return 'Solar power panels and inverters for renewable energy solutions.'
  return 'High-quality electrical panels and equipment for various applications.'
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
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

export default function CategoriesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { setCurrentPage, setSelectedCategory } = useStore()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data.slice(0, 8)) // Show top 8
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug)
    setCurrentPage('products')
  }

  const handleViewAll = () => {
    setSelectedCategory(null)
    setCurrentPage('products')
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-background" />

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
            Explore
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Our Product <span className="gradient-text">Range</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mt-6 w-24"
          />
        </div>

        {/* Category Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl bg-muted/50"
              />
            ))}
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.name)
              const description = getCategoryDescription(category.name)
              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 cursor-pointer"
                >
                  {/* Gold gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/10 group-hover:via-transparent group-hover:to-copper/10" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon and product count */}
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 transition-colors group-hover:from-gold/20 group-hover:to-copper/20">
                        <IconComponent className="h-5 w-5 text-gold transition-transform group-hover:scale-110" />
                      </div>
                      <Badge className="bg-gradient-to-r from-gold/10 to-copper/10 text-gold border-gold/20 text-[10px] font-medium">
                        <Package className="mr-1 h-3 w-3" />
                        {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>

                    {/* Category name */}
                    <h3 className="mb-2 text-sm font-semibold text-foreground transition-colors group-hover:text-gold leading-tight">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {description}
                    </p>

                    {/* View Products link */}
                    <div className="flex items-center gap-1 text-xs font-medium text-gold/70 transition-colors group-hover:text-gold">
                      View Products
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            onClick={handleViewAll}
            variant="outline"
            size="lg"
            className="group border-gold/30 text-gold hover:bg-gold hover:text-white"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
