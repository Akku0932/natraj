'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Trash2, GitCompareHorizontal, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useStore } from '@/store/use-store'

interface CompareProduct {
  id: string
  name: string
  slug: string
  description: string | null
  specifications: string
  price: number | null
  images: string
  category: {
    name: string
    slug: string
  }
}

function extractSpecs(specifications: string): string[] {
  try {
    const parsed = JSON.parse(specifications)
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item) => typeof item === 'string' || (item && typeof item === 'object' && 'label' in item))
        .slice(0, 3)
        .map((item) => {
          if (typeof item === 'string') return item
          if (item && typeof item === 'object' && 'label' in item) {
            return `${item.label}: ${item.value || ''}`
          }
          return ''
        })
        .filter(Boolean)
    }
    if (typeof parsed === 'object' && parsed !== null) {
      return Object.entries(parsed)
        .slice(0, 3)
        .map(([key, value]) => `${key}: ${value}`)
    }
  } catch {
    // Plain text specs
    if (specifications) {
      return specifications
        .split(/[.\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3)
    }
  }
  return []
}

export function ProductComparisonModal() {
  const { compareList, compareOpen, setCompareOpen, removeFromCompare, clearCompare } = useStore()
  const [products, setProducts] = useState<CompareProduct[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = useCallback(async () => {
    if (compareList.length === 0) {
      setProducts([])
      return
    }
    setLoading(true)
    try {
      const results = await Promise.all(
        compareList.map(async (slug) => {
          const res = await fetch(`/api/products/${encodeURIComponent(slug)}`)
          if (res.ok) {
            return (await res.json()) as CompareProduct
          }
          return null
        })
      )
      setProducts(results.filter((p): p is CompareProduct => p !== null))
    } catch (err) {
      console.error('Failed to fetch comparison products:', err)
    } finally {
      setLoading(false)
    }
  }, [compareList])

  useEffect(() => {
    if (compareOpen) {
      fetchProducts()
    }
  }, [compareOpen, fetchProducts])

  const handleRemove = (slug: string) => {
    removeFromCompare(slug)
  }

  const handleWhatsApp = () => {
    const productNames = products.map((p) => p.name).join(', ')
    const message = encodeURIComponent(`Hi, I'd like to compare: ${productNames}`)
    window.open(`https://wa.me/919868225911?text=${message}`, '_blank')
  }

  const comparisonRows = [
    { label: 'Product Name', getValue: (p: CompareProduct) => p.name },
    { label: 'Category', getValue: (p: CompareProduct) => p.category.name },
    {
      label: 'Price',
      getValue: (p: CompareProduct) =>
        p.price ? `₹${p.price.toLocaleString()}` : 'Request Quote',
      isHighlight: true,
    },
    {
      label: 'Key Features',
      getValue: (p: CompareProduct) => {
        const specs = extractSpecs(p.specifications)
        if (specs.length > 0) return specs
        return p.description ? [p.description.slice(0, 100)] : ['No details available']
      },
      isArray: true,
    },
  ]

  return (
    <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
      <DialogContent className="flex max-h-[90vh] max-w-5xl flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl">
        {/* Header */}
        <div className="border-b border-border/50 bg-gradient-to-r from-charcoal to-charcoal/95 px-6 py-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-white">
              <GitCompareHorizontal className="h-5 w-5 text-gold" />
              Product Comparison
              <Badge className="ml-2 bg-gold/20 text-gold hover:bg-gold/30 border-gold/30">
                {products.length} of 4
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-white/50">
              Compare up to 4 products side by side
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: compareList.length }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <GitCompareHorizontal className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No products to compare</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add products from the catalog to start comparing
              </p>
            </div>
          ) : (
            <ScrollArea className="h-full max-h-[60vh]">
              <div className="min-w-[600px]">
                {/* Product images row */}
                <div className="border-b border-border/50 bg-muted/30 px-6 py-4">
                  <div className="grid gap-4" style={{ gridTemplateColumns: '140px repeat(' + products.length + ', 1fr)' }}>
                    <div />
                    {products.map((product) => {
                      const images = JSON.parse(product.images || '[]') as string[]
                      const firstImage = images.length > 0 ? images[0] : null
                      return (
                        <motion.div
                          key={product.slug}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border/50 bg-background">
                            {firstImage ? (
                              <img
                                src={firstImage}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-2xl text-muted-foreground/30">
                                ⚡
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(product.slug)}
                            className="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remove
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Comparison rows */}
                {comparisonRows.map((row, rowIdx) => (
                  <div
                    key={row.label}
                    className={`border-b border-border/30 px-6 py-4 ${rowIdx % 2 === 0 ? '' : 'bg-muted/20'}`}
                  >
                    <div className="grid gap-4" style={{ gridTemplateColumns: '140px repeat(' + products.length + ', 1fr)' }}>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        {row.label}
                      </div>
                      {products.map((product) => {
                        const value = row.getValue(product)
                        const isHighlight = row.isHighlight && !('isArray' in row && row.isArray)
                        return (
                          <div
                            key={product.slug}
                            className={`flex items-start ${isHighlight ? '' : ''}`}
                          >
                            {row.isArray ? (
                              <ul className="space-y-1">
                                {(value as string[]).map((item, idx) => (
                                  <li key={idx} className="text-sm text-foreground/80">
                                    <span className="mr-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" />
                                    {item.length > 60 ? item.slice(0, 60) + '...' : item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span
                                className={`text-sm ${
                                  isHighlight
                                    ? 'font-bold text-gold'
                                    : 'font-medium text-foreground'
                                }`}
                              >
                                {String(value)}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCompare}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCompareOpen(false)}
              className="border-border/50"
            >
              Close
            </Button>
            {products.length > 0 && (
              <Button
                onClick={handleWhatsApp}
                className="gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire on WhatsApp
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
