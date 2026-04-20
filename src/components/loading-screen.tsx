'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Simulate progress with realistic pacing
  const animateProgress = useCallback(() => {
    const duration = 2000;
    const startTime = Date.now();
    const milestones = [
      { at: 0.0, value: 0 },
      { at: 0.10, value: 20 },
      { at: 0.35, value: 50 },
      { at: 0.60, value: 72 },
      { at: 0.80, value: 88 },
      { at: 0.95, value: 97 },
      { at: 1.0, value: 100 },
    ];

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      let lower = milestones[0];
      let upper = milestones[milestones.length - 1];
      for (let i = 0; i < milestones.length - 1; i++) {
        if (t >= milestones[i].at && t <= milestones[i + 1].at) {
          lower = milestones[i];
          upper = milestones[i + 1];
          break;
        }
      }

      const segmentT = (t - lower.at) / (upper.at - lower.at || 1);
      const eased = 1 - Math.pow(1 - segmentT, 3);
      const value = lower.value + (upper.value - lower.value) * eased;

      setProgress(Math.round(value));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setIsComplete(true);
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
            <div className="w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-3xl" />
          </div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Pulsing Zap icon */}
            <motion.div
              className="relative mb-8"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Soft glow ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(200, 150, 62, 0.08)',
                    '0 0 35px rgba(200, 150, 62, 0.2)',
                    '0 0 20px rgba(200, 150, 62, 0.08)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 border border-gold/20 flex items-center justify-center"
                animate={{
                  filter: [
                    'drop-shadow(0 0 8px rgba(200, 150, 62, 0.3))',
                    'drop-shadow(0 0 16px rgba(200, 150, 62, 0.6))',
                    'drop-shadow(0 0 8px rgba(200, 150, 62, 0.3))',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Zap className="w-8 h-8 text-gold" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* NATRAJ ELECTRICALS with gold gradient */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] gradient-text mb-2"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              NATRAJ
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl font-light tracking-[0.4em] text-gold-light/80 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              ELECTRICALS
            </motion.p>

            {/* Progress Bar */}
            <div className="w-56 sm:w-64 md:w-72">
              {/* Track */}
              <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                {/* Animated fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                >
                  {/* Shimmer sweep */}
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

              {/* Thin secondary line */}
              <motion.div className="relative mt-1.5 h-[1px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark/20 via-gold/20 to-gold-light/20"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress + 5, 100)}%` }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </motion.div>

              {/* Leading dot */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gold-light"
                animate={{ left: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
                style={{ marginLeft: '-3px' }}
              />
            </div>

            {/* Progress text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-4 flex flex-col items-center gap-1"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-gold/50 font-light">
                {isComplete ? 'Ready' : `${progress}%`}
              </p>
              {!isComplete && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-[11px] tracking-[0.15em] text-gold/25 font-light"
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
          <div className="relative flex flex-col items-center">
            <Zap className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] gradient-text mb-2">
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
