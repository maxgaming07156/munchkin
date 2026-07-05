'use client'

/**
 * AudioToggle — The persistent audio control.
 *
 * A minimal, nearly invisible control that lives in the corner.
 * Designed to feel like a whisper — present but not demanding attention.
 *
 * Position: bottom-left, 32px from edges
 * Style: Inter UI font, 10px, uppercase, wide tracking
 *
 * States:
 *   Enabled:  a small glowing seafoam dot + "SOUND ON"
 *   Disabled: a dim dot + "SOUND OFF"
 *
 * Note: Audio files are added manually to /public/audio/ later.
 * The toggle UI is fully wired to the audio store — it's ready when files arrive.
 *
 * Hidden during the Opening Cinematic (via the `hidden` prop).
 * Appears with a gentle fade-in when the experience begins.
 */

import { useAudioStore } from '@/store/audio.store'

interface AudioToggleProps {
  hidden?: boolean
}

export function AudioToggle({ hidden = false }: AudioToggleProps) {
  const isEnabled    = useAudioStore((s) => s.isEnabled)
  const enableAudio  = useAudioStore((s) => s.enableAudio)
  const disableAudio = useAudioStore((s) => s.disableAudio)

  const handleToggle = () => {
    if (isEnabled) {
      disableAudio()
    } else {
      enableAudio()
    }
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isEnabled ? 'Mute audio' : 'Enable audio'}
      aria-pressed={isEnabled}
      data-cursor="expand"
      style={{
        position:       'fixed',
        bottom:         32,
        left:           32,
        zIndex:         9000,
        display:        'flex',
        alignItems:     'center',
        gap:            10,
        background:     'none',
        border:         'none',
        cursor:         'none',          // Our custom cursor handles this
        padding:        '8px 0',
        opacity:        hidden ? 0 : 1,
        pointerEvents:  hidden ? 'none' : 'auto',
        transition:     'opacity 800ms var(--ease-narrative)',
      }}
    >
      {/* Indicator dot */}
      <span
        aria-hidden="true"
        style={{
          display:         'block',
          width:           4,
          height:          4,
          borderRadius:    '50%',
          backgroundColor: isEnabled
            ? 'var(--color-seafoam)'
            : 'var(--color-text-tertiary)',
          transition:      'background-color 600ms var(--ease-breath)',
          animation:       isEnabled
            ? 'audio-pulse 3s var(--ease-breath) infinite'
            : 'none',
          flexShrink:      0,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily:    'var(--font-ui)',
          fontSize:      '0.5625rem',
          fontWeight:    300,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color:         isEnabled
            ? 'var(--color-text-secondary)'
            : 'var(--color-text-tertiary)',
          transition:    'color 600ms var(--ease-breath)',
          userSelect:    'none',
        }}
      >
        {isEnabled ? 'Sound on' : 'Sound off'}
      </span>
    </button>
  )
}
