'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/use-store'
import { addToRecentlyViewed } from '@/lib/recently-viewed'
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
  ZoomIn,
  MessageCircle,
  Share,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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
    setCurrentPage,
    setSelectedCategory,
  } = useStore()

  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxZoomed, setLightboxZoomed] = useState(false)

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
            addToRecentlyViewed(selectedProduct)
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
        setLightboxOpen(false)
        setLightboxZoomed(false)
      }, 200)
      return () => clearTimeout(timer)
    }

    prevOpenRef.current = productDetailOpen
  }, [productDetailOpen, selectedProduct])

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
      setLightboxZoomed(false)
    }
  }

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      setLightboxZoomed(false)
    }
  }

  // Keyboard navigation for lightbox
  const handleLightboxKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return
    switch (e.key) {
      case 'Escape':
        setLightboxOpen(false)
        setLightboxZoomed(false)
        break
      case 'ArrowLeft':
        prevImage()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        setLightboxZoomed((prev) => !prev)
        break
    }
  }, [lightboxOpen])

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleLightboxKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleLightboxKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, handleLightboxKeyDown])

  // Navigate to products page with category filter
  const handleCategoryClick = () => {
    if (!product) return
    setProductDetailOpen(false)
    setCurrentPage('products')
    setSelectedCategory(product.category.slug)
  }

  const { toast } = useToast()

  // WhatsApp enquiry link
  const whatsappLink = product
    ? `https://wa.me/919868225911?text=${encodeURIComponent(`Hi, I'm interested in: ${product.name}`)}`
    : '#'

  // Share handler
  const handleShare = async () => {
    if (!product) return

    const shareUrl = `${window.location.origin}/products/${product.slug}`
    const shareText = `Check out ${product.name} - ${product.category.name} at Natraj Electricals`

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        })
        toast({ title: 'Shared successfully!' })
      } catch (err) {
        // User cancelled or share failed — do nothing on cancel
        if (err instanceof Error && err.name !== 'AbortError') {
          toast({ title: 'Sharing is not supported', variant: 'destructive' })
        }
      }
    } else if (typeof navigator.clipboard === 'function') {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast({ title: 'Link copied to clipboard!' })
      } catch {
        toast({ title: 'Sharing is not supported', variant: 'destructive' })
      }
    } else {
      toast({ title: 'Sharing is not supported', variant: 'destructive' })
    }
  }

  return (
    <>
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
                <DialogDescription className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={handleCategoryClick}
                    className="group/badge"
                  >
                    <Badge
                      variant="outline"
                      className="border-gold/30 text-gold bg-gold/5 cursor-pointer transition-colors hover:bg-gold/10 hover:border-gold/50"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {product.category.name}
                    </Badge>
                  </button>
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

                        {/* Zoom button */}
                        <button
                          onClick={() => {
                            setLightboxOpen(true)
                            setLightboxZoomed(false)
                          }}
                          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 hover:scale-110"
                          aria-label="Open lightbox"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>

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
                    {product.price ? (
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-5 w-5 text-gold" />
                        <span className="text-2xl font-bold text-foreground">
                          {product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          (excl. GST)
                        </span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-sm font-medium text-gold">
                        Contact for Price
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
                        variant="outline"
                        className="flex-1 border-border/50 text-foreground hover:bg-muted"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={handleShare}
                        variant="outline"
                        size="sm"
                        className="border-gold/30 text-gold hover:bg-gold/10"
                      >
                        <Share className="mr-1.5 h-4 w-4" />
                        Share
                      </Button>
                      <Button
                        asChild
                        className="flex-1 bg-green-600 text-white border-0 shadow-lg shadow-green-600/20 hover:bg-green-700"
                      >
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Enquire on WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => {
              if (lightboxZoomed) {
                setLightboxZoomed(false)
              } else {
                setLightboxOpen(false)
              }
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
                setLightboxZoomed(false)
              }}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="h-[80vh] w-[80vw] flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxZoomed((prev) => !prev)
              }}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${product?.name || 'Product'} - Image ${currentImageIndex + 1}`}
                className={`max-h-full max-w-full object-contain transition-all duration-300 cursor-zoom-in ${
                  lightboxZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
                }`}
              />
            </motion.div>

            {/* Hint text */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
              Click image to zoom • Press Esc to close • Arrow keys to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
