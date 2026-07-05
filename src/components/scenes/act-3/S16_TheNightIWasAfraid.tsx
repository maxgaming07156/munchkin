'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import type { SceneProps } from '@/types/scene.types'

export default function S16_TheNightIWasAfraid({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-dual)">Act III — Growing Together</SceneLabel>

      <RevealText
        text="The night I was afraid."
        large
        delay={0.4}
        stagger={0.06}
      />

      <MemoryPhoto src="/images/razane-7.jpg" alt="Comfort" delay={1.2} />

      <SceneBody delay={1.8}>
        Do you remember when everything felt too heavy?
        When the uncertainty was too much to carry alone?
        You didn't run. You didn't try to fix it with empty words.
        You just stayed. You listened. You held the weight with me.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
