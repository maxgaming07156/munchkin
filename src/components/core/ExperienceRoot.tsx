'use client'

/**
 * ExperienceRoot — The full post-auth experience.
 *
 * Internal state machine:
 *   'cinematic' → S02_OpeningCinematic (typewriter sequence)
 *   'story'     → SceneRenderer (Phase 4) — placeholder for now
 *
 * Layer stack:
 *   z-index 0:    EnvironmentCanvas (Three.js stars) — always mounted
 *   z-index 2:    Grain overlay (in layout.tsx)
 *   z-index 10:   Scene/cinematic content
 *   z-index 9000: AudioToggle
 *   z-index 9998: Cursor aura
 *   z-index 9999: Cursor dot
 *
 * The canvas mounts immediately on ExperienceRoot render,
 * before the cinematic starts — so stars are loading in background
 * and appear naturally as the text types.
 */

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { OpeningCinematic } from '@/components/scenes/act-1/S02_OpeningCinematic'
import { AudioToggle }      from '@/components/ui/AudioToggle'

type ExperiencePhase = 'cinematic' | 'story'

// Dynamic imports with ssr: false — both require browser APIs
const EnvironmentCanvas = dynamic(
  () => import('@/components/environment/EnvironmentCanvas').then((m) => m.EnvironmentCanvas),
  { ssr: false, loading: () => null }
)

const CustomCursor = dynamic(
  () => import('@/components/core/CustomCursor').then((m) => m.CustomCursor),
  { ssr: false, loading: () => null }
)

import { SceneRenderer }    from '@/components/engine/SceneRenderer'

export function ExperienceRoot() {
  const [phase, setPhase] = useState<ExperiencePhase>('cinematic')

  const handleCinematicComplete = useCallback(() => {
    setPhase('story')
  }, [])

  return (
    <>
      {/* Always mounted: the star field behind everything */}
      <EnvironmentCanvas />

      {/* Always mounted: lerped cursor */}
      <CustomCursor />

      {/* Audio toggle — hidden during cinematic, visible in story */}
      <AudioToggle hidden={phase === 'cinematic'} />

      {/* Scene content layer */}
      {phase === 'cinematic' && (
        <OpeningCinematic onComplete={handleCinematicComplete} />
      )}

      {phase === 'story' && (
        <SceneRenderer />
      )}
    </>
  )
}
