'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** Minimum height for the skeleton placeholder (default: '300px') */
  minHeight?: string;
  /** Custom rootMargin for IntersectionObserver (default: '200px') */
  rootMargin?: string;
  /** Custom class name for the wrapper element */
  className?: string;
}

/**
 * LazySection — Uses IntersectionObserver to lazy-load sections only when
 * they're about to enter the viewport. Improves performance by deferring
 * rendering of heavy components until they're needed.
 *
 * @example
 * <LazySection minHeight="400px">
 *   <HeavySectionComponent />
 * </LazySection>
 */
export default function LazySection({
  children,
  minHeight = '300px',
  rootMargin = '200px',
  className = '',
}: LazySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || hasBeenVisible) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          // Stop observing once the element is visible
          observerRef.current?.unobserve(element);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootMargin, hasBeenVisible]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: hasBeenVisible ? undefined : minHeight }}
    >
      {isVisible ? (
        children
      ) : (
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight }}
          aria-hidden="true"
        >
          {/* Skeleton placeholder with animated shimmer */}
          <div className="absolute inset-0 animate-pulse">
            {/* Main skeleton block */}
            <div
              className="rounded-xl w-full h-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(200,150,62,0.04) 25%, rgba(200,150,62,0.08) 50%, rgba(200,150,62,0.04) 75%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
              }}
            />
          </div>
          {/* Minimal loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-8 h-8">
                <div
                  className="absolute inset-0 rounded-full border-2 border-transparent"
                  style={{
                    borderTopColor: 'rgba(200, 150, 62, 0.4)',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                <div
                  className="absolute inset-1 rounded-full border-2 border-transparent"
                  style={{
                    borderBottomColor: 'rgba(200, 150, 62, 0.2)',
                    animation: 'spin 1.5s linear infinite reverse',
                  }}
                />
              </div>
              <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(200, 150, 62, 0.3)' }}>
                Loading
              </span>
            </div>
          </div>
          {/* Inline keyframes for skeleton shimmer and spin */}
          <style jsx>{`
            @keyframes skeleton-shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
