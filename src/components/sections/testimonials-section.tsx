'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Project Manager, L&T Construction',
    text: 'Natraj Electricals delivered top-quality panels for our residential project. Their attention to detail and commitment to timelines was exceptional.',
  },
  {
    name: 'Amit Sharma',
    role: 'Electrical Contractor',
    text: "I've been sourcing panels from Natraj for over 10 years. Their product range and reliability is unmatched in the market.",
  },
  {
    name: 'Priya Mehta',
    role: 'Facility Manager, Tata Motors',
    text: 'The automatic changeover panels from Natraj have been running flawlessly in our facility for 3 years now. Highly recommended!',
  },
  {
    name: 'Vikram Singh',
    role: 'Owner, Singh Industries',
    text: 'From custom panel design to after-sales support, Natraj Electricals is a true partner. Their engineering team understands industrial requirements perfectly.',
  },
  {
    name: 'Sunita Gupta',
    role: 'Procurement Head, DLF Ltd',
    text: 'Consistent quality, competitive pricing, and excellent service. Natraj is our go-to supplier for all electrical panel requirements.',
  },
  {
    name: 'Deepak Verma',
    role: 'Senior Engineer, NHAI',
    text: 'The busbar systems and distribution panels supplied by Natraj for our highway project exceeded all quality benchmarks.',
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

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-5 w-5 fill-gold text-gold drop-shadow-[0_0_6px_rgba(200,150,62,0.5)]"
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-gold/10 bg-card p-6 md:p-8 transition-all duration-500 hover:border-gold/25 hover:shadow-xl hover:shadow-gold/5 group card-shine glow-hover spotlight-card">
        {/* Gold left border accent (always visible) */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-gold via-gold-light to-copper" />

        {/* Decorative gold quote mark */}
        <span className="absolute top-4 left-5 text-5xl font-serif leading-none text-gold/10 select-none pointer-events-none z-0" aria-hidden="true">
          ❝
        </span>

        {/* Quote icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 relative z-10">
          <Quote className="h-5 w-5 text-gold" />
        </div>

        {/* Star rating */}
        <div className="mb-4 relative z-10">
          <StarRating />
        </div>

        {/* Testimonial text */}
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base relative z-10">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Author info */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-full gold-gradient text-white text-sm font-bold shrink-0">
            {testimonial.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate smooth-underline">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

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
            Trusted by{' '}
            <span className="gradient-text">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Hear what our valued customers have to say about their experience
            working with Natraj Electricals
          </motion.p>
        </div>

        {/* Average Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
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
          transition={{ duration: 0.5, delay: 0.3 }}
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

        {/* Mobile scroll progress indicator */}
        <div className="mb-6 md:hidden">
          <div className="mx-auto h-1 max-w-xs overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
              initial={{ width: '16.66%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 12, ease: 'linear' }}
            />
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">Swipe to explore reviews</p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 stagger-in">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.name} className="pl-4 md:basis-1/2">
                  <TestimonialCard
                    testimonial={testimonial}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-3">
              <CarouselPrevious
                className="relative top-0 left-0 -translate-y-0 h-9 w-9 border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
              />
              <CarouselNext
                className="relative top-0 right-0 -translate-y-0 h-9 w-9 border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
