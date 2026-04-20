'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageCircle, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sampleReviews = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    date: '15 Jan 2025',
    rating: 5,
    productName: 'Three Phase Motor Starter Panel',
    review: 'Excellent quality panel! We installed it in our factory and it has been running flawlessly for over 6 months. The build quality is outstanding and customer support was very helpful during installation.',
    helpful: 12,
  },
  {
    id: 2,
    name: 'Amit Sharma',
    date: '8 Jan 2025',
    rating: 4,
    productName: 'Automatic Changeover Panel',
    review: 'Very reliable automatic changeover. Switches seamlessly between mains and generator power. Only minor suggestion would be to include a clearer user manual. Overall highly satisfied with the product.',
    helpful: 8,
  },
  {
    id: 3,
    name: 'Priya Mehta',
    date: '2 Jan 2025',
    rating: 5,
    productName: 'Temperature Control Panel',
    review: 'Perfect temperature regulation for our cold storage unit. The digital display is clear and the panel maintains consistent temperature. Natraj Electrical Control Panel delivered on time with excellent packaging.',
    helpful: 15,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    date: '28 Dec 2024',
    rating: 4,
    productName: 'Distribution Board (DB Box)',
    review: 'Good quality distribution board with proper labelling and safety features. The cable management inside is well thought out. Competitive pricing compared to other brands in the market.',
    helpful: 6,
  },
  {
    id: 5,
    name: 'Deepak Gupta',
    date: '20 Dec 2024',
    rating: 5,
    productName: 'Oil Immersed Starter',
    review: 'Heavy-duty starter that handles our industrial load perfectly. The oil cooling system is efficient and the panel has a robust design. Very happy with this purchase for our manufacturing unit.',
    helpful: 10,
  },
  {
    id: 6,
    name: 'Sunita Joshi',
    date: '12 Dec 2024',
    rating: 4,
    productName: 'Water Level Controller',
    review: 'Great water level controller for our building. Easy to install and works automatically without any issues. The sensor quality is good and response time is quick. Value for money product.',
    helpful: 7,
  },
]

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= rating
              ? 'fill-gold text-gold'
              : 'fill-muted text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ProductReviewsSection() {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? sampleReviews : sampleReviews.slice(0, 3)

  // Calculate average rating
  const avgRating = sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: sampleReviews.filter((r) => r.rating === star).length,
    percentage: (sampleReviews.filter((r) => r.rating === star).length / sampleReviews.length) * 100,
  }))

  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 md:py-24">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(200,150,62,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Customer <span className="gradient-text">Reviews</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mt-4 w-24"
          />
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-12 max-w-2xl rounded-2xl border border-border/50 bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            {/* Average rating */}
            <div className="flex flex-col items-center gap-2 sm:min-w-[120px]">
              <span className="text-5xl font-bold text-foreground">{avgRating.toFixed(1)}</span>
              <StarRating rating={Math.round(avgRating)} size="lg" />
              <span className="text-sm text-muted-foreground">{sampleReviews.length} reviews</span>
            </div>

            {/* Rating distribution bars */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.star} className="flex items-center gap-2">
                  <span className="w-6 text-xs text-muted-foreground">{item.star}</span>
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + (5 - item.star) * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-gold to-amber-500"
                    />
                  </div>
                  <span className="w-6 text-right text-xs text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayedReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-copper/20 text-sm font-bold text-gold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {/* Product name */}
              <span className="mb-2 inline-block rounded-full border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-xs font-medium text-gold">
                {review.productName}
              </span>

              {/* Review text */}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {review.review}
              </p>

              {/* Helpful */}
              <div className="mt-3 flex items-center gap-2 border-t border-border/30 pt-3">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-gold">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show more / less button */}
        <div className="mt-8 text-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-6 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              Show All Reviews
              <ChevronDown className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 rounded-full border border-border/50 px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              Show Less
              <ChevronUp className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Write a Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <a
            href={`https://wa.me/919868225911?text=${encodeURIComponent('Hi, I would like to share my review for a product I purchased from Natraj Electrical Control Panel.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-green-600/20 transition-all hover:shadow-green-600/30 hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" />
            Write a Review on WhatsApp
          </a>
          <p className="mt-2 text-xs text-muted-foreground">
            Share your experience to help other customers
          </p>
        </motion.div>
      </div>
    </section>
  )
}
