/**
 * GSAP global configuration for "For My Munchkin"
 *
 * Registers plugins, custom eases, and integrates GSAP with Lenis.
 * Called ONCE at application startup from Providers.tsx.
 *
 * This file has no React dependencies — it is pure GSAP setup.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import type Lenis from 'lenis'
import { gsapEaseStrings } from './eases'

let isInitialized = false

/**
 * Registers GSAP plugins and custom eases.
 * Safe to call multiple times — will no-op after first call.
 */
export function registerGSAP(): void {
  if (isInitialized) return
  gsap.registerPlugin(ScrollTrigger, CustomEase)

  // Register the four sacred custom eases under their names.
  // After registration, these names can be used directly in GSAP tweens:
  // gsap.to(el, { ease: 'narrative', ... })
  Object.entries(gsapEaseStrings).forEach(([name, value]) => {
    CustomEase.create(name, value)
  })

  // GSAP default settings
  gsap.defaults({
    ease: 'narrative',
    duration: 1.2,
  })

  isInitialized = true
}

/**
 * Integrates GSAP's ScrollTrigger with the Lenis smooth scroll instance.
 *
 * This must be called AFTER both GSAP is registered AND Lenis is initialized.
 * Called from Providers.tsx once both are ready.
 *
 * @param lenisInstance - The initialized Lenis instance
 */
export function connectGSAPToLenis(lenisInstance: Lenis): void {
  // Connect Lenis to GSAP's RAF ticker.
  // Lenis drives the scroll; GSAP reads from it.
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000)
  })

  // Disable GSAP's lag smoothing — Lenis handles this.
  gsap.ticker.lagSmoothing(0)

  // Tell ScrollTrigger to use Lenis as its scroll source.
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value?: number) {
      if (typeof value === 'number') {
        lenisInstance.scrollTo(value, { immediate: true })
      }
      return lenisInstance.scroll
    },
    getBoundingClientRect() {
      return {
        top:    0,
        left:   0,
        width:  window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  // Sync ScrollTrigger updates with Lenis scroll events.
  lenisInstance.on('scroll', ScrollTrigger.update)

  // Ensure ScrollTrigger refreshes when Lenis is ready.
  ScrollTrigger.addEventListener('refresh', () => lenisInstance.resize())
  ScrollTrigger.refresh()
}

/**
 * Cleans up GSAP's connection to Lenis.
 * Called when the Lenis instance is destroyed (e.g., on unmount in dev mode).
 */
export function disconnectGSAPFromLenis(): void {
  ScrollTrigger.clearScrollMemory()
  gsap.ticker.remove(() => {})
}

// Re-export ScrollTrigger so consumers don't need to import from gsap directly.
export { ScrollTrigger }
export { gsap }
