'use client'

/**
 * StarField — The living sky background.
 *
 * Renders three depth layers of stars as Three.js Points geometry:
 *   Near  layer: fewer, larger stars — strong parallax
 *   Mid   layer: medium density — gentle parallax
 *   Far   layer: dense, small — almost stationary
 *
 * Each layer:
 *   - Uses its own ShaderMaterial instance (cloned from shared config)
 *   - Has per-vertex attributes: size, phase, brightness
 *   - Slowly rotates on a gentle 3-axis path
 *
 * Performance:
 *   - Pure GPU geometry — no per-frame JS loops
 *   - Star count adapts to device tier via performance store
 *   - DPR is capped at 0.75 at the Canvas level
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEnvironmentStore } from '@/store/environment.store'
import { usePerformanceStore } from '@/store/performance.store'
import { starVertexShader, starFragmentShader } from './shaders/stars.glsl'
import { colorVec3 } from '@/config/tokens.config'
import { randomBetween } from '@/lib/utils/math'
import type { ColorTemperature } from '@/types/scene.types'

// ─── Color Temperature → Star Tint ───────────────────────────────────────────

function getStarTint(temp: ColorTemperature): THREE.Vector3 {
  switch (temp) {
    case 'cool':
      return new THREE.Vector3(...colorVec3.seafoam)
    case 'warming':
      return new THREE.Vector3(
        (colorVec3.seafoam[0] + colorVec3.maroon[0]) / 2,
        (colorVec3.seafoam[1] + colorVec3.maroon[1]) / 2,
        (colorVec3.seafoam[2] + colorVec3.maroon[2]) / 2,
      )
    case 'warm':
      return new THREE.Vector3(...colorVec3.maroon)
    case 'dual':
      return new THREE.Vector3(...colorVec3.maroon)
    case 'converging':
      return new THREE.Vector3(...colorVec3.maroonGlow)
    case 'unified':
      return new THREE.Vector3(...colorVec3.textPrimary)
    default:
      return new THREE.Vector3(...colorVec3.seafoam)
  }
}

// ─── Layer Config ─────────────────────────────────────────────────────────────

interface LayerConfig {
  zPos:          number
  countFraction: number    // Fraction of total star count for this layer
  baseSize:      number
  maxBrightness: number
  rotateSpeed:   number    // Radians per 60fps-normalized frame
}

const LAYER_CONFIGS: LayerConfig[] = [
  { zPos: -120, countFraction: 0.15, baseSize: 1.4, maxBrightness: 0.9, rotateSpeed: 0.0004 },
  { zPos: -200, countFraction: 0.30, baseSize: 0.9, maxBrightness: 0.7, rotateSpeed: 0.0002 },
  { zPos: -300, countFraction: 0.55, baseSize: 0.5, maxBrightness: 0.5, rotateSpeed: 0.0001 },
]

// ─── Individual Star Layer ────────────────────────────────────────────────────

interface StarLayerProps {
  count:      number
  config:     LayerConfig
  colorTemp:  ColorTemperature
  brightness: number
  cursor:     [number, number]
}

function StarLayer({ count, config, colorTemp, brightness, cursor }: StarLayerProps) {
  const pointsRef   = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  const geometry = useMemo(() => {
    const positions    = new Float32Array(count * 3)
    const sizes        = new Float32Array(count)
    const phases       = new Float32Array(count)
    const brightnesses = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]!     = randomBetween(-200, 200)
      positions[i * 3 + 1]! = randomBetween(-150, 150)
      positions[i * 3 + 2]! = randomBetween(-40, 40) + config.zPos

      sizes[i]!        = config.baseSize * (0.5 + Math.random() * 1.0)
      phases[i]!       = Math.random() * Math.PI * 2
      brightnesses[i]! = config.maxBrightness * (0.3 + Math.random() * 0.7)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position',    new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize',       new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aPhase',      new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('aBrightness', new THREE.BufferAttribute(brightnesses, 1))
    return geo
  }, [count, config])

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader:   starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: {
        uTime:             { value: 0 },
        uCursorPosition:   { value: new THREE.Vector2(0.5, 0.5) },
        uCursorRadius:     { value: 0.4 },
        uGlobalBrightness: { value: 0.7 },
        uColorTint:        { value: new THREE.Vector3(0.42, 0.62, 0.6) },
      },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    })
    materialRef.current = mat
    return mat
  }, []) // One material per layer, stable for lifetime

  // Update uniforms and rotation every frame — pure mutation, no re-render
  useFrame(({ clock }, delta) => {
    const mat = materialRef.current
    if (mat) {
      mat.uniforms['uTime']!.value             = clock.getElapsedTime()
      mat.uniforms['uCursorPosition']!.value.set(cursor[0], cursor[1])
      mat.uniforms['uGlobalBrightness']!.value = brightness
      mat.uniforms['uColorTint']!.value.copy(getStarTint(colorTemp))
    }

    const pts = pointsRef.current
    if (pts) {
      pts.rotation.z += config.rotateSpeed * delta * 60
      pts.rotation.x += config.rotateSpeed * 0.3 * delta * 60
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive object={material} />
    </points>
  )
}

// ─── StarField Root ───────────────────────────────────────────────────────────

export function StarField() {
  const colorTemp      = useEnvironmentStore((s) => s.colorTemperature)
  const starBrightness = useEnvironmentStore((s) => s.starBrightness)
  const cursorPos      = useEnvironmentStore((s) => s.cursorPosition)
  const totalCount     = usePerformanceStore((s) => s.config.starCount)

  return (
    <group>
      {LAYER_CONFIGS.map((config, i) => (
        <StarLayer
          key={i}
          count={Math.floor(totalCount * config.countFraction)}
          config={config}
          colorTemp={colorTemp}
          brightness={starBrightness}
          cursor={[cursorPos.x, cursorPos.y]}
        />
      ))}
    </group>
  )
}
