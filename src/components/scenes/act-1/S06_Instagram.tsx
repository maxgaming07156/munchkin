'use client'

/**
 * S06_Instagram — "Then you followed me."
 *
 * A stylized Instagram notification / interaction memory card.
 * Not a screenshot. A moment rendered as typography.
 *
 * ── PERSONALIZE ────────────────────────────────────────────────────────────────
 * Replace:
 *   - INSTA_DATE       → when she followed/interacted on Instagram
 *   - HER_HANDLE       → her Instagram handle (without @)
 *   - THE_ACTION       → what the interaction was (followed, liked, DM'd)
 *   - HER_WORDS        → her first Instagram message, if applicable
 *   - THE_COMMENTARY   → your narrative below the card
 * ───────────────────────────────────────────────────────────────────────────────
 */

import { m }               from 'framer-motion'
import { SceneLayout, SceneLabel, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

// ── Fill these in ──────────────────────────────────────────────────────────────
const INSTA_DATE  = 'a few weeks later'
const HER_HANDLE  = 'razane.zineb'          // without @
const THE_ACTION  = 'started following you'
const HER_WORDS   = ''                      // optional — her first IG message
// ──────────────────────────────────────────────────────────────────────────────

export default function S06_Instagram({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel>Instagram — {INSTA_DATE}</SceneLabel>

      {/* Instagram notification card */}
      <m.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:     'rgba(20, 18, 28, 0.75)',
          border:         '1px solid rgba(242, 235, 228, 0.07)',
          borderRadius:   14,
          padding:        '20px 24px',
          backdropFilter: 'blur(20px)',
          display:        'flex',
          alignItems:     'center',
          gap:            16,
        }}
      >
        {/* Avatar */}
        <div style={{
          width:           44,
          height:          44,
          borderRadius:    '50%',
          background:      'linear-gradient(135deg, var(--color-seafoam-dim), var(--color-maroon-dim))',
          flexShrink:      0,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          fontSize:        '1.1rem',
          color:           'var(--color-text-primary)',
          fontFamily:      'var(--font-display)',
          fontStyle:       'italic',
          border:          '1.5px solid rgba(107, 158, 152, 0.3)',
        }}>
          R
        </div>

        {/* Notification text */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '1rem',
            color:       'var(--color-text-primary)',
            margin:      0,
            lineHeight:  1.5,
          }}>
            <strong style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
              @{HER_HANDLE}
            </strong>
            {' '}{THE_ACTION}.
            {HER_WORDS && (
              <span style={{ color: 'var(--color-text-secondary)' }}>
                {' '}"{HER_WORDS}"
              </span>
            )}
          </p>
        </div>

        {/* Instagram gradient heart */}
        <div style={{
          width:      32,
          height:     32,
          flexShrink: 0,
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize:   '1.4rem',
          lineHeight: 1,
          opacity:    0.7,
        }} aria-hidden="true">
          ♡
        </div>
      </m.div>

      {/* Narrative note */}
      <SceneBody delay={1.2}>
        {/*
         * PERSONALIZE: What happened on Instagram?
         * Did she reach out first? What did it feel like?
         */}
        And just like that, you had found your way into my phone too.
        Twice now. The universe was being very obvious.
      </SceneBody>

      <ScrollHint delay={2.0} />
    </SceneLayout>
  )
}
