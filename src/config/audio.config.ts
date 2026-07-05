/**
 * Audio configuration manifest for "For My Munchkin"
 *
 * This file defines all audio file paths, the score configuration,
 * and default volume levels for the 4-layer audio architecture.
 *
 * SCORE REPLACEMENT GUIDE:
 * To replace the soundtrack at any point after production:
 *   1. Drop your new file into /public/audio/score/
 *   2. Update scoreConfig.filePath below to point to it
 *   3. Optionally adjust scoreConfig.beginAtScene and scoreConfig.fadeInDuration
 *   4. No other changes are required anywhere in the codebase.
 */

import type { AudioFiles, AudioVolumeConfig, ScoreConfig } from '@/types/audio.types'

// ─── Audio File Paths ─────────────────────────────────────────────────────────

export const audioFiles: AudioFiles = {
  // Layer 1 — Environment: ambient room tone, looped
  environment: 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg',

  // Layer 2 — Score: the musical piece (isolated, replaceable)
  score: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Claude_Debussy_-_Clair_de_lune.ogg',

  // Layer 3 — Scene Textures: event-driven per-scene sounds
  scene: {
    pianoNote:     '/audio/scene/piano-note.mp3',
    cassetteClick: '/audio/scene/cassette-click.mp3',
    paperTurn:     '/audio/scene/paper-turn.mp3',
    paperRustle:   '/audio/scene/paper-rustle.mp3',
  },

  // Layer 4 — Interaction: user-triggered micro-sounds
  interaction: {
    passwordCorrect: '/audio/interaction/password-correct.mp3',
    sceneWhoosh:     '/audio/interaction/scene-whoosh.mp3',
    audioOn:         '/audio/interaction/audio-on.mp3',
    audioOff:        '/audio/interaction/audio-off.mp3',
  },
} as const

// ─── Score Configuration (Isolated) ──────────────────────────────────────────

/**
 * The score configuration is architecturally isolated from all other audio.
 * Replacing the score only requires changing values in this object.
 */
export const scoreConfig: ScoreConfig = {
  // ↓ Change this path when replacing the score
  filePath: audioFiles.score,

  // Scene index where the score begins fading in.
  // 8 = S08_TheGirlIFellInLoveWith (first scene of Act II)
  beginAtScene: 8,

  // Duration of the score's fade-in in milliseconds.
  // 8000ms = 8 seconds. Long enough to be imperceptible.
  fadeInDuration: 8000,
} as const

// ─── Volume Levels ────────────────────────────────────────────────────────────

/**
 * Default volume levels for each layer (0.0–1.0).
 * These are the resting state volumes. Individual scene events
 * may temporarily adjust Layer 3 volume.
 */
export const defaultVolumes: AudioVolumeConfig = {
  layer1: 0.12,   // Environment: barely heard — felt, not heard
  layer2: 0.35,   // Score: present but never dominant
  layer3: 0.25,   // Scene textures: varies per cue
  layer4: 0.18,   // Interaction: subtle
} as const

// ─── Scene Audio Map ──────────────────────────────────────────────────────────

/**
 * Maps scene indices to their Layer 3 audio texture.
 * Only scenes with specific sound cues are listed here.
 * A scene absent from this map has no Layer 3 audio.
 */
export const sceneAudioMap: Readonly<Record<number, string>> = {
  0:  '',                               // Loading: silence (ambient only)
  5:  audioFiles.scene.cassetteClick,   // Discord
  6:  audioFiles.scene.cassetteClick,   // Instagram
  9:  audioFiles.scene.paperTurn,       // The Little Things
  23: audioFiles.scene.paperRustle,     // Letters
} as const

// ─── Silence Moments ─────────────────────────────────────────────────────────

/**
 * Scene indices where the ambient environment layer should drop in volume.
 * Used for scenes where silence is a deliberate sound design choice.
 * At these scene indices, Layer 1 volume drops to silenceDipVolume.
 */
export const silenceMoments: Readonly<{
  scenes: number[]
  dipVolume: number
  dipDuration: number  // seconds
}> = {
  scenes:      [12, 13, 20],   // "Bro.", "Shut up.", "Thank You"
  dipVolume:   0.04,            // Drops from 0.12 to 0.04
  dipDuration: 1.5,             // 1.5 second fade
} as const
