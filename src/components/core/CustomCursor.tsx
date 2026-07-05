'use client'

/**
 * CustomCursor — The magnetic, lerped cursor for desktop experiences.
 *
 * Two elements:
 *   1. Dot:    10px circle — follows cursor precisely (no lag)
 *   2. Aura:   36px circle — follows cursor with lerp smoothing (lag)
 *
 * Behaviour:
 *   - Automatically hides on touch devices (CSS hover: none media query)
 *   - Expands and blends on hoverable elements (links, buttons, [data-cursor="expand"])
 *   - Writes normalized (0–1) cursor position to environment store every frame
 *     so the star field can respond to cursor proximity
 *
 * Uses requestAnimationFrame directly — no GSAP, no React state —
 * for maximum performance. The cursor must never lag behind input.
 */

import { useEffect, useRef } from 'react'
import { useEnvironmentStore } from '@/store/environment.store'
import { lerp } from '@/lib/utils/math'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)
  const setCursorPosition = useEnvironmentStore((s) => s.setCursorPosition)

  useEffect(() => {
    // Don't initialize on touch devices — they have no hover cursor
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current
    const aura = auraRef.current
    if (!dot || !aura) return

    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let auraX  = mouseX
    let auraY  = mouseY
    let rafId  = 0
    let isHovering = false

    // Track raw cursor position
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Write normalized position to environment store (throttled by RAF)
      const normalizedX = mouseX / window.innerWidth
      const normalizedY = mouseY / window.innerHeight
      setCursorPosition(normalizedX, normalizedY)
    }

    // Expand aura on hover targets
    const onMouseEnter = () => { isHovering = true }
    const onMouseLeave = () => { isHovering = false }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.querySelectorAll('a, button, [data-cursor="expand"]').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    // RAF loop — updates DOM transforms directly, never triggers React re-renders
    const tick = () => {
      // Dot: instant follow
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`

      // Aura: lerped follow — 0.12 = smooth lag
      auraX = lerp(auraX, mouseX, 0.12)
      auraY = lerp(auraY, mouseY, 0.12)

      const auraSize = isHovering ? 56 : 36
      const auraOp   = isHovering ? 0.18 : 0.08

      aura.style.transform = `translate(${auraX - auraSize / 2}px, ${auraY - auraSize / 2}px)`
      aura.style.width     = `${auraSize}px`
      aura.style.height    = `${auraSize}px`
      aura.style.opacity   = String(auraOp)

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [setCursorPosition])

  return (
    <>
      {/* Dot: instant, precise */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           10,
          height:          10,
          borderRadius:    '50%',
          backgroundColor: 'var(--color-text-primary)',
          opacity:         0.6,
          zIndex:          9999,
          pointerEvents:   'none',
          willChange:      'transform',
          mixBlendMode:    'difference',
        }}
      />

      {/* Aura: lerped, expandable */}
      <div
        ref={auraRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         36,
          height:        36,
          borderRadius:  '50%',
          border:        '1px solid var(--color-text-primary)',
          opacity:       0.08,
          zIndex:        9998,
          pointerEvents: 'none',
          willChange:    'transform, width, height, opacity',
          transition:    'width 0.3s var(--ease-breath), height 0.3s var(--ease-breath)',
        }}
      />
    </>
  )
}
