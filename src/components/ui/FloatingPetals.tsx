'use client'

import { m } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingPetalsProps {
  count?: number
  delay?: number
}

interface Petal {
  id: number
  x: number
  y: number
  scale: number
  rotation: number
  duration: number
  delay: number
}

export function FloatingPetals({ count = 20, delay = 0 }: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    // Generate petals only on client to prevent hydration mismatch
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      y: -20 - Math.random() * 20, // start above screen
      scale: 0.4 + Math.random() * 0.8,
      rotation: Math.random() * 360,
      duration: 10 + Math.random() * 15,
      delay: delay + Math.random() * 8,
    }))
    setPetals(newPetals)
  }, [count, delay])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50, // Above stars, behind text
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <m.div
          key={petal.id}
          initial={{
            x: `${petal.x}vw`,
            y: `${petal.y}vh`,
            rotate: petal.rotation,
            scale: petal.scale,
            opacity: 0,
          }}
          animate={{
            y: '120vh',
            x: `${petal.x + (Math.random() * 20 - 10)}vw`,
            rotate: petal.rotation + 360,
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            position: 'absolute',
            width: '16px',
            height: '16px',
            background: 'linear-gradient(135deg, rgba(230,180,190,0.8), rgba(163,48,72,0.4))',
            borderRadius: '50% 0 50% 50%',
            filter: 'blur(2px)',
            boxShadow: '0 0 10px rgba(163, 48, 72, 0.3)',
          }}
        />
      ))}
    </div>
  )
}
