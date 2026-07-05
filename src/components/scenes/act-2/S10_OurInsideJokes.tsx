'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import type { SceneProps } from '@/types/scene.types'

export default function S10_OurInsideJokes({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-maroon-dim)">Our Language</SceneLabel>

      <RevealText
        text="A language built just for two."
        large
        delay={0.4}
        stagger={0.06}
      />

      <MemoryPhoto src="/images/razane-3.jpg" alt="Our inside jokes" delay={1.2} />

      <SceneBody delay={1.8}>
        Soon, half of what we said wouldn't make sense to anyone else.
        We built our own little world out of shared laughs, absurd hypotheticals,
        and jokes that only we understood. It was our secret garden.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
