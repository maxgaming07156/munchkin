'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S19_ThinkingAboutMyUncle({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-dual)">Family</SceneLabel>

      <RevealText
        text="Thinking about my uncle."
        large
        delay={0.4}
        stagger={0.06}
      />

      <SceneBody delay={1.8}>
        The night I felt so completely down about my uncle.
        When I lost him, the world stopped making sense for a while.
        Grief is such a lonely place.
        But you found me in the dark.
        You didn't ask me to be okay. You just sat in the dark with me.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
