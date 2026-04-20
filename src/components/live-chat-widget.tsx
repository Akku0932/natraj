'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
}

const BOT_RESPONSES: Record<string, string> = {
  'Product Pricing': 'Our prices are competitive and vary by product. For accurate pricing, please visit our Products page or call us at +91 98682 25911. We offer special discounts on bulk orders!',
  'Bulk Orders': 'Great choice! For bulk orders (10+ units), we offer 5-15% discounts. Please share your requirements at natrajenterprises14@gmail.com or call us directly.',
  'Delivery Info': 'We deliver Pan-India! Orders above \u20B910,000 get FREE delivery. Standard delivery: 3-5 business days. Express delivery available for urgent orders.',
  'Technical Support': 'Our technical team is available Mon-Sat, 9 AM - 7 PM IST. Call +91 98682 25911 or email natrajenterprises14@gmail.com for technical assistance.',
  'Contact Sales': 'Reach our sales team: \uD83D\uDCDE +91 98682 25911 | \u2709\uFE0F natrajenterprises14@gmail.com | \uD83D\uDCCD 1547/3, Jai Hind Building, Bhagirath Place, Delhi-6',
}

const DEFAULT_RESPONSE = 'Thanks for your message! Our team will get back to you shortly. For immediate assistance, please call +91 98682 25911.'

const QUICK_REPLIES = ['Product Pricing', 'Bulk Orders', 'Delivery Info', 'Technical Support', 'Contact Sales']

const GREETING: Message = {
  id: 'greeting',
  text: '\uD83D\uDC4B Hello! Welcome to Natraj Electricals. How can I help you today?',
  sender: 'bot',
}

const STORAGE_KEY = 'natraj-chat-open'
const VISIT_KEY = 'natraj-chat-first-visit'

function getInitialChatOpen(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-gold/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export function LiveChatWidget() {
  const [chatOpen, setChatOpen] = useState(getInitialChatOpen)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-open after 8 seconds on first visit
  useEffect(() => {
    try {
      const visited = sessionStorage.getItem(VISIT_KEY)
      if (!visited) {
        sessionStorage.setItem(VISIT_KEY, 'true')
        const timer = setTimeout(() => {
          setChatOpen(true)
          setUnread(0)
          sessionStorage.setItem(STORAGE_KEY, 'true')
        }, 8000)
        return () => clearTimeout(timer)
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist chatOpen and clear unread on open
  const toggleChat = useCallback(() => {
    setChatOpen((prev) => {
      const next = !prev
      try {
        sessionStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      if (next) setUnread(0)
      return next
    })
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input on open
  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [chatOpen])

  const addBotResponse = useCallback((text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, text, sender: 'bot' },
      ])
      if (!chatOpen) setUnread((prev) => prev + 1)
    }, 1000)
  }, [chatOpen])

  const handleQuickReply = useCallback((reply: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, text: reply, sender: 'user' },
    ])
    setHasInteracted(true)
    addBotResponse(BOT_RESPONSES[reply] || DEFAULT_RESPONSE)
  }, [addBotResponse])

  const handleSend = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, text: trimmed, sender: 'user' },
    ])
    setInput('')
    setHasInteracted(true)
    addBotResponse(DEFAULT_RESPONSE)
  }, [input, addBotResponse])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 left-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gold/15 bg-card shadow-2xl backdrop-blur-xl sm:w-80"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-gold-dark via-gold to-gold-light px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-white">Natraj Support</h4>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <p className="text-xs text-white/80">Usually replies within minutes</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              style={{ height: 'min(480px, calc(100vh - 200px))' }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'rounded-br-md bg-gradient-to-r from-gold-dark to-gold text-white'
                          : 'rounded-bl-md bg-muted text-foreground'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl rounded-bl-md bg-muted">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              {/* Quick replies */}
              {!hasInteracted && messages.length <= 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5 text-xs font-medium text-gold transition-all hover:bg-gold/15 hover:border-gold/40 active:scale-95"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-border/50 px-3 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="min-w-0 flex-1 rounded-full border border-border/50 bg-muted/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold-dark to-gold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-40 disabled:shadow-none active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {/* WhatsApp fallback */}
              <a
                href="https://wa.me/919868225911?text=Hello%20Natraj%20Electricals"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2 text-xs font-medium text-white transition-colors hover:bg-[#1da851]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-24 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-dark via-gold to-gold-light shadow-lg transition-shadow hover:shadow-xl ${
          unread > 0 && !chatOpen ? 'animate-pulse-gold' : ''
        }`}
        aria-label={chatOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-dark via-gold to-gold-light"
            >
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-dark via-gold to-gold-light"
            >
              <MessageCircle className="h-6 w-6 text-white" />
              {/* Unread badge */}
              <AnimatePresence>
                {unread > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm"
                  >
                    {unread}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
