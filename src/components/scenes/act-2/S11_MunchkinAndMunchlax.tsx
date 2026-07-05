'use client'

import { SceneLayout, SceneQuote, ScrollHint } from '@/components/engine/SceneLayout'
import type { SceneProps } from '@/types/scene.types'

export default function S11_MunchkinAndMunchlax({ }: SceneProps) {
  return (
    <SceneLayout>
      <SceneQuote delay={0.4} color="var(--color-maroon-glow)">
        Munchkin & Munchlax
      </SceneQuote>

      <ScrollHint delay={1.4} />
    </SceneLayout>
  )
}
