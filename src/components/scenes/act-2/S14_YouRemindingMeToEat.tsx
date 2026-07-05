'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S14_YouRemindingMeToEat({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-maroon-dim)">Care</SceneLabel>

      <RevealText
        text="You reminding me to eat."
        large
        delay={0.4}
        stagger={0.06}
      />

      <SceneBody delay={1.8}>
        It sounds so simple, but to me, it meant the world.
        You made sure I was taking care of myself.
        It was the quietest, most profound kind of love—just making sure
        the person you care about is okay.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
