'use client'

import { m } from 'framer-motion'
import { SceneLayout } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S12_Bro({ }: SceneProps) {
  return (
    <SceneLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <m.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-seafoam)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          "Bro."
        </m.h2>
      </div>
    </SceneLayout>
  )
}
