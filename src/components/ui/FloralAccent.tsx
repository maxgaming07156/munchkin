'use client'

import { m } from 'framer-motion'

interface FloralAccentProps {
  delay?: number
  scale?: number
  color?: string
}

export function FloralAccent({ delay = 0.5, scale = 1.0, color = 'var(--color-maroon-glow)' }: FloralAccentProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.8,
      transition: {
        pathLength: { delay, type: 'spring', duration: 3, bounce: 0 },
        opacity: { delay, duration: 1 },
      },
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0',
        pointerEvents: 'none',
        transform: `scale(${scale})`,
      }}
      aria-hidden="true"
    >
      <m.svg
        width="64"
        height="120"
        viewBox="0 0 64 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20%' }}
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      >
        {/* Stem */}
        <m.path
          d="M32 120 C 35 90, 25 60, 32 30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={draw}
        />
        {/* Left Leaf */}
        <m.path
          d="M32 80 C 15 75, 10 90, 32 95"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={draw}
        />
        {/* Right Leaf */}
        <m.path
          d="M30 60 C 50 50, 55 65, 30 75"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={draw}
        />
        {/* Rose Bulb */}
        <m.path
          d="M32 30 C 15 25, 20 5, 32 10 C 44 5, 49 25, 32 30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={draw}
        />
        <m.path
          d="M25 15 C 30 20, 35 20, 40 15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={draw}
        />
      </m.svg>
    </div>
  )
}
