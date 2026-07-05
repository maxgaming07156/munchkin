'use client'

import { SceneLayout, SceneLabel, SceneQuote, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import { FloralAccent } from '@/components/ui/FloralAccent'
import type { SceneProps } from '@/types/scene.types'

export default function S09_TheLittleThings({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneLabel color="var(--color-maroon-dim)">The Little Things</SceneLabel>

      <SceneQuote delay={0.4}>
        "I love the way you think."
      </SceneQuote>

      <FloralAccent delay={0.8} scale={0.8} color="var(--color-seafoam-glow)" />

      <MemoryPhoto src="/images/razane-2.jpg" alt="The little things" delay={1.0} />

      <SceneBody delay={1.4}>
        It was in the tiny details. The way you noticed things no one else did.
        The way you remembered things I mentioned in passing weeks ago.
        I started noticing the shape of your words, the rhythm of your voice notes.
        The little things weren't little at all.
      </SceneBody>

      <ScrollHint delay={2.4} />
    </SceneLayout>
  )
}
