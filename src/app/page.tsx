'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, ArrowRight, FileText, LayoutGrid, Zap, MessageCircle, Mail } from 'lucide-react'
import { useStore } from '@/store/use-store'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { BackToTopButton } from '@/components/back-to-top-button'
import { TermsModal } from '@/components/terms-modal'
import { PrivacyModal } from '@/components/privacy-modal'
import { ProductDetailModal } from '@/components/product-detail-modal'
import { ProductComparisonModal } from '@/components/product-comparison-modal'
import { LoadingScreen } from '@/components/loading-screen'
import { ScrollProgress } from '@/components/scroll-progress'
import { AnnouncementBanner } from '@/components/announcement-banner'
import HeroSection from '@/components/sections/hero-section'
import FeaturesSection from '@/components/sections/features-section'
import StatsSection from '@/components/sections/stats-section'
import CategoriesPreview from '@/components/sections/categories-preview'
import CTASection from '@/components/sections/cta-section'
import CatalogDownloadSection from '@/components/sections/catalog-section'
import FeaturedMarquee from '@/components/sections/featured-marquee'
import AboutSection from '@/components/sections/about-section'
import ProductsSection from '@/components/sections/products-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import ClientsSection from '@/components/sections/clients-section'
import WhyChooseSection from '@/components/sections/why-choose-section'
import ProcessSection from '@/components/sections/process-section'
import ContactSection from '@/components/sections/contact-section'
import FaqSection from '@/components/sections/faq-section'
import CertificationsSection from '@/components/sections/certifications-section'
import IndustryApplications from '@/components/sections/industry-applications'
import PartnerLogosSection from '@/components/sections/partner-logos-section'
import ServiceAreasSection from '@/components/sections/service-areas-section'
import { CookieConsent } from '@/components/cookie-consent'
import { QuickSearchModal } from '@/components/quick-search-modal'
import { RecentlyViewedSection } from '@/components/recently-viewed-section'
import { SectionTransition } from '@/components/section-transition'
import LazySection from '@/components/lazy-section'

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, scale: 0.98, filter: 'blur(4px)' },
}

const pageTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
}

