'use client'

/**
 * ExperienceRoot — The orchestration shell for the full experience.
 *
 * Rendered after password verification.
 * Mounts the Three.js environment canvas and hands off to SceneRenderer.
 *
 * NOTE: This component is a shell during Phase 1.
 * Full implementation is built in Phase 3 (Loading + Opening Cinematic)
 * and Phase 4 (Story Engine / SceneRenderer).
 */

export function ExperienceRoot() {
  return (
    <div
      style={{
        position:        'relative',
        width:           '100vw',
        minHeight:       '100dvh',
        backgroundColor: 'var(--color-bg)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {/* Phase 2: EnvironmentCanvas will be mounted here */}
      {/* Phase 3: Loading + Opening Cinematic scenes */}
      {/* Phase 4: SceneRenderer will replace this placeholder */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize:   'clamp(1rem, 2vw, 1.5rem)',
          fontWeight: 300,
          color:      'var(--color-text-secondary)',
          letterSpacing: '0.05em',
          opacity:    0.6,
        }}
      >
        Phase 1 complete.
      </p>
    </div>
  )
}
