'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import type { SceneProps } from '@/types/scene.types'

export default function S24_TheFuture({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-converging)">Act IV — Forever</SceneLabel>

      <RevealText
        text="When the future stopped being terrifying."
        large
        delay={0.4}
        stagger={0.06}
      />

      <MemoryPhoto src="/images/razane-8.jpg" alt="The future" delay={1.2} />

      <SceneBody delay={1.8}>
        I stopped looking at the future as something terrifying.
        Because when I look ahead now, I don't see a blur of uncertainty.
        I see you.
        I see us.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
