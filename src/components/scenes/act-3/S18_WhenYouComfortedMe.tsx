'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S18_WhenYouComfortedMe({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-dual)">Comfort</SceneLabel>

      <RevealText
        text="When you comforted me."
        large
        delay={0.4}
        stagger={0.06}
      />

      <SceneBody delay={1.8}>
        I don't think I had ever felt truly comforted until you.
        Not just someone telling me it would be okay,
        but someone actually making it okay just by being there.
        Your voice became my anchor.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
