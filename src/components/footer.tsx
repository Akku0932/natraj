'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUp,
  Send,
  CheckCircle2,
  Heart,
  Lock,
  User,
  CreditCard,
  Banknote,
  Wallet,
  Landmark,
  Smartphone,
  BadgeCheck,
  Truck,
  MailCheck,
  Sparkles,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
  { icon: Facebook, href: '#', label: 'Follow us on Facebook', platform: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Follow us on Instagram', platform: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Follow us on Twitter', platform: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'Connect with us on LinkedIn', platform: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'Subscribe to our YouTube channel', platform: 'YouTube' },
]

const paymentMethods = [
  { icon: Smartphone, label: 'UPI' },
  { icon: Landmark, label: 'NEFT/RTGS' },
  { icon: Banknote, label: 'Cash' },
  { icon: Wallet, label: 'Cheque' },
  { icon: CreditCard, label: 'Credit Card' },
]

const trustBadges = [
  { icon: ShieldCheck, label: 'Secure Payments', description: '256-bit encryption' },
  { icon: Lock, label: 'SSL Protected', description: 'Data security' },
  { icon: BadgeCheck, label: '100% Genuine', description: 'Authentic products' },
  { icon: Truck, label: 'Fast Delivery', description: 'Pan-India shipping' },
]

