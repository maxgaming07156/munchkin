'use client'

/**
 * S05_Discord — The first message.
 *
 * A stylized memory card evoking Discord's aesthetic —
 * dark surface, username, message. Not a screenshot.
 * A memory rendered as art.
 *
 * ── PERSONALIZE ────────────────────────────────────────────────────────────────
 * Replace:
 *   - DISCORD_DATE     → the actual date of your first DM
 *   - HER_USERNAME     → her Discord username
 *   - YOUR_USERNAME    → your Discord username
 *   - FIRST_DM_HER     → the first thing she said (or you said)
 *   - FIRST_DM_YOU     → your reply
 *   - THE_COMMENTARY   → your narrative note under the card
 * ───────────────────────────────────────────────────────────────────────────────
 */

import { m }               from 'framer-motion'
import { SceneLayout, SceneLabel, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

// ── Fill these in ──────────────────────────────────────────────────────────────
const DISCORD_DATE  = 'sometime in 2023'           // e.g. "March 14, 2023"
const HER_USERNAME  = 'munchkin'                   // her Discord handle
const YOUR_USERNAME = 'munchlax'                   // your Discord handle
const FIRST_DM_HER  = 'hey'                        // her first message
const FIRST_DM_YOU  = 'hey 👀'                     // your reply
// ──────────────────────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1 },
}

const msgVariants = {
  hidden: { opacity: 0, x: -8 },
  show:   { opacity: 1, x: 0  },
}

export default function S05_Discord({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel>Discord — {DISCORD_DATE}</SceneLabel>

      {/* Discord-aesthetic card */}
      <m.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:   'rgba(25, 20, 30, 0.7)',
          border:       '1px solid rgba(107, 158, 152, 0.12)',
          borderRadius: 8,
          padding:      '24px 28px',
          backdropFilter: 'blur(16px)',
          display:      'flex',
          flexDirection:'column',
          gap:          16,
        }}
      >
        {/* Her message */}
        <m.div
          variants={msgVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}
        >
          {/* Avatar placeholder */}
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            backgroundColor: 'var(--color-seafoam-dim)',
            flexShrink: 0, alignSelf: 'flex-start',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.65rem', color: 'var(--color-seafoam)',
            fontFamily: 'var(--font-ui)',
          }}>
            {HER_USERNAME[0]?.toUpperCase()}
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 500,
              color: 'var(--color-seafoam)', letterSpacing: '0.02em',
            }}>
              {HER_USERNAME}
            </span>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.1rem',
              color: 'var(--color-text-primary)', margin: '4px 0 0',
              lineHeight: 1.5,
            }}>
              {FIRST_DM_HER}
            </p>
          </div>
        </m.div>

        {/* Your reply */}
        <m.div
          variants={msgVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            backgroundColor: 'var(--color-maroon-dim)',
            flexShrink: 0, alignSelf: 'flex-start',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.65rem', color: 'var(--color-maroon-glow)',
            fontFamily: 'var(--font-ui)',
          }}>
            {YOUR_USERNAME[0]?.toUpperCase()}
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 500,
              color: 'var(--color-maroon-glow)', letterSpacing: '0.02em',
            }}>
              {YOUR_USERNAME}
            </span>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.1rem',
              color: 'var(--color-text-primary)', margin: '4px 0 0',
              lineHeight: 1.5,
            }}>
              {FIRST_DM_YOU}
            </p>
          </div>
        </m.div>
      </m.div>

      {/* Narrative note */}
      <SceneBody delay={1.6} dim>
        {/*
         * PERSONALIZE: What do you want to say about this moment?
         * What were you thinking? What did you notice?
         */}
        That was it. That was the whole thing.
        Two words that started everything.
      </SceneBody>

      <ScrollHint delay={2.2} />
    </SceneLayout>
  )
}
