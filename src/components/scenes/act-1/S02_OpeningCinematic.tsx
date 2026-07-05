'use client'

/**
 * S02_OpeningCinematic — The moment she realizes this was made for her.
 *
 * A typewriter sequence in JetBrains Mono. The text feels like watching
 * someone write a letter in real time — trying, deleting, reconsidering.
 *
 * Sequence:
 *   1. "Dear Munchkin..."            → pause → delete
 *   2. "No..."                       → pause → delete
 *   3. "How do you even begin        → pause → delete
 *       writing to the person
 *       who changed your life?"
 *   4. "Maybe..."                    → pause → delete
 *   5. "I'll just show you."         → long pause → fade out → onComplete
 *
 * After the last line fades:
 *   - Everything dissolves
 *   - The star field is all that remains
 *   - onComplete fires → the story begins
 *
 * Design rules:
 *   - JetBrains Mono ONLY. No other typeface touches this scene.
 *   - No cursor graphic — the CSS blinking block is the cursor.
 *   - No fade-in animation on text — it just appears, character by character.
 *   - The text is center-aligned on mobile, left-aligned on desktop.
 *   - Max-width: 52ch — keeps the lines intimate.
 *   - The scene is perfectly silent. No soundtrack. No ambient.
 *     (Audio begins on S08_TheGirlIFellInLoveWith.)
 */

import { useEffect, useState, useMemo } from 'react'
import { useTypewriter } from '@/hooks/useTypewriter'
import type { TypewriterSequence } from '@/types/animation.types'

// ─── The Sequence ─────────────────────────────────────────────────────────────

const OPENING_SEQUENCES: readonly TypewriterSequence[] = [
  {
    text:       'Dear Munchkin...',
    typeSpeed:  70,
    pauseAfter: 1600,
    deleteSpeed:38,
    deleteAll:  true,
  },
  {
    text:       'No...',
    typeSpeed:  80,
    pauseAfter: 900,
    deleteSpeed:40,
    deleteAll:  true,
  },
  {
    text:       'How do you even begin writing to the person who changed your life?',
    typeSpeed:  55,
    pauseAfter: 2200,
    deleteSpeed:22,
    deleteAll:  true,
  },
  {
    text:       'Maybe...',
    typeSpeed:  75,
    pauseAfter: 1000,
    deleteSpeed:38,
    deleteAll:  true,
  },
  {
    text:       "I'll just show you.",
    typeSpeed:  80,
    pauseAfter: 5500,   // Long pause — she sits with this line
    deleteAll:  false,  // This one stays
  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

interface OpeningCinematicProps {
  onComplete: () => void
}

export function OpeningCinematic({ onComplete }: OpeningCinematicProps) {
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isMounted,   setIsMounted]   = useState(false)

  // Entrance — wait one frame before starting to ensure canvas is painted
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 200)
    return () => clearTimeout(t)
  }, [])

  // When the sequence is complete, fade out then call onComplete
  const handleSequenceComplete = useMemo(() => () => {
    // The last line has already paused for pauseAfter ms.
    // Now: fade out and transition.
    setIsFadingOut(true)
    setTimeout(() => onComplete(), 1600)  // 1.6s fade-out
  }, [onComplete])

  const { displayedText, machineState } = useTypewriter(
    OPENING_SEQUENCES,
    handleSequenceComplete,
    isMounted,  // Don't start until mounted
  )

  // Show cursor blinking while typing/pausing, hide during deletion
  const showCursor = machineState !== 'deleting' && machineState !== 'complete'

  return (
    <div
      role="presentation"
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        zIndex:         20,
        opacity:        isFadingOut ? 0 : 1,
        transition:     isFadingOut ? 'opacity 1600ms var(--ease-narrative)' : 'none',
        pointerEvents:  'none',
      }}
    >
      <div
        style={{
          maxWidth:   '52ch',
          width:      '100%',
          padding:    '0 clamp(24px, 8vw, 80px)',
        }}
      >
        {/* The typed text */}
        <span
          style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    'clamp(1rem, 1.8vw, 1.25rem)',
            fontWeight:  400,
            lineHeight:  1.7,
            color:       'var(--color-text-primary)',
            opacity:     isMounted ? 1 : 0,
            transition:  'opacity 400ms var(--ease-narrative)',
            whiteSpace:  'pre-wrap',
          }}
        >
          {displayedText}

          {/* Terminal cursor — blinking block */}
          {showCursor && (
            <span
              style={{
                display:         'inline-block',
                width:           '0.55em',
                height:          '1.1em',
                backgroundColor: 'var(--color-text-primary)',
                opacity:         0.85,
                marginLeft:      '2px',
                verticalAlign:   'text-bottom',
                animation:       'cursor-blink 1s steps(1) infinite',
              }}
              aria-hidden="true"
            />
          )}
        </span>
      </div>
    </div>
  )
}

import type { SceneProps } from '@/types/scene.types'
function OpeningCinematicScene(props: SceneProps) {
  return <OpeningCinematic onComplete={props.onComplete} />
}
export default OpeningCinematicScene
