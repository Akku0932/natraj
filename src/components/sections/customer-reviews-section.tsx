'use client'

import { useRef, useState, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, Send, MessageSquare, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

// ── Hardcoded customer review data ──────────────────────────────────────────
const customerReviews = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Project Manager',
    company: 'L&T Construction',
    rating: 5,
    text: 'Natraj Electricals has been our trusted electrical panel supplier for over 8 years. Their product range, competitive pricing, and reliable delivery make them our go-to partner for all large-scale construction projects.',
    date: '2024-11-15',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Facility Manager',
    company: 'Tata Motors',
    rating: 5,
    text: 'The automatic changeover panels from Natraj have been running flawlessly in our facility for 3 years. Quality and service are top-notch. Their technical support team is incredibly responsive.',
    date: '2024-10-28',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Owner',
    company: 'Singh Industries',
    rating: 4,
    text: 'From helping us select the right panels to ensuring timely delivery, Natraj Electricals is a true distribution partner. Highly recommended for any business seeking reliable electrical solutions.',
    date: '2024-10-05',
  },
  {
    id: 4,
    name: 'Sunita Gupta',
    role: 'Procurement Head',
    company: 'DLF Ltd',
    rating: 5,
    text: 'Consistent quality, competitive pricing, and excellent service. Natraj is our preferred supplier for all electrical panel requirements across our commercial and residential developments.',
    date: '2024-09-18',
  },
  {
    id: 5,
    name: 'Deepak Verma',
    role: 'Senior Engineer',
    company: 'NHAI',
    rating: 5,
    text: 'The busbar systems and distribution panels supplied by Natraj for our highway project exceeded all quality benchmarks. Truly professional outfit with deep domain expertise.',
    date: '2024-08-22',
  },
  {
    id: 6,
    name: 'Anita Joshi',
    role: 'Operations Director',
    company: 'Reliance Infrastructure',
    rating: 4,
    text: 'We switched to Natraj Electricals last year and the difference in product quality and after-sales support has been remarkable. Their team understands industrial requirements perfectly.',
    date: '2024-08-10',
  },
]

