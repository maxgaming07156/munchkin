'use client'

/**
 * SceneWrapper — Per-scene lifecycle manager.
 *
 * Wraps every scene component with:
 *   1. Framer Motion enter/exit fade (0.9s, narrative ease)
 *   2. Color temperature sync to environment store on mount
 *   3. Auto-advance timer for 'wait' interactionType scenes
 *   4. Suspense boundary for lazy-loaded scene components
 *
 * Receives key={scene.id} from SceneRenderer —
 * React remounts this component when the scene changes,
 * AnimatePresence keeps the exiting mount alive for exit animation.
 */

import { Suspense, useEffect } from 'react'
import { m }                   from 'framer-motion'
import { useExperienceStore }  from '@/store/experience.store'
import { useEnvironmentStore } from '@/store/environment.store'
import type { SceneConfig }    from '@/types/scene.types'

// Narrative ease — matches the GSAP custom ease
const NARRATIVE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface SceneWrapperProps {
  scene: SceneConfig
}

export function SceneWrapper({ scene }: SceneWrapperProps) {
  const advanceScene      = useExperienceStore((s) => s.advanceScene)
  const setColorTemp      = useEnvironmentStore((s) => s.setColorTemperature)
  const setStarBrightness = useEnvironmentStore((s) => s.setStarBrightness)

  // Sync environment to this scene's emotional color temperature on mount
  useEffect(() => {
    setColorTemp(scene.colorTemperature)
    // Act IV: stars dim toward unity
    const isLatestAct = scene.act === 4
    setStarBrightness(isLatestAct ? 0.4 : 0.7)
  }, [scene.colorTemperature, scene.act, setColorTemp, setStarBrightness])

  // Auto-advance for 'wait' scenes (title cards, transitions, etc.)
  useEffect(() => {
    if (scene.interactionType !== 'wait') return
    if (scene.waitDuration === undefined || !isFinite(scene.waitDuration)) return

    const timer = setTimeout(advanceScene, scene.waitDuration)
    return () => clearTimeout(timer)
  }, [scene.interactionType, scene.waitDuration, advanceScene])

  const SceneComponent = scene.component

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{    opacity: 0 }}
      transition={{
        duration: 0.9,
        ease:     NARRATIVE_EASE,
      }}
      style={{
        position: 'fixed',
        inset:    0,
      }}
    >
      <Suspense fallback={null}>
        <SceneComponent
          scene={scene}
          isActive={true}
          onComplete={advanceScene}
        />
      </Suspense>
    </m.div>
  )
}