export function Footer() {
  const { setCurrentPage, setTermsOpen, setPrivacyOpen } = useStore()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [quoteName, setQuoteName] = useState('')
  const [quotePhone, setQuotePhone] = useState('')
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false)
  const [quoteSuccess, setQuoteSuccess] = useState(false)

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
          description: "You'll receive our latest updates in your inbox.",
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

  const handleQuickQuote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!quoteName.trim() || !quotePhone.trim()) return

    setIsQuoteSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteName.trim(),
          phone: quotePhone.trim(),
          message: 'Quick callback request from footer form',
        }),
      })

      if (res.ok) {
        toast({
          title: 'Callback requested!',
          description: 'Our team will call you back shortly.',
          variant: 'default',
        })
        setQuoteName('')
        setQuotePhone('')
        setQuoteSuccess(true)
        setTimeout(() => setQuoteSuccess(false), 5000)
      } else {
        toast({
          title: 'Request failed',
          description: 'Please try again later.',
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
      setIsQuoteSubmitting(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-border/30 bg-charcoal/95 text-white/80 backdrop-blur-xl">
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
        {/* ─── Quick Quote Form ─── */}
        <div className="border-b border-white/10 py-10 lg:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              Need a <span className="gradient-text">Quick Quote?</span>
            </h3>
            <p className="mt-1.5 text-sm text-white/50">
              Leave your details and our team will call you back within 30 minutes.
            </p>
            {quoteSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/[0.08] px-6 py-3"
              >
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-green-300">
                  Request received! We&apos;ll call you back soon.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleQuickQuote} className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    required
                    disabled={isQuoteSubmitting}
                    className="h-10 w-full rounded-lg border-white/10 bg-white/[0.06] pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus-visible:border-gold/50 focus-visible:ring-0 disabled:opacity-50"
                  />
                </div>
                <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    required
                    disabled={isQuoteSubmitting}
                    className="h-10 w-full rounded-lg border-white/10 bg-white/[0.06] pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus-visible:border-gold/50 focus-visible:ring-0 disabled:opacity-50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isQuoteSubmitting || !quoteName.trim() || !quotePhone.trim()}
                  className="h-10 w-full rounded-lg gold-gradient border-0 px-6 text-sm font-semibold text-white shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 disabled:opacity-50 sm:w-auto"
                >
                  {isQuoteSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <Send className="h-4 w-4" />
                      </motion.div>
                      Sending...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Get Callback
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* ─── Main Footer Grid ─── */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-12 lg:py-16 lg:gap-x-8 lg:gap-y-12">
          {/* Column 1: Company Info — spans full on tablet, 4 cols on desktop */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.PNG"
                alt="Natraj Electricals logo"
                width={140}
                height={40}
                className="h-9 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-3 py-2 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-gold-light" />
              <span className="text-xs font-medium text-gold-light">
                ISO 9001:2015 Certified
              </span>
            </div>

            <p className="text-sm leading-relaxed text-white/50">
              Trusted distributor and supplier of quality electrical panels and components from India&apos;s leading brands. Serving businesses with excellence since 1998.
            </p>

            {/* Social Media Links with glass background, spring animation + gold ring on hover */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm text-white/40 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-gold hover:shadow-lg hover:shadow-gold/20 hover:ring-2 hover:ring-gold/30 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:outline-none"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile gold dot separator */}
          <div className="flex items-center justify-center sm:hidden" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
          </div>

          {/* Column 2: Quick Links — 3 cols on desktop */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleQuickLink(link.page)}
                    className={`group flex items-center gap-2.5 text-sm text-white/60 transition-all duration-200 hover:text-gold-light border-l-2 border-transparent hover:border-gold/40 hover:pl-2.5 hover:tracking-wide ${
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
          <div className="flex items-center justify-center sm:hidden" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
          </div>

          {/* Column 3: Newsletter — 5 cols on desktop */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
                Stay Updated
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/[0.08] px-2.5 py-0.5">
                <MailCheck className="h-3 w-3 text-gold" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                  Newsletter
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Get the latest news about products, offers, and industry insights delivered to your inbox.
            </p>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-gold/50" />
              <p className="text-xs font-medium text-gold/60">
                Join 2,500+ subscribers
              </p>
            </div>

            <AnimatePresence mode="wait">
              {subscribeSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="rounded-xl border border-green-500/30 bg-green-500/[0.06] backdrop-blur-sm px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 12, delay: 0.1 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0.4 }}
                        animate={{ scale: [0.5, 1.3, 1], opacity: [0.4, 0.8, 0] }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="absolute h-10 w-10 rounded-full bg-green-400/20"
                      />
                      <CheckCircle2 className="relative h-6 w-6 text-green-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-green-300">
                        You&apos;re subscribed!
                      </p>
                      <p className="mt-0.5 text-xs text-white/40">
                        Welcome aboard — check your inbox for confirmation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleNewsletterSubmit}
                  className="space-y-3"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={`relative rounded-xl border p-1 transition-all duration-300 ${
                    emailFocused
                      ? 'border-gold/50 bg-gold/[0.04] shadow-lg shadow-gold/10'
                      : 'border-white/10 bg-white/[0.04]'
                  }`}>
                    {/* Gold gradient border glow on focus */}
                    {emailFocused && (
                      <motion.div
                        layoutId="newsletter-focus-border"
                        className="absolute -inset-[1px] rounded-xl gold-gradient opacity-50"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {/* Newsletter visual indicator inside the input */}
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
                      <MailCheck className="h-3.5 w-3.5 text-gold/50 transition-colors duration-300" />
                      {emailFocused && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-gold/60"
                        >
                          Newsletter
                        </motion.span>
                      )}
                    </div>
                    <div className="relative flex gap-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        required
                        disabled={isSubmitting}
                        className="h-11 flex-1 rounded-lg border-0 bg-transparent pl-[76px] text-sm text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting || !email.trim()}
                        aria-label="Subscribe to newsletter"
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
                  <p className="flex items-center gap-1.5 text-xs text-white/30">
                    <Lock className="h-3 w-3 shrink-0" />
                    <span>We respect your privacy. No spam, ever.</span>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile gold dot separator */}
          <div className="flex items-center justify-center sm:hidden" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
          </div>

          {/* Column 4: Contact Info — full on tablet, 4 cols on desktop */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-4 lg:col-start-9">
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

        {/* ─── Trust Badges Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="border-t border-white/10 py-7"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.label}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 text-center transition-all duration-300 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.08] transition-colors duration-300 group-hover:border-gold/40 group-hover:bg-gold/15">
                  <badge.icon className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/70 transition-colors duration-200 group-hover:text-gold-light">
                    {badge.label}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/30 transition-colors duration-200 group-hover:text-white/50">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Payment Methods Section ─── */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Payment Methods:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60 transition-colors duration-200 hover:border-gold/20 hover:text-gold-light"
                >
                  <method.icon className="h-3 w-3 text-gold/50" />
                  {method.label}
                </span>
              ))}
            </div>
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

        {/* ─── Bottom Bar ─── */}
        <div className="py-5 sm:py-6">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            {/* Back to top button + Copyright */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={scrollToTop}
                aria-label="Back to top"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/40 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-gold hover:shadow-lg hover:shadow-gold/20 hover:ring-2 hover:ring-gold/20 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:outline-none"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
              <p className="text-xs text-white/40">
                &copy; {currentYear} Natraj Electricals. All rights reserved.
              </p>
            </div>

            {/* Made with love badge */}
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
                className="text-xs text-white/40 transition-all duration-200 hover:text-gold-light hover:underline underline-offset-2"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-xs text-white/40 transition-all duration-200 hover:text-gold-light hover:underline underline-offset-2"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Smooth "Back to Top" text link */}
          <div className="mt-4 flex justify-center">
            <motion.button
              onClick={scrollToTop}
              aria-label="Back to top"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 text-xs text-white/25 transition-all duration-300 hover:text-gold"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowUp className="h-3.5 w-3.5 text-gold/60 transition-colors duration-300 group-hover:text-gold" />
              </motion.div>
              <span className="tracking-wide">Back to top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
