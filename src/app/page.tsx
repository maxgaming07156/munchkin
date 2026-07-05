/**
 * Root Page — "For My Munchkin"
 *
 * The entry point of the experience.
 * Reads auth state and renders either the password gate or the experience.
 *
 * This is a Client Component because it reads from Zustand stores
 * which rely on browser sessionStorage.
 */

'use client'

import { useAuthStore } from '@/store/auth.store'

// These will be built in Phase 3 and Phase 4.
// For now: minimal shells that confirm the routing works.
import { PasswordGate } from '@/components/scenes/act-1/S01_Password'
import { ExperienceRoot } from '@/components/core/ExperienceRoot'

export default function Home() {
  const isVerified = useAuthStore((state) => state.isVerified)

  return (
    <main>
      {isVerified ? <ExperienceRoot /> : <PasswordGate />}
    </main>
  )
}
