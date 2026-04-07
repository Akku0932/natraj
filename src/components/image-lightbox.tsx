'use client'

import { useEffect, useState, useCallback, startTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LightboxProps {
  images: string[]
  alt: string
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export function ImageLightbox({ images, alt, isOpen, onClose, initialIndex = 0 }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  // Sync currentIndex when initialIndex changes using startTransition to avoid cascading renders
  useEffect(() => {
    startTransition(() => {
      setCurrentIndex(initialIndex)
    })
  }, [initialIndex, isOpen])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }, [images.length])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    },
    [onClose, goToPrev, goToNext]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  const handleDownload = useCallback(() => {
    const img = images[currentIndex]
    if (!img) return
    const link = document.createElement('a')
    link.href = img
    link.download = `${alt}-${currentIndex + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [images, currentIndex, alt])

  if (!images.length || !isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative max-h-[90vh] max-w-[90vw] w-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white/80">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-3 right-3 z-10 flex gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-white/20 ${isZoomed ? 'ring-2 ring-gold/50' : ''}`}
                aria-label={isZoomed ? 'Exit zoom' : 'Zoom in'}
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                onClick={handleDownload}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-white/20"
                aria-label="Download image"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>

            {/* Image container */}
            <div className={`overflow-hidden rounded-2xl ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[85vh] max-w-[85vw] object-contain rounded-2xl"
                  onClick={() => setIsZoomed(!isZoomed)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/logo.PNG'
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails strip for multiple images */}
            {images.length > 1 && !isZoomed && (
              <div className="mt-3 flex gap-1.5 justify-center overflow-x-auto px-2 scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      i === currentIndex
                        ? 'border-gold scale-105 opacity-100'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${alt} thumbnail ${i + 1}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/logo.PNG'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
