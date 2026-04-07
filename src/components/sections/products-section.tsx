'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Eye, ArrowRight, SlidersHorizontal, Star, GitCompare, ChevronRight, Trash2, Package, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStore } from '@/store/use-store'

interface Category {
  id: string
  name: string
  slug: string
  productCount: number
}

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

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
]

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products]
  switch (sort) {
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return (a.order ?? 0) - (b.order ?? 0)
      })
    case 'price-asc':
      return sorted.sort((a, b) => {
        if (a.price === null && b.price === null) return 0
        if (a.price === null) return 1
        if (b.price === null) return -1
        return a.price - b.price
      })
    case 'price-desc':
      return sorted.sort((a, b) => {
        if (a.price === null && b.price === null) return 0
        if (a.price === null) return 1
        if (b.price === null) return -1
        return b.price - a.price
      })
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return sorted
  }
}

export default function ProductsSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { selectedCategory, setSelectedCategory, selectedProduct, setSelectedProduct, setProductDetailOpen, compareList, toggleCompare, clearCompare, setCompareOpen, setCurrentPage, wishlist, toggleWishlist, isInWishlist } = useStore()

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products when category or search changes
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory && selectedCategory !== 'all') {
        params.set('category', selectedCategory)
      }
      if (searchQuery) {
        params.set('search', searchQuery)
      }
      const res = await fetch(`/api/products?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoadingProducts(false)
    }
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy])

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug === 'all' ? null : slug)
  }

  // Debounced search: auto-search 300ms after user stops typing
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      setSearchQuery(searchInput)
    }, 300)
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [searchInput])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    setSearchQuery(searchInput)
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchQuery('')
  }

  const handleViewDetails = (slug: string) => {
    setSelectedProduct(slug)
    setProductDetailOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-charcoal py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,150,62,0.1)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            Our <span className="gradient-text">Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
          >
            Explore our comprehensive range of premium electrical control panels
          </motion.p>
        </div>
      </section>

      {/* Breadcrumb handled by page.tsx */}

      {/* Search & Filter Section */}
      <section className="sticky top-16 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl md:top-20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <div className="group relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-gold" />
              <Input
                ref={inputRef}
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-10 border-border/60 transition-all duration-200 focus-visible:border-gold/50 focus-visible:ring-gold/30 focus-visible:ring-offset-0"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button type="submit" variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 transition-colors">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              onClick={() => handleCategoryChange('all')}
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              className={`shrink-0 ${
                selectedCategory === null
                  ? 'bg-gold text-white hover:bg-gold-dark'
                  : 'border-border/50 hover:border-gold/30 hover:text-gold'
              }`}
            >
              All Products
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                size="sm"
                className={`shrink-0 ${
                  selectedCategory === cat.slug
                    ? 'bg-gold text-white hover:bg-gold-dark'
                    : 'border-border/50 hover:border-gold/30 hover:text-gold'
                }`}
              >
                {cat.name}
                <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                  {cat.productCount}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results count & Sort */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {loadingProducts ? (
                'Loading products...'
              ) : (
                <>
                  Showing <span className="font-medium text-foreground">{sortedProducts.length}</span> products
                  {searchQuery && (
                    <>
                      {' '}for &ldquo;<span className="text-gold">{searchQuery}</span>&rdquo;
                    </>
                  )}
                  {selectedCategory && (
                    <>
                      {' '}in{' '}
                      <span className="font-medium text-foreground">
                        {categories.find((c) => c.slug === selectedCategory)?.name}
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[180px] border-border/50 text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(searchQuery || selectedCategory) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearSearch()
                    setSelectedCategory(null)
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Loading skeleton */}
          {loadingProducts ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-border/50">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold/10 to-gold/5 ring-1 ring-gold/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5">
                  <Package className="h-8 w-8 text-gold/70" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Hmm, no products match your search</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search query or browse all categories
              </p>
              <Button
                onClick={() => {
                  clearSearch()
                  setSelectedCategory(null)
                }}
                variant="outline"
                className="mt-4 border-gold/30 text-gold hover:bg-gold/10"
              >
                View All Products
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product, index) => {
                  const images = JSON.parse(product.images || '[]') as string[]
                  const firstImage = images.length > 0 ? images[0] : null

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="product-card group overflow-hidden rounded-2xl border border-border/50 bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/5"
                    >
                      {/* Gold gradient bottom border on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                        {firstImage ? (
                          <>
                            <img
                              src={firstImage}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            {/* Shimmer shine sweep on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="shimmer-sweep absolute inset-0" />
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <div className="text-4xl text-muted-foreground/30">⚡</div>
                          </div>
                        )}

                        {/* Badges */}
                        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
                          <Badge className="bg-gold/90 text-white hover:bg-gold text-xs">
                            {product.category.name}
                          </Badge>
                          {product.featured && (
                            <Badge className="bg-copper text-white hover:bg-copper text-xs gap-1">
                              <Star className="h-3 w-3 fill-white" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Compare icon - top right */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCompare(product.slug)
                          }}
                          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
                            compareList.includes(product.slug)
                              ? 'bg-gold text-white shadow-lg shadow-gold/30'
                              : 'bg-black/30 text-white hover:bg-gold/80'
                          }`}
                          aria-label="Compare product"
                        >
                          <GitCompare className="h-4 w-4" />
                        </button>

                        {/* Wishlist heart icon - bottom left of image */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWishlist(product.slug)
                          }}
                          className={`absolute bottom-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
                            isInWishlist(product.slug)
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                              : 'bg-black/30 text-white border border-white/20 hover:bg-red-500/80 hover:border-red-500'
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(product.slug) ? 'fill-white' : ''}`} />
                        </button>

                        {/* Quick View button - overlay on hover */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <Button
                            onClick={() => handleViewDetails(product.slug)}
                            size="sm"
                            className="bg-white/90 text-charcoal backdrop-blur-md shadow-lg border-0 hover:bg-white hover:shadow-xl transform transition-transform hover:scale-105"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Quick View
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="mb-2 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-gold">
                          {product.name}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {product.description || product.category.name}
                        </p>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between">
                          {product.price ? (
                            <span className="text-lg font-bold text-gold">
                              ₹{product.price.toLocaleString()}
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-sm font-medium text-gold">
                              Request Quote
                            </span>
                          )}
                          <Button
                            onClick={() => handleViewDetails(product.slug)}
                            size="sm"
                            variant="outline"
                            className="border-gold/30 text-gold hover:bg-gold hover:text-white transition-colors"
                          >
                            View Details
                            <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Floating comparison bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-gold/20 bg-background/80 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <GitCompare className="h-5 w-5 shrink-0 text-gold" />
              <span className="whitespace-nowrap text-sm font-medium">
                <span className="text-gold font-bold">{compareList.length}</span>
                {compareList.length === 1 ? ' product' : ' products'} selected for comparison
              </span>
              <div className="h-6 w-px bg-border/50" />
              <Button
                size="sm"
                onClick={() => setCompareOpen(true)}
                className="gap-2 gold-gradient shrink-0 border-0 text-white shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                <GitCompare className="h-4 w-4" />
                Compare Now
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearCompare}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer animation CSS */}
      <style jsx global>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        .shimmer-sweep {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.08) 75%,
            transparent 100%
          );
          animation: shimmer-sweep 0.8s ease-in-out;
          transform: translateX(-100%) rotate(25deg);
          width: 50%;
        }
      `}</style>
    </div>
  )
}
