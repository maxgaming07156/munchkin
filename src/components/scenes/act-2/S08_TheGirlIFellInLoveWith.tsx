'use client'

/**
 * S08_TheGirlIFellInLoveWith — Act II opener.
 * The audio track (score) starts fading in here according to scenes.config.ts.
 */
import { SceneLayout, SceneLabel, RevealText, SceneBody, ScrollHint } from '@/components/engine/SceneLayout'
import { MemoryPhoto } from '@/components/ui/MemoryPhoto'
import { FloatingPetals } from '@/components/ui/FloatingPetals'
import type { SceneProps } from '@/types/scene.types'

export default function S08_TheGirlIFellInLoveWith({ }: SceneProps) {
  return (
    <SceneLayout>
      <FloatingPetals count={15} delay={1.0} />
      <SceneLabel color="var(--color-maroon-dim)">Act II — Finding Home</SceneLabel>

      <RevealText
        text="It didn't happen all at once."
        large
        delay={0.4}
        stagger={0.06}
      />

      <MemoryPhoto src="/images/razane-1.jpg" alt="The girl I fell in love with" delay={1.2} />

      <SceneBody delay={1.8}>
        There was no dramatic cinematic moment.
        Just a thousand quiet ones.
        A slow, steady realization that talking to you was the best part of my day.
        I fell in love with you the way you fall asleep: slowly, and then all at once.
      </SceneBody>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
