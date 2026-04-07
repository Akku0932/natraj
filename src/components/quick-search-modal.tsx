'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Package, LayoutGrid, Command, ArrowRight, Loader2, ImageIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useStore } from '@/store/use-store'

interface ProductResult {
  id: string
  name: string
  slug: string
  price: number | null
  images: string[]
  category: {
    name: string
    slug: string
  }
}

interface CategoryResult {
  id: string
  name: string
  slug: string
  productCount: number
}

export function QuickSearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<ProductResult[]>([])
  const [categories, setCategories] = useState<CategoryResult[]>([])
  const [allCategories, setAllCategories] = useState<CategoryResult[]>([])
  const [loading, setLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isMac, setIsMac] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    setSelectedProduct,
    setProductDetailOpen,
    setCurrentPage,
    setSelectedCategory,
  } = useStore()

  // Detect Mac platform
  useEffect(() => {
    setIsMac(navigator.platform?.toUpperCase().includes('MAC') ?? false)
  }, [])

  // Keyboard shortcut listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      // Small delay to ensure Dialog has rendered
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [open])

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setQuery('')
      setProducts([])
      setCategories([])
      setActiveIndex(-1)
    }
  }, [open])

  // Fetch all categories on mount
  useEffect(() => {
    let cancelled = false
    async function fetchCategories() {
      setCategoriesLoading(true)
      try {
        const res = await fetch('/api/categories')
        if (!cancelled) {
          const data = await res.json()
          setAllCategories(data)
        }
      } catch {
        // Silently fail
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }
    fetchCategories()
    return () => { cancelled = true }
  }, [])

  // Filter categories client-side when query changes
  useEffect(() => {
    if (!query.trim()) {
      setCategories([])
      return
    }
    const q = query.toLowerCase()
    const filtered = allCategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q)
    )
    setCategories(filtered)
  }, [query, allCategories])

  // Debounced product search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (!query.trim()) {
      setProducts([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query])

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1)
  }, [products, categories])

  const totalResults = products.length + categories.length

  // Keyboard navigation within results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev < totalResults - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalResults - 1))
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault()
        if (activeIndex < products.length) {
          handleProductClick(products[activeIndex])
        } else {
          const catIdx = activeIndex - products.length
          if (catIdx < categories.length) {
            handleCategoryClick(categories[catIdx])
          }
        }
      }
    },
    [activeIndex, products, categories, totalResults]
  )

  const handleProductClick = (product: ProductResult) => {
    setSelectedProduct(product.slug)
    setProductDetailOpen(true)
    setOpen(false)
  }

  const handleCategoryClick = (category: CategoryResult) => {
    setCurrentPage('products')
    setSelectedCategory(category.slug)
    setOpen(false)
  }

  const shortcutHint = isMac ? '⌘K' : 'Ctrl+K'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="top-[15%] translate-y-0 sm:max-w-xl p-0 gap-0 overflow-hidden border-gold/20 rounded-2xl"
        showCloseButton={false}
        onPointerDownOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
      >
        {/* Decorative gold line at top */}
        <div className="h-1 w-full gold-gradient" />

        <DialogHeader className="sr-only">
          <DialogTitle>Quick Search</DialogTitle>
          <DialogDescription>Search products and categories</DialogDescription>
        </DialogHeader>

        {/* Search input area */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search products & categories... ${shortcutHint}`}
              className="w-full rounded-xl border border-border bg-muted/40 pl-10 pr-20 py-3 text-sm
                text-foreground placeholder:text-muted-foreground/60
                focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20
                transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {loading && (
                <Loader2 className="size-4 text-gold animate-spin" />
              )}
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                <Command className="size-2.5" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Results area */}
        <div className="px-4 pb-4">
          <div className="max-h-80 overflow-y-auto rounded-xl">
            {/* Empty state — no query yet */}
            {!query.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-gold/10">
                  <Search className="size-5 text-gold/60" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Start typing to search
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  Search across {allCategories.length} categories and all products
                </p>
              </motion.div>
            )}

            {/* Loading state */}
            {query.trim() && loading && products.length === 0 && categories.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <Loader2 className="mb-3 size-5 text-gold animate-spin" />
                <p className="text-sm text-muted-foreground">Searching...</p>
              </motion.div>
            )}

            {/* No results */}
            {query.trim() && !loading && products.length === 0 && categories.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                  <Search className="size-5 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-foreground/70">
                  No results found
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  Try different keywords or browse our categories
                </p>
              </motion.div>
            )}

            {/* Products section */}
            <AnimatePresence mode="wait">
              {products.length > 0 && (
                <motion.div
                  key="products-section"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 px-3 pt-3 pb-1.5">
                    <Package className="size-3.5 text-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Products
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({products.length})
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {products.slice(0, 6).map((product, idx) => (
                      <motion.button
                        key={product.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                        onClick={() => handleProductClick(product)}
                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left
                          transition-all duration-150 cursor-pointer
                          ${activeIndex === idx
                            ? 'bg-gold/10 border border-gold/20'
                            : 'hover:bg-gold/5 border border-transparent'
                          }`}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        {/* Thumbnail */}
                        <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted/80">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="size-4 text-muted-foreground/40" />
                          )}
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate group-hover:text-gold transition-colors">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="inline-flex items-center rounded-md bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-gold">
                              {product.category?.name || 'General'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {product.price
                                ? `₹${product.price.toLocaleString('en-IN')}`
                                : 'Request Quote'}
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/40 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Categories section */}
            <AnimatePresence mode="wait">
              {categories.length > 0 && (
                <motion.div
                  key="categories-section"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 px-3 pt-3 pb-1.5">
                    <LayoutGrid className="size-3.5 text-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Categories
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({categories.length})
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {categories.slice(0, 5).map((category, idx) => {
                      const globalIdx = products.length + idx
                      return (
                        <motion.button
                          key={category.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          onClick={() => handleCategoryClick(category)}
                          className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left
                            transition-all duration-150 cursor-pointer
                            ${activeIndex === globalIdx
                              ? 'bg-gold/10 border border-gold/20'
                              : 'hover:bg-gold/5 border border-transparent'
                            }`}
                          onMouseEnter={() => setActiveIndex(globalIdx)}
                        >
                          {/* Category icon */}
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                            <LayoutGrid className="size-4 text-gold/70 group-hover:text-gold transition-colors" />
                          </div>

                          {/* Category info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-gold transition-colors">
                              {category.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {category.productCount} product{category.productCount !== 1 ? 's' : ''}
                            </span>
                          </div>

                          {/* Badge + Arrow */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="inline-flex items-center rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
                              {category.productCount}
                            </span>
                            <ArrowRight className="size-3.5 text-muted-foreground/40 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold" />
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer hint */}
          {query.trim() && totalResults > 0 && (
            <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3 px-1">
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/40 bg-muted px-1 py-0.5 text-[9px]">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/40 bg-muted px-1 py-0.5 text-[9px]">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/40 bg-muted px-1 py-0.5 text-[9px]">Esc</kbd>
                  Close
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/60">
                {totalResults} result{totalResults !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
