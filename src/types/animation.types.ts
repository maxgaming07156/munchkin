/**
 * Animation type definitions for "For My Munchkin"
 * Typed interfaces for GSAP and Framer Motion configuration.
 */

// ─── Ease Names ───────────────────────────────────────────────────────────────

/**
 * The four sacred eases defined in the Creative Direction Document.
 * These are the ONLY eases used in this project.
 */
export type EaseName = 'narrative' | 'arrive' | 'depart' | 'breath'

// ─── Animation Config ─────────────────────────────────────────────────────────

export interface FadeInConfig {
  delay?: number        // milliseconds — default: 0
  duration?: number     // milliseconds — default: 1200
  yOffset?: number      // pixels — default: 8. Set to 0 for opacity-only fade.
  ease?: EaseName       // default: 'narrative'
}

export interface RevealTextConfig {
  mode: 'word' | 'line'
  wordDelay?: number    // ms between words — default: 100
  lineDelay?: number    // ms between lines — default: 200
  initialDelay?: number // ms before first word/line — default: 0
}

// ─── Typewriter Sequence ──────────────────────────────────────────────────────

/**
 * A single segment of the Opening Cinematic typewriter sequence.
 * Each sequence: types the text, pauses, optionally deletes, then moves to next.
 */
export interface TypewriterSequence {
  /** The text to be typed */
  text: string

  /** Milliseconds per character during typing — default: 65 */
  typeSpeed?: number

  /**
   * How long to pause after typing is complete before deleting.
   * In milliseconds.
   */
  pauseAfter?: number

  /**
   * Milliseconds per character during deletion — default: 35
   * (Slightly faster than typing — as if reconsidering mid-thought)
   */
  deleteSpeed?: number

  /**
   * Whether to delete all text before the next sequence begins.
   * The last sequence in the array should have deleteAll: false.
   */
  deleteAll: boolean
}

// ─── GSAP Timeline Options ────────────────────────────────────────────────────

export interface SceneEntranceOptions {
  delay?: number    // seconds (GSAP uses seconds, not ms)
  stagger?: number  // seconds between child animations
}

export interface SceneExitOptions {
  duration?: number  // seconds
}

export interface PinOptions {
  /**
   * Whether the animation scrubs with scroll (true or a smoothing value)
   * or autoplays while pinned (false).
   */
  scrub?: boolean | number

  /**
   * How much scroll distance to allocate while pinned.
   * Expressed as a CSS value e.g. "300vh"
   */
  scrollDistance?: string
}

// ─── Performance ──────────────────────────────────────────────────────────────

export type DeviceTier = 'high' | 'mid' | 'low'

export interface PerformanceConfig {
  readonly starCount: number
  readonly particleCount: number
  readonly starRotationEnabled: boolean
  readonly bloomEnabled: boolean
  readonly dpr: number
}

export const PERFORMANCE_CONFIGS: Record<DeviceTier, PerformanceConfig> = {
  high: {
    starCount: 4000,
    particleCount: 200,
    starRotationEnabled: true,
    bloomEnabled: true,
    dpr: 0.75,
  },
  mid: {
    starCount: 2000,
    particleCount: 100,
    starRotationEnabled: true,
    bloomEnabled: false,
    dpr: 0.75,
  },
  low: {
    starCount: 800,
    particleCount: 50,
    starRotationEnabled: false,
    bloomEnabled: false,
    dpr: 0.5,
  },
}
