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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  ZoomOut,
  MessageCircle,
  Share,
  ShoppingBag,
  CheckCircle2,
  Wrench,
  MessageSquare,
  Send,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ProductData {
  id: string
  name: string
  slug: string
  description: string | null
  specifications: string
  usage: string | null
  features: string
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
  const [quantity, setQuantity] = useState(1)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxZoomed, setLightboxZoomed] = useState(false)
  const [lightboxScrollZoom, setLightboxScrollZoom] = useState(1)

  // Enquiry form state
  const [enquiryName, setEnquiryName] = useState('')
  const [enquiryPhone, setEnquiryPhone] = useState('')
  const [enquiryMessage, setEnquiryMessage] = useState('')
  const [enquirySubmitted, setEnquirySubmitted] = useState(false)

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

  // Parse features from JSON array string
  const featuresList: string[] = (() => {
    if (!product?.features) return []
    try {
      const parsed = JSON.parse(product.features)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
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
            setQuantity(1)
            setEnquiryName('')
            setEnquiryPhone('')
            setEnquiryMessage('')
            setEnquirySubmitted(false)
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
      setLightboxScrollZoom(1)
    }
  }

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      setLightboxZoomed(false)
      setLightboxScrollZoom(1)
    }
  }

  // Handle lightbox scroll zoom
  const handleLightboxWheel = useCallback((e: WheelEvent) => {
    if (!lightboxOpen) return
    e.preventDefault()
    setLightboxScrollZoom((prev) => {
      const delta = e.deltaY > 0 ? -0.15 : 0.15
      const next = Math.max(0.5, Math.min(3, prev + delta))
      if (next > 1.05) setLightboxZoomed(true)
      if (next <= 1) setLightboxZoomed(false)
      return next
    })
  }, [lightboxOpen])

  // Keyboard navigation for lightbox
  const handleLightboxKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return
    switch (e.key) {
      case 'Escape':
        setLightboxOpen(false)
        setLightboxZoomed(false)
        setLightboxScrollZoom(1)
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
        if (lightboxScrollZoom > 1.05) {
          setLightboxScrollZoom(1)
          setLightboxZoomed(false)
        } else {
          setLightboxScrollZoom(1.5)
          setLightboxZoomed(true)
        }
        break
      case '+':
      case '=':
        e.preventDefault()
        setLightboxScrollZoom((prev) => {
          const next = Math.min(3, prev + 0.2)
          if (next > 1.05) setLightboxZoomed(true)
          return next
        })
        break
      case '-':
      case '_':
        e.preventDefault()
        setLightboxScrollZoom((prev) => {
          const next = Math.max(0.5, prev - 0.2)
          if (next <= 1) setLightboxZoomed(false)
          return next
        })
        break
      case '0':
        e.preventDefault()
        setLightboxScrollZoom(1)
        setLightboxZoomed(false)
        break
    }
  }, [lightboxOpen, lightboxScrollZoom])

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleLightboxKeyDown)
      document.addEventListener('wheel', handleLightboxWheel, { passive: false })
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleLightboxKeyDown)
      document.removeEventListener('wheel', handleLightboxWheel)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, handleLightboxKeyDown, handleLightboxWheel])

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

  // Enquiry form submit handler
  const handleEnquirySubmit = async () => {
    if (!product || !enquiryName || !enquiryPhone) return

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryName,
          phone: enquiryPhone,
          email: `${enquiryPhone}@whatsapp.enquiry`,
          subject: `Product Enquiry: ${product.name}`,
          message: [
            `Product: ${product.name}`,
            `Category: ${product.category.name}`,
            product.price ? `Price: ₹${product.price.toLocaleString('en-IN')}` : 'Price: Contact for price',
            enquiryMessage ? `Customer Message: ${enquiryMessage}` : '',
          ].filter(Boolean).join('\n'),
        }),
      })

      if (!res.ok) throw new Error('Failed to submit enquiry')

      toast({ title: 'Enquiry sent successfully!', description: `We'll get back to you about ${product.name}` })
      setEnquirySubmitted(true)
    } catch {
      toast({ title: 'Failed to send enquiry', variant: 'destructive' })
    }
  }

  // Build WhatsApp "Add to Quote" message with product details
  const buildQuoteMessage = () => {
    if (!product) return ''
    let featuresStr = ''
    try {
      const feats = JSON.parse(product.features || '[]')
      if (feats.length > 0) featuresStr = feats.slice(0, 3).map(f => `  • ${f}`).join('\n')
    } catch {}

    const lines = [
      `Hi! I'm interested in:`,
      ``,
      `📦 Product: ${product.name}`,
      `🏷️ Category: ${product.category.name}`,
    ]
    if (product.usage) lines.push(`📌 Usage: ${product.usage}`)
    if (featuresStr) lines.push(`✨ Key Features:\n${featuresStr}`)
    if (product.price) {
      lines.push(`💰 Price: ₹${product.price.toLocaleString('en-IN')} (excl. GST)`)
    } else {
      lines.push(`💰 Price: Request Quote`)
    }
    lines.push(`🔢 Quantity: ${quantity}`)
    if (product.price) {
      lines.push(`💵 Total: ₹${(product.price * quantity).toLocaleString('en-IN')} (excl. GST)`)
    }
    lines.push(``, `Thank you!`)
    return lines.join('\n')
  }

  return (
    <>
      <Dialog open={productDetailOpen} onOpenChange={setProductDetailOpen}>
        <DialogContent className="sm:max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-hidden flex flex-col p-0">
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
                      <>
                        {/* Main Image */}
                        <div
                          className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-zoom-in"
                        >
                          {/* Image with fade animation on thumbnail click */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentImageIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={images[currentImageIndex]}
                                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 50vw"
                                priority
                              />
                            </motion.div>
                          </AnimatePresence>

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

                      </>
                    ) : (
                      <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Package className="h-12 w-12" />
                          <span className="text-sm">No images available</span>
                        </div>
                      </div>
                    )}

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 ${
                              idx === currentImageIndex
                                ? 'border-gold ring-2 ring-gold/30 scale-105'
                                : 'border-transparent opacity-50 hover:opacity-80 hover:border-gold/30'
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                            {/* Image count indicator badge */}
                            {images.length > 2 && idx === images.length - 1 && (
                              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-white leading-none">
                                {images.length}
                              </span>
                            )}
                            {/* Active indicator dot */}
                            {idx === currentImageIndex && (
                              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-gold" />
                            )}
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

                    {product.usage && (
                      <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Wrench className="h-4 w-4 text-gold" />
                          Usage
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {product.usage}
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
                        {Object.keys(specs).length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                              <span key={key} className="inline-flex items-center rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
                                <span className="mr-1.5 font-medium capitalize text-foreground/70">{key.replace(/_/g, ' ')}:</span>
                                {String(value).length > 30 ? String(value).split(',')[0] + '...' : String(value)}
                              </span>
                            ))}
                          </div>
                        )}
                        {Object.keys(specs).length > 0 ? (
                          <div className="overflow-hidden rounded-lg border border-border/50">
                            <table className="w-full text-sm">
                              <tbody>
                                {Object.entries(specs).map(([key, value], index) => (
                                  <tr
                                    key={key}
                                    className={
                                      index % 2 === 0
                                        ? 'bg-muted/30'
                                        : 'bg-muted/60'
                                    }
                                  >
                                    <td className="py-2.5 px-3 font-medium text-foreground/70 capitalize">
                                      {key.replace(/_/g, ' ')}
                                    </td>
                                    <td className="py-2.5 px-3 text-right font-semibold text-foreground">
                                      {value}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="rounded-lg border border-border/50 bg-muted/30 px-4 py-3">
                            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                              {product?.specifications}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {featuresList.length > 0 && (
                      <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-gold" />
                          Key Features
                        </div>
                        <ul className="space-y-1.5">
                          {featuresList.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quantity Selector & Add to Quote */}
                    <div className="space-y-4 pt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Quantity</span>
                        <div className="flex items-center gap-1 rounded-lg border border-gold/30 bg-background">
                          <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                            className="flex h-9 w-9 items-center justify-center rounded-l-lg text-foreground transition-colors hover:bg-gold/10 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <div className="flex h-9 w-12 items-center justify-center">
                            <motion.span
                              key={quantity}
                              initial={{ scale: 0.8, opacity: 0.5 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                              className="text-sm font-semibold tabular-nums text-foreground"
                            >
                              {quantity}
                            </motion.span>
                          </div>
                          <button
                            onClick={() => setQuantity((q) => Math.min(100, q + 1))}
                            disabled={quantity >= 100}
                            className="flex h-9 w-9 items-center justify-center rounded-r-lg text-foreground transition-colors hover:bg-gold/10 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total Price (if product has price) */}
                      {product.price && (
                        <div className="flex items-center justify-between rounded-lg border border-gold/20 bg-gold/5 px-4 py-2.5">
                          <span className="text-sm text-muted-foreground">Total</span>
                          <span className="text-lg font-bold text-foreground">
                            ₹{(product.price * quantity).toLocaleString('en-IN')}
                            <span className="ml-1 text-xs font-normal text-muted-foreground">(excl. GST)</span>
                          </span>
                        </div>
                      )}

                      {/* Add to Quote Button with pulse animation */}
                      <Button
                        asChild
                        className="w-full animate-pulse-gold bg-gradient-to-r from-gold via-amber-500 to-gold text-white border-0 shadow-lg shadow-gold/25 hover:from-gold/90 hover:via-amber-500/90 hover:to-gold/90 hover:shadow-gold/35 font-semibold text-sm"
                        onClick={() =>
                          toast({ title: 'Quote request opened on WhatsApp!' })
                        }
                      >
                        <a
                          href={`https://wa.me/919868225911?text=${encodeURIComponent(buildQuoteMessage())}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add {quantity} Item{quantity !== 1 ? 's' : ''} to Quote
                        </a>
                      </Button>

                      {/* Quick Enquiry Form */}
                      <div className="space-y-3 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <MessageSquare className="h-4 w-4 text-gold" />
                          Quick Enquiry
                        </div>
                        <Input
                          placeholder="Your Name"
                          value={enquiryName}
                          onChange={(e) => setEnquiryName(e.target.value)}
                          className="border-border/50 text-sm"
                        />
                        <Input
                          placeholder="Phone Number"
                          type="tel"
                          value={enquiryPhone}
                          onChange={(e) => setEnquiryPhone(e.target.value)}
                          className="border-border/50 text-sm"
                        />
                        <Textarea
                          placeholder="Your message (optional)"
                          value={enquiryMessage}
                          onChange={(e) => setEnquiryMessage(e.target.value)}
                          rows={2}
                          className="border-border/50 text-sm resize-none"
                        />
                        <Button
                          onClick={handleEnquirySubmit}
                          variant="outline"
                          className="w-full border-gold/30 text-gold hover:bg-gold/10"
                          disabled={!enquiryName || !enquiryPhone || enquirySubmitted}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {enquirySubmitted ? 'Enquiry Sent!' : 'Send Enquiry'}
                        </Button>
                      </div>
                    </div>

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
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white border-0 shadow-lg shadow-green-600/20 hover:from-green-700 hover:to-green-600"
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
              if (lightboxScrollZoom > 1.05) {
                setLightboxScrollZoom(1)
                setLightboxZoomed(false)
              } else {
                setLightboxOpen(false)
                setLightboxZoomed(false)
                setLightboxScrollZoom(1)
              }
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
                setLightboxZoomed(false)
                setLightboxScrollZoom(1)
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
                if (lightboxScrollZoom > 1.05) {
                  setLightboxScrollZoom(1)
                  setLightboxZoomed(false)
                } else {
                  setLightboxScrollZoom(1.5)
                  setLightboxZoomed(true)
                }
              }}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${product?.name || 'Product'} - Image ${currentImageIndex + 1}`}
                className={`max-h-full max-w-full object-contain transition-transform duration-200 ${
                  lightboxScrollZoom > 1.05 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                style={{
                  transform: `scale(${lightboxScrollZoom})`,
                }}
                draggable={false}
              />
            </motion.div>

            {/* Zoom controls */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxScrollZoom((prev) => {
                    const next = Math.min(3, prev + 0.25)
                    if (next > 1.05) setLightboxZoomed(true)
                    return next
                  })
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <div className="mx-auto rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                {Math.round(lightboxScrollZoom * 100)}%
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxScrollZoom((prev) => {
                    const next = Math.max(0.5, prev - 0.25)
                    if (next <= 1) setLightboxZoomed(false)
                    return next
                  })
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              {lightboxScrollZoom > 1.05 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxScrollZoom(1)
                    setLightboxZoomed(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label="Reset zoom"
                >
                  <span className="text-xs font-bold">1:1</span>
                </button>
              )}
            </div>

            {/* Keyboard shortcut hints */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/60 backdrop-blur-sm">
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-white/20 bg-white/10 px-1 text-[10px] font-mono text-white/80">
                  ←→
                </kbd>
                Navigate
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1">
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-white/20 bg-white/10 px-1 text-[10px] font-mono text-white/80">
                  Scroll
                </kbd>
                Zoom
              </span>
              <span className="hidden sm:inline-flex text-white/20">|</span>
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-white/20 bg-white/10 px-1 text-[10px] font-mono text-white/80">
                  Esc
                </kbd>
                Close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
