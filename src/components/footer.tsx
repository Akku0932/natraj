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
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore, type PageView } from '@/store/use-store'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const quickLinks: { label: string; page: PageView }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Contact', page: 'contact' },
  { label: 'Sitemap', page: 'sitemap' },
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
        setTimeout(() => setSubscribeSuccess(false), 4000)
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
    <footer className="relative bg-charcoal text-white/80">
      {/* Top gold accent line */}
      <div className="h-px w-full gold-gradient" />

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.PNG"
                alt="Natraj Electricals"
                width={140}
                height={40}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 border border-white/10 w-fit">
              <Shield className="h-4 w-4 text-gold-light" />
              <span className="text-xs font-medium text-gold-light">
                ISO 9001:2015 Certified
              </span>
            </div>

            <p className="text-sm leading-relaxed text-white/60">
              <span className="[text-shadow:0_0_30px_rgba(200,150,62,0.05)]">Manufacturer and supplier of premium electrical control panels, automatic changeovers, busbar systems, and more.</span>{' '}
              Serving the industry with excellence since establishment.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold hover:shadow-lg hover:shadow-gold/10"
                >
                  <social.icon className="h-4 w-4" />
                </a>
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
                    className="group flex items-center gap-2.5 text-sm text-white/60 transition-all duration-200 hover:text-gold-light border-l-2 border-transparent hover:border-gold/40 hover:pl-2"
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
            <p className="text-sm leading-relaxed text-white/60">
              Get the latest news about our products and offers.
            </p>

            {subscribeSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-gold/20 bg-gold/5 px-4 py-3"
              >
                <p className="text-sm font-medium text-gold-light">
                  🎉 Welcome aboard!
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  Check your inbox for a confirmation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="gold-border-card space-y-3 rounded-lg p-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="h-10 flex-1 rounded-lg border-white/10 bg-white/5 text-sm text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20 disabled:opacity-50"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="h-10 gold-gradient shrink-0 border-0 px-4 text-white shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 disabled:opacity-50"
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
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm leading-relaxed text-white/60">
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
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-gold-light"
                  >
                    011-23873532
                  </a>
                  <a
                    href="tel:9868225911"
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-gold-light"
                  >
                    9868225911
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="mailto:natrajenterprises14@gmail.com"
                  className="text-sm text-white/60 transition-colors duration-200 hover:text-gold-light break-all"
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
        <div className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Back to top + Copyright */}
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <p className="text-xs text-white/40">
                &copy; {currentYear} Natraj Electricals. All rights reserved.
              </p>
            </div>

            {/* Made with love tagline (hidden on smallest screens) */}
            <p className="hidden text-xs text-white/30 sm:block">
              Made with ❤️ in India
            </p>

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
        </div>
      </div>
    </footer>
  )
}
