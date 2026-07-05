'use client'

import { m } from 'framer-motion'
import { SceneLayout, SceneLabel, ScrollHint } from '@/components/engine/SceneLayout'
import { FloralAccent } from '@/components/ui/FloralAccent'
import type { SceneProps } from '@/types/scene.types'

export default function S20_ThankYou({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-seafoam-dim)">Gratitude</SceneLabel>

      <FloralAccent delay={0.6} scale={1.2} color="var(--color-maroon-glow)" />

      <m.div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-text-primary)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Thank you.
        </m.h2>
      </m.div>

      <ScrollHint delay={2.0} />
    </SceneLayout>
  )
}
