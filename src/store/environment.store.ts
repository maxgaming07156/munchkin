/**
 * Environment Store for "For My Munchkin"
 *
 * Manages the state of the Three.js background environment.
 * The Three.js components subscribe to this store to update their rendering.
 *
 * This store is the bridge between the React narrative layer and the Three.js
 * visual layer. It uses subscribeWithSelector so Three.js components can
 * subscribe to only the values they care about, avoiding unnecessary re-renders.
 */

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { EnvironmentStore, NormalizedCursorPosition } from '@/types/environment.types'
import type { ColorTemperature } from '@/types/scene.types'

const initialState = {
  colorTemperature:          'cool' as ColorTemperature,
  starBrightness:            0.7,
  constellationsVisible:     false,
  constellationsConverging:  false,
  cursorPosition:            { x: 0.5, y: 0.5 } as NormalizedCursorPosition,
}

export const useEnvironmentStore = create<EnvironmentStore>()(
  subscribeWithSelector((set) => ({
    ...initialState,

    setColorTemperature: (temp: ColorTemperature) => {
      set({ colorTemperature: temp })
    },

    setStarBrightness: (brightness: number) => {
      set({ starBrightness: Math.max(0, Math.min(1, brightness)) })
    },

    showConstellations: () => {
      set({ constellationsVisible: true })
    },

    hideConstellations: () => {
      set({
        constellationsVisible:    false,
        constellationsConverging: false,
      })
    },

    triggerConstellationConvergence: () => {
      set({
        constellationsVisible:    true,
        constellationsConverging: true,
      })
    },

    setCursorPosition: (x: number, y: number) => {
      set({ cursorPosition: { x, y } })
    },
  }))
)

// ─── Derived Selectors ────────────────────────────────────────────────────────

/** Returns the cursor position as a flat [x, y] tuple for shader uniforms */
export const selectCursorTuple = (state: EnvironmentStore): [number, number] =>
  [state.cursorPosition.x, state.cursorPosition.y]
