---
Task ID: 3-a
Agent: frontend-component-builder
Task: Create loading/splash screen component

Work Log:
- Created /src/components/loading-screen.tsx
- Premium dark splash with gold gradient NATRAJ text using `gradient-text` class
- Animated Zap icon with dual rotating rings and sparkle particles orbiting
- Decorative circuit pattern lines in background with draw-in animation
- Realistic progress bar with milestone-based easing (5 keyframes over 2s)
- Gold gradient progress fill with shimmer overlay effect
- Progress percentage display that switches to "Ready" on completion
- Framer Motion AnimatePresence for smooth enter/exit transitions
- Auto-dismisses after ~2.5s total (2s progress + 300ms pause + 600ms fade)
- Uses `bg-charcoal` background with gold accent colors throughout
- Exported as named export `LoadingScreen`
- ESLint: 0 errors, 0 warnings

Stage Summary:
- Loading screen component created and ready for integration
- Component is fully self-contained with no external dependencies beyond framer-motion and lucide-react
- Premium Apple-style aesthetic matching the Natraj design system
