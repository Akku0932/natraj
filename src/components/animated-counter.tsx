'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

function formatNumber(num: number, decimals = 0): string {
  const fixed = num.toFixed(decimals)
  const [intPart, decPart] = fixed.split('.')
  const lastThree = intPart.slice(-3)
  const rest = intPart.slice(0, -3)
  const formatted = rest
    ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
    : lastThree
  return decPart ? `${formatted}.${decPart}` : formatted
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number | null>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const isInView = useInView(ref, { once: true })

  const animate = useCallback(
    (startTime: number) => {
      const durationMs = duration * 1000

      const step = (timestamp: number) => {
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        const easedProgress = easeOutExpo(progress)

        const currentValue = easedProgress * value

        if (decimals > 0) {
          setDisplayValue(parseFloat(currentValue.toFixed(decimals)))
        } else {
          setDisplayValue(Math.round(currentValue))
        }

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          // Ensure final value is exact
          setDisplayValue(value)
        }
      }

      rafRef.current = requestAnimationFrame(step)
    },
    [value, duration, decimals]
  )

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null

    const init = (timestamp: number) => {
      startTime = timestamp
      animate(startTime)
    }

    rafRef.current = requestAnimationFrame(init)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isInView, animate])

  const formatted = formatNumber(displayValue, decimals)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
