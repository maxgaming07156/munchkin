/**
 * Audio Store for "For My Munchkin"
 *
 * Manages the state of the 4-layer audio architecture.
 * The AudioManager singleton reads from this store via subscriptions.
 * UI components read from this store to reflect current audio state.
 */

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { AudioStore } from '@/types/audio.types'
import { defaultVolumes } from '@/config/audio.config'

const initialState = {
  isEnabled:          true,
  hasUserInteracted:  true,
  layer1Volume:       defaultVolumes.layer1,
  layer2Volume:       defaultVolumes.layer2,
  layer3Volume:       defaultVolumes.layer3,
  layer4Volume:       defaultVolumes.layer4,
  layer2IsPlaying:    false,
  layer3ActiveFile:   null,
} as const

export const useAudioStore = create<AudioStore>()(
  subscribeWithSelector((set) => ({
    ...initialState,

    enableAudio: () => {
      set({
        isEnabled:         true,
        hasUserInteracted: true,
      })
    },

    disableAudio: () => {
      set({ isEnabled: false })
    },

    setLayer2Playing: (playing: boolean) => {
      set({ layer2IsPlaying: playing })
    },

    setLayer3ActiveFile: (file: string | null) => {
      set({ layer3ActiveFile: file })
    },

    setLayerVolume: (layer, value) => {
      const key = `layer${layer}Volume` as
        | 'layer1Volume'
        | 'layer2Volume'
        | 'layer3Volume'
        | 'layer4Volume'
      set({ [key]: Math.max(0, Math.min(1, value)) })
    },
  }))
)
