/**
 * Custom ease definitions for "For My Munchkin"
 *
 * These are the ONLY eases used in this project.
 * Defined in both GSAP string format and Framer Motion array format.
 *
 * Named constants prevent magic strings scattered throughout the codebase.
 */

import type { EaseName } from '@/types/animation.types'

// ─── Framer Motion Format ─────────────────────────────────────────────────────

/**
 * Cubic bezier arrays for Framer Motion's `ease` prop.
 * Format: [x1, y1, x2, y2]
 */
export const motionEases: Record<EaseName, [number, number, number, number]> = {
  /**
   * narrative — The primary ease.
   * Slow to start, slow to finish. Like a breath.
   * Used for: text entrances, scene-level animations, most transitions.
   */
  narrative: [0.25, 0.0, 0.10, 1.0],

  /**
   * arrive — Fast start, very slow settle.
   * Elements come in with confidence and find their place gently.
   * Used for: content blocks arriving from below, scene entrances.
   */
  arrive: [0.0, 0.0, 0.15, 1.0],

  /**
   * depart — Slow start, fast end.
   * Elements leave with purpose, not lingering.
   * Used for: scene exits, content leaving the frame.
   */
  depart: [0.35, 0.0, 1.0, 1.0],

  /**
   * breath — Mid-weight. Balanced acceleration and deceleration.
   * Used for: micro-interactions, hover states, audio toggle.
   */
  breath: [0.45, 0.0, 0.40, 1.0],
}

// ─── GSAP Format ──────────────────────────────────────────────────────────────

/**
 * GSAP-formatted cubic-bezier strings.
 * Passed directly to GSAP's `ease` property.
 *
 * Note: GSAP registers these as named eases in gsap.config.ts.
 * After registration, you can use the EaseName directly (e.g. ease: 'narrative').
 */
export const gsapEaseStrings: Record<EaseName, string> = {
  narrative: '0.25, 0.0, 0.10, 1.0',
  arrive:    '0.0, 0.0, 0.15, 1.0',
  depart:    '0.35, 0.0, 1.0, 1.0',
  breath:    '0.45, 0.0, 0.40, 1.0',
}

// ─── CSS Format ───────────────────────────────────────────────────────────────

/**
 * CSS transition-timing-function values.
 * These match the values in tokens.css — kept here for programmatic use.
 */
export const cssEases: Record<EaseName, string> = {
  narrative: 'cubic-bezier(0.25, 0.0, 0.10, 1.0)',
  arrive:    'cubic-bezier(0.0, 0.0, 0.15, 1.0)',
  depart:    'cubic-bezier(0.35, 0.0, 1.0, 1.0)',
  breath:    'cubic-bezier(0.45, 0.0, 0.40, 1.0)',
}
