'use client'

/**
 * 404 page for "For My Munchkin"
 *
 * Intentionally minimal and in-character.
 * If Razane somehow navigates to a non-existent page,
 * the experience remains warm and personal.
 */

export default function NotFound() {
  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        backgroundColor: 'var(--color-bg)',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             'var(--space-4)',
      }}
    >
      <p
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1rem, 2vw, 1.375rem)',
          fontWeight:    300,
          color:         'var(--color-text-secondary)',
          letterSpacing: '0.02em',
          fontStyle:     'italic',
        }}
      >
        This page doesn&apos;t exist.
      </p>
      <a
        href="/"
        style={{
          fontFamily:     'var(--font-ui)',
          fontSize:       '0.6875rem',
          fontWeight:     300,
          letterSpacing:  '0.10em',
          textTransform:  'uppercase' as const,
          color:          'var(--color-text-tertiary)',
          textDecoration: 'none',
          marginTop:      'var(--space-2)',
          transition:     `color var(--duration-short) var(--ease-breath)`,
        }}
        onMouseEnter={(e) => {
          ;(e.target as HTMLAnchorElement).style.color = 'var(--color-text-secondary)'
        }}
        onMouseLeave={(e) => {
          ;(e.target as HTMLAnchorElement).style.color = 'var(--color-text-tertiary)'
        }}
      >
        Return
      </a>
    </div>
  )
}
