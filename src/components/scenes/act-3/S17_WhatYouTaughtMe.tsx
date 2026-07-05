'use client'

import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S17_WhatYouTaughtMe({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-dual)">Growth</SceneLabel>

      <RevealText
        text="You taught me how to be softer."
        large
        delay={0.4}
        stagger={0.06}
      />

      <SceneBody delay={1.8}>
        I always thought strength was about being unbreakable.
        But you showed me that real strength is in being vulnerable.
        In caring deeply, even when it's scary.
        You taught me that it's okay to let someone in.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
