/**
 * Design tokens as TypeScript constants for "For My Munchkin"
 *
 * This file is the TypeScript mirror of src/styles/tokens.css.
 * It is used by GSAP, Framer Motion, and Three.js — where CSS custom
 * properties are not accessible.
 *
 * MAINTENANCE RULE: When a value changes in tokens.css, it must be
 * updated here in the same commit. These two files must always match.
 */

import type { EaseName, DeviceTier, PerformanceConfig } from '@/types/animation.types'

// ─── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  // Foundation
  bg:              '#080608',
  surface:         '#100D0F',
  elevated:        '#1A151A',

  // Typography
  textPrimary:     '#F2EBE4',
  textSecondary:   '#A09088',
  textTertiary:    '#5C5058',

  // Narrative — Maroon (Love, Devotion, Warmth)
  maroon:          '#7D2535',
  maroonGlow:      '#A33048',
  maroonDim:       '#4A1520',

  // Narrative — Seafoam (Peace, Comfort, Home)
  seafoam:         '#6B9E98',
  seafoamGlow:     '#8DC4BD',
  seafoamDim:      '#3A5E5A',

  // Convergence — used once, at Stars Becoming One (Scene 27)
  convergence:     '#F5F0EE',
} as const

export type ColorKey = keyof typeof colors

// ─── Duration ─────────────────────────────────────────────────────────────────

/**
 * Duration values in SECONDS (GSAP native unit).
 * CSS equivalents are in tokens.css as millisecond values.
 */
export const durations = {
  micro:     0.3,
  short:     0.6,
  medium:    1.2,
  long:      1.8,
  cinematic: 2.4,
} as const

export type DurationKey = keyof typeof durations

// ─── Eases ────────────────────────────────────────────────────────────────────

/**
 * Cubic bezier values as arrays — for Framer Motion.
 * Format: [x1, y1, x2, y2]
 */
export const easeArrays: Record<EaseName, [number, number, number, number]> = {
  narrative: [0.25, 0.0, 0.10, 1.0],
  arrive:    [0.0,  0.0, 0.15, 1.0],
  depart:    [0.35, 0.0, 1.0,  1.0],
  breath:    [0.45, 0.0, 0.40, 1.0],
}

/**
 * GSAP-formatted ease strings.
 * Passed to GSAP's `ease` property directly.
 */
export const gsapEases: Record<EaseName, string> = {
  narrative: 'cubic-bezier(0.25, 0.0, 0.10, 1.0)',
  arrive:    'cubic-bezier(0.0, 0.0, 0.15, 1.0)',
  depart:    'cubic-bezier(0.35, 0.0, 1.0, 1.0)',
  breath:    'cubic-bezier(0.45, 0.0, 0.40, 1.0)',
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

/** Spacing scale in pixels. Base unit: 8px. */
export const spacing = {
  1:  8,
  2:  16,
  3:  24,
  4:  32,
  6:  48,
  8:  64,
  12: 96,
  16: 128,
  24: 192,
} as const

// ─── Three.js Color Vectors ───────────────────────────────────────────────────

/**
 * Colors converted to 0–1 RGB vectors for Three.js shader uniforms.
 * Parsed from the hex values above.
 */
function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return [r, g, b]
}

export const colorVec3 = {
  maroon:      hexToVec3(colors.maroon),
  maroonGlow:  hexToVec3(colors.maroonGlow),
  seafoam:     hexToVec3(colors.seafoam),
  seafoamGlow: hexToVec3(colors.seafoamGlow),
  textPrimary: hexToVec3(colors.textPrimary),
  convergence: hexToVec3(colors.convergence),
} as const

// ─── Performance Configs ──────────────────────────────────────────────────────

export const performanceConfigs: Record<DeviceTier, PerformanceConfig> = {
  high: {
    starCount:            4000,
    particleCount:        200,
    starRotationEnabled:  true,
    bloomEnabled:         true,
    dpr:                  0.75,
  },
  mid: {
    starCount:            2000,
    particleCount:        100,
    starRotationEnabled:  true,
    bloomEnabled:         false,
    dpr:                  0.75,
  },
  low: {
    starCount:            800,
    particleCount:        50,
    starRotationEnabled:  false,
    bloomEnabled:         false,
    dpr:                  0.5,
  },
}
