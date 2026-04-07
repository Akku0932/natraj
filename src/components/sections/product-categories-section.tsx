'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, X, ArrowRight, Zap, LayoutGrid, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/store/use-store'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  productCount: number
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ProductCategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { setCurrentPage, setSelectedCategory } = useStore()

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      } else {
        setError('Failed to load categories')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      setSearchQuery(searchInput)
    }, 250)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [searchInput])

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories
    const q = searchQuery.toLowerCase()
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.description?.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q)
    )
  }, [categories, searchQuery])

  // Stats
  const totalProducts = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.productCount, 0),
    [categories]
  )

  const handleCategoryClick = (slug: string) => {
    setCurrentPage('products')
    setSelectedCategory(slug)
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28" id="categories">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
        <div className="dot-pattern absolute inset-0 opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12 text-center md:mb-16"
        >
          {/* Decorative line */}
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40 md:w-20" />
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
              <LayoutGrid className="h-4 w-4 text-gold" />
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40 md:w-20" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Product <span className="gradient-text">Categories</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Browse our comprehensive range of {totalProducts} products across{' '}
            {categories.length} specialized categories
          </p>
        </motion.div>

        {/* Search / Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10"
        >
          <div className="mx-auto max-w-xl">
            <div className="group relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-gold" />
              <Input
                ref={inputRef}
                placeholder="Search categories..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-12 rounded-xl border-border/60 bg-card pl-11 pr-11 text-sm shadow-sm transition-all duration-200 focus-visible:border-gold/50 focus-visible:ring-gold/30 focus-visible:ring-offset-0"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2.5 text-center text-sm text-muted-foreground">
                Showing{' '}
                <span className="font-medium text-foreground">
                  {filteredCategories.length}
                </span>{' '}
                {filteredCategories.length === 1 ? 'category' : 'categories'}
                {searchQuery && (
                  <>
                    {' '}
                    for &ldquo;
                    <span className="text-gold">{searchQuery}</span>&rdquo;
                  </>
                )}
              </p>
            )}
          </div>
        </motion.div>

        {/* Error State */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-800/50">
              <AlertCircle className="h-9 w-9 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Something went wrong
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <Button
              onClick={fetchCategories}
              variant="outline"
              className="mt-5 border-gold/30 text-gold hover:bg-gold/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </motion.div>
        ) : loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border/50 bg-card"
              >
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-2 h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                <LayoutGrid className="h-7 w-7 text-gold/60" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No categories found
            </h3>
            <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
              No categories match &ldquo;<span className="text-gold">{searchQuery}</span>&rdquo;.
              Try adjusting your search or browse all categories.
            </p>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="mt-5 border-gold/30 text-gold hover:bg-gold/10"
            >
              <Search className="mr-2 h-4 w-4" />
              Clear Search
            </Button>
          </motion.div>
        ) : (
          /* Categories Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5"
                onClick={() => handleCategoryClick(category.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCategoryClick(category.slug)
                  }
                }}
              >
                {/* Card shine effect */}
                <div className="card-shine absolute inset-0 z-10 rounded-2xl pointer-events-none" />

                {/* Image */}
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-muted/30"
                  data-category-img={category.id}
                >
                  {category.image ? (
                    <>
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        onError={() => {
                          const el = document.querySelector(
                            `[data-category-img="${category.id}"]`
                          )
                          if (el) {
                            const img = el.querySelector('img')
                            if (img) (img as HTMLElement).style.display = 'none'
                            const fallback = el.querySelector('.image-fallback')
                            if (fallback) (fallback as HTMLElement).style.display = 'flex'
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </>
                  ) : null}

                  {/* Fallback placeholder */}
                  <div
                    className="image-fallback absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal via-slate-dark to-charcoal"
                    style={{ display: category.image ? 'none' : 'flex' }}
                  >
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10">
                        <Zap className="h-7 w-7 text-gold/50" />
                      </div>
                      <p className="mt-3 text-xs font-medium text-white/40 tracking-wider uppercase">
                        {category.slug.replace(/-/g, ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Product count badge */}
                  <div className="absolute right-3 top-3 z-10">
                    <Badge className="bg-charcoal/70 text-gold-light backdrop-blur-md border-0 text-[11px] font-semibold hover:bg-charcoal/70 shadow-lg">
                      {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                    </Badge>
                  </div>

                  {/* Hover overlay CTA */}
                  <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-transparent px-4 pb-4 pt-12">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-light">
                        View All Products
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-20 p-5">
                  {/* Category name with gold gradient */}
                  <h3 className="mb-2 text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-gold">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {category.description || `${category.name} — Premium quality electrical control panels and components.`}
                  </p>

                  {/* View Products button */}
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategoryClick(category.slug)
                      }}
                    >
                      View Products
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Button>

                    {/* Subtle product count for desktop */}
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {category.productCount} items
                    </span>
                  </div>
                </div>

                {/* Bottom gold accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/60" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA when categories are loaded */}
        {!loading && !error && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 text-center md:mt-16"
          >
            <div className="section-divider mx-auto mb-8 max-w-xs" />
            <Button
              size="lg"
              onClick={() => {
                setCurrentPage('products')
                setSelectedCategory(null)
              }}
              className="gold-gradient border-0 text-white shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-gold/40 hover:scale-[1.02]"
            >
              <LayoutGrid className="mr-2.5 h-5 w-5" />
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
