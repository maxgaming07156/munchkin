'use client'

import { m } from 'framer-motion'
import { SceneLayout, SceneLabel } from '@/components/engine/SceneLayout'
import { FloatingPetals } from '@/components/ui/FloatingPetals'
import type { SceneProps } from '@/types/scene.types'

export default function S27_StarsBecomingOne({ }: SceneProps) {
  return (
    <SceneLayout>
      <FloatingPetals count={40} delay={0.2} />
      <SceneLabel color="var(--color-converging)">Convergence</SceneLabel>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh' }}>
        <m.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-text-primary)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Two lives. One story.
        </m.h2>
      </div>

    </SceneLayout>
  )
}
