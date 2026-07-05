/**
 * Performance Store for "For My Munchkin"
 *
 * Detects the device's GPU capability tier and stores the resulting
 * performance configuration. All Three.js components read from this
 * store to adjust their rendering complexity.
 *
 * Device tiers:
 *   high — Desktop GPU or Apple Silicon. Full experience.
 *   mid  — Mid-range integrated graphics. Reduced particles, no bloom.
 *   low  — Low-end mobile GPU. Minimal stars, no rotation, no bloom.
 */

import { create } from 'zustand'
import type { DeviceTier, PerformanceConfig } from '@/types/animation.types'
import { performanceConfigs } from '@/config/tokens.config'

interface PerformanceState {
  /** The detected device tier */
  tier: DeviceTier

  /** The resolved performance configuration for the current tier */
  config: PerformanceConfig

  /** Whether the tier has been detected (false on initial render) */
  isDetected: boolean
}

interface PerformanceActions {
  /**
   * Sets the device tier and resolves the performance config.
   * Called once by PerformanceProvider after Three.js renderer is ready.
   */
  setTier: (tier: DeviceTier) => void
}

type PerformanceStore = PerformanceState & PerformanceActions

const initialState: PerformanceState = {
  // Default to 'mid' until detection completes.
  // This prevents a flash of full-quality rendering on low-end devices.
  tier:       'mid',
  config:     performanceConfigs['mid'],
  isDetected: false,
}

export const usePerformanceStore = create<PerformanceStore>()((set) => ({
  ...initialState,

  setTier: (tier: DeviceTier) => {
    set({
      tier,
      config:     performanceConfigs[tier],
      isDetected: true,
    })
  },
}))

// ─── Performance Detection ────────────────────────────────────────────────────

/**
 * Detects the device's performance tier based on Three.js renderer capabilities.
 * Called once inside the Three.js canvas after the renderer is initialized.
 *
 * @param maxTextures - renderer.capabilities.maxTextures
 * @param isMobile - Whether the device is a mobile/tablet
 * @returns The detected DeviceTier
 */
export function detectPerformanceTier(
  maxTextures: number,
  isMobile: boolean
): DeviceTier {
  if (isMobile) {
    // Mobile devices get mid or low regardless of GPU capability
    return maxTextures >= 16 ? 'mid' : 'low'
  }

  // Desktop: use max texture units as a GPU capability proxy
  if (maxTextures >= 16) return 'high'
  if (maxTextures >= 8)  return 'mid'
  return 'low'
}

/**
 * Detects if the current device is mobile/tablet.
 * Uses navigator.maxTouchPoints as it is more reliable than user agent sniffing.
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  return navigator.maxTouchPoints > 1
}
