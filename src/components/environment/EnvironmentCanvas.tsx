'use client'

/**
 * EnvironmentCanvas — The living sky behind the experience.
 *
 * A fixed, full-screen R3F Canvas that stays mounted for the entire experience.
 * It sits at z-index: 0. All narrative content sits at z-index: 10+.
 *
 * Architecture:
 *   - Canvas is fixed-position, covers the full viewport
 *   - pointer-events: none — it never captures user input
 *   - DPR capped at 0.75 — balanced GPU performance
 *   - orthographic camera — no perspective distortion for this "space" feel
 *   - Scene background is controlled by SkyColorManager
 *
 * Inside the Canvas:
 *   1. PerformanceDetector — detects GPU tier on first render
 *   2. SkyColorManager    — transitions scene.background per act
 *   3. StarField          — three depth layers of instanced stars
 *   4. DustParticles      — slow ambient dust drift
 *
 * This file is dynamically imported with ssr: false in ExperienceRoot.
 * Never import it directly — always use the dynamic version.
 */

import { Canvas } from '@react-three/fiber'
import { StarField }           from './StarField'
import { DustParticles }       from './DustParticles'
import { SkyColorManager }     from './SkyColorManager'
import { PerformanceDetector } from './PerformanceDetector'

export function EnvironmentCanvas() {
  return (
    <div
      id="environment-canvas"
      aria-hidden="true"
      role="presentation"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         0,
        pointerEvents:  'none',
        width:          '100vw',
        height:         '100dvh',
      }}
    >
      <Canvas
        dpr={[0.5, 0.75]}         // Min 0.5, max 0.75 — never full DPR
        camera={{
          position: [0, 0, 10] as [number, number, number],
          fov:      60,
          near:     0.1,
          far:      1000,
        }}
        gl={{
          antialias:             false,  // Not needed for stars
          powerPreference:       'default',
          preserveDrawingBuffer: false,
          alpha:                 false,  // Background managed by SkyColorManager
        }}
        // Allow Three.js to manage the render loop
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 1. Detect performance tier on first render */}
        <PerformanceDetector />

        {/* 2. Manage scene background color per act */}
        <SkyColorManager />

        {/* 3. Three depth layers of stars */}
        <StarField />

        {/* 4. Slow ambient dust particles */}
        <DustParticles />
      </Canvas>
    </div>
  )
}
