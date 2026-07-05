'use client'

/**
 * S01_Password — The password gate scene.
 *
 * This is the first thing Razane sees (after loading).
 * A minimal, warm input field. No chrome. No explanation.
 * Just a prompt that says: this is for you.
 *
 * NOTE: This is a production-quality shell during Phase 1.
 * The full visual design (animations, entrance, audio) is built in Phase 3.
 * The authentication logic is FULLY IMPLEMENTED here.
 */

import { useState, useRef } from 'react'
import { useAuthStore } from '@/store/auth.store'

export function PasswordGate() {
  const [input,      setInput]      = useState('')
  const [isShaking,  setIsShaking]  = useState(false)
  const [hasError,   setHasError]   = useState(false)
  const inputRef                    = useRef<HTMLInputElement>(null)
  const verify                      = useAuthStore((state) => state.verify)
  const attemptCount                = useAuthStore((state) => state.attemptCount)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const isCorrect = verify(input)

    if (!isCorrect) {
      setHasError(true)
      setIsShaking(true)
      setInput('')

      // Reset shake animation after it completes
      setTimeout(() => setIsShaking(false), 600)

      // Focus input for re-entry
      inputRef.current?.focus()
    }
    // If correct: useAuthStore sets isVerified = true
    // page.tsx re-renders and shows ExperienceRoot automatically
  }

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
      <form
        onSubmit={handleSubmit}
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            'var(--space-3)',
          animation:      isShaking ? 'shake 0.6s var(--ease-breath)' : undefined,
        }}
      >
        <label
          htmlFor="password-input"
          className="text-ui"
          style={{ marginBottom: 'var(--space-2)' }}
        >
          Enter to begin
        </label>

        <input
          ref={inputRef}
          id="password-input"
          type="password"
          inputMode="numeric"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setHasError(false)
          }}
          autoFocus
          autoComplete="off"
          maxLength={20}
          aria-label="Password"
          aria-invalid={hasError}
          aria-describedby={hasError ? 'password-error' : undefined}
          style={{
            background:    'transparent',
            border:        'none',
            borderBottom:  `1px solid ${hasError ? 'var(--color-maroon-glow)' : 'var(--color-text-tertiary)'}`,
            color:         'var(--color-text-primary)',
            fontFamily:    'var(--font-ui)',
            fontSize:      '1.5rem',
            fontWeight:    300,
            letterSpacing: '0.5em',
            textAlign:     'center',
            width:         '8ch',
            padding:       'var(--space-2) 0',
            outline:       'none',
            transition:    `border-color var(--duration-short) var(--ease-breath)`,
          }}
        />

        {hasError && (
          <p
            id="password-error"
            role="alert"
            className="text-ui-sm"
            style={{
              color:   'var(--color-maroon-glow)',
              opacity: 0.8,
            }}
          >
            {attemptCount > 2 ? 'Think carefully.' : 'Try again.'}
          </p>
        )}

        {/* Visually hidden submit — Enter key triggers form */}
        <button type="submit" className="sr-only">
          Submit
        </button>
      </form>

      {/*
       * Inline shake keyframe — isolated here so it doesn't pollute globals.
       * Full animation system is in animations.css for the actual scenes.
       */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}

// Default export for scene lazy loading via scenes.config.ts
export default PasswordGate
