'use client'

/**
 * S07_TheDayEverythingChanged — The climax of Act I.
 *
 * This scene transitions the environment from "cool" to "warming".
 * It is marked as an act boundary (`isActBoundary: true` in config).
 *
 * ── PERSONALIZE ────────────────────────────────────────────────────────────────
 * Replace with the moment you realized this wasn't just a casual online friendship anymore.
 * Was it a late night call? A specific text? A sudden realization?
 * ───────────────────────────────────────────────────────────────────────────────
 */

import { m } from 'framer-motion'
import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S07_TheDayEverythingChanged({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-seafoam-dim)">Act I — The Shift</SceneLabel>

      {/* Headline */}
      <RevealText
        text="Then, it wasn't just two strangers anymore."
        large
        delay={0.4}
        stagger={0.06}
      />

      {/* Body text fading in */}
      <SceneBody delay={1.8}>
        {/*
         * PERSONALIZE: What happened that changed everything?
         * Describe the exact moment or the gradual realization.
         */}
        I didn't notice the exact second the gravity shifted.
        Maybe it was a message that made me smile a little too much.
        Maybe it was the sudden realization that I was looking for your name
        every time my phone lit up. But suddenly, the universe felt a lot warmer.
      </SceneBody>

      {/* Floating accent visual: A small spark of maroon */}
      <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, duration: 2, ease: 'easeOut' }}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--color-maroon)',
          boxShadow: '0 0 20px 4px var(--color-maroon-glow)',
          margin: '40px auto 0',
        }}
        aria-hidden="true"
      />

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