// ── Star rating display component ───────────────────────────────────────────
function StarRating({ count = 5, size = 'sm' }: { count?: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4'
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < count
              ? 'fill-gold text-gold drop-shadow-[0_0_6px_rgba(200,150,62,0.5)]'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

// ── Clickable star rating selector ──────────────────────────────────────────
function InteractiveStarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (val: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const starIndex = i + 1
        const isActive = starIndex <= (hovered || value)
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(starIndex)}
            onMouseEnter={() => setHovered(starIndex)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform duration-150 hover:scale-125 focus-gold-ring rounded-sm"
            aria-label={`Rate ${starIndex} star${starIndex > 1 ? 's' : ''}`}
          >
            <Star
              className={`h-6 w-6 transition-colors duration-150 ${
                isActive
                  ? 'fill-gold text-gold drop-shadow-[0_0_8px_rgba(200,150,62,0.6)]'
                  : 'fill-muted text-muted hover:fill-gold-light hover:text-gold-light'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

// ── Review card component ───────────────────────────────────────────────────
function ReviewCard({
  review,
  index,
}: {
  review: (typeof customerReviews)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <Card className="glass-gold relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 group card-shine">
        {/* Gold accent top border */}
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* Quote mark decoration */}
        <div className="absolute -top-1 right-4 opacity-[0.07] pointer-events-none select-none">
          <Quote className="h-20 w-20 fill-gold text-gold" />
        </div>

        <CardContent className="relative z-10 p-0">
          {/* Star rating */}
          <div className="mb-3">
            <StarRating count={review.rating} />
          </div>

          {/* Review text */}
          <p className="mb-5 text-sm leading-relaxed text-foreground/75 italic">
            &ldquo;{review.text}&rdquo;
          </p>

          {/* Divider */}
          <div className="mb-4 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/15 to-gold/5 text-sm font-bold text-gold">
              {review.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {review.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {review.role}
                {review.company ? `, ${review.company}` : ''}
              </p>
            </div>
            {/* Date */}
            <span className="ml-auto shrink-0 text-xs text-muted-foreground/60">
              {new Date(review.date).toLocaleDateString('en-IN', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ── Main section ────────────────────────────────────────────────────────────
export default function CustomerReviewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 0,
    review: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (formData.rating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a star rating before submitting.',
        variant: 'destructive',
      })
      return
    }

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      toast({
        title: 'Name required',
        description: 'Please enter your name (at least 2 characters).',
        variant: 'destructive',
      })
      return
    }

    if (!formData.review.trim() || formData.review.trim().length < 5) {
      toast({
        title: 'Review required',
        description: 'Please write a review (at least 5 characters).',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const ratingLabel = `${formData.rating}/5`

      const payload = {
        name: formData.name.trim(),
        email: `review-${Date.now()}@natrajcustomer.com`,
        subject: `Customer Review`,
        message: [
          `Rating: ${'★'.repeat(formData.rating)}${'☆'.repeat(5 - formData.rating)} (${ratingLabel})`,
          formData.company.trim() ? `Company: ${formData.company.trim()}` : null,
          '',
          formData.review.trim(),
        ]
          .filter(Boolean)
          .join('\n'),
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.error || 'Submission failed')
      }

      toast({
        title: 'Thank you for your review!',
        description: 'Your feedback has been submitted successfully. We truly appreciate you taking the time to share your experience.',
      })

      // Reset form
      setFormData({ name: '', company: '', rating: 0, review: '' })
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="customer-reviews"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 gold-gradient-subtle" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            <MessageSquare className="h-4 w-4" />
            Customer Reviews
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
          >
            What Our{' '}
            <span className="gradient-text">Customers Say</span>
          </motion.h2>

          <div className="section-divider mx-auto mt-5 w-24" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Real experiences from businesses that trust Natraj Electricals
            for their electrical panel needs across India.
          </motion.p>
        </div>

        {/* ── Review Grid ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {customerReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </motion.div>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />

        {/* ── Submit Review Form ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-2xl">
            <Card className="glass-gold relative overflow-hidden rounded-2xl">
              {/* Top gold accent border */}
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-gold/30 via-gold/70 to-gold/30" />

              {/* Background quote decoration */}
              <div className="absolute -bottom-2 -left-2 opacity-[0.04] pointer-events-none select-none">
                <Quote className="h-32 w-32 fill-gold text-gold" />
              </div>

              <CardContent className="relative z-10 p-6 sm:p-8">
                {/* Form header */}
                <div className="mb-6 text-center">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/20 px-4 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    <span className="text-xs font-medium uppercase tracking-wider text-gold">
                      Your Voice Matters
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    Share Your{' '}
                    <span className="gradient-text">Experience</span>
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Help other businesses make informed decisions
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Company row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="review-name"
                        className="text-sm font-medium text-foreground"
                      >
                        Your Name <span className="text-gold">*</span>
                      </label>
                      <Input
                        id="review-name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="border-border/60 bg-background/60 focus-visible:ring-gold/40 placeholder:text-muted-foreground/50"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="review-company"
                        className="text-sm font-medium text-foreground"
                      >
                        Company{' '}
                        <span className="text-xs font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </label>
                      <Input
                        id="review-company"
                        type="text"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="border-border/60 bg-background/60 focus-visible:ring-gold/40 placeholder:text-muted-foreground/50"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="space-y-2.5">
                    <label className="text-sm font-medium text-foreground">
                      Your Rating <span className="text-gold">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <InteractiveStarRating
                        value={formData.rating}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, rating: val }))
                        }
                      />
                      {formData.rating > 0 && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm font-medium text-gold"
                        >
                          {formData.rating} of 5
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Review textarea */}
                  <div className="space-y-2">
                    <label
                      htmlFor="review-text"
                      className="text-sm font-medium text-foreground"
                    >
                      Your Review <span className="text-gold">*</span>
                    </label>
                    <Textarea
                      id="review-text"
                      placeholder="Tell us about your experience with Natraj Electricals..."
                      rows={4}
                      value={formData.review}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, review: e.target.value }))
                      }
                      className="resize-none border-border/60 bg-background/60 focus-visible:ring-gold/40 placeholder:text-muted-foreground/50"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-white shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:brightness-110 transition-all duration-300 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Submit Review
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
