'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Star, MessageCircle, Eye, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/store/use-store'

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  usage: string | null
  features: string
  price: number | null
  featured: boolean
  category: {
    id: string
    name: string
    slug: string
  }
  images: string
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { setProductDetailOpen, setSelectedProduct, setCurrentPage, setSelectedCategory } = useStore()

  useEffect(() => {
    let cancelled = false
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/products?featured=true&limit=6')
        if (!res.ok) {
          if (!cancelled) {
            setError(true)
            setLoading(false)
          }
          return
        }
        const data = await res.json()
        if (!cancelled) {
          setProducts(data.slice(0, 6))
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }
    fetchFeatured()
    return () => { cancelled = true }
  }, [])

  const handleViewProduct = (slug: string) => {
    setSelectedProduct(slug)
    setProductDetailOpen(true)
  }

  const handleCategoryClick = (slug: string) => {
    setCurrentPage('products')
    setSelectedCategory(slug)
  }

  const parseImages = (imagesStr: string): string[] => {
    try {
      const parsed = JSON.parse(imagesStr)
      return Array.isArray(parsed) ? parsed.filter((img: string) => img.length > 0) : []
    } catch {
      return []
    }
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Our Selection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Handpicked <span className="gradient-text">Featured Products</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            Quality products from India&apos;s leading brands — carefully selected for reliability and performance.
          </motion.p>
          <div className="section-divider mx-auto mt-6 w-24" />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
                <div className="aspect-square animate-pulse bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                  <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
                  <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => {
              const images = parseImages(product.images)
              const hasImage = images.length > 0

              return (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className="glass group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-muted transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-gold/10">
                    {hasImage ? (
                      <Image
                        src={images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Star className="h-12 w-12 text-gold/30" />
                      </div>
                    )}

                    {/* Featured badge */}
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-gold/90 text-white border-0 text-[11px] font-semibold shadow-sm">
                        <Star className="mr-1 h-3 w-3 fill-current" />
                        Featured
                      </Badge>
                    </div>

                    {/* Quick action overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleViewProduct(product.slug) }}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                        aria-label="View details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    <button
                      onClick={() => handleCategoryClick(product.category.slug)}
                      className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold/80"
                    >
                      {product.category.name}
                    </button>

                    {/* Name */}
                    <h3 className="mb-2 text-base font-semibold text-foreground line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Price */}
                    {product.price ? (
                      <p className="text-lg font-bold text-foreground">
                        ₹{product.price.toLocaleString('en-IN')}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">excl. GST</span>
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-gold">Contact for Price</p>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => handleViewProduct(product.slug)}
                        variant="outline"
                        className="flex-1 border-border/50 text-sm hover:bg-accent"
                      >
                        View Details
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700 border-0"
                      >
                        <a
                          href={`https://wa.me/919868225911?text=${encodeURIComponent(`Hi, I'm interested in: ${product.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/20 py-16"
          >
            <Package className="mb-4 h-14 w-14 text-muted-foreground/40" />
            <p className="text-base font-medium text-muted-foreground">
              {error ? 'Failed to load featured products' : 'No featured products available at the moment'}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground/70">
              {error ? 'Please try again later or browse our full catalog' : 'Check our full product catalog for all available items'}
            </p>
            <Button
              onClick={() => setCurrentPage('products')}
              variant="outline"
              className="mt-6 border-border/50 text-sm hover:bg-accent"
            >
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            onClick={() => setCurrentPage('products')}
            size="lg"
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
