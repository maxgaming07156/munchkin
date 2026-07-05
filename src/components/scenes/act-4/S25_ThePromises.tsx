'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S25_ThePromises({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-converging)">Vows</SceneLabel>

      <RevealText
        text="The promises."
        large
        delay={0.4}
        stagger={0.06}
      />

      <SceneBody delay={1.8}>
        I promise to always choose you.
        Even when it's hard. Especially when it's hard.
        I promise to be the place you can always come back to.
        No matter how far we go.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
