'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/store/use-store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  ShoppingCart,
  Trash2,
  Eye,
  X,
  Plus,
  Minus,
  IndianRupee,
  MessageCircle,
  Package,
} from 'lucide-react'

const WHATSAPP_NUMBER = '919868225911'

export function EnquiryCartBar() {
  const {
    enquiryCart,
    setEnquiryCartOpen,
    clearEnquiryCart,
    getEnquiryCartTotal,
    getEnquiryCartCount,
  } = useStore()

  const itemCount = getEnquiryCartCount()
  const total = getEnquiryCartTotal()

  return (
    <AnimatePresence>
      {enquiryCart.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-background/80 px-4 py-3 shadow-lg shadow-gold/10 backdrop-blur-xl sm:gap-4 sm:px-6">
            {/* Cart icon with count */}
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600 shadow-md shadow-gold/25">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-charcoal px-1 text-[10px] font-bold leading-none text-white">
                {itemCount}
              </span>
            </div>

            {/* Info */}
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground">
                {itemCount} item{itemCount !== 1 ? 's' : ''} in quote
              </p>
              <p className="text-xs text-muted-foreground">
                {total > 0
                  ? `Est. ₹${total.toLocaleString('en-IN')} (excl. GST)`
                  : 'Contact for pricing'}
              </p>
            </div>

            {/* View Quote button */}
            <Button
              onClick={() => setEnquiryCartOpen(true)}
              className="bg-gradient-to-r from-gold to-amber-600 text-white border-0 shadow-md shadow-gold/20 hover:from-gold/90 hover:to-amber-600/90 text-sm font-semibold"
              size="sm"
            >
              <Eye className="mr-1.5 h-4 w-4" />
              <span className="sm:hidden">{itemCount}</span>
              <span className="hidden sm:inline">View Quote</span>
            </Button>

            {/* Clear button */}
            <Button
              onClick={clearEnquiryCart}
              variant="ghost"
              size="sm"
              className="h-9 w-9 rounded-full p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label="Clear enquiry cart"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function EnquiryCartModal() {
  const {
    enquiryCart,
    enquiryCartOpen,
    setEnquiryCartOpen,
    removeFromEnquiryCart,
    updateEnquiryQuantity,
    clearEnquiryCart,
    getEnquiryCartTotal,
    getEnquiryCartCount,
  } = useStore()

  const total = getEnquiryCartTotal()
  const itemCount = getEnquiryCartCount()

  // Build WhatsApp message from all items in cart
  const buildWhatsAppMessage = () => {
    const lines = [
      `Hi! I'd like to enquire about the following products:`,
      ``,
    ]

    enquiryCart.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.name}`)
      lines.push(`   Quantity: ${item.quantity}`)
      if (item.price !== null) {
        lines.push(`   Price: ₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')} (excl. GST)`)
      } else {
        lines.push(`   Price: Request Quote`)
      }
      lines.push(``)
    })

    if (total > 0) {
      lines.push(`────────────────`)
      lines.push(`Estimated Total: ₹${total.toLocaleString('en-IN')} (excl. GST)`)
    }
    lines.push(``)
    lines.push(`Thank you!`)

    return lines.join('\n')
  }

  const handleWhatsAppEnquiry = () => {
    const message = buildWhatsAppMessage()
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Dialog open={enquiryCartOpen} onOpenChange={setEnquiryCartOpen}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-600">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            Your Quote Builder
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {itemCount} item{itemCount !== 1 ? 's' : ''} selected for enquiry
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          {enquiryCart.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Your quote list is empty
              </p>
              <p className="text-xs text-muted-foreground/70">
                Browse products and add them to your enquiry cart
              </p>
              <Button
                variant="outline"
                className="mt-2 border-gold/30 text-gold hover:bg-gold/10"
                onClick={() => setEnquiryCartOpen(false)}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-3 pt-4">
              {/* Cart items */}
              {enquiryCart.map((item) => (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-xl border border-border/50 bg-muted/30 p-4 transition-colors hover:border-gold/30"
                >
                  <div className="flex items-start gap-3">
                    {/* Item info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.price !== null
                          ? `₹${item.price.toLocaleString('en-IN')} each (excl. GST)`
                          : 'Contact for price'}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromEnquiryCart(item.slug)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Remove ${item.name} from quote`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Quantity controls and subtotal */}
                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity +/- */}
                    <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-background">
                      <button
                        onClick={() =>
                          updateEnquiryQuantity(item.slug, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-l-lg text-foreground transition-colors hover:bg-gold/10"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex h-7 w-8 items-center justify-center text-xs font-semibold tabular-nums text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateEnquiryQuantity(item.slug, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-r-lg text-foreground transition-colors hover:bg-gold/10"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    {item.price !== null && (
                      <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                        <IndianRupee className="h-3.5 w-3.5 text-gold" />
                        {(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              <Separator className="my-4" />

              {/* Total */}
              <div className="flex items-center justify-between rounded-xl border border-gold/20 bg-gradient-to-r from-gold/5 to-amber-500/5 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Estimated Total</p>
                  <p className="text-xs text-muted-foreground">
                    {total > 0
                      ? 'Excl. GST, final pricing may vary'
                      : 'Pricing to be confirmed'}
                  </p>
                </div>
                {total > 0 ? (
                  <div className="flex items-center gap-1 text-xl font-bold text-foreground">
                    <IndianRupee className="h-4 w-4 text-gold" />
                    {total.toLocaleString('en-IN')}
                  </div>
                ) : (
                  <span className="text-sm font-medium text-gold">Request Quote</span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={clearEnquiryCart}
                  variant="outline"
                  className="flex-1 border-border/50 text-muted-foreground hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
                <Button
                  onClick={handleWhatsAppEnquiry}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white border-0 shadow-lg shadow-green-600/20 hover:from-green-700 hover:to-green-600 font-semibold text-sm"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Enquiry via WhatsApp
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