export default function Home() {
  const { currentPage, setCurrentPage } = useStore()

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <AnnouncementBanner />
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
              <SectionTransition variant="gold-line" />
              <FeaturesSection />
              <StatsSection />
              <ClientsSection />
              <LazySection minHeight="500px">
                <TestimonialsSection />
              </LazySection>
              <LazySection minHeight="400px">
                <WhyChooseSection />
              </LazySection>
              <SectionTransition variant="dots" />
              <ProcessSection />
              <SectionTransition variant="gold-line" />
              <LazySection minHeight="600px">
                <IndustryApplications />
              </LazySection>
              <CategoriesPreview />
              <CatalogDownloadSection />
              <LazySection minHeight="350px">
                <FeaturedMarquee />
              </LazySection>
              <CTASection />
              <LazySection minHeight="500px">
                <FaqSection />
              </LazySection>
              <SectionTransition variant="gradient" />
              <CertificationsSection />
              <LazySection minHeight="600px">
                <PartnerLogosSection />
              </LazySection>
              <LazySection minHeight="500px">
                <ServiceAreasSection />
              </LazySection>
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
              <Breadcrumbs items={[{ label: 'Home', page: 'home' }, { label: 'About' }]} />
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
              <Breadcrumbs items={[{ label: 'Home', page: 'home' }, { label: 'Products' }]} />
              <ProductsSection />
              <RecentlyViewedSection />
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
              <Breadcrumbs items={[{ label: 'Home', page: 'home' }, { label: 'Contact' }]} />
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
                      Terms &amp; <span className="gradient-text">Conditions</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
                    >
                      Last updated: January 2025
                    </motion.p>
                  </div>
                </section>

                <Breadcrumbs items={[{ label: 'Home', page: 'home' }, { label: 'Terms & Conditions' }]} />

                {/* Table of Contents */}
                <section className="border-b border-border/50 bg-muted/30 py-8">
                  <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold"
                    >
                      Table of Contents
                    </motion.h2>
                    <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {['acceptance-of-terms', 'products-and-services', 'pricing-and-payment', 'orders-and-delivery', 'warranty', 'intellectual-property', 'limitation-of-liability', 'privacy-policy-reference', 'governing-law', 'contact-information'].map((id, i) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="text-sm text-muted-foreground transition-colors hover:text-gold"
                        >
                          {i + 1}. {id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </a>
                      ))}
                    </nav>
                  </div>
                </section>

                {/* Content */}
                <section className="py-12 md:py-16">
                  <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* 1. Acceptance of Terms */}
                    <motion.article
                      id="acceptance-of-terms"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">1. Acceptance of Terms</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        These Terms and Conditions govern your use of the website and services provided by Natraj Electricals (&quot;the Company&quot;), located at 1547/3, Jai Hind Building, Bhagirath Place, Delhi-6. By accessing this website, browsing its content, or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these terms in their entirety. If you do not agree with any part of these terms, you must not use our website or services.
                      </p>
                    </motion.article>

                    {/* 2. Products and Services */}
                    <motion.article
                      id="products-and-services"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">2. Products and Services</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        Natraj Electricals manufactures and supplies a comprehensive range of electrical control panels and equipment, including but not limited to: three-phase panels, single-phase panels, automatic changeovers, busbar systems, temperature control panels, oil immersed starters, water level controllers, digital measuring instruments, power factor correction panels, air break starters, distribution boards, main switches, solar panels, and sequence timer panels.
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        All product specifications, images, and descriptions on this website are provided for informational purposes and do not constitute a binding offer. The Company reserves the right to modify product specifications, designs, or features without prior notice. Actual products may vary slightly from the representations shown herein due to ongoing improvements and manufacturing processes.
                      </p>
                    </motion.article>

                    {/* 3. Pricing and Payment */}
                    <motion.article
                      id="pricing-and-payment"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">3. Pricing and Payment</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        All prices displayed on this website are in Indian Rupees (INR) and are exclusive of applicable Goods and Services Tax (GST) and other statutory levies, unless expressly stated otherwise. Prices are indicative and subject to change without prior notice based on raw material costs, market conditions, and other factors.
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        A formal quotation provided by the Company shall be binding for a period of 30 days from the date of issue, unless otherwise specified in writing. Payment terms shall be as mutually agreed upon at the time of order confirmation. The Company reserves the right to require advance payment for custom-manufactured or large-scale orders.
                      </p>
                    </motion.article>

                    {/* 4. Orders and Delivery */}
                    <motion.article
                      id="orders-and-delivery"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">4. Orders and Delivery</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        All orders are subject to acceptance and confirmation by the Company. Delivery timelines provided are estimates and may vary based on order complexity, quantity, customization requirements, and prevailing logistics conditions. The Company shall make reasonable efforts to deliver products within the agreed timeframe.
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Shipping and freight charges are additional and shall be borne by the buyer unless expressly included in the order confirmation. Risk of damage or loss transfers to the buyer upon handover to the shipping carrier. The Company is not responsible for delays caused by circumstances beyond its reasonable control, including natural disasters, strikes, pandemics, or government actions.
                      </p>
                    </motion.article>

                    {/* 5. Warranty */}
                    <motion.article
                      id="warranty"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">5. Warranty</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        All electrical panels and equipment manufactured by Natraj Electricals are warranted against manufacturing defects and faulty workmanship for a period of 12 months from the date of dispatch, subject to the following conditions:
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                        <li>The product has been installed, operated, and maintained in accordance with the intended purpose and operating conditions specified in the product documentation.</li>
                        <li>The product has not been subject to unauthorized modification, repair, alteration, or misuse of any kind.</li>
                        <li>Any damage is not caused by negligence, accident, overloading, voltage fluctuations, natural calamity, or improper storage.</li>
                        <li>The warranty covers only the replacement or repair of defective components at the Company&apos;s discretion and does not extend to consequential damages, installation costs, or labor charges.</li>
                      </ul>
                    </motion.article>

                    {/* 6. Intellectual Property */}
                    <motion.article
                      id="intellectual-property"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">6. Intellectual Property</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        All content on this website, including but not limited to text, graphics, logos, images, product designs, software code, and the overall website design, is the exclusive intellectual property of Natraj Electricals and is protected by applicable Indian and international intellectual property laws. Unauthorized reproduction, distribution, modification, display, or use of any content from this website is strictly prohibited and may result in legal action. The Natraj Electricals name and logo are registered trademarks and may not be used without prior written consent.
                      </p>
                    </motion.article>

                    {/* 7. Limitation of Liability */}
                    <motion.article
                      id="limitation-of-liability"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">7. Limitation of Liability</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        To the maximum extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our products or services, including but not limited to loss of profits, revenue, data, business opportunities, or goodwill. Our total aggregate liability for any claim arising from or related to these terms shall not exceed the purchase price of the specific product or service giving rise to the claim. This limitation applies regardless of the legal theory on which the claim is based.
                      </p>
                    </motion.article>

                    {/* 8. Privacy Policy Reference */}
                    <motion.article
                      id="privacy-policy-reference"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">8. Privacy Policy Reference</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Your use of this website is also governed by our Privacy Policy, which describes how we collect, use, store, and protect your personal information. By using our website, you consent to the collection and use of your information as described in the Privacy Policy. We encourage you to review our Privacy Policy periodically to stay informed about our data practices.
                      </p>
                    </motion.article>

                    {/* 9. Governing Law */}
                    <motion.article
                      id="governing-law"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">9. Governing Law</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or in connection with these terms, or any breach thereof, shall be subject to the exclusive jurisdiction of the competent courts in Delhi, India. The parties agree to attempt amicable resolution of any disputes before initiating legal proceedings.
                      </p>
                    </motion.article>

                    {/* 10. Contact Information */}
                    <motion.article
                      id="contact-information"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">10. Contact Information</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        For any queries, concerns, or clarification regarding these Terms and Conditions, please contact us at:
                      </p>
                      <div className="rounded-xl bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
                        <p className="font-medium text-foreground">Natraj Electricals</p>
                        <p>1547/3, Jai Hind Building, Bhagirath Place, Delhi-6</p>
                        <p>Phone: 011-23873532, 9868225911</p>
                        <p>Email: natrajenterprises14@gmail.com</p>
                      </div>
                    </motion.article>
                  </div>
                </section>
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
                      Privacy <span className="gradient-text">Policy</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
                    >
                      Last updated: January 2025
                    </motion.p>
                  </div>
                </section>

                <Breadcrumbs items={[{ label: 'Home', page: 'home' }, { label: 'Privacy Policy' }]} />

                {/* Table of Contents */}
                <section className="border-b border-border/50 bg-muted/30 py-8">
                  <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold"
                    >
                      Table of Contents
                    </motion.h2>
                    <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {['information-collection', 'use-of-information', 'information-sharing', 'data-security', 'cookies', 'third-party-links', 'user-rights', 'childrens-privacy', 'changes-to-policy', 'contact-information'].map((id, i) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="text-sm text-muted-foreground transition-colors hover:text-gold"
                        >
                          {i + 1}. {id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </a>
                      ))}
                    </nav>
                  </div>
                </section>

                {/* Content */}
                <section className="py-12 md:py-16">
                  <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
                    {/* 1. Information Collection */}
                    <motion.article
                      id="information-collection"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">1. Information Collection</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        Natraj Electricals (&quot;the Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) may collect the following types of information when you visit our website or interact with our services:
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                        <li><strong className="text-foreground/80">Contact Information:</strong> Name, email address, phone number, and mailing address when you submit a contact form, request a quotation, or subscribe to our newsletter.</li>
                        <li><strong className="text-foreground/80">Business Information:</strong> Company name, GST number, and business address for commercial inquiries and bulk orders.</li>
                        <li><strong className="text-foreground/80">Technical Information:</strong> IP address, browser type, device information, operating system, and browsing patterns collected automatically through cookies and similar technologies.</li>
                        <li><strong className="text-foreground/80">Usage Data:</strong> Pages visited, time spent on pages, click patterns, search queries, and referring URLs.</li>
                      </ul>
                    </motion.article>

                    {/* 2. Use of Information */}
                    <motion.article
                      id="use-of-information"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">2. Use of Information</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        We use the information we collect for the following legitimate purposes:
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                        <li>To respond to your inquiries, provide customer support, and process your requests in a timely manner.</li>
                        <li>To process orders, prepare quotations, manage transactions, and deliver products and services.</li>
                        <li>To send product updates, promotional offers, industry news, and newsletters (only with your explicit consent).</li>
                        <li>To analyze website usage patterns and improve our website, products, and overall user experience.</li>
                        <li>To comply with applicable legal obligations, enforce our terms, and protect our rights.</li>
                        <li>To detect, prevent, and address technical issues, security threats, or fraudulent activities.</li>
                      </ul>
                    </motion.article>

                    {/* 3. Information Sharing */}
                    <motion.article
                      id="information-sharing"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">3. Information Sharing</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        We do not sell, trade, rent, or otherwise monetize your personal information to third parties. We may share your information only in the following limited circumstances:
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                        <li><strong className="text-foreground/80">Trusted Service Providers:</strong> Third-party vendors who assist us in website hosting, payment processing, logistics, or order fulfillment, bound by confidentiality agreements.</li>
                        <li><strong className="text-foreground/80">Legal Requirements:</strong> When required by applicable law, regulation, court order, or governmental authority.</li>
                        <li><strong className="text-foreground/80">Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of company assets, subject to continued protection of your data.</li>
                        <li><strong className="text-foreground/80">Analytics:</strong> Anonymized and aggregated data with analytics tools to understand website traffic and improve our services.</li>
                      </ul>
                    </motion.article>

                    {/* 4. Data Security */}
                    <motion.article
                      id="data-security"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">4. Data Security</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure server infrastructure, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security. We will notify you promptly in the event of any data breach that may affect your personal information.
                      </p>
                    </motion.article>

                    {/* 5. Cookies */}
                    <motion.article
                      id="cookies"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">5. Cookies</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytical data. Cookies are small data files stored on your device that help us:
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                        <li>Remember your preferences, settings, and session information.</li>
                        <li>Understand how you interact with our website and identify areas for improvement.</li>
                        <li>Provide relevant content and product recommendations.</li>
                        <li>Analyze aggregate website traffic and performance metrics.</li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        You can control cookie preferences through your browser settings. Please note that disabling cookies may affect certain functionalities and features of the website.
                      </p>
                    </motion.article>

                    {/* 6. Third-Party Links */}
                    <motion.article
                      id="third-party-links"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">6. Third-Party Links</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Our website may contain links to third-party websites, including social media platforms, partner websites, and external resources. These links are provided for your convenience and reference only. We do not have control over the content, privacy policies, or practices of third-party websites. The inclusion of any link does not imply endorsement by Natraj Electricals. We recommend that you review the privacy policy of any third-party website before providing personal information. We are not responsible for any damage or loss arising from your interaction with third-party websites.
                      </p>
                    </motion.article>

                    {/* 7. User Rights */}
                    <motion.article
                      id="user-rights"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">7. User Rights</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        You have the following rights regarding your personal information:
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                        <li><strong className="text-foreground/80">Access:</strong> Request a copy of the personal information we hold about you.</li>
                        <li><strong className="text-foreground/80">Correction:</strong> Request correction of any inaccurate or incomplete personal data.</li>
                        <li><strong className="text-foreground/80">Deletion:</strong> Request deletion of your personal information, subject to applicable legal and regulatory obligations.</li>
                        <li><strong className="text-foreground/80">Withdrawal of Consent:</strong> Withdraw your consent for marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.</li>
                        <li><strong className="text-foreground/80">Complaint:</strong> Lodge a complaint with the relevant data protection authority if you believe your privacy rights have been violated.</li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        To exercise any of these rights, please contact us using the details provided in the Contact Information section below.
                      </p>
                    </motion.article>

                    {/* 8. Children's Privacy */}
                    <motion.article
                      id="childrens-privacy"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">8. Children&apos;s Privacy</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Our website and services are not directed to individuals under the age of 18. We do not knowingly collect, store, or process personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately at the details provided below. Upon verification, we will take prompt steps to delete such information from our systems.
                      </p>
                    </motion.article>

                    {/* 9. Changes to Policy */}
                    <motion.article
                      id="changes-to-policy"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">9. Changes to This Policy</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        We reserve the right to update, modify, or replace this Privacy Policy at any time to reflect changes in our practices, technologies, or applicable laws and regulations. Any material changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically to stay informed about how we collect, use, and protect your information. Your continued use of the website after any changes constitutes your acceptance of the updated policy.
                      </p>
                    </motion.article>

                    {/* 10. Contact Information */}
                    <motion.article
                      id="contact-information"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className="border-l-2 border-gold/40 pl-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-foreground">10. Contact Information</h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                      </p>
                      <div className="rounded-xl bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
                        <p className="font-medium text-foreground">Natraj Electricals</p>
                        <p>1547/3, Jai Hind Building, Bhagirath Place, Delhi-6</p>
                        <p>Phone: 011-23873532, 9868225911</p>
                        <p>Email: natrajenterprises14@gmail.com</p>
                      </div>
                    </motion.article>
                  </div>
                </section>
              </div>
            </motion.div>
          )}
          {currentPage === 'sitemap' && (
            <motion.div
              key="sitemap"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
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
                      Site <span className="gradient-text">Map</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
                    >
                      Navigate to any section of our website
                    </motion.p>
                  </div>
                </section>

                <Breadcrumbs items={[{ label: 'Home', page: 'home' }, { label: 'Sitemap' }]} />

                <section className="py-12 md:py-20">
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Pages */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mb-12"
                    >
                      <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                          <FileText className="h-4 w-4" />
                        </span>
                        Pages
                      </h2>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          { label: 'Home', page: 'home' as const, desc: 'Overview, features, and highlights' },
                          { label: 'About Us', page: 'about' as const, desc: 'Our story, mission, and team' },
                          { label: 'Products', page: 'products' as const, desc: 'Browse our full product catalog' },
                          { label: 'Contact', page: 'contact' as const, desc: 'Get in touch with us' },
                          { label: 'Terms & Conditions', page: 'terms' as const, desc: 'Website terms and policies' },
                          { label: 'Privacy Policy', page: 'privacy' as const, desc: 'How we handle your data' },
                        ].map((item, i) => (
                          <motion.button
                            key={item.page}
                            onClick={() => setCurrentPage(item.page)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group rounded-xl border border-border/50 bg-card p-5 text-left transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 card-shine"
                          >
                            <div className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-gold">
                              {item.label}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.desc}</div>
                            <ChevronRight className="mt-2 h-4 w-4 text-gold/0 transition-all group-hover:translate-x-1 group-hover:text-gold" />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Product Categories */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                          <LayoutGrid className="h-4 w-4" />
                        </span>
                        Product Categories
                      </h2>
                      <div className="rounded-xl border border-border/50 bg-card p-6">
                        <p className="mb-4 text-sm text-muted-foreground">
                          Browse our 16 product categories
                        </p>
                        <button
                          onClick={() => setCurrentPage('products')}
                          className="inline-flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-2.5 text-sm font-medium text-gold transition-all hover:bg-gold/20 hover:shadow-md hover:shadow-gold/10"
                        >
                          View All Products
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-12"
                    >
                      <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                          <Zap className="h-4 w-4" />
                        </span>
                        Quick Actions
                      </h2>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <a
                          href="https://wa.me/919868225911?text=Hello%20Natraj%20Electricals!%20I%20would%20like%20to%20enquire%20about%20your%20products."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                            <MessageCircle className="h-5 w-5" />
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-foreground">Chat on WhatsApp</div>
                            <div className="text-xs text-muted-foreground">Quick response guaranteed</div>
                          </div>
                        </a>
                        <button
                          onClick={() => setCurrentPage('contact')}
                          className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 text-left transition-all hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                            <Mail className="h-5 w-5" />
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-foreground">Request a Quote</div>
                            <div className="text-xs text-muted-foreground">Get pricing for your project</div>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </section>
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
      <ProductComparisonModal />
      <CookieConsent />
      <QuickSearchModal />
    </>
  )
}
