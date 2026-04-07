'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'
import { useStore, type PageView } from '@/store/use-store'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'

const navLinks: { label: string; page: PageView }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Contact', page: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const {
    currentPage,
    setCurrentPage,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useStore()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page)
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
              {navLinks.map((link) => (
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
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full gold-gradient"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex md:items-center md:gap-3">
              <a
                href="tel:9868225911"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">+91 98682 25911</span>
              </a>
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative h-9 w-9 rounded-full border border-border/50 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
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
              <Button
                onClick={() => handleNavClick('contact')}
                className="gold-gradient border-0 text-white shadow-lg shadow-gold/30 hover:shadow-gold/40 transition-all duration-300"
                size="sm"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile: Theme Toggle + Menu */}
            <div className="flex items-center gap-1 md:hidden">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="h-9 w-9"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 text-gold" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}
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
              <motion.button
                key={link.page}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                onClick={() => handleNavClick(link.page)}
                className={`relative flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${
                  currentPage === link.page
                    ? 'bg-gold/10 text-gold'
                    : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <motion.div
                    layoutId="activeMobileNav"
                    className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full gold-gradient"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="mt-4 px-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
              onClick={() => handleNavClick('sitemap')}
              className="relative flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 text-foreground/70 hover:bg-accent hover:text-foreground"
            >
              Sitemap
            </motion.button>
          </div>

          <div className="mt-6 px-4">
            <div className="section-divider mb-6" />
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
