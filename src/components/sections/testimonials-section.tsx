'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Trophy, Quote, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Project Manager, L&T Construction',
    text: 'Natraj Electricals has been our trusted electrical panel supplier for over 8 years. Their product range, competitive pricing, and reliable delivery make them our go-to partner.',
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    role: 'Electrical Contractor, Delhi NCR',
    text: "I've been sourcing panels from Natraj for over 10 years. Their range and reliability is unmatched. Best distributor in Bhagirath Place.",
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    role: 'Facility Manager, Tata Motors',
    text: 'The automatic changeover panels from Natraj have been running flawlessly in our facility for 3 years. Quality and service are top-notch.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Owner, Singh Industries',
    text: 'From helping us select the right panels to ensuring timely delivery, Natraj Electricals is a true distribution partner. Highly recommended for any business.',
    rating: 5,
  },
  {
    name: 'Sunita Gupta',
    role: 'Procurement Head, DLF Ltd',
    text: 'Consistent quality, competitive pricing, and excellent service. Natraj is our preferred supplier for all electrical panel requirements.',
    rating: 5,
  },
  {
    name: 'Deepak Verma',
    role: 'Senior Engineer, NHAI',
    text: 'The busbar systems and distribution panels supplied by Natraj for our highway project exceeded all quality benchmarks. Truly professional.',
    rating: 5,
  },
]

const trustedBy = [
  'L&T Construction',
  'Tata Motors',
  'DLF Ltd',
  'NHAI',
  'Siemens',
  'Schneider Electric',
]

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count
              ? 'fill-gold text-gold drop-shadow-[0_0_6px_rgba(200,150,62,0.5)]'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border/30 bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 group">
      {/* Top decorative line */}
      <div className="absolute left-6 top-0 h-0.5 w-10 bg-gradient-to-r from-gold/60 to-transparent" />

      {/* Star rating */}
      <div className="mb-4">
        <StarRating count={testimonial.rating} />
      </div>

      {/* Testimonial text */}
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base italic text-foreground/70">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Divider */}
      <div className="mb-5 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

      {/* Author info */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold/10 to-gold/5 text-white text-sm font-bold shrink-0">
          {testimonial.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  const getItemsPerPage = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return 3
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return 2
    return 1
  }

  const [itemsPerPage, setItemsPerPage] = useState(1)

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(getItemsPerPage())
    }
    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, totalPages])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage,
  )

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            <Sparkles className="h-4 w-4" />
            Client Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Trusted by{' '}
            <span className="gradient-text">200+ Businesses</span>{' '}
            Across India
          </motion.h2>
          <div className="section-divider mx-auto mt-5 w-20" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Hear from the businesses that rely on Natraj Electricals
          </motion.p>
        </div>

        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mb-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/20 px-5 py-2">
            <Trophy className="h-4 w-4 text-gold" />
            <span className="text-sm font-bold gradient-text">5.0/5</span>
            <span className="text-sm text-muted-foreground">Average Rating</span>
            <div className="flex gap-0.5 ml-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trusted By logos */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trustedBy.map((company) => (
              <span
                key={company}
                className="rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Next button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Carousel slides */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                }}
                className={`grid gap-6 ${
                  itemsPerPage === 3
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : itemsPerPage === 2
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1'
                }`}
              >
                {currentTestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-gold shadow-sm'
                    : 'w-2.5 bg-muted-foreground/20 hover:bg-muted-foreground/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
