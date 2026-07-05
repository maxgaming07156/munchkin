'use client'

/**
 * SceneRenderer — The story engine orchestration layer.
 *
 * Reads currentSceneIndex from experience store.
 * Renders SceneWrapper with AnimatePresence for enter/exit transitions.
 * Mounts ScrollController (global scroll → advance) and ActIndicator.
 *
 * When scene changes:
 *   1. AnimatePresence plays the exit animation of the current scene
 *   2. React mounts the new SceneWrapper (new key = new scene id)
 *   3. SceneWrapper syncs environment, starts auto-advance timer if needed
 *   4. Enter animation plays
 *
 * The star field Canvas is NOT mounted here — it lives in ExperienceRoot
 * and persists for the entire experience behind this layer.
 */

import { AnimatePresence }   from 'framer-motion'
import { useExperienceStore } from '@/store/experience.store'
import { scenes }            from '@/config/scenes.config'
import { SceneWrapper }      from './SceneWrapper'
import { ScrollController }  from './ScrollController'
import { ActIndicator }      from '@/components/ui/ActIndicator'

export function SceneRenderer() {
  const sceneIndex  = useExperienceStore((s) => s.currentSceneIndex)
  const currentScene = scenes[sceneIndex]

  if (!currentScene) return null

  return (
    <div
      id="scene-renderer"
      style={{
        position: 'fixed',
        inset:    0,
        zIndex:   10,
      }}
    >
      {/* Translates scroll/swipe/keyboard into scene advancement */}
      <ScrollController />

      {/* Subtle act progress indicator */}
      <ActIndicator sceneIndex={sceneIndex} />

      {/*
       * AnimatePresence in "wait" mode:
       *   Old scene plays its exit animation completely,
       *   then the new scene's entrance animation begins.
       *   This ensures clean, non-overlapping transitions.
       */}
      <AnimatePresence mode="wait">
        <SceneWrapper
          key={currentScene.id}
          scene={currentScene}
        />
      </AnimatePresence>
    </div>
  )
}
