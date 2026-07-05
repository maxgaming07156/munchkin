/**
 * Auth Store for "For My Munchkin"
 *
 * Manages the password verification state.
 * Persisted to sessionStorage — clears when the tab is closed.
 *
 * Razane can return to the experience by refreshing within the same session
 * without re-entering the password.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { validatePassword } from '@/lib/utils/password'

interface AuthState {
  /** Whether the correct password has been entered this session */
  isVerified: boolean

  /**
   * Number of failed attempts this session.
   * Used to show progressive feedback (not to lock out — this is love, not security).
   */
  attemptCount: number
}

interface AuthActions {
  /**
   * Validates the given password string.
   * @returns true if the password was correct
   */
  verify: (password: string) => boolean

  /**
   * Resets auth state. Only for development use.
   * Never exposed in production UI.
   */
  reset: () => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  isVerified:   false,
  attemptCount: 0,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      verify: (password: string): boolean => {
        const isCorrect = validatePassword(password)

        if (isCorrect) {
          set({ isVerified: true })
        } else {
          set({ attemptCount: get().attemptCount + 1 })
        }

        return isCorrect
      },

      reset: () => {
        set(initialState)
      },
    }),
    {
      name:    'munchkin-auth',
      storage: createJSONStorage(() => sessionStorage),
      // Only persist the verification status — not the attempt count
      partialize: (state) => ({ isVerified: state.isVerified }),
    }
  )
)
