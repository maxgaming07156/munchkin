'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S28_TheFinalLetter({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-unified)">Forever</SceneLabel>

      <RevealText
        text="The final letter."
        large
        delay={0.4}
        stagger={0.06}
      />

      <SceneBody delay={1.8}>
        Because some things can't be said, they have to be written down so they last forever.
        I wrote this entire universe just to tell you:
        I am so endlessly, completely, profoundly in love with you.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
