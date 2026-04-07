'use client'

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Phone, Sun, Moon, Zap, Plug, RefreshCw, Thermometer,
  Droplets, Network, Wind, ToggleLeft, LayoutGrid, Waves,
  BarChart3, Activity, Power, SunIcon, Box, ChevronRight,
  Sparkles, ArrowRight, Loader2, Heart, GitCompareArrows, Monitor, Copy, Check,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useStore, type PageView } from '@/store/use-store'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  productCount: number
  order: number
}

function getCategoryIcon(name: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    'Three Phase': Zap,
    'Single Phase': Plug,
    'Automatic': RefreshCw,
    'Temperature': Thermometer,
    'Oil': Droplets,
    'Busbar': Network,
    'Air Break': Wind,
    'Main Switch': ToggleLeft,
    'Distribution': LayoutGrid,
    'Water Level': Waves,
    'Measuring': BarChart3,
    'Power Factor': Activity,
    'Mains': Power,
    'Solar': SunIcon,
  }
  return icons[name] || Box
}

function CountBadge({ count, variant = 'gold' }: { count: number; variant?: 'gold' | 'red' }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          exit={{ scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 15,
            duration: 0.4,
          }}
          className={`absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none shadow-sm ${
            variant === 'red'
              ? 'bg-red-500 text-white ring-1 ring-red-400/50'
              : 'bg-gold text-white ring-1 ring-gold/50'
          }`}
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

const navLinks: { label: string; page: PageView }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Contact', page: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const megaWrapperRef = useRef<HTMLDivElement>(null)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const {
    currentPage,
    setCurrentPage,
    setSelectedCategory,
    mobileMenuOpen,
    setMobileMenuOpen,
    compareList,
    wishlist,
    compareOpen,
    setCompareOpen,
  } = useStore()
  const compareCount = compareList.length
  const wishlistCount = wishlist.length
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const { toast } = useToast()
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Theme cycling: system -> light -> dark -> system
  const cycleTheme = useCallback(() => {
    if (theme === 'system') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('system')
  }, [theme, setTheme])

  // Determine which icon to show based on resolved theme
  const isResolvedDark = resolvedTheme === 'dark'

  // Tooltip label for current mode
  const getThemeLabel = useCallback((): string => {
    if (theme === 'system') {
      return `System: ${systemTheme === 'dark' ? 'Dark' : 'Light'}`
    }
    return theme === 'dark' ? 'Dark' : 'Light'
  }, [theme, systemTheme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch categories on mount
  useEffect(() => {
    let cancelled = false
    async function fetchCategories() {
      setCategoriesLoading(true)
      try {
        const res = await fetch('/api/categories')
        if (!res.ok) return
        const data: Category[] = await res.json()
        if (!cancelled) {
          setCategories(data.sort((a, b) => b.productCount - a.productCount))
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }
    fetchCategories()
    return () => { cancelled = true }
  }, [])

  const clearMegaMenuTimeout = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
      megaMenuTimeoutRef.current = null
    }
  }, [])

  const handleMegaMenuEnter = useCallback(() => {
    clearMegaMenuTimeout()
    setMegaMenuOpen(true)
  }, [clearMegaMenuTimeout])

  const handleMegaMenuLeave = useCallback(() => {
    clearMegaMenuTimeout()
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false)
    }, 200)
  }, [clearMegaMenuTimeout])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearMegaMenuTimeout()
  }, [clearMegaMenuTimeout])

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page)
  }

  const handleCopyPhone = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText('+91 98682 25911')
      setCopiedPhone(true)
      toast({
        title: 'Phone number copied!',
        description: '+91 98682 25911',
        duration: 2000,
      })
      setTimeout(() => setCopiedPhone(false), 2000)
    } catch {
      toast({
        title: 'Could not copy',
        description: 'Please copy the number manually',
        variant: 'destructive',
        duration: 2000,
      })
    }
  }

  const handleCategoryClick = (slug: string) => {
    setCurrentPage('products')
    setSelectedCategory(slug)
    setMegaMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-nav shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="ripple flex items-center gap-2 group"
            >
              <Image
                src="/images/logo.PNG"
                alt="Natraj Electricals"
                width={140}
                height={40}
                className="h-9 w-auto object-contain md:h-11 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-90 group-hover:drop-shadow-[0_0_8px_rgba(200,150,62,0.4)]"
                priority
              />
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navLinks.map((link) => {
                if (link.page === 'products') {
                  return (
                    <div
                      key={link.page}
                      ref={megaWrapperRef}
                      className="relative"
                      onMouseEnter={handleMegaMenuEnter}
                      onMouseLeave={handleMegaMenuLeave}
                    >
                      <button
                        onClick={() => {
                          setCurrentPage('products')
                          setSelectedCategory(null)
                          setMegaMenuOpen(false)
                        }}
                        className={[
                          'nav-link-hover relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-gold',
                          megaMenuOpen ? 'text-gold' : '',
                        ].join(' ')}
                      >
                        {/* Wishlist badge */}
                        {wishlistCount > 0 && (
                          <span className="relative">
                            <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
                            <CountBadge count={wishlistCount} variant="red" />
                          </span>
                        )}
                        <span
                          className={
                            currentPage === link.page
                              ? 'text-gold'
                              : 'text-foreground/70'
                          }
                        >
                          {link.label}
                        </span>
                        {/* Compare badge */}
                        {compareCount > 0 && (
                          <span className="relative">
                            <GitCompareArrows className="h-3.5 w-3.5 text-gold" />
                            <CountBadge count={compareCount} variant="gold" />
                          </span>
                        )}
                        <motion.div
                          animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-3.5 w-3.5 text-foreground/40 transition-transform" />
                        </motion.div>
                        {currentPage === link.page && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gold rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {megaMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-40"
                          >
                            <div className="w-[min(896px,calc(100vw-3rem))] rounded-2xl border border-gold/10 bg-background/85 backdrop-blur-xl shadow-xl shadow-black/10 overflow-hidden">
                              {/* Decorative gold line at top */}
                              <div className="gold-gradient h-0.5 w-full" />

                              <div className="p-5 pb-3">
                                {/* Popular Categories Label */}
                                <div className="flex items-center gap-2 mb-4">
                                  <Sparkles className="h-4 w-4 text-gold" />
                                  <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                                    Popular Categories
                                  </span>
                                  <div className="flex-1 h-px bg-gold/15" />
                                </div>

                                {/* Categories Grid */}
                                {categoriesLoading ? (
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-xl p-3"
                                      >
                                        <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
                                        <div className="flex-1 space-y-1.5">
                                          <div className="h-3.5 w-20 rounded bg-muted animate-pulse" />
                                          <div className="h-2.5 w-10 rounded bg-muted animate-pulse" />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : categories.length > 0 ? (
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                    {categories.map((cat) => {
                                      const Icon = getCategoryIcon(cat.name)
                                      return (
                                        <button
                                          key={cat.id}
                                          onClick={() => handleCategoryClick(cat.slug)}
                                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-gold/10 hover:shadow-sm"
                                        >
                                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/8 text-gold/70 transition-colors duration-200 group-hover:bg-gold/15 group-hover:text-gold">
                                            <Icon className="h-4.5 w-4.5" />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-foreground/80 truncate transition-colors duration-200 group-hover:text-gold">
                                              {cat.name}
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                              <span className="h-1 w-1 rounded-full bg-gold/40" />
                                              {cat.productCount} {cat.productCount === 1 ? 'product' : 'products'}
                                            </span>
                                          </div>
                                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-transparent transition-all duration-200 -translate-x-1 group-hover:translate-x-0 group-hover:text-gold/60" />
                                        </button>
                                      )
                                    })}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-gold/40" />
                                    <span className="text-sm">Loading categories...</span>
                                  </div>
                                )}
                              </div>

                              {/* Footer with View All button */}
                              <div className="border-t border-gold/8 px-5 py-3">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-muted-foreground">
                                    {categories.length > 0
                                      ? `${categories.length} categories available`
                                      : 'Browse our full catalog'
                                    }
                                  </p>
                                  <button
                                    onClick={() => {
                                      setCurrentPage('products')
                                      setSelectedCategory(null)
                                      setMegaMenuOpen(false)
                                    }}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-gold/10 px-4 py-2 text-xs font-semibold text-gold transition-all duration-200 hover:bg-gold hover:text-white hover:shadow-lg hover:shadow-gold/20"
                                  >
                                    View All Products
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className="nav-link-hover relative px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-gold"
                  >
                    <span
                      className={
                        currentPage === link.page
                          ? 'text-gold'
                          : 'text-foreground/70'
                      }
                    >
                      {link.label}
                    </span>
                    {currentPage === link.page && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex md:items-center md:gap-3">
              <button
                onClick={handleCopyPhone}
                className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                aria-label="Copy phone number"
              >
                {copiedPhone ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Phone className="h-4 w-4" />
                )}
                <span className="hidden lg:inline">+91 98682 25911</span>
              </button>
              {/* Dark Mode Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={cycleTheme}
                    className="relative h-9 w-9 rounded-full border border-border/50 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait">
                      {isResolvedDark ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="h-4 w-4 text-gold" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {mounted && getThemeLabel()}
                </TooltipContent>
              </Tooltip>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => handleNavClick('contact')}
                  className="gold-gradient border-0 text-white shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300"
                  size="sm"
                >
                  Get Quote
                </Button>
              </motion.div>
            </div>

            {/* Mobile: Theme Toggle + Menu */}
            <div className="flex items-center gap-1 md:hidden">
              {mounted && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={cycleTheme}
                      className="h-9 w-9"
                      aria-label="Toggle theme"
                    >
                      {isResolvedDark ? (
                        <Sun className="h-4 w-4 text-gold" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    {getThemeLabel()}
                  </TooltipContent>
                </Tooltip>
              )}
              <a
                href="tel:9868225911"
                className="flex items-center justify-center h-9 w-9 rounded-md transition-colors hover:text-gold hover:bg-accent"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
        {/* Gradient line below navbar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </motion.header>

      {/* Mobile Sheet Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-gold/10"
        >
          <SheetHeader className="pt-8 pb-4">
            <SheetTitle className="flex items-center gap-2">
              <Image
                src="/images/logo.PNG"
                alt="Natraj Electricals"
                width={120}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-1 px-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleNavClick(link.page)}
                  className={`relative flex w-full items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${
                    currentPage === link.page
                      ? 'bg-gold/10 text-gold'
                      : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.page === 'products' && (wishlistCount > 0 || compareCount > 0) && (
                      <span className="ml-1 flex items-center gap-1">
                        {wishlistCount > 0 && (
                          <span className="relative flex items-center justify-center">
                            <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
                            <CountBadge count={wishlistCount} variant="red" />
                          </span>
                        )}
                        {compareCount > 0 && (
                          <span className="relative flex items-center justify-center">
                            <GitCompareArrows className="h-3.5 w-3.5 text-gold" />
                            <CountBadge count={compareCount} variant="gold" />
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                  {currentPage === link.page && (
                    <motion.div
                      layoutId="activeMobileNav"
                      className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full gold-gradient"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 px-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              onClick={() => handleNavClick('sitemap')}
              className="relative flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 text-foreground/70 hover:bg-accent hover:text-foreground"
            >
              Sitemap
            </motion.button>
          </div>

          <div className="mt-6 px-4">
            <div className="section-divider mb-6" />
            {/* Theme toggle in mobile drawer */}
            {mounted && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                onClick={cycleTheme}
                className="relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:bg-accent hover:text-foreground"
              >
                {isResolvedDark ? (
                  <Sun className="h-4 w-4 text-gold" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span>{getThemeLabel()}</span>
                {theme === 'system' && (
                  <Monitor className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                )}
              </motion.button>
            )}
            <a
              href="tel:9868225911"
              className="flex items-center gap-3 rounded-lg bg-gold/5 px-4 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              <Phone className="h-4 w-4" />
              <div className="flex flex-col">
                <span>Call Us Now</span>
                <span className="text-xs font-normal text-muted-foreground">
                  +91 98682 25911
                </span>
              </div>
            </a>
            <Button
              onClick={() => handleNavClick('contact')}
              className="mt-4 w-full gold-gradient border-0 text-white shadow-lg shadow-gold/20"
            >
              Get a Free Quote
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
