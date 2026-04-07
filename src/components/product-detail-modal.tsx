'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useStore } from '@/store/use-store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Package,
  Tag,
  IndianRupee,
  FileText,
} from 'lucide-react'

interface ProductData {
  id: string
  name: string
  slug: string
  description: string | null
  specifications: string
  price: number | null
  categoryId: string
  category: {
    id: string
    name: string
    slug: string
  }
  images: string
  order: number
  featured: boolean
}

export function ProductDetailModal() {
  const {
    productDetailOpen,
    setProductDetailOpen,
    selectedProduct,
  } = useStore()

  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Parse images from JSON string
  const images: string[] = (() => {
    try {
      const parsed = product?.images ? JSON.parse(product.images) : []
      return Array.isArray(parsed) ? parsed.filter((img: string) => img.length > 0) : []
    } catch {
      return []
    }
  })()

  // Parse specifications - could be a JSON object or plain text
  const specs: Record<string, string> = (() => {
    if (!product?.specifications) return {}
    try {
      const parsed = JSON.parse(product.specifications)
      return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
        ? (parsed as Record<string, string>)
        : {}
    } catch {
      return {}
    }
  })()

  // Check if specs is a plain text string (not valid JSON object)
  const isPlainTextSpecs = (() => {
    if (!product?.specifications) return false
    try {
      const parsed = JSON.parse(product.specifications)
      return typeof parsed === 'string'
    } catch {
      // Not valid JSON at all - it's plain text
      return true
    }
  })()

  // Track previous state for cleanup
  const prevOpenRef = useRef(productDetailOpen)

  useEffect(() => {
    if (productDetailOpen && selectedProduct) {
      let cancelled = false

      const loadProduct = async () => {
        try {
          const res = await fetch(`/api/products/${selectedProduct}`)
          if (!res.ok) throw new Error('Product not found')
          const data = await res.json()
          if (!cancelled) {
            setProduct(data)
            setLoading(false)
            setError(null)
            setCurrentImageIndex(0)
          }
        } catch (err) {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : 'Failed to load product')
            setLoading(false)
          }
        }
      }

      setLoading(true)
      loadProduct()

      return () => { cancelled = true }
    }

    if (!productDetailOpen && prevOpenRef.current) {
      const timer = setTimeout(() => {
        setProduct(null)
        setError(null)
        setCurrentImageIndex(0)
      }, 200)
      return () => clearTimeout(timer)
    }

    prevOpenRef.current = productDetailOpen
  }, [productDetailOpen, selectedProduct])

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <Dialog open={productDetailOpen} onOpenChange={setProductDetailOpen}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Loading State */}
        {loading && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton className="aspect-square w-full sm:w-1/2 rounded-lg" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-4 p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <X className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              onClick={() => setProductDetailOpen(false)}
            >
              Close
            </Button>
          </div>
        )}

        {/* Product Content */}
        {!loading && product && !error && (
          <>
            <DialogHeader className="px-6 pt-6 pb-0">
              <DialogTitle className="text-xl font-bold text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 pt-1">
                <Badge
                  variant="outline"
                  className="border-gold/30 text-gold bg-gold/5"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {product.category.name}
                </Badge>
                {product.featured && (
                  <Badge className="bg-gold/10 text-gold border-gold/20">
                    Featured
                  </Badge>
                )}
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6 pb-6">
              <div className="flex flex-col gap-6 pt-4 sm:flex-row">
                {/* Image Section */}
                <div className="relative w-full sm:w-1/2 shrink-0">
                  {images.length > 0 ? (
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={images[currentImageIndex]}
                        alt={`${product.name} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        priority
                      />

                      {/* Image navigation */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>

                          {/* Image dots */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-200 ${
                                  idx === currentImageIndex
                                    ? 'w-6 bg-gold'
                                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Package className="h-12 w-12" />
                        <span className="text-sm">No images available</span>
                      </div>
                    </div>
                  )}

                  {/* Thumbnail strip */}
                  {images.length > 1 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                            idx === currentImageIndex
                              ? 'border-gold ring-1 ring-gold/30'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="flex-1 space-y-5">
                  {/* Price */}
                  {product.price && (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5 text-gold" />
                      <span className="text-2xl font-bold text-foreground">
                        {product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        (excl. GST)
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {product.description && (
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <FileText className="h-4 w-4 text-gold" />
                        Description
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  )}

                  <Separator />

                  {/* Specifications */}
                  {(Object.keys(specs).length > 0 || isPlainTextSpecs) && (
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Package className="h-4 w-4 text-gold" />
                        Specifications
                      </div>
                      {Object.keys(specs).length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(specs).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-start justify-between gap-4 rounded-lg bg-muted/50 px-3 py-2"
                            >
                              <span className="text-sm font-medium text-foreground/70 capitalize">
                                {key.replace(/_/g, ' ')}
                              </span>
                              <span className="text-sm font-medium text-foreground text-right">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg bg-muted/50 px-4 py-3">
                          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            {product?.specifications}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => setProductDetailOpen(false)}
                      className="flex-1 gold-gradient border-0 text-white shadow-lg shadow-gold/20"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
