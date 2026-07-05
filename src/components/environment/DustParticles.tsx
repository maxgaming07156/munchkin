'use client'

/**
 * DustParticles — Slow-drifting ambient particles.
 *
 * A very small number of larger, dimmer points that drift upward slowly.
 * They are NOT stars. They are the subtle "dust motes in starlight" that
 * give the space its organic, breathing quality.
 *
 * Behaviour:
 *   - 50–200 particles (scales with performance tier)
 *   - Each drifts upward at a unique random speed
 *   - When a particle exits the top, it teleports to the bottom
 *   - Position is updated via BufferAttribute needsUpdate
 *   - Hidden on low-tier devices (count = 0)
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePerformanceStore } from '@/store/performance.store'
import { randomBetween } from '@/lib/utils/math'

export function DustParticles() {
  const perfConfig = usePerformanceStore((s) => s.config)
  const count      = perfConfig.particleCount

  const pointsRef = useRef<THREE.Points>(null)

  // Per-particle properties — generated once
  const { positions, driftSpeeds, driftX } = useMemo(() => {
    const positions   = new Float32Array(count * 3)
    const driftSpeeds = new Float32Array(count)
    const driftX      = new Float32Array(count)  // slight horizontal drift

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = randomBetween(-120, 120)
      positions[i * 3 + 1] = randomBetween(-80, 80)
      positions[i * 3 + 2] = randomBetween(-180, -120)

      driftSpeeds[i] = randomBetween(0.008, 0.03)
      driftX[i]      = randomBetween(-0.003, 0.003)
    }

    return { positions, driftSpeeds, driftX }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color:       0xa09088,
      size:        0.35,
      transparent: true,
      opacity:     0.12,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return

    const pos = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute

    for (let i = 0; i < count; i++) {
      // Drift upward
      let y = (pos.getY(i) ?? 0) + driftSpeeds[i]!
      let x = (pos.getX(i) ?? 0) + driftX[i]!

      // Wrap: when past the top edge, reset to bottom
      if (y > 90) {
        y = -90
        x = randomBetween(-120, 120)
      }

      pos.setXY(i, x, y)
    }

    pos.needsUpdate = true
  })

  // Don't render if count is 0 (low-tier device)
  if (count === 0) return null

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive object={material} />
    </points>
  )
}
