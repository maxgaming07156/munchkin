'use client'

import { useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler'
import { useAudioStore } from '@/store/audio.store'
import { useExperienceStore } from '@/store/experience.store'
import { audioFiles, scoreConfig, defaultVolumes, sceneAudioMap, silenceMoments } from '@/config/audio.config'

export function AudioManager() {
  const isEnabled = useAudioStore((s) => s.isEnabled)
  const sceneIndex = useExperienceStore((s) => s.currentSceneIndex)

  const layer1Ref = useRef<Howl | null>(null)
  const layer2Ref = useRef<Howl | null>(null)
  const activeLayer3Ref = useRef<Howl | null>(null)

  // 1. Initialize Global Howler and persistent layers
  useEffect(() => {
    // Layer 1: Environment (Ambient)
    layer1Ref.current = new Howl({
      src: [audioFiles.environment],
      loop: true,
      volume: defaultVolumes.layer1,
      autoplay: true, // Will be muted if isEnabled is false
    })

    // Layer 2: Score (Music)
    layer2Ref.current = new Howl({
      src: [audioFiles.score],
      loop: false,
      volume: 0, // Starts at 0, fades in later
    })

    return () => {
      layer1Ref.current?.unload()
      layer2Ref.current?.unload()
      activeLayer3Ref.current?.unload()
    }
  }, [])

  // 2. Sync Global Mute state
  useEffect(() => {
    Howler.mute(!isEnabled)
  }, [isEnabled])

  // 3. Handle Scene-based Audio Logic
  useEffect(() => {
    if (!isEnabled) return

    // --- Score Fade-in ---
    if (sceneIndex === scoreConfig.beginAtScene) {
      const score = layer2Ref.current
      if (score && !score.playing()) {
        score.play()
        score.fade(0, defaultVolumes.layer2, scoreConfig.fadeInDuration)
        useAudioStore.getState().setLayer2Playing(true)
      }
    }

    // --- Silence Moments (Layer 1 Dip) ---
    if (silenceMoments.scenes.includes(sceneIndex)) {
      layer1Ref.current?.fade(defaultVolumes.layer1, silenceMoments.dipVolume, silenceMoments.dipDuration * 1000)
    } else {
      // Restore volume if we moved past a silence moment
      layer1Ref.current?.fade(silenceMoments.dipVolume, defaultVolumes.layer1, silenceMoments.dipDuration * 1000)
    }

    // --- Layer 3 Scene Textures ---
    const layer3File = sceneAudioMap[sceneIndex]
    if (layer3File) {
      if (activeLayer3Ref.current) {
        activeLayer3Ref.current.unload()
      }
      activeLayer3Ref.current = new Howl({
        src: [layer3File],
        volume: defaultVolumes.layer3,
        autoplay: true,
      })
    }

  }, [sceneIndex, isEnabled])

  return null
}
