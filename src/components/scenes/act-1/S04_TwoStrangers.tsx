'use client'

/**
 * S04_TwoStrangers — "We were just two strangers."
 *
 * The scene that names the starting point. A large display quote.
 * No decoration. The words carry enough weight.
 *
 * ── PERSONALIZE ────────────────────────────────────────────────────────────────
 * You can add a specific platform name, date, or how you first crossed paths.
 * Keep the large quote as-is or adjust to match your exact first words.
 * ───────────────────────────────────────────────────────────────────────────────
 */

import { m }               from 'framer-motion'
import { SceneLayout, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S04_TwoStrangers({ }: SceneProps) {
  return (
    <SceneLayout>
      {/* Large quote — the statement of the scene */}
      <m.h2
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(2.75rem, 6.5vw, 5.5rem)',
          fontWeight:    300,
          fontStyle:     'italic',
          lineHeight:    1.05,
          color:         'var(--color-text-primary)',
          margin:        0,
          letterSpacing: '-0.02em',
        }}
      >
        We were just
        <br />
        <span style={{ color: 'var(--color-seafoam)', opacity: 0.85 }}>
          two strangers.
        </span>
      </m.h2>

      {/* Context */}
      <SceneBody delay={1.0}>
        {/*
         * PERSONALIZE: Replace with how you first encountered her.
         * Platform? Mutual friend? Pure coincidence?
         */}
        No grand plan. No fate-written-in-the-stars moment —
        or at least, that's what we would have said then.
        Just two people existing at the same coordinates of the internet,
        at exactly the right time.
      </SceneBody>

      <ScrollHint delay={2.0} />
    </SceneLayout>
  )
}
