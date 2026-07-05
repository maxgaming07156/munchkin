'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import type { SceneProps } from '@/types/scene.types'

export default function S15_YouMakingEveryoneSafe({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-maroon-dim)">Act II — The Realization</SceneLabel>

      <RevealText
        text="You make everyone feel safe."
        large
        delay={0.4}
        stagger={0.06}
      />

      <MemoryPhoto src="/images/razane-4.jpg" alt="Making everyone safe" delay={1.2} />

      <SceneBody delay={1.8}>
        That's just who you are. A sanctuary.
        You have this incredible gravity that just puts people at ease.
        When I realized that I had found my safe place in you...
        everything changed again.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
