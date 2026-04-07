'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Simulate progress with realistic pacing and faster initial burst
  const animateProgress = useCallback(() => {
    const duration = 2000; // 2 seconds total
    const startTime = Date.now();
    const milestones = [
      { at: 0.0, value: 0 },
      { at: 0.10, value: 20 },  // Faster initial burst: reach 20% within 200ms
      { at: 0.35, value: 50 },
      { at: 0.60, value: 72 },
      { at: 0.80, value: 88 },
      { at: 0.95, value: 97 },
      { at: 1.0, value: 100 },
    ];

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Find the two milestones we're between
      let lower = milestones[0];
      let upper = milestones[milestones.length - 1];
      for (let i = 0; i < milestones.length - 1; i++) {
        if (t >= milestones[i].at && t <= milestones[i + 1].at) {
          lower = milestones[i];
          upper = milestones[i + 1];
          break;
        }
      }

      // Ease-out interpolation between milestones
      const segmentT = (t - lower.at) / (upper.at - lower.at || 1);
      const eased = 1 - Math.pow(1 - segmentT, 3);
      const value = lower.value + (upper.value - lower.value) * eased;

      setProgress(Math.round(value));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setIsComplete(true);
        // Brief pause at 100% before exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => setIsVisible(false), 600);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    animateProgress();
  }, [animateProgress]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal overflow-hidden"
        >
          {/* Subtle radial glow behind center content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-3xl" />
          </div>

          {/* Slow-rotating radial gradient background animation (10s cycle) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ opacity: 0.03 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                background: 'radial-gradient(ellipse at 30% 50%, rgba(200, 150, 62, 0.8) 0%, transparent 50%)',
              }}
            />
          </div>

          {/* Animated circuit lines - decorative background */}
          <CircuitPattern />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Animated Zap icon with orbiting dots */}
            <div className="relative mb-8">
              {/* Outer ring glow */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(200, 150, 62, 0.1)',
                    '0 0 40px rgba(200, 150, 62, 0.3)',
                    '0 0 20px rgba(200, 150, 62, 0.1)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Spinning ring */}
              <motion.div
                className="absolute -inset-2 rounded-full border border-gold/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {/* Second ring counter-rotating */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-gold/10 border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
              {/* Icon container */}
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/10 to-copper/10 border border-gold/20 flex items-center justify-center backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(200, 150, 62, 0.4))',
                      'drop-shadow(0 0 20px rgba(200, 150, 62, 0.8))',
                      'drop-shadow(0 0 8px rgba(200, 150, 62, 0.4))',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Zap className="w-10 h-10 text-gold" strokeWidth={1.5} />
                </motion.div>
              </motion.div>

              {/* Sparkle particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="w-3 h-3 text-gold-light" />
                </motion.div>
              ))}
            </div>

            {/* Company Name with gold text-shadow for premium feel */}
            <div className="relative">
              {/* 3 small gold dots that orbit around the NATRAJ text */}
              <motion.div
                className="absolute -top-8 -right-6 h-1 w-1 rounded-full bg-gold/40"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '70px 44px' }}
              />
              <motion.div
                className="absolute -top-6 -left-4 h-1 w-1 rounded-full bg-gold/40"
                animate={{
                  rotate: [120, 480],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '80px 48px' }}
              />
              <motion.div
                className="absolute -bottom-8 -left-6 h-1 w-1 rounded-full bg-gold/40"
                animate={{
                  rotate: [240, 600],
                }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '90px 52px' }}
              />

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] gradient-text mb-3"
                style={{ textShadow: '0 0 30px rgba(200, 150, 62, 0.15), 0 0 60px rgba(200, 150, 62, 0.08)' }}
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                NATRAJ
              </motion.h1>
            </div>

            <motion.p
              className="text-base sm:text-lg md:text-xl font-light tracking-[0.4em] text-gold-light/80 mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              ELECTRICALS
            </motion.p>

            {/* Progress Bar */}
            <div className="w-56 sm:w-64 md:w-72">
              {/* Progress track */}
              <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                {/* Animated shimmer background */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(90deg, transparent, rgba(200,150,62,0.05), transparent)',
                      'linear-gradient(90deg, transparent, rgba(200,150,62,0.15), transparent)',
                      'linear-gradient(90deg, transparent, rgba(200,150,62,0.05), transparent)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                >
                  {/* Shimmer effect on progress bar */}
                  <motion.div
                    className="absolute inset-y-0 w-full"
                    animate={{
                      backgroundPosition: ['-200% 0', '200% 0'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                </motion.div>
              </div>

              {/* Secondary progress bar (thinner, 30% opacity, independent timing) */}
              <motion.div
                className="relative mt-2 h-[1px] bg-white/5 rounded-full overflow-hidden"
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark/30 via-gold/30 to-gold-light/30"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress + 5, 100)}%` }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </motion.div>

              {/* Progress indicator dot */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gold-light"
                animate={{ left: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
                style={{ marginLeft: '-3px' }}
              />
            </div>

            {/* Progress text + Loading message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-4 flex flex-col items-center gap-1.5"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-gold/50 font-light">
                {isComplete ? 'Ready' : `${progress}%`}
              </p>
              {!isComplete && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-[11px] tracking-[0.15em] text-gold/30 font-light"
                >
                  Loading your experience...
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="loading-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal"
        >
          {/* Last frame before exit */}
          <div className="relative flex flex-col items-center">
            <Zap className="w-10 h-10 text-gold mb-4" strokeWidth={1.5} />
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] gradient-text mb-3"
              style={{ textShadow: '0 0 30px rgba(200, 150, 62, 0.15)' }}
            >
              NATRAJ
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light tracking-[0.4em] text-gold-light/80">
              ELECTRICALS
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Decorative circuit pattern for the background */
function CircuitPattern() {
  const lines = [
    { x1: '10%', y1: '20%', x2: '30%', y2: '20%' },
    { x1: '70%', y1: '30%', x2: '90%', y2: '30%' },
    { x1: '20%', y1: '70%', x2: '40%', y2: '70%' },
    { x1: '60%', y1: '80%', x2: '80%', y2: '80%' },
    { x1: '85%', y1: '15%', x2: '85%', y2: '35%' },
    { x1: '15%', y1: '65%', x2: '15%', y2: '85%' },
    { x1: '45%', y1: '10%', x2: '45%', y2: '25%' },
    { x1: '55%', y1: '75%', x2: '55%', y2: '90%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line, i) => (
        <motion.svg
          key={i}
          className="absolute"
          style={{ left: 0, top: 0, width: '100%', height: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
        >
          <motion.line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(200, 150, 62, 0.06)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.15,
              ease: 'easeInOut',
            }}
          />
          {/* Endpoint dots */}
          <motion.circle
            cx={line.x2}
            cy={line.y2}
            r="2"
            fill="rgba(200, 150, 62, 0.1)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.5 + i * 0.15,
            }}
          />
        </motion.svg>
      ))}
    </div>
  );
}
