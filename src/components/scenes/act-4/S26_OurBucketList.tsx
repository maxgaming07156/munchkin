'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import type { SceneProps } from '@/types/scene.types'

export default function S26_OurBucketList({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-converging)">Dreams</SceneLabel>

      <RevealText
        text="Our bucket list."
        large
        delay={0.4}
        stagger={0.06}
      />

      <MemoryPhoto src="/images/adventure.jpg" alt="A future adventure" delay={1.2} />

      <SceneBody delay={1.8}>
        A list of everywhere we'll go and everything we'll do.
        But honestly?
        You are the bucket list.
        Everywhere is beautiful as long as you're there.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
