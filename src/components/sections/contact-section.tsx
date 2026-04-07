'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Clock3,
  MessageCircle,
  ExternalLink,
  Check,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Address',
    lines: ['1547/3, Jai Hind Building,', 'Bhagirath Place, Delhi-6'],
    color: 'from-gold/20 to-copper/20',
  },
  {
    icon: Phone,
    title: 'Phone Numbers',
    lines: ['011-23873532', '9868225911'],
    color: 'from-gold/20 to-copper/20',
  },
  {
    icon: Mail,
    title: 'Email Address',
    lines: ['natrajenterprises14@gmail.com'],
    color: 'from-gold/20 to-copper/20',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Mon - Sat: 9:00 AM - 7:00 PM', 'Sunday: Closed'],
    color: 'from-gold/20 to-copper/20',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
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

/* Checkmark path animation for success state */
const checkmarkPath = 'M6 12l4 4 8-8'

const steps = [
  { number: 1, label: 'Your Details' },
  { number: 2, label: 'Your Message' },
  { number: 3, label: 'Review & Send' },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showHint, setShowHint] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { toast } = useToast()

  // Parallax for the header section
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleWhatsAppSubmit = () => {
    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required' })
      return
    }
    if (!formData.message.trim()) {
      setErrors({ message: 'Message is required' })
      return
    }

    const whatsappMessage = `Hello, I'm ${formData.name.trim()}
Phone: ${formData.phone.trim() || 'Not provided'}
Email: ${formData.email.trim() || 'Not provided'}
Message: ${formData.message.trim()}`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/919868225911?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    toast({
      title: 'Opening WhatsApp...',
      description: 'Your message will be sent via WhatsApp.',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setCurrentStep(3)
    setShowHint(false)
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        toast({
          title: 'Message sent!',
          description: 'We\'ll get back to you within 24 hours.',
        })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        const data = await res.json()
        toast({
          title: 'Failed to send',
          description: data.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to connect. Please check your internet connection.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Auto-advance step logic
  const updateStep = useCallback(() => {
    if (isSubmitting || submitSuccess) return
    const hasName = formData.name.trim().length > 0
    const hasEmail = formData.email.trim().length > 0
    const hasMessage = formData.message.trim().length > 0

    if (hasName && hasEmail && hasMessage) {
      setCurrentStep(3)
      setShowHint(false)
    } else if (hasName && hasEmail) {
      setCurrentStep(2)
      setShowHint(true)
    } else {
      setCurrentStep(1)
      setShowHint(false)
    }
  }, [formData, isSubmitting, submitSuccess])

  useEffect(() => {
    updateStep()
  }, [updateStep])

  // Auto-hide hint after 4 seconds
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [showHint])

  // Reset step on success clear
  useEffect(() => {
    if (!submitSuccess) {
      setCurrentStep(1)
      setShowHint(false)
    }
  }, [submitSuccess])

  return (
    <div className="min-h-screen">
      {/* Page Header with gold mesh pattern and parallax */}
      <section ref={headerRef} className="relative overflow-hidden bg-charcoal py-20 md:py-28">
        {/* Decorative gold mesh/grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200,150,62,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,150,62,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Mesh gradient overlay to fade edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,150,62,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/80" />

        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
          >
            Have a project in mind? We&apos;d love to hear from you. Reach out and let&apos;s discuss your requirements.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form - Left side (wider) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-2xl p-8 md:p-10">
                {/* Gold accent line above header */}
                <div className="mb-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-gold to-copper" />
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
                  {/* 24h response badge */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold border border-gold/20"
                  >
                    <Clock3 className="h-3 w-3" />
                    We typically respond within 24 hours
                  </motion.span>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Fill out the form below and we&apos;ll respond as soon as possible.
                </p>

                {/* Step Progress Indicator */}
                {!submitSuccess && (
                  <div className="mb-8">
                    <div className="relative flex items-center justify-between">
                      {/* Connecting line behind circles */}
                      <div className="absolute left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] top-[15px] h-[2px] bg-muted-foreground/20">
                        <motion.div
                          className="h-full bg-gold"
                          initial={{ width: '0%' }}
                          animate={{
                            width: isSubmitting
                              ? '100%'
                              : `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100)}%`,
                          }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>

                      {steps.map((step) => {
                        const isCompleted =
                          !isSubmitting && !submitSuccess && currentStep > step.number
                        const isActive =
                          (isSubmitting && step.number === 3) ||
                          (!isSubmitting && !submitSuccess && currentStep === step.number)
                        const isFuture =
                          !isSubmitting && !submitSuccess && currentStep < step.number

                        return (
                          <div
                            key={step.number}
                            className="relative z-10 flex flex-1 flex-col items-center"
                          >
                            {/* Step circle */}
                            <motion.div
                              initial={false}
                              animate={{
                                scale: isActive ? 1.1 : 1,
                                boxShadow: isActive
                                  ? '0 0 16px rgba(200,150,62,0.4)'
                                  : 'none',
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                              }}
                              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                                isSubmitting && step.number === 3
                                  ? 'border-gold bg-gold'
                                  : isCompleted
                                    ? 'border-gold bg-gold'
                                    : isActive
                                      ? 'border-gold bg-gold'
                                      : isFuture
                                        ? 'border-muted-foreground/30 bg-background'
                                        : 'border-muted-foreground/30 bg-background'
                              }`}
                            >
                              {isSubmitting && step.number === 3 ? (
                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              ) : isCompleted ? (
                                <Check className="h-4 w-4 text-white" strokeWidth={3} />
                              ) : (
                                <span
                                  className={`text-xs font-semibold ${
                                    isActive
                                      ? 'text-white'
                                      : 'text-muted-foreground/50'
                                  }`}
                                >
                                  {step.number}
                                </span>
                              )}
                            </motion.div>

                            {/* Step label */}
                            <motion.span
                              key={`label-${step.number}-${isSubmitting ? 'sending' : currentStep}`}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`mt-2 text-center text-[11px] font-medium leading-tight sm:text-xs ${
                                isSubmitting && step.number === 3
                                  ? 'text-gold'
                                  : isActive
                                    ? 'text-gold'
                                    : isCompleted
                                      ? 'text-foreground/80'
                                      : 'text-muted-foreground/50'
                              }`}
                            >
                              {isSubmitting && step.number === 3
                                ? 'Sending...'
                                : step.label}
                            </motion.span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Subtle hint to continue */}
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{
                        opacity: showHint ? 1 : 0,
                        y: showHint ? 0 : 4,
                      }}
                      transition={{ duration: 0.4 }}
                      className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gold/80"
                    >
                      <ChevronRight className="h-3 w-3" />
                      <span>Great! Now add your message below</span>
                    </motion.div>
                  </div>
                )}

                {/* Success state step indicator */}
                {submitSuccess && (
                  <div className="mb-8">
                    <div className="relative flex items-center justify-between">
                      {/* Full connecting line - all gold */}
                      <div className="absolute left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] top-[15px] h-[2px]">
                        <motion.div
                          className="h-full bg-green-500"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>

                      {steps.map((step, index) => (
                        <div
                          key={step.number}
                          className="relative z-10 flex flex-1 flex-col items-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                              delay: index * 0.12,
                            }}
                            className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-green-500 bg-green-500"
                          >
                            <Check className="h-4 w-4 text-white" strokeWidth={3} />
                          </motion.div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.12 + 0.1 }}
                            className="mt-2 text-center text-[11px] font-medium leading-tight text-green-600 dark:text-green-400 sm:text-xs"
                          >
                            {index === steps.length - 1
                              ? 'Sent!'
                              : step.label}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 p-12 text-center dark:border-green-800 dark:bg-green-900/20"
                  >
                    {/* Animated checkmark circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40"
                    >
                      <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path
                          d={checkmarkPath}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                        />
                      </svg>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg font-semibold text-green-800 dark:text-green-300"
                    >
                      Message Sent Successfully!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-2 text-green-600 dark:text-green-400"
                    >
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </motion.p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="flex items-center gap-1 text-xs text-red-500">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="flex items-center gap-1 text-xs text-red-500">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or requirements..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {errors.message && (
                        <p className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gold text-white hover:bg-gold-dark"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="flex-1 bg-green-600 text-white hover:bg-green-700"
                        size="lg"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Send via WhatsApp
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info - Right side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="space-y-4"
              >
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={info.title}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10"
                    >
                      {/* Gold gradient top border accent */}
                      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex gap-4">
                        <div className={`inline-flex shrink-0 rounded-lg bg-gradient-to-br ${info.color} p-3`}>
                          <Icon className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{info.title}</h3>
                          {info.lines.map((line, i) => (
                            <p key={i} className="text-sm text-muted-foreground">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Quick CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 p-6 text-center"
              >
                <h3 className="mb-2 font-semibold text-foreground">Need Immediate Assistance?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Call us directly for urgent queries
                </p>
                <a
                  href="tel:9868225911"
                  className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  9868225911
                </a>
              </motion.div>

              {/* WhatsApp Quick Chat Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 rounded-xl border border-green-500/30 bg-green-50 p-6 text-center dark:bg-green-900/20"
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                  <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">Chat with us on WhatsApp</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Get instant replies for product queries, pricing, and technical support
                </p>
                <a
                  href="https://wa.me/919868225911?text=Hi%2C%20I%20have%20a%20query%20about%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Start Chat
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/50">
              {/* Gradient overlay at top and bottom of map to blend with page */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-background/80 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-background/80 to-transparent" />

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6743877557526!2d77.23151231508227!3d28.650804982415366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sBhagirath%20Place%2C%20Delhi%2C%20110006!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Natraj Electricals Location - Bhagirath Place, Delhi"
                className="w-full"
              />
            </div>

            {/* View on Google Maps link */}
            <div className="mt-3 text-center">
              <a
                href="https://www.google.com/maps/place/Bhagirath+Place,+Delhi,+110006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View on Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
