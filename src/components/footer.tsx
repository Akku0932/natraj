'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin, Shield } from 'lucide-react'
import { useStore, type PageView } from '@/store/use-store'

const quickLinks: { label: string; page: PageView }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Contact', page: 'contact' },
]

const productLinks = [
  'Automatic Changeovers',
  'Busbar Systems',
  'Power Factor Panels',
  'Water Level Controllers',
  'Temperature Control Panels',
  'Digital Measuring Instruments',
]

export function Footer() {
  const { setCurrentPage, setTermsOpen, setPrivacyOpen } = useStore()

  const handleQuickLink = (page: PageView) => {
    setCurrentPage(page)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-charcoal text-white/80">
      {/* Top gold accent line */}
      <div className="h-px w-full gold-gradient" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
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
              Manufacturer and supplier of premium electrical control panels,
              automatic changeovers, busbar systems, and more. Serving the
              industry with excellence since establishment.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleQuickLink(link.page)}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-gold-light hover:pl-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gold-light uppercase">
              Our Products
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((product) => (
                <li key={product}>
                  <button
                    onClick={() => handleQuickLink('products')}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-gold-light hover:pl-1"
                  >
                    {product}
                  </button>
                </li>
              ))}
            </ul>
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
                    className="text-sm text-white/60 transition-colors hover:text-gold-light"
                  >
                    011-23873532
                  </a>
                  <a
                    href="tel:9868225911"
                    className="text-sm text-white/60 transition-colors hover:text-gold-light"
                  >
                    9868225911
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="mailto:natrajenterprises14@gmail.com"
                  className="text-sm text-white/60 transition-colors hover:text-gold-light break-all"
                >
                  natrajenterprises14@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              &copy; {currentYear} Natraj Electricals. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setTermsOpen(true)}
                className="text-xs text-white/40 transition-colors hover:text-gold-light"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-xs text-white/40 transition-colors hover:text-gold-light"
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
