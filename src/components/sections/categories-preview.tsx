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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
                className="h-32 animate-pulse rounded-2xl bg-muted/50"
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
              return (
                <motion.button
                  key={category.id}
                  variants={cardVariants}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 animate-sparkle-sweep"
                >
                  {/* Gold gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/10 group-hover:via-transparent group-hover:to-copper/10" />

                  <div className="relative z-10">
                    <h3 className="mb-2 flex items-center gap-2.5 font-semibold text-foreground transition-colors group-hover:text-gold">
                      <IconComponent className="h-4 w-4 shrink-0 text-gold/60 transition-colors group-hover:text-gold" />
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gold/0 transition-all duration-300 group-hover:text-gold group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.button>
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
