'use client'

/**
 * S01_Password — The gate between worlds.
 *
 * A single password field. No explanation. No logo.
 * She knows this is for her.
 *
 * The password is her birthday: 1708 (17 August).
 *
 * Visual design:
 *   - Full dark screen, just as the loading screen fades out
 *   - A faint label: "enter to begin" — small caps, barely there
 *   - The input: a single underline, no box, no border-radius
 *   - Characters appear as large, centered dots (password mode)
 *   - Wrong password: the whole form shakes horizontally
 *   - After 3 wrong attempts: a warmer message appears
 *
 * Animation: entrance fades in over 800ms after mounting.
 */

import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'

interface PasswordGateProps {
  /** Called when the correct password has been entered */
  onVerified?: () => void
}

export function PasswordGate({ onVerified }: PasswordGateProps) {
  const [input,      setInput]      = useState('')
  const [isShaking,  setIsShaking]  = useState(false)
  const [hasError,   setHasError]   = useState(false)
  const [isVisible,  setIsVisible]  = useState(false)
  const inputRef                    = useRef<HTMLInputElement>(null)
  const verify                      = useAuthStore((s) => s.verify)
  const attemptCount                = useAuthStore((s) => s.attemptCount)

  // Entrance fade-in
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const isCorrect = verify(input)

    if (isCorrect) {
      // Let the entrance animation play first, then call onVerified
      setTimeout(() => onVerified?.(), 300)
    } else {
      setHasError(true)
      setIsShaking(true)
      setInput('')
      setTimeout(() => setIsShaking(false), 600)
      inputRef.current?.focus()
    }
  }

  const errorMessage = attemptCount > 3
    ? 'Think carefully.'
    : attemptCount > 1
    ? 'Try again.'
    : 'Incorrect.'

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
        zIndex:          50,
        opacity:         isVisible ? 1 : 0,
        transition:      'opacity 800ms var(--ease-narrative)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '28px',
          animation:     isShaking ? 'password-shake 0.6s var(--ease-breath)' : undefined,
        }}
        noValidate
      >
        {/* Label */}
        <label
          htmlFor="password-input"
          style={{
            fontFamily:    'var(--font-ui)',
            fontSize:      '0.625rem',
            fontWeight:    300,
            letterSpacing: '0.14em',
            textTransform: 'uppercase' as const,
            color:         hasError
              ? 'var(--color-maroon-glow)'
              : 'var(--color-text-tertiary)',
            transition:    'color 400ms var(--ease-breath)',
          }}
        >
          {hasError ? errorMessage : 'enter to begin'}
        </label>

        {/* Input */}
        <input
          ref={inputRef}
          id="password-input"
          type="password"
          inputMode="numeric"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            if (hasError) setHasError(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit(e as unknown as React.FormEvent)
          }}
          autoFocus
          autoComplete="off"
          maxLength={20}
          aria-label="Password"
          aria-invalid={hasError}
          placeholder="····"
          style={{
            background:    'transparent',
            border:        'none',
            borderBottom:  `1px solid ${hasError ? 'var(--color-maroon)' : 'rgba(242,235,228,0.15)'}`,
            color:         'var(--color-text-primary)',
            fontFamily:    'var(--font-ui)',
            fontSize:      '1.5rem',
            fontWeight:    300,
            letterSpacing: '0.6em',
            textAlign:     'center' as const,
            width:         '120px',
            padding:       '12px 0',
            outline:       'none',
            caretColor:    'var(--color-seafoam)',
            transition:    'border-color 400ms var(--ease-breath)',
          }}
        />

        {/* Invisible submit button — Enter key triggers form */}
        <button type="submit" style={{ display: 'none' }} aria-hidden="true">
          Submit
        </button>
      </form>

      <style>{`
        @keyframes password-shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-10px); }
          30%       { transform: translateX(10px); }
          45%       { transform: translateX(-7px); }
          60%       { transform: translateX(7px); }
          75%       { transform: translateX(-4px); }
          90%       { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}

// Named export used directly by page.tsx
// Default export below is SceneProps-compatible for the scene manifest
import type { SceneProps } from '@/types/scene.types'
function PasswordGateScene(_props: SceneProps) {
  return <PasswordGate />
}
export default PasswordGateScene

