'use client'

/**
 * S03_TheBeginning — "Before you."
 *
 * The first scene of the story. No drama yet. Just an honest observation.
 * Words appear one at a time. The star field is fully visible behind.
 *
 * ── PERSONALIZE ────────────────────────────────────────────────────────────────
 * Replace the text content below with your own memory/framing.
 * Keep it short. One truth is enough.
 * ───────────────────────────────────────────────────────────────────────────────
 */

import {
  SceneLayout,
  SceneLabel,
  RevealText,
  SceneBody,
  ScrollHint,
} from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S03_TheBeginning({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-seafoam-dim)">Act I</SceneLabel>

      {/* ── Your opening line ── */}
      <RevealText
        text="Before you, I didn't know what I was missing."
        large
        delay={0.3}
        stagger={0.07}
      />

      {/* ── Your first memory/context ── */}
      <SceneBody delay={1.6}>
        I was fine. Just fine. Not lost, not searching.
        Just living — completely unaware that somewhere on the other side
        of a screen, you existed.
      </SceneBody>

      <ScrollHint delay={2.4} />
    </SceneLayout>
  )
}
