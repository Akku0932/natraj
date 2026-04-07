'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, ArrowRight, BookOpen, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const blogPosts = [
  {
    category: 'Industry News',
    title: "India's Smart Grid Revolution: What It Means for Electrical Panel Distributors",
    excerpt:
      'The Indian government\'s ambitious smart grid initiative is transforming power distribution. Learn how distributors can adapt to new digital metering, real-time monitoring, and automated fault detection systems.',
    author: 'Rajesh Kumar',
    initials: 'RK',
    color: 'from-gold to-amber-600',
    readTime: '5 min read',
    date: 'Jan 15, 2025',
  },
  {
    category: 'Regulations',
    title: 'Understanding the New BIS Standards for Electrical Panels in India',
    excerpt:
      'BIS has updated safety and performance standards for low-voltage switchgear assemblies. We break down the key changes every distributor and contractor needs to know before the compliance deadline.',
    author: 'Priya Sharma',
    initials: 'PS',
    color: 'from-copper to-orange-600',
    readTime: '7 min read',
    date: 'Jan 08, 2025',
  },
  {
    category: 'Solar',
    title: 'Solar Panel Integration: A Complete Guide for Commercial Buildings',
    excerpt:
      'With India targeting 500 GW renewable energy by 2030, solar integration is essential for new commercial projects. This guide covers panel sizing, inverter selection, and grid-tie compliance.',
    author: 'Amit Verma',
    initials: 'AV',
    color: 'from-emerald-500 to-teal-600',
    readTime: '8 min read',
    date: 'Dec 22, 2024',
  },
  {
    category: 'IoT',
    title: 'The Rise of IoT-Enabled Electrical Distribution Systems in India',
    excerpt:
      'Smart electrical panels with IoT sensors are enabling predictive maintenance, energy optimization, and remote monitoring. Explore the technology shaping India\'s modern infrastructure.',
    author: 'Neha Gupta',
    initials: 'NG',
    color: 'from-violet-500 to-purple-600',
    readTime: '6 min read',
    date: 'Dec 15, 2024',
  },
  {
    category: 'Regulations',
    title: 'Energy Efficiency Regulations 2025: How to Stay Compliant',
    excerpt:
      'New energy efficiency mandates from BEE require higher standards for industrial and commercial electrical installations. Here is a practical compliance roadmap for contractors and facility managers.',
    author: 'Vikram Singh',
    initials: 'VS',
    color: 'from-sky-500 to-blue-600',
    readTime: '5 min read',
    date: 'Dec 05, 2024',
  },
  {
    category: 'Guide',
    title: 'Choosing the Right Electrical Panel for Your Industrial Setup',
    excerpt:
      'Selecting the correct panel involves load calculations, fault-level considerations, environmental ratings, and future scalability. Our experts walk you through the decision process step by step.',
    author: 'Rajesh Kumar',
    initials: 'RK',
    color: 'from-gold to-amber-600',
    readTime: '10 min read',
    date: 'Nov 28, 2024',
  },
]

const popularTags = [
  'Electrical Panels',
  'Solar Energy',
  'BIS Standards',
  'Smart Grid',
  'IoT',
  'Energy Efficiency',
  'Three Phase',
  'Industry News',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const categoryColors: Record<string, string> = {
  'Industry News': 'border-gold/30 bg-gold/10 text-gold',
  Regulations: 'border-sky-400/30 bg-sky-400/10 text-sky-400',
  Solar: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
  IoT: 'border-violet-400/30 bg-violet-400/10 text-violet-400',
  Guide: 'border-copper/30 bg-copper/10 text-copper',
}

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="group relative"
    >
      {/* Gold border glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/40 group-hover:via-gold/20 group-hover:to-gold/40 group-hover:shadow-[0_0_24px_rgba(200,150,62,0.15)]" />

      <div className="glass card-shine relative flex h-full flex-col rounded-2xl p-6 transition-all duration-500">
        {/* Category badge */}
        <Badge
          className={`mb-4 w-fit rounded-full border text-xs font-medium ${categoryColors[post.category] ?? 'border-gold/30 bg-gold/10 text-gold'}`}
          variant="outline"
        >
          {post.category}
        </Badge>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-gold">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        {/* Bottom row: author + date / read time + link */}
        <div className="mt-auto border-t border-border/40 pt-4">
          <div className="mb-3 flex items-center gap-2.5">
            {/* Avatar */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.color} text-[10px] font-bold text-white`}
            >
              {post.initials}
            </div>
            <span className="text-sm font-medium text-foreground">{post.author}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm font-medium text-gold/70 transition-colors duration-200 hover:text-gold"
            >
              Read More
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/40" />
      </div>
    </motion.div>
  )
}

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-warm-gray" />
      <div className="gold-gradient-subtle absolute inset-0" />
      <div className="dot-pattern absolute inset-0" />

      {/* Top divider */}
      <div className="absolute left-0 top-0 h-px w-full section-divider" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold"
          >
            Knowledge Hub
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
          >
            Latest from Our{' '}
            <span className="gradient-text">Blog</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mt-6 w-24"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-muted-foreground"
          >
            Industry insights, technical guides, and market updates to keep you
            informed
          </motion.p>
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </motion.div>

        {/* Popular Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-14"
        >
          <div className="rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <Tag className="h-4 w-4 text-gold" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Popular Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-gold/40 hover:bg-gold/5 hover:text-gold"
                >
                  <BookOpen className="h-3 w-3" />
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
