/**
 * Scene type definitions for "For My Munchkin"
 * Every scene in the experience is typed through these interfaces.
 */

import type React from 'react'
import type { ComponentType } from 'react'

// ─── Act ─────────────────────────────────────────────────────────────────────

export type Act = 1 | 2 | 3 | 4

// ─── Interaction Types ────────────────────────────────────────────────────────

/**
 * Defines HOW the user advances through a scene.
 *
 * scroll       — Standard. User scrolls to advance.
 * wait         — Autoplay. Scene advances itself after waitDuration.
 * discover     — User must find and interact with a hidden element.
 * envelope     — User opens an envelope component.
 * star-click   — User clicks a specific star in the Three.js layer.
 * letter-unfold — User unfolds a letter.
 */
export type SceneInteractionType =
  | 'scroll'
  | 'wait'
  | 'discover'
  | 'envelope'
  | 'star-click'
  | 'letter-unfold'

// ─── Transition Types ─────────────────────────────────────────────────────────

/**
 * Defines HOW the transition INTO this scene is rendered.
 *
 * dissolve         — Primary. Opacity fade through background. ~3s total.
 * vertical-veil    — Reserved for act boundaries only. Dark panel descends.
 * environmental    — Three.js sky-driven. Most intimate. No overlay.
 */
export type TransitionType = 'dissolve' | 'vertical-veil' | 'environmental'

// ─── Color Temperature ────────────────────────────────────────────────────────

/**
 * The emotional color temperature of each scene.
 * Drives the Three.js environment's star color and atmosphere.
 *
 * cool        — Act I. Seafoam in the universe. Maroon absent.
 * warming     — Transition zone. Seafoam → Maroon beginning.
 * warm        — Act II. Maroon emerging. Seafoam receding.
 * dual        — Act III. Both present, in conversation.
 * converging  — Act IV. Both at full presence, drawing together.
 * unified     — Stars Becoming One. Both resolve to convergence white.
 */
export type ColorTemperature =
  | 'cool'
  | 'warming'
  | 'warm'
  | 'dual'
  | 'converging'
  | 'unified'

// ─── Scene Configuration ──────────────────────────────────────────────────────

export interface SceneConfig {
  /** Unique kebab-case identifier */
  readonly id: string

  /** URL-friendly slug — for deep-link support if added later */
  readonly slug: string

  /** Which act this scene belongs to */
  readonly act: Act

  /** Zero-based index in the global scene sequence */
  readonly index: number

  /** Internal name — never displayed to Razane */
  readonly title: string

  /** Text shown on screen. Undefined if the scene has no explicit title card */
  readonly displayTitle?: string

  /** The React component — lazy-loaded per scene for code splitting */
  readonly component: React.LazyExoticComponent<ComponentType<SceneProps>>

  /**
   * The transition INTO this scene.
   * Specified on the INCOMING scene, not the outgoing.
   */
  readonly transition: TransitionType

  /** Whether GSAP ScrollTrigger pins this scene */
  readonly pinned: boolean

  /**
   * How many scroll pixels the scene holds while pinned.
   * Only relevant when pinned: true.
   * Expressed as a vh multiple string e.g. "300vh"
   * Default: "300vh"
   */
  readonly pinScrollDistance?: string

  /** How the user advances through this scene */
  readonly interactionType: SceneInteractionType

  /**
   * Duration in milliseconds before auto-advance.
   * Only relevant when interactionType === 'wait'.
   */
  readonly waitDuration?: number

  /**
   * Path to the scene's Layer 3 audio texture file.
   * Omit this property (or set to undefined) for scenes with no scene-specific sound.
   */
  readonly audioLayer3?: string | undefined

  /** The emotional color temperature driving the Three.js environment */
  readonly colorTemperature: ColorTemperature

  /**
   * Whether this scene is the last scene in an act.
   * Triggers the Vertical Veil transition on exit.
   */
  readonly isActBoundary?: boolean
}

// ─── Scene Component Props ────────────────────────────────────────────────────

/**
 * Every scene component implements this interface.
 */
export interface SceneProps {
  /** Whether this scene is currently the active scene */
  readonly isActive: boolean

  /** Whether this scene is currently in its entrance transition */
  readonly isEntering: boolean

  /** Whether this scene is currently in its exit transition */
  readonly isExiting: boolean

  /**
   * Called by the scene when its content is fully complete.
   * For pinned scenes: triggers ScrollTrigger unpin.
   * For wait scenes: triggers auto-advance after waitDuration.
   * For scroll scenes: not called — scroll itself advances.
   */
  readonly onComplete: () => void
}

// ─── Scene Registry ───────────────────────────────────────────────────────────

/** The total number of scenes in the experience */
export const TOTAL_SCENE_COUNT = 31 as const

/** The number of acts */
export const ACT_COUNT = 4 as const
