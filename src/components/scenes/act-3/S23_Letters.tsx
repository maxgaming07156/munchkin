'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S23_Letters({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-dual)">Act III — The Letters</SceneLabel>

      <RevealText
        text="The letters."
        large
        delay={0.4}
        stagger={0.06}
      />

      <SceneBody delay={1.8}>
        Every word I wrote, every thought I poured out.
        They weren't just letters. They were pieces of my heart,
        folded up and sent across the distance.
        Until there was no distance left.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
