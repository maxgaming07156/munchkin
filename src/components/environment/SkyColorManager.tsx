'use client'

/**
 * SkyColorManager — Manages the Three.js scene background color.
 *
 * Reads colorTemperature from the environment store and smoothly transitions
 * the R3F scene background color between acts.
 *
 * Color temperature progression:
 *   cool       → Act I:   Deep blue-black space (#080610)
 *   warming    → S07:     Transition — purple-black begins warming
 *   warm       → Act II:  Rich dark maroon-black (#0F080A)
 *   dual       → Act III: Both colors in the sky (#0B0A0F)
 *   converging → Act IV:  Moving toward soft unity
 *   unified    → S27+:    Warm cream-black (#0F0D0C)
 *
 * This component renders nothing visible — it only modifies scene.background.
 */

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEnvironmentStore } from '@/store/environment.store'
import { lerp } from '@/lib/utils/math'
import type { ColorTemperature } from '@/types/scene.types'

// ─── Background Colors per Temperature ───────────────────────────────────────

const BG_COLORS: Record<ColorTemperature, [number, number, number]> = {
  cool:       [0.031, 0.024, 0.039],   // #080610 — cold deep space
  warming:    [0.043, 0.027, 0.047],   // #0B070C — beginning of warmth
  warm:       [0.059, 0.031, 0.039],   // #0F080A — maroon night
  dual:       [0.043, 0.039, 0.059],   // #0B0A0F — violet tension
  converging: [0.055, 0.039, 0.043],   // #0E0A0B — two colors meeting
  unified:    [0.059, 0.051, 0.047],   // #0F0D0C — warm unified dark
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SkyColorManager() {
  const { scene }      = useThree()
  const colorTemp      = useEnvironmentStore((s) => s.colorTemperature)

  // Current interpolated color — stored as a ref to avoid triggering re-renders
  const currentColor = useRef(new THREE.Color(...BG_COLORS['cool']))

  useFrame(() => {
    const target = BG_COLORS[colorTemp]
    const c      = currentColor.current

    // Smooth lerp toward the target color — 0.008 = ~4 seconds to fully transition
    // This is intentionally slow — scene atmosphere changes should be imperceptible
    c.r = lerp(c.r, target[0], 0.008)
    c.g = lerp(c.g, target[1], 0.008)
    c.b = lerp(c.b, target[2], 0.008)

    scene.background = c
  })

  return null  // This component renders no geometry
}
