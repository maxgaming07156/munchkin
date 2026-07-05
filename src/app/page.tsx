'use client'

/**
 * Root Page — "For My Munchkin"
 *
 * Manages the top-level application state machine:
 *
 *   loading → gate (if not verified)
 *          → experience (if already verified this session)
 *
 *   gate → experience (after correct password)
 *
 *   experience → (managed internally by ExperienceRoot)
 *
 * The loading screen always plays on first render — it's the
 * entrance into the universe, regardless of auth state.
 */

import { useState, useCallback } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { LoadingScreen } from '@/components/scenes/act-1/S00_Loading'
import { PasswordGate }  from '@/components/scenes/act-1/S01_Password'
import { ExperienceRoot } from '@/components/core/ExperienceRoot'

type AppState = 'loading' | 'gate' | 'experience'

export default function Home() {
  const isVerified = useAuthStore((s) => s.isVerified)
  const [appState, setAppState] = useState<AppState>('loading')

  // Called when the loading animation completes (~2.6s)
  const handleLoadingComplete = useCallback(() => {
    // If already verified (same session), skip the gate
    setAppState(isVerified ? 'experience' : 'gate')
  }, [isVerified])

  // Called when the correct password is entered
  const handleVerified = useCallback(() => {
    setAppState('experience')
  }, [])

  if (appState === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  if (appState === 'gate') {
    return <PasswordGate onVerified={handleVerified} />
  }

  return <ExperienceRoot />
}
