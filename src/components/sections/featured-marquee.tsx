'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Eye, Star, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/store/use-store'

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  specifications: string
  price: number | null
  images: string
  featured: boolean
  order: number
  category: {
    name: string
    slug: string
  }
}

function ProductCard({ product }: { product: Product }) {
  const { setSelectedProduct, setProductDetailOpen } = useStore()
  const images = JSON.parse(product.images || '[]') as string[]
  const firstImage = images.length > 0 ? images[0] : null

  const handleViewDetails = () => {
    setSelectedProduct(product.slug)
    setProductDetailOpen(true)
  }

  return (
    <div className="group relative mx-2.5 w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/10 card-shine">
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-muted/30">
        {firstImage ? (
          <>
            <img
              src={firstImage}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-3xl text-muted-foreground/30">⚡</div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute left-2.5 top-2.5 z-10">
          <Badge className="bg-gold/90 text-white hover:bg-gold text-[10px] px-2 py-0.5">
            {product.category.name}
          </Badge>
        </div>

        {/* Featured Star */}
        <div className="absolute right-2.5 top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-copper/90 text-white shadow-lg shadow-copper/30">
          <Star className="h-3 w-3 fill-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="mb-1.5 line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
          {product.name}
        </h3>

        {/* Price */}
        {product.price ? (
          <div className="mb-2.5 flex items-center gap-1 text-base font-bold text-gold">
            <IndianRupee className="h-3.5 w-3.5" />
            {product.price.toLocaleString('en-IN')}
          </div>
        ) : (
          <div className="mb-2.5">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/5 px-2.5 py-0.5 text-[11px] font-medium text-gold">
              Request Quote
            </span>
          </div>
        )}

        {/* View Details Button */}
        <Button
          onClick={handleViewDetails}
          size="sm"
          variant="outline"
          className="w-full border-gold/30 text-gold hover:bg-gold hover:text-white transition-colors text-xs h-7"
        >
          <Eye className="mr-1.5 h-3 w-3" />
          View Details
        </Button>
      </div>
    </div>
  )
}

export default function FeaturedMarquee() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data: Product[] = await res.json()
          if (!cancelled) {
            const featured = data
              .filter((p) => p.featured)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            setProducts(featured)
          }
        }
      } catch (err) {
        console.error('Failed to fetch featured products:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchFeatured()
    return () => {
      cancelled = true
    }
  }, [])

  // Split products into two rows for desktop (alternating assignment)
  const { row1, row2 } = useMemo(() => {
    const r1: Product[] = []
    const r2: Product[] = []
    products.forEach((p, i) => {
      if (i % 2 === 0) r1.push(p)
      else r2.push(p)
    })
    return { row1: r1, row2: r2 }
  }, [products])

  // If fewer than 4 products, duplicate them to fill the marquee width
  const minItemsForMarquee = 6
  const duplicatedRow1 = row1.length > 0 && row1.length < minItemsForMarquee
    ? [...row1, ...row1, ...row1]
    : row1
  const duplicatedRow2 = row2.length > 0 && row2.length < minItemsForMarquee
    ? [...row2, ...row2, ...row2]
    : row2

  // Don't render if no featured products
  if (!loading && products.length === 0) return null

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Gold gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      {/* Gold gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] via-background to-gold/[0.02]" />
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Handpicked Selection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Featured <span className="gradient-text">Products</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mt-5 w-24"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground"
          >
            Explore our most popular and highly-rated electrical panels, chosen for their quality and performance
          </motion.p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            <div className="flex gap-2.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 w-[280px] shrink-0 animate-pulse rounded-2xl bg-muted/40 border border-border/30"
                />
              ))}
            </div>
            <div className="hidden gap-2.5 md:flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 w-[280px] shrink-0 animate-pulse rounded-2xl bg-muted/40 border border-border/30"
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Row 1 - scrolls left */}
            <div className="marquee-row mb-4 hidden md:block">
              <div className="flex" style={{ animation: 'marquee-scroll-left 40s linear infinite' }}>
                {/* Render items twice for seamless loop */}
                {duplicatedRow1.map((product, i) => (
                  <ProductCard key={`r1-a-${product.id}-${i}`} product={product} />
                ))}
                {duplicatedRow1.map((product, i) => (
                  <ProductCard key={`r1-b-${product.id}-${i}`} product={product} />
                ))}
              </div>
            </div>

            {/* Row 2 - scrolls right (desktop only) */}
            <div className="marquee-row hidden md:block">
              <div className="flex" style={{ animation: 'marquee-scroll-right 45s linear infinite' }}>
                {duplicatedRow2.map((product, i) => (
                  <ProductCard key={`r2-a-${product.id}-${i}`} product={product} />
                ))}
                {duplicatedRow2.map((product, i) => (
                  <ProductCard key={`r2-b-${product.id}-${i}`} product={product} />
                ))}
              </div>
            </div>

            {/* Mobile - single row scrolls left */}
            <div className="marquee-row md:hidden">
              <div
                className="flex"
                style={{ animation: 'marquee-scroll-left 35s linear infinite' }}
              >
                {products.map((product, i) => (
                  <ProductCard key={`mob-a-${product.id}-${i}`} product={product} />
                ))}
                {products.map((product, i) => (
                  <ProductCard key={`mob-b-${product.id}-${i}`} product={product} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Fade edges for seamless look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-background to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-background to-transparent md:w-32" />
      </div>

      {/* Marquee keyframes (scoped via style tag) */}
      <style jsx global>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row:hover > div {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  )
}
