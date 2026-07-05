'use client'

/**
 * Providers — All React context providers composed together.
 *
 * Mounted once at the root layout. Order matters:
 *   1. GSAP registration (synchronous, immediate)
 *   2. Lenis initialization
 *   3. GSAP ↔ Lenis connection
 *   4. Audio system initialization
 *   5. Performance detection (deferred — needs Three.js renderer)
 *
 * This component is a Client Component because it initializes browser APIs.
 * The layout itself remains a Server Component.
 */

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { LazyMotion, domAnimation } from 'framer-motion'
import { registerGSAP, connectGSAPToLenis } from '@/lib/animation/gsap.config'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // 1. Register GSAP plugins and custom eases (synchronous, safe to call on mount)
    registerGSAP()

    // 2. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp:              0.075,
      smoothWheel:       true,
      orientation:       'vertical',
      gestureOrientation: 'vertical',
      // Sync with GSAP's RAF for a single animation loop
      autoRaf: false,
    })

    lenisRef.current = lenis

    // 3. Connect GSAP's ScrollTrigger to Lenis
    connectGSAPToLenis(lenis)

    return () => {
      // Clean up on unmount (development hot-reload)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    // LazyMotion with domAnimation tree-shakes Framer Motion to ~18kb
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
