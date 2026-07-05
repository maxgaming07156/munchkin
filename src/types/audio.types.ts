/**
 * Audio type definitions for "For My Munchkin"
 * Typed interface for the 4-layer audio architecture.
 */

// ─── Audio Layers ─────────────────────────────────────────────────────────────

/**
 * The four independent audio layers.
 *
 * 1 — Environment: ambient room tone, looped, always on
 * 2 — Score: the musical piece, isolated and replaceable
 * 3 — Scene Texture: event-driven per-scene sounds
 * 4 — Interaction: user-triggered micro-sounds
 */
export type AudioLayer = 1 | 2 | 3 | 4

// ─── Audio Files ──────────────────────────────────────────────────────────────

export interface AudioFiles {
  readonly environment: string
  readonly score: string
  readonly scene: {
    readonly pianoNote: string
    readonly cassetteClick: string
    readonly paperTurn: string
    readonly paperRustle: string
  }
  readonly interaction: {
    readonly passwordCorrect: string
    readonly sceneWhoosh: string
    readonly audioOn: string
    readonly audioOff: string
  }
}

// ─── Score Config ─────────────────────────────────────────────────────────────

/**
 * The score configuration is intentionally isolated.
 * Changing the score requires only changing values in this object.
 */
export interface ScoreConfig {
  /** Path to the audio file — the only value to change when replacing the score */
  readonly filePath: string

  /**
   * The scene index at which the score begins fading in.
   * Scene 8 = S08_TheGirlIFellInLoveWith (start of Act II).
   */
  readonly beginAtScene: number

  /**
   * Duration of the score's fade-in in milliseconds.
   * Designed to be imperceptible — the score appears without being noticed.
   */
  readonly fadeInDuration: number
}

// ─── Audio Volume Config ──────────────────────────────────────────────────────

export interface AudioVolumeConfig {
  readonly layer1: number   // 0.0–1.0
  readonly layer2: number
  readonly layer3: number
  readonly layer4: number
}

// ─── Audio Manager Interface ──────────────────────────────────────────────────

/**
 * Public interface of the AudioManager singleton.
 * Components should only interact with audio through this interface.
 */
export interface IAudioManager {
  initialize(): Promise<void>
  enableAudio(): void
  disableAudio(): void
  playScore(fadeInDuration?: number): void
  playSceneTexture(file: string, volume?: number): void
  playInteraction(file: string): void
  stopSceneTexture(): void
  replaceScore(filePath: string): void
  setMasterVolume(value: number): void
  setLayerVolume(layer: AudioLayer, value: number): void
  getIsEnabled(): boolean
}

// ─── Audio State (Zustand) ────────────────────────────────────────────────────

export interface AudioState {
  /** Whether audio has been enabled by the user */
  isEnabled: boolean

  /**
   * Whether the user has interacted with the audio toggle at least once.
   * Used to gate browser autoplay policy compliance.
   */
  hasUserInteracted: boolean

  /** Layer volume values (0.0–1.0) */
  layer1Volume: number
  layer2Volume: number
  layer3Volume: number
  layer4Volume: number

  /** Whether the score (Layer 2) is currently playing */
  layer2IsPlaying: boolean

  /** The currently active Layer 3 scene texture file path, or null */
  layer3ActiveFile: string | null
}

export interface AudioActions {
  enableAudio: () => void
  disableAudio: () => void
  setLayer2Playing: (playing: boolean) => void
  setLayer3ActiveFile: (file: string | null) => void
  setLayerVolume: (layer: AudioLayer, value: number) => void
}

export type AudioStore = AudioState & AudioActions
