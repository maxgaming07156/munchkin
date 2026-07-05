'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import type { SceneProps } from '@/types/scene.types'

export default function S22_MyVoice({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-dual)">The Shift</SceneLabel>

      <RevealText
        text="My voice when I talk to you."
        large
        delay={0.4}
        stagger={0.06}
      />

      <MemoryPhoto src="/images/razane-5.jpg" alt="My voice when I talk to you" delay={1.2} />

      <SceneBody delay={1.8}>
        Have you noticed?
        It's softer. Quieter.
        It's different from how I talk to anyone else in the world.
        Because with you, I don't have to shout to be heard.
        I just have to be me.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
