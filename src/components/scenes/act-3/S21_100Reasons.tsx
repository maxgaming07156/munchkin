'use client'

import { motion as m } from 'framer-motion'
import { SceneLayout, SceneLabel, RevealText, ScrollHint } from '@/components/engine/SceneLayout'
import { FloatingPetals } from '@/components/ui/FloatingPetals'
import type { SceneProps } from '@/types/scene.types'

export default function S21_100Reasons({ }: SceneProps) {
  const reasons = [
    "The way you say 'bro'", "Your random voice notes at 2 AM", "How you notice the little things", "Your laugh", "The way you hold your chin in selfies",
    "Your beautiful green dress", "Your deep, dark eyes", "How you make everyone feel safe", "Our inside jokes", "The way you care for people",
    "How you listen", "Your weird hypotheticals", "The way you say 'shut up'", "Your smile", "How you remind me to eat",
    "Your voice when you're sleepy", "The way you type", "Your taste in everything", "How you remember my tiny details", "Your presence",
    "The way my name sounds when you say it", "How you make the dark less scary", "Your endless patience", "How you comforted me about my uncle", "Your warmth",
    "The way you handle my moods", "Your honesty", "Your weird sense of humor", "How you understand my silence", "Your strength",
    "The way you say 'munchkin'", "How you just sit in the dark with me", "Your empathy", "Your absolute perfection", "The way you make me feel seen",
    "Your kindness", "How you never give up", "Your beautiful soul", "The way you make a bad day good", "How you are my safe space",
    "Your voice notes", "The way you always know what to say", "Your endless love", "How you make me laugh until it hurts", "Your passion",
    "The way you exist in the world", "How you make everything better", "Your beautiful mind", "The way you see the universe", "How you changed my life",
    "Your loyalty", "Your grace", "How you never judge me", "Your absolute brilliance", "The way you hold my heart",
    "Your courage", "The way you light up a room", "How you make me want to be better", "Your sheer existence", "The way you say my name",
    "How you make the mundane magical", "Your weird little habits", "The way you look at me", "How you make me feel safe", "Your beautiful face",
    "The way you make me feel loved", "How you never let me feel alone", "Your endless compassion", "The way you make me feel home", "How you are my person",
    "Your resilience", "The way you never stop trying", "How you always believe in me", "Your beautiful spirit", "The way you make me feel alive",
    "Your unwavering support", "The way you never let me give up", "How you make me feel valued", "Your beautiful heart", "The way you make me feel cherished",
    "Your endless understanding", "The way you never let me feel small", "How you make me feel important", "Your beautiful presence", "The way you make me feel adored",
    "Your unwavering devotion", "The way you never let me feel unworthy", "How you make me feel enough", "Your beautiful existence", "The way you make me feel whole",
    "Your endless patience", "The way you never let me feel lost", "How you make me feel found", "Your beautiful soul", "The way you make me feel complete",
    "Your unwavering love", "The way you never let me feel broken", "How you make me feel healed", "Your beautiful mind", "Because you are you."
  ]

  return (
    <SceneLayout>
      <FloatingPetals count={25} delay={0.5} />
      <SceneLabel color="var(--color-dual)">Reasons</SceneLabel>

      <RevealText
        text="100 reasons why I love you."
        large
        delay={0.4}
        stagger={0.06}
      />

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
        {reasons.map((reason, idx) => (
          <m.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: (idx % 10) * 0.1 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              color: 'var(--color-text-secondary)',
              padding: '0.5rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span style={{ color: 'var(--color-maroon-glow)', marginRight: '1rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem' }}>
              {(idx + 1).toString().padStart(3, '0')}
            </span>
            {reason}
          </m.div>
        ))}
      </div>

      <ScrollHint delay={3.0} />
    </SceneLayout>
  )
}
