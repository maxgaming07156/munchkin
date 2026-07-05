/**
 * Three.js environment type definitions for "For My Munchkin"
 * Types for the React Three Fiber background environment layer.
 */

import type { ColorTemperature } from './scene.types'

// ─── Cursor Position ──────────────────────────────────────────────────────────

/** Normalized cursor position (0–1 on each axis) */
export interface NormalizedCursorPosition {
  x: number  // 0 = left edge, 1 = right edge
  y: number  // 0 = top edge, 1 = bottom edge
}

// ─── Star Field Config ────────────────────────────────────────────────────────

export interface StarLayerConfig {
  /** Number of star instances in this depth layer */
  count: number

  /** Z-position of this layer — determines parallax depth */
  zPosition: number

  /**
   * Parallax multiplier — how much this layer moves relative to cursor/scroll.
   * Near layer: ~0.12, Mid layer: ~0.08, Far layer: ~0.03
   */
  parallaxFactor: number

  /** Base star size in world units */
  baseSize: number

  /** Maximum star size in world units */
  maxSize: number
}

// ─── Constellation Config ─────────────────────────────────────────────────────

export interface ConstellationPoint {
  x: number
  y: number
  z: number
}

export interface ConstellationLine {
  from: ConstellationPoint
  to: ConstellationPoint
}

export interface ConstellationConfig {
  id: string
  lines: ConstellationLine[]

  /**
   * Which act this constellation becomes visible in.
   * Constellations only appear in Acts III and IV.
   */
  visibleFromAct: 3 | 4

  /**
   * Whether this constellation participates in the Stars Becoming One convergence.
   * Only two constellations participate.
   */
  convergesToScene27: boolean
}

// ─── Environment State (Zustand) ──────────────────────────────────────────────

export interface EnvironmentState {
  /** Current color temperature — drives star tint and atmospheric color */
  colorTemperature: ColorTemperature

  /**
   * Overall star brightness multiplier (0.0–1.0).
   * Animated between acts: dims slightly during vulnerability scenes.
   */
  starBrightness: number

  /**
   * Whether constellations are currently visible.
   * True only during Acts III and IV.
   */
  constellationsVisible: boolean

  /**
   * Whether the constellation convergence animation is active.
   * True only during Scene 27 (Stars Becoming One).
   */
  constellationsConverging: boolean

  /** Current normalized cursor position — passed to star shaders */
  cursorPosition: NormalizedCursorPosition
}

export interface EnvironmentActions {
  setColorTemperature: (temp: ColorTemperature) => void
  setStarBrightness: (brightness: number) => void
  showConstellations: () => void
  hideConstellations: () => void
  triggerConstellationConvergence: () => void
  setCursorPosition: (x: number, y: number) => void
}

export type EnvironmentStore = EnvironmentState & EnvironmentActions

// ─── Shader Uniforms ──────────────────────────────────────────────────────────

/**
 * Uniforms passed to the star vertex/fragment shaders.
 * Updated every frame via useFrame.
 */
export interface StarShaderUniforms {
  uTime: { value: number }
  uCursorPosition: { value: [number, number] }
  uStarBrightness: { value: number }
  uColorTint: { value: [number, number, number] }
  uCursorRadius: { value: number }  // World-space radius of cursor influence
}
