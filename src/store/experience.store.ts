/**
 * Experience Store for "For My Munchkin"
 *
 * Manages the narrative state — which scene is active, which act we're in,
 * and the state of scene transitions.
 *
 * This is the central store that all scene rendering reads from.
 */

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { TransitionType } from '@/types/scene.types'
import { scenes, TOTAL_SCENES } from '@/config/scenes.config'

interface ExperienceState {
  /** Zero-based index of the currently active scene */
  currentSceneIndex: number

  /** The current act (derived from currentSceneIndex) */
  currentAct: 1 | 2 | 3 | 4

  /** Whether a scene transition is currently in progress */
  isTransitioning: boolean

  /** The type of the current transition (null when not transitioning) */
  activeTransitionType: TransitionType | null

  /**
   * Whether the experience has officially begun.
   * False until: password verified + loading complete + opening cinematic starts.
   */
  hasExperienceBegun: boolean

  /**
   * Whether the experience has reached its final scene.
   * The End scene stays open indefinitely — this flag helps render correctly.
   */
  isComplete: boolean
}

interface ExperienceActions {
  /** Advance to the next scene. No-op if already at the last scene or transitioning. */
  advanceScene: () => void

  /**
   * Jump directly to a scene by index.
   * For internal use only — not exposed in any UI.
   * Used by SceneRenderer for programmatic scene changes.
   */
  jumpToScene: (index: number) => void

  /** Mark transition as started with the given transition type */
  beginTransition: (type: TransitionType) => void

  /** Mark transition as completed — clears isTransitioning */
  completeTransition: () => void

  /**
   * Begins the full experience.
   * Called once the loading scene and password gate are complete.
   */
  beginExperience: () => void
}

type ExperienceStore = ExperienceState & ExperienceActions

/**
 * Derives the current act from a scene index.
 * Reads from the scenes config — source of truth for which scenes belong to which act.
 */
function deriveAct(sceneIndex: number): 1 | 2 | 3 | 4 {
  return scenes[sceneIndex]?.act ?? 1
}

const initialState: ExperienceState = {
  currentSceneIndex:  0,
  currentAct:         1,
  isTransitioning:    false,
  activeTransitionType: null,
  hasExperienceBegun: false,
  isComplete:         false,
}

export const useExperienceStore = create<ExperienceStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    advanceScene: () => {
      const { currentSceneIndex, isTransitioning } = get()

      // Do nothing if we're mid-transition or at the final scene
      if (isTransitioning) return
      if (currentSceneIndex >= TOTAL_SCENES - 1) return

      const nextIndex = currentSceneIndex + 1
      const nextScene = scenes[nextIndex]

      if (!nextScene) return

      set({
        currentSceneIndex:    nextIndex,
        currentAct:           deriveAct(nextIndex),
        isComplete:           nextIndex === TOTAL_SCENES - 1,
      })
    },

    jumpToScene: (index: number) => {
      if (index < 0 || index >= TOTAL_SCENES) return
      if (get().isTransitioning) return

      const targetScene = scenes[index]
      if (!targetScene) return

      set({
        currentSceneIndex: index,
        currentAct:        deriveAct(index),
        isComplete:        index === TOTAL_SCENES - 1,
      })
    },

    beginTransition: (type: TransitionType) => {
      set({
        isTransitioning:      true,
        activeTransitionType: type,
      })
    },

    completeTransition: () => {
      set({
        isTransitioning:      false,
        activeTransitionType: null,
      })
    },

    beginExperience: () => {
      set({ hasExperienceBegun: true })
    },
  }))
)

// ─── Derived Selectors ────────────────────────────────────────────────────────

/** Returns the config object for the currently active scene */
export const selectCurrentScene = (state: ExperienceStore) =>
  scenes[state.currentSceneIndex]

/** Returns true if the given scene index is currently active */
export const selectIsSceneActive = (index: number) => (state: ExperienceStore) =>
  state.currentSceneIndex === index
