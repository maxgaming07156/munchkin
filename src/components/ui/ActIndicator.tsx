'use client'

/**
 * ActIndicator — A whisper of progress.
 *
 * A barely-there indicator at the bottom-right of the screen.
 * Shows the current act name and a slim progress line.
 *
 * Design rules:
 *   - Opacity: 0.35 — present but never competing with content
 *   - Only visible after S03 (the story beginning) — hidden during cinematic
 *   - Fades in and updates when the act changes
 *   - No scene numbers — only the act name
 *   - The progress line fills across acts, not individual scenes
 *
 * On mobile: hidden (screen space is too precious)
 */

import { m, AnimatePresence } from 'framer-motion'
import { scenes }             from '@/config/scenes.config'

const ACT_NAMES: Record<number, string> = {
  1: 'The Universe Before Us',
  2: 'Finding Home',
  3: 'Growing Up Together',
  4: 'Endlessly',
}

const ACT_SCENE_RANGES: Record<number, [number, number]> = {
  1: [3, 7],   // Scenes 3–7 (after loading/password/cinematic)
  2: [8, 15],
  3: [16, 23],
  4: [24, 30],
}

interface ActIndicatorProps {
  sceneIndex: number
}

export function ActIndicator({ sceneIndex }: ActIndicatorProps) {
  const scene    = scenes[sceneIndex]
  if (!scene) return null

  const act      = scene.act
  const actName  = ACT_NAMES[act]

  // Don't show during loading (0), password (1), or cinematic (2)
  if (scene.index < 3) return null

  // Progress within current act
  const [actStart, actEnd] = ACT_SCENE_RANGES[act] ?? [sceneIndex, sceneIndex]
  const actProgress = (sceneIndex - actStart) / Math.max(actEnd - actStart, 1)
  const progress = Math.min(Math.max(actProgress, 0), 1)

  return (
    <div
      aria-hidden="true"
      style={{
        position:     'fixed',
        bottom:       32,
        right:        32,
        zIndex:       9000,
        display:      'flex',
        flexDirection:'column',
        alignItems:   'flex-end',
        gap:          10,
        opacity:      0.35,
        pointerEvents:'none',
      }}
    >
      {/* Act name */}
      <AnimatePresence mode="wait">
        <m.span
          key={`act-${act}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{    opacity: 0, y: -4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            fontFamily:    'var(--font-ui)',
            fontSize:      '0.5rem',
            fontWeight:    300,
            letterSpacing: '0.16em',
            textTransform: 'uppercase' as const,
            color:         'var(--color-text-secondary)',
            userSelect:    'none',
          }}
        >
          {actName}
        </m.span>
      </AnimatePresence>

      {/* Progress line */}
      <div
        style={{
          width:           80,
          height:          1,
          backgroundColor: 'var(--color-text-tertiary)',
          position:        'relative',
          overflow:        'hidden',
          borderRadius:    1,
        }}
      >
        <m.div
          animate={{ scaleX: progress }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position:        'absolute',
            inset:           0,
            backgroundColor: 'var(--color-text-secondary)',
            transformOrigin: 'left center',
            scaleX:          progress,
          }}
        />
      </div>
    </div>
  )
}
