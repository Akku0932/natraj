'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/store/use-store'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { BackToTopButton } from '@/components/back-to-top-button'
import { TermsModal } from '@/components/terms-modal'
import { PrivacyModal } from '@/components/privacy-modal'
import { ProductDetailModal } from '@/components/product-detail-modal'
import HeroSection from '@/components/sections/hero-section'
import FeaturesSection from '@/components/sections/features-section'
import StatsSection from '@/components/sections/stats-section'
import CategoriesPreview from '@/components/sections/categories-preview'
import CTASection from '@/components/sections/cta-section'
import AboutSection from '@/components/sections/about-section'
import ProductsSection from '@/components/sections/products-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import ContactSection from '@/components/sections/contact-section'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
}

export default function Home() {
  const { currentPage } = useStore()

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <HeroSection />
              <FeaturesSection />
              <StatsSection />
              <TestimonialsSection />
              <CategoriesPreview />
              <CTASection />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <AboutSection />
              <CTASection />
            </motion.div>
          )}

          {currentPage === 'products' && (
            <motion.div
              key="products"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ProductsSection />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ContactSection />
            </motion.div>
          )}

          {currentPage === 'terms' && (
            <motion.div
              key="terms"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <div className="min-h-screen pt-20 pb-12">
                <div className="mx-auto max-w-4xl px-4">
                  <h1 className="mb-2 text-4xl font-bold">
                    Terms &amp; <span className="gradient-text">Conditions</span>
                  </h1>
                  <p className="mb-8 text-muted-foreground">Last updated: January 2025</p>
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-muted-foreground">
                      Please use the Terms & Conditions dialog from the footer for the complete document.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'privacy' && (
            <motion.div
              key="privacy"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <div className="min-h-screen pt-20 pb-12">
                <div className="mx-auto max-w-4xl px-4">
                  <h1 className="mb-2 text-4xl font-bold">
                    Privacy <span className="gradient-text">Policy</span>
                  </h1>
                  <p className="mb-8 text-muted-foreground">Last updated: January 2025</p>
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-muted-foreground">
                      Please use the Privacy Policy dialog from the footer for the complete document.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
      <TermsModal />
      <PrivacyModal />
      <ProductDetailModal />
    </>
  )
}
