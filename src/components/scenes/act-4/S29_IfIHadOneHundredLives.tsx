'use client'

import { m } from 'framer-motion'
import { SceneLayout } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S29_IfIHadOneHundredLives({ }: SceneProps) {
  return (
    <SceneLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-text-primary)',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          If I had 100 lives,
          <br />
          <span style={{ color: 'var(--color-maroon-glow)', opacity: 0.9 }}>
            I'd find you in every single one.
          </span>
        </m.h2>
      </div>
    </SceneLayout>
  )
}
