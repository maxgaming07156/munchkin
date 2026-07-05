'use client'

import { m } from 'framer-motion'
import { SceneLayout } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import type { SceneProps } from '@/types/scene.types'

export default function S13_ShutUp({ }: SceneProps) {
  return (
    <SceneLayout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '30vh' }}>
        
        <MemoryPhoto src="/images/razane-6.jpg" alt="A smile" delay={0.4} />

        <m.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-maroon-glow)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          "Shut up."
        </m.h2>
      </div>
    </SceneLayout>
  )
}
