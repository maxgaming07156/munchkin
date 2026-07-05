'use client'

/**
 * ScrollController — Translates scroll / swipe / keyboard intent into scene advancement.
 *
 * Renders nothing. Listens to global events and calls advanceScene/prevScene.
 * Only active when the current scene's interactionType is 'scroll'.
 *
 * Wheel (desktop):
 *   Accumulates delta until THRESHOLD is reached, then advances once.
 *   Debounced — 1200ms lock after each advance.
 *
 * Touch (mobile):
 *   Swipe up (> 60px) = advance. Swipe down = previous (if exists).
 *
 * Keyboard:
 *   ArrowDown / Space / Enter = advance
 *   ArrowUp = previous
 */

import { useEffect } from 'react'
import { useExperienceStore } from '@/store/experience.store'
import { scenes } from '@/config/scenes.config'

const WHEEL_THRESHOLD = 60  // pixels of accumulated delta before advancing
const LOCK_DURATION   = 1200 // ms — prevents double-fires

export function ScrollController() {
  const sceneIndex   = useExperienceStore((s) => s.currentSceneIndex)
  const advanceScene = useExperienceStore((s) => s.advanceScene)
  const currentScene = scenes[sceneIndex]

  useEffect(() => {
    // Only intercept scroll for scenes that expect it
    if (!currentScene || currentScene.interactionType !== 'scroll') return

    let locked       = false
    let accDelta     = 0
    let touchStartY  = 0

    const lock = () => {
      locked = true
      setTimeout(() => {
        locked   = false
        accDelta = 0
      }, LOCK_DURATION)
    }

    // ── Wheel ────────────────────────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      if (locked) return
      accDelta += e.deltaY

      if (accDelta >= WHEEL_THRESHOLD) {
        lock()
        advanceScene()
      } else if (accDelta <= -WHEEL_THRESHOLD) {
        // Upward scroll — for now just reset (no back nav in linear story)
        accDelta = 0
      }
    }

    // ── Touch ─────────────────────────────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (locked) return
      const endY = e.changedTouches[0]?.clientY ?? 0
      const dy   = touchStartY - endY  // positive = swipe up

      if (dy > 60) {
        lock()
        advanceScene()
      }
    }

    // ── Keyboard ──────────────────────────────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      if (locked) return
      // Skip if user is focused on an input
      if (document.activeElement instanceof HTMLInputElement) return

      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        lock()
        advanceScene()
      }
    }

    document.addEventListener('wheel',      handleWheel,      { passive: true })
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend',   handleTouchEnd,   { passive: true })
    document.addEventListener('keydown',    handleKeyDown)

    return () => {
      document.removeEventListener('wheel',      handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend',   handleTouchEnd)
      document.removeEventListener('keydown',    handleKeyDown)
    }
  }, [currentScene, advanceScene])

  return null
}
