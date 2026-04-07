'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Trophy, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Project Manager, L&T Construction',
    text: 'Natraj Electricals delivered top-quality panels for our residential project. Their attention to detail and commitment to timelines was exceptional.',
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    role: 'Electrical Contractor',
    text: "I've been sourcing panels from Natraj for over 10 years. Their product range and reliability is unmatched in the market.",
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    role: 'Facility Manager, Tata Motors',
    text: 'The automatic changeover panels from Natraj have been running flawlessly in our facility for 3 years now. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Owner, Singh Industries',
    text: 'From custom panel design to after-sales support, Natraj Electricals is a true partner. Their engineering team understands industrial requirements perfectly.',
    rating: 5,
  },
  {
    name: 'Sunita Gupta',
    role: 'Procurement Head, DLF Ltd',
    text: 'Consistent quality, competitive pricing, and excellent service. Natraj is our go-to supplier for all electrical panel requirements.',
    rating: 5,
  },
  {
    name: 'Deepak Verma',
    role: 'Senior Engineer, NHAI',
    text: 'The busbar systems and distribution panels supplied by Natraj for our highway project exceeded all quality benchmarks.',
    rating: 5,
  },
]

const trustedBy = [
  'L&T Construction',
  'Tata Motors',
  'DLF Ltd',
  'NHAI',
  'Siemens',
  'Schneider',
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
    <div className="relative h-full overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.06] via-transparent to-gold/[0.03] p-6 md:p-8 transition-all duration-500 hover:border-gold/35 hover:shadow-xl hover:shadow-gold/5 group card-shine glow-hover spotlight-card backdrop-blur-sm">
      {/* Gold left border accent */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-gold via-gold-light to-copper" />

      {/* Large decorative gold quotation mark */}
      <span
        className="absolute -top-2 left-3 text-7xl font-serif leading-none text-gold/[0.08] select-none pointer-events-none z-0"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Star rating */}
      <div className="mb-4 relative z-10">
        <StarRating count={testimonial.rating} />
      </div>

      {/* Testimonial text */}
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base relative z-10">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author info */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-copper ring-2 ring-gold/40 text-white text-sm font-bold shrink-0">
          {testimonial.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold gradient-text truncate">
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
  const carouselRef = useRef<HTMLDivElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = next, -1 = prev

  // Determine how many items to show per page based on viewport
  // We use a simplified approach: we calculate groups
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

  // Auto-advance every 5 seconds
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

  // Get the testimonials for the current page
  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage,
  )

  // Slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
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
      {/* Background decoration */}
      <div className="absolute inset-0 gold-gradient-subtle" />
      <div className="absolute left-0 top-0 h-px w-full section-divider" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
          >
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-[2px] w-20 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-muted-foreground"
          >
            Trusted by{' '}
            <span className="text-foreground font-medium">200+</span>{' '}
            businesses across India
          </motion.p>
        </div>

        {/* Average Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-5 py-2 border border-gold/20">
            <Trophy className="h-4 w-4 text-gold" />
            <span className="text-sm font-bold gradient-text">5.0/5</span>
            <span className="text-sm text-muted-foreground">Average Rating</span>
            <div className="flex gap-0.5 ml-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-gold text-gold drop-shadow-[0_0_3px_rgba(200,150,62,0.3)]"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trusted By logos */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trustedBy.map((company) => (
              <span
                key={company}
                className="glass-gold rounded-full px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          ref={carouselRef}
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
            className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-gold/30 bg-background/60 backdrop-blur-md text-gold hover:bg-gold/10 hover:text-gold hover:border-gold/50 transition-all duration-300 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Next button */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-gold/30 bg-background/60 backdrop-blur-md text-gold hover:bg-gold/10 hover:text-gold hover:border-gold/50 transition-all duration-300 shadow-lg"
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
                {/* Fill empty slots for 3-col on last page */}
                {itemsPerPage === 3 &&
                  currentTestimonials.length < 3 &&
                  Array.from({
                    length: 3 - currentTestimonials.length,
                  }).map((_, i) => (
                    <div key={`empty-${i}`} className="hidden lg:block" />
                  ))}
                {itemsPerPage === 2 &&
                  currentTestimonials.length < 2 &&
                  Array.from({
                    length: 2 - currentTestimonials.length,
                  }).map((_, i) => (
                    <div key={`empty-${i}`} className="hidden md:block" />
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
                    ? 'w-8 bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-[0_0_8px_rgba(200,150,62,0.4)]'
                    : 'w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>

          {/* Quote decoration */}
          <div className="mt-6 flex items-center justify-center">
            <Quote className="h-8 w-8 text-gold/20" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
