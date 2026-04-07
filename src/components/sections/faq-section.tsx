'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Plus, X, Headphones } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/use-store'

const faqs = [
  {
    question: 'What types of electrical panels does Natraj supply?',
    answer:
      'We supply a wide range including three-phase panels, automatic changeovers, busbar systems, temperature control panels, water level controllers, distribution panels, and more from India\'s leading brands like Siemens, Schneider, ABB, and Havells.',
  },
  {
    question: 'Are the products you supply certified?',
    answer:
      'Yes, Natraj Electricals supplies only ISI-marked, BIS, and CE certified products from reputed manufacturers. Every product is quality-checked before delivery to ensure it meets the highest standards.',
  },
  {
    question: 'Can I get custom panels for my specific needs?',
    answer:
      'Yes! We can source custom-configured panels from our manufacturing partners. Our team will help you find the right products for your exact specifications and budget.',
  },
  {
    question: 'What is the typical delivery timeline?',
    answer:
      'In-stock products are typically delivered within 3-7 working days. For larger or custom orders, delivery may take 10-20 days. We also offer expedited delivery for urgent requirements.',
  },
  {
    question: 'Do you provide installation support?',
    answer:
      'Yes, we provide detailed installation guidelines and technical support. For projects in Delhi NCR, our team can assist with on-site installation guidance as well.',
  },
  {
    question: 'What warranty do the products carry?',
    answer:
      'All products we supply come with the original manufacturer warranty. Specific warranty terms vary by product and brand, and are communicated at the time of order confirmation.',
  },
  {
    question: 'Do you offer after-sales support?',
    answer:
      'Yes, our dedicated team provides after-sales support including troubleshooting, maintenance guidance, and coordination with manufacturer service centers. You can reach us via phone, email, or WhatsApp.',
  },
  {
    question: 'How can I get a price quote?',
    answer:
      'You can request a quote through our contact form on the website, call us directly at +91 98682 25911, or message us on WhatsApp. We typically respond within 24 hours with a detailed quotation.',
  },
  {
    question: 'Do you provide installation services?',
    answer:
      'Yes, our team provides professional installation support and commissioning services for all our electrical panels. We ensure proper setup and testing before handover.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfers (NEFT/RTGS), cheque payments, and UPI. For large orders, we offer flexible payment terms including partial advance and milestone-based payments.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function NeedHelpCard({ isInView }: { isInView: boolean }) {
  const { setCurrentPage } = useStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 1 }}
      className="mt-12"
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-md sm:p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <Headphones className="h-7 w-7 text-gold" />
        </div>
        <h3 className="text-lg font-semibold text-white">
          Can&apos;t find what you&apos;re looking for?
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
          Our team is here to help you with any questions about our products or services.
        </p>
        <Button
          onClick={() => setCurrentPage('contact')}
          className="gold-gradient mt-6 border-0 px-8 text-white shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow"
        >
          Contact Support
        </Button>
      </div>
    </motion.div>
  )
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.06)_0%,transparent_70%)]" />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,150,62,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,62,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Section divider */}
      <div className="absolute left-0 top-0 h-px w-full section-divider" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Questions &amp; Answers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Frequently Asked{' '}
            <span className="gradient-text">FAQ</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60"
          >
            Find answers to common questions about our products, services, and
            how we can help with your electrical panel requirements
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`faq-${index}`}
                  className="border-white/10"
                >
                  <AccordionTrigger
                    className="group py-5 text-left text-base font-medium text-white hover:no-underline hover:text-gold transition-colors duration-200 [&[data-state=open]]:text-gold [&>svg:last-child]:hidden"
                  >
                    {faq.question}
                    <span className="relative flex size-5 shrink-0 items-center justify-center">
                      <Plus className="absolute size-4 text-gold/70 transition-all duration-200 group-hover:text-gold group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                      <X className="absolute size-4 text-gold opacity-0 transition-all duration-200 group-hover:text-gold group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-90" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-white/60 pb-5 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-white/40 text-sm">
            Still have questions?{' '}
            <a
              href="#contact"
              className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/30 hover:decoration-gold/60 transition-colors duration-200"
            >
              Get in touch with us
            </a>
          </p>
        </motion.div>

        {/* Need Help? Card */}
        <NeedHelpCard isInView={isInView} />
      </div>
    </section>
  )
}
