'use client'

/**
 * PerformanceDetector — Detects device tier from Three.js renderer capabilities.
 *
 * Renders nothing. Runs once on mount, reads Three.js renderer
 * capabilities, and writes the detected tier to the performance store.
 *
 * Placed inside the R3F Canvas so it has access to useThree().
 */

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { usePerformanceStore, detectPerformanceTier, isMobileDevice } from '@/store/performance.store'

export function PerformanceDetector() {
  const { gl }   = useThree()
  const setTier  = usePerformanceStore((s) => s.setTier)
  const detected = usePerformanceStore((s) => s.isDetected)

  useEffect(() => {
    if (detected) return  // Only run once

    const maxTextures = gl.capabilities.maxTextures
    const mobile      = isMobileDevice()
    const tier        = detectPerformanceTier(maxTextures, mobile)

    setTier(tier)
  }, [gl, setTier, detected])

  return null
}
