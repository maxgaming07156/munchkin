'use client'

import { m } from 'framer-motion'
import { SceneLayout } from '@/components/engine/SceneLayout'
import { FloralAccent } from '@/components/ui/FloralAccent'
import type { SceneProps } from '@/types/scene.types'

export default function S30_TheEnd({ }: SceneProps) {
  return (
    <SceneLayout>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '40px' }}>
        
        <FloralAccent delay={1.5} scale={1.5} color="var(--color-text-primary)" />

        <m.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 3.0, ease: 'easeInOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-text-primary)',
            margin: 0,
            textAlign: 'center',
            letterSpacing: '0.1em',
          }}
        >
          The End.
        </m.h2>
      </div>
    </SceneLayout>
  )
}
