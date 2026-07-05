'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface MemoryPhotoProps {
  src: string
  alt: string
  delay?: number
}

export function MemoryPhoto({ src, alt, delay = 1.0 }: MemoryPhotoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        aspectRatio: '1 / 1',
        margin: '2rem auto',
        borderRadius: '8px',
        overflow: 'hidden',
        // Photograph warmth micro-interaction
        boxShadow: isHovered 
          ? '0 0 30px rgba(163, 48, 72, 0.15)' // Faintest maroon glow
          : '0 0 0px rgba(163, 48, 72, 0)',
        transition: 'box-shadow 0.6s ease',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        style={{
          objectFit: 'cover',
          opacity: 0.9, // Slightly dimmed to match the aesthetic
          filter: 'contrast(1.1) brightness(0.9)',
        }}
      />
    </m.div>
  )
}
