'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUp,
  Send,
  CheckCircle2,
  Heart,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore, type PageView } from '@/store/use-store'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const quickLinks: { label: string; page: PageView; hideOnMobile?: boolean }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Contact', page: 'contact' },
  { label: 'Sitemap', page: 'sitemap', hideOnMobile: true },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export function Footer() {
  const { setCurrentPage, setTermsOpen, setPrivacyOpen } = useStore()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)

  const handleQuickLink = (page: PageView) => {
    setCurrentPage(page)
  }

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await res.json()

      if (res.status === 201) {
        toast({
          title: 'Successfully subscribed!',
          description: 'You\'ll receive our latest updates in your inbox.',
          variant: 'default',
        })
        setEmail('')
        setSubscribeSuccess(true)
        setTimeout(() => setSubscribeSuccess(false), 5000)
      } else if (res.status === 409) {
        toast({
          title: 'Already subscribed',
          description: data.message || 'This email is already on our list.',
          variant: 'default',
        })
        setEmail('')
      } else {
        toast({
          title: 'Subscription failed',
          description: data.error || 'Please try again later.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Network error',
        description: 'Could not reach the server. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-charcoal/95 text-white/80 backdrop-blur-xl">
      {/* Premium gold gradient top border */}
      <div className="h-1 w-full gold-gradient" />

      {/* Subtle diagonal gold line pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(200, 150, 62, 0.5) 20px,
            rgba(200, 150, 62, 0.5) 21px
          )`,
        }}
      />

      {/* Glass glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-gold/[0.04] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-gold/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.PNG"
                alt="Natraj Electricals"
                width={140}
                height={40}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-2 border border-white/10 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-gold-light" />
              <span className="text-xs font-medium text-gold-light">
                ISO 9001:2015 Certified
              </span>
            </div>

            <p className="text-sm leading-relaxed text-white/50">
              Manufacturer and supplier of premium electrical control panels, automatic changeovers, busbar systems, and more. Serving the industry with excellence since establishment.
            </p>

            {/* Social Media Links with glass background and spring animation */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm text-white/40 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-gold hover:shadow-lg hover:shadow-gold/20"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile gold dot separator */}
          <div className="flex items-center justify-center lg:hidden" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleQuickLink(link.page)}
                    className={`group flex items-center gap-2.5 text-sm text-white/60 transition-all duration-200 hover:text-gold-light border-l-2 border-transparent hover:border-gold/40 hover:pl-2 ${
                      link.hideOnMobile ? 'hidden sm:flex' : 'flex'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold shrink-0" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile gold dot separator */}
          <div className="flex items-center justify-center lg:hidden" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
              Stay Updated
            </h3>
            <p className="text-sm leading-relaxed text-white/50">
              Get the latest news about our products and offers.
            </p>

            {subscribeSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-xl border border-gold/30 bg-gold/[0.07] backdrop-blur-sm px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-gold-light">
                      Welcome aboard!
                    </p>
                    <p className="mt-0.5 text-xs text-white/40">
                      Check your inbox for a confirmation.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className={`relative rounded-xl border p-1 transition-all duration-300 ${
                  emailFocused
                    ? 'border-gold/50 bg-gold/[0.04] shadow-lg shadow-gold/10'
                    : 'border-white/10 bg-white/[0.04]'
                }`}>
                  {/* Gold gradient border on focus */}
                  {emailFocused && (
                    <motion.div
                      layoutId="newsletter-focus-border"
                      className="absolute -inset-[1px] rounded-xl gold-gradient opacity-50"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative flex gap-2">
                    <Input
                      type="email"
                      placeholder={emailFocused ? '' : 'your@email.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      required
                      disabled={isSubmitting}
                      className="h-11 flex-1 rounded-lg border-0 bg-transparent text-sm text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting || !email.trim()}
                      className="h-11 gold-gradient shrink-0 border-0 px-4 text-white shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="flex items-center justify-center"
                        >
                          <Send className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      <span className="sr-only sm:not-sr-only sm:ml-2">Subscribe</span>
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-white/30">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Mobile gold dot separator */}
          <div className="flex items-center justify-center lg:hidden" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm leading-relaxed text-white/50">
                  1547/3, Jai Hind Building,
                  <br />
                  Bhagirath Place, Delhi-6
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div className="flex flex-col">
                  <a
                    href="tel:011-23873532"
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-gold-light"
                  >
                    011-23873532
                  </a>
                  <a
                    href="tel:9868225911"
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-gold-light"
                  >
                    9868225911
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="mailto:natrajenterprises14@gmail.com"
                  className="text-sm text-white/50 transition-colors duration-200 hover:text-gold-light break-all"
                >
                  natrajenterprises14@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated gold line above bottom bar */}
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="absolute inset-y-0 gold-gradient"
            initial={{ left: '-30%' }}
            animate={{ left: '130%' }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
              repeatDelay: 2,
            }}
            style={{ width: '30%' }}
          />
        </div>

        {/* Bottom bar */}
        <div className="py-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            {/* Back to top + Copyright */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={scrollToTop}
                aria-label="Back to top"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/40 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-gold hover:shadow-lg hover:shadow-gold/20"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
              <p className="text-xs text-white/40">
                &copy; {currentYear} Natraj Electricals. All rights reserved.
              </p>
            </div>

            {/* Made with love badge - prominent with gold border */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] backdrop-blur-sm px-4 py-2"
            >
              <Heart className="h-3.5 w-3.5 text-gold animate-pulse" />
              <span className="text-xs font-medium text-gold/80">
                Made with love in India
              </span>
            </motion.div>

            {/* Legal links */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setTermsOpen(true)}
                className="text-xs text-white/40 transition-colors duration-200 hover:text-gold-light"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-xs text-white/40 transition-colors duration-200 hover:text-gold-light"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Back to top link at the very bottom */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex items-center gap-2 text-xs text-white/25 transition-all duration-300 hover:text-gold"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowUp className="h-3.5 w-3.5 text-gold/60 group-hover:text-gold" />
              </motion.div>
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
