'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Package, IndianRupee } from 'lucide-react'
import { useStore } from '@/store/use-store'
import { getRecentlyViewed } from '@/lib/recently-viewed'
import { Badge } from '@/components/ui/badge'

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

        setProducts(validProducts)
      } catch {
        // Silently fail
      }
    }

    fetchProducts()
  }, [])

  // Only show on the Products page with products available
  if (currentPage !== 'products' || products.length === 0) return null

  const handleCardClick = (slug: string) => {
    setSelectedProduct(slug)
    setProductDetailOpen(true)
  }

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-8 rounded-xl gold-gradient-subtle border-l-4 border-gold p-5 sm:p-6"
      >
        {/* Section Header */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
            <Clock className="h-4 w-4 text-gold" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Recently Viewed
          </h3>
          <span className="ml-1 text-xs text-muted-foreground">
            ({products.length})
          </span>
        </div>

        {/* Horizontal scrollable on mobile, flex-wrap on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide md:flex-wrap md:overflow-visible md:pb-0">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(product.slug)}
              className="glass-gold group flex w-[180px] shrink-0 flex-col gap-2.5 rounded-lg p-3 transition-shadow duration-300 hover:shadow-lg hover:shadow-gold/10 snap-start md:w-auto md:min-w-[180px] cursor-pointer text-left"
              aria-label={`View ${product.name}`}
            >
              {/* Thumbnail */}
              <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-md bg-muted">
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="60px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground leading-tight group-hover:text-gold transition-colors">
                  {product.name}
                </p>
                {product.categoryName && (
                  <Badge
                    variant="outline"
                    className="mt-1 border-gold/20 bg-gold/5 text-gold text-[10px] px-1.5 py-0 leading-tight"
                  >
                    {product.categoryName}
                  </Badge>
                )}
                {product.price ? (
                  <div className="mt-1 flex items-center gap-0.5 text-xs font-medium text-foreground">
                    <IndianRupee className="h-3 w-3" />
                    <span>{product.price.toLocaleString('en-IN')}</span>
                  </div>
                ) : (
                  <span className="mt-1 inline-block text-[10px] font-medium text-gold/70">
                    Quote
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
