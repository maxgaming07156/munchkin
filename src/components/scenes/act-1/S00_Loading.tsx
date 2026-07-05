'use client'

/**
 * S00_Loading — The entrance into the universe.
 *
 * The first thing displayed. No text, no chrome.
 * Just a breathing atom of light — then it lets you in.
 *
 * Duration: ~2600ms total
 *   400ms  — fade in
 *   1400ms — breathe
 *   400ms  — fade out
 *   400ms  — brief silence before onComplete fires
 */

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

  useEffect(() => {
    // Fade in
    const t1 = setTimeout(() => setPhase('hold'), 400)
    // Hold + breathe
    const t2 = setTimeout(() => setPhase('out'), 1800)
    // Fade out then call complete
    const t3 = setTimeout(() => onComplete(), 2600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  const opacity = phase === 'in' ? 0 : phase === 'out' ? 0 : 1

  return (
    <div
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        backgroundColor:'var(--color-bg)',
        zIndex:         100,
        transition:     'opacity 400ms var(--ease-narrative)',
      }}
    >
      {/* Breathing dot — the first point of light */}
      <div
        style={{
          width:        6,
          height:       6,
          borderRadius: '50%',
          backgroundColor: 'var(--color-text-primary)',
          opacity,
          transition:   'opacity 400ms var(--ease-narrative)',
          animation:    phase === 'hold' ? 'breathe-loading 1.2s var(--ease-breath) infinite' : undefined,
        }}
      />

      <style>{`
        @keyframes breathe-loading {
          0%, 100% { transform: scale(1);   opacity: 0.3; }
          50%       { transform: scale(1.8); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

// Named export for direct use
// Default export is SceneProps-compatible for the scene manifest
import type { SceneProps } from '@/types/scene.types'
function LoadingScene(props: SceneProps) {
  return <LoadingScreen onComplete={props.onComplete} />
}
export default LoadingScene

