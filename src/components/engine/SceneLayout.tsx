'use client'

/**
 * SceneLayout — Shared layout shell for narrative scenes.
 *
 * Provides the consistent viewport container and content column
 * used by most story scenes. Scene-specific content is passed as children.
 *
 * The layout:
 *   Full viewport, flex column, centered
 *   Content column: max-width 60ch, padded 8vw on sides
 *
 * Also exports:
 *   SceneLabel     — tiny uppercase label (e.g. "Act I")
 *   SceneTitle     — large display heading
 *   SceneBody      — body prose
 *   SceneQuote     — blockquote / large centered quote
 *   ScrollHint     — "↓" scroll prompt at bottom
 *   RevealText     — words that reveal one by one on mount
 */

import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'

// ─── Layout Shell ─────────────────────────────────────────────────────────────

export function SceneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position:       'fixed',
        inset:          0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        'clamp(48px, 10vh, 120px) clamp(24px, 8vw, 120px)',
      }}
    >
      <div
        style={{
          maxWidth:  '60ch',
          width:     '100%',
          display:   'flex',
          flexDirection: 'column',
          gap:       'clamp(20px, 3vh, 40px)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Typography Elements ──────────────────────────────────────────────────────

export function SceneLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <m.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      style={{
        fontFamily:    'var(--font-ui)',
        fontSize:      '0.5625rem',
        fontWeight:    300,
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color:         color ?? 'var(--color-text-tertiary)',
        display:       'block',
        marginBottom:  '0.5em',
      }}
    >
      {children}
    </m.span>
  )
}

export function SceneTitle({
  children,
  delay = 0.3,
  large = false,
}: {
  children: React.ReactNode
  delay?: number
  large?: boolean
}) {
  return (
    <m.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily:  'var(--font-display)',
        fontSize:    large
          ? 'clamp(3rem, 7vw, 6rem)'
          : 'clamp(2rem, 4.5vw, 3.75rem)',
        fontWeight:  300,
        fontStyle:   'italic',
        lineHeight:  1.08,
        color:       'var(--color-text-primary)',
        margin:      0,
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </m.h2>
  )
}

export function SceneBody({
  children,
  delay = 0.7,
  dim = false,
}: {
  children: React.ReactNode
  delay?: number
  dim?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <m.p
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0.65 }}
      transition={{ delay: isHovered ? 0 : delay, duration: isHovered ? 0.4 : 1.0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily:  'var(--font-body)',
        fontSize:    'clamp(1.0625rem, 1.6vw, 1.25rem)',
        fontWeight:  400,
        lineHeight:  1.75,
        color:       dim
          ? 'var(--color-text-tertiary)'
          : 'var(--color-text-secondary)',
        margin:      0,
        letterSpacing: '0.005em',
        transition:  'opacity 0.4s ease',
      }}
    >
      {children}
    </m.p>
  )
}

export function SceneQuote({
  children,
  delay = 0.4,
  color,
}: {
  children: React.ReactNode
  delay?: number
  color?: string
}) {
  return (
    <m.blockquote
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily:  'var(--font-display)',
        fontSize:    'clamp(2.5rem, 6vw, 5rem)',
        fontWeight:  300,
        fontStyle:   'italic',
        lineHeight:  1.1,
        color:       color ?? 'var(--color-text-primary)',
        margin:      0,
        padding:     0,
        border:      'none',
        letterSpacing: '-0.015em',
      }}
    >
      {children}
    </m.blockquote>
  )
}

// ─── ScrollHint ───────────────────────────────────────────────────────────────

export function ScrollHint({ delay = 1.8 }: { delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.0 }}
      style={{
        position:       'fixed',
        bottom:         32,
        left:           '50%',
        transform:      'translateX(-50%)',
        pointerEvents:  'none',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            6,
        userSelect:     'none',
      }}
      aria-hidden="true"
    >
      {/* Animated line descending */}
      <div
        style={{
          width:           1,
          height:          24,
          backgroundColor: 'var(--color-text-tertiary)',
          opacity:         0.5,
          animation:       'scroll-hint-pulse 2s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes scroll-hint-pulse {
          0%, 100% { transform: scaleY(1);   opacity: 0.3; }
          50%       { transform: scaleY(1.6); opacity: 0.6; }
        }
      `}</style>
    </m.div>
  )
}

// ─── Word-by-word reveal ──────────────────────────────────────────────────────

export function RevealText({
  text,
  delay = 0.2,
  stagger = 0.08,
  large = false,
  color,
}: {
  text: string
  delay?: number
  stagger?: number
  large?: boolean
  color?: string
}) {
  const words = text.split(' ')

  return (
    <span
      aria-label={text}
      style={{
        fontFamily:  'var(--font-display)',
        fontSize:    large
          ? 'clamp(2.5rem, 5.5vw, 4.5rem)'
          : 'clamp(1.5rem, 3vw, 2.5rem)',
        fontWeight:  300,
        fontStyle:   'italic',
        lineHeight:  1.2,
        color:       color ?? 'var(--color-text-primary)',
        display:     'block',
        letterSpacing: '-0.01em',
      }}
    >
      {words.map((word, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay:    delay + i * stagger,
            duration: 0.7,
            ease:     [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </m.span>
      ))}
    </span>
  )
}
