'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Package, IndianRupee, X, Eye } from 'lucide-react'
import { useStore } from '@/store/use-store'
import { getRecentlyViewed, clearRecentlyViewed } from '@/lib/recently-viewed'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProductPreview {
  slug: string
  name: string
  price: number | null
  categoryName: string
  images: string[]
}

export function RecentlyViewedSection() {
  const { currentPage, setSelectedProduct, setProductDetailOpen } = useStore()
  const [products, setProducts] = useState<ProductPreview[]>([])
  const [isCleared, setIsCleared] = useState(false)

  // Fetch product data for recently viewed slugs
  useEffect(() => {
    const slugs = getRecentlyViewed()
    if (slugs.length === 0) return

    const fetchProducts = async () => {
      try {
        const results = await Promise.allSettled(
          slugs.map(async (slug) => {
            const res = await fetch(`/api/products/${slug}`)
            if (!res.ok) return null
            const data = await res.json()
            let images: string[] = []
            try {
              const parsed = data.images ? JSON.parse(data.images) : []
              images = Array.isArray(parsed)
                ? parsed.filter((img: string) => img.length > 0)
                : []
            } catch {
              images = []
            }
            return {
              slug: data.slug,
              name: data.name,
              price: data.price,
              categoryName: data.category?.name || '',
              images,
            } as ProductPreview
          })
        )

        const validProducts = results
          .filter((r): r is PromiseFulfilledResult<ProductPreview> =>
            r.status === 'fulfilled' && r.value !== null
          )
          .map((r) => r.value)

        setProducts(validProducts.slice(0, 8)) // Max 8 products
      } catch {
        // Silently fail
      }
    }

    fetchProducts()
  }, [])

  const handleClearHistory = () => {
    clearRecentlyViewed()
    setProducts([])
    setIsCleared(true)
  }

  const handleCardClick = (slug: string) => {
    setSelectedProduct(slug)
    setProductDetailOpen(true)
  }

  // Only show on the Products page
  if (currentPage !== 'products') return null

  // Empty state with illustration
  if (products.length === 0) {
    if (isCleared) {
      return (
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 rounded-xl border border-border/30 bg-muted/20 p-8 text-center"
          >
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
              <Eye className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">History Cleared</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Your recently viewed products have been removed.
            </p>
          </motion.section>
        </AnimatePresence>
      )
    }
    return null
  }

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-8 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-5 sm:p-6"
      >
        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-gold via-copper to-gold/50" />

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
              <Clock className="h-4 w-4 text-gold" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                You Recently <span className="text-gold">Viewed</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                {products.length} product{products.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <X className="h-3 w-3" />
            Clear History
          </Button>
        </div>

        {/* Horizontal scrollable row - max 8 products */}
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {products.map((product, index) => (
            <motion.button
              key={product.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(product.slug)}
              className="glass-gold group flex w-[200px] shrink-0 flex-col overflow-hidden rounded-xl border border-border/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:border-gold/30 snap-start cursor-pointer text-left"
              aria-label={`View ${product.name}`}
            >
              {/* Thumbnail */}
              <div className="relative h-[120px] w-full overflow-hidden bg-muted/30">
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="200px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
                {/* Category badge overlay */}
                {product.categoryName && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    {product.categoryName}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1.5 p-3">
                <p className="truncate text-xs font-semibold text-foreground leading-tight group-hover:text-gold transition-colors">
                  {product.name}
                </p>
                {product.price ? (
                  <div className="flex items-center gap-0.5 text-xs font-medium text-foreground">
                    <IndianRupee className="h-3 w-3" />
                    <span>{product.price.toLocaleString('en-IN')}</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-medium text-gold/70">
                    Contact for Price
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
