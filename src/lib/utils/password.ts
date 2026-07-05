/**
 * Password validation utility for "For My Munchkin"
 *
 * The password (1708 — Razane's birthday: 17 August) is stored in
 * NEXT_PUBLIC_SITE_PASSWORD in .env.local.
 *
 * Security model:
 * NEXT_PUBLIC_ variables are bundled into client JavaScript. This is acceptable
 * for this private, non-commercial experience — the password protects intimacy,
 * not sensitive data. The experience is not publicly indexed (robots.txt disallows).
 */

/**
 * Validates the given input against the configured site password.
 * Case-insensitive to handle accidental caps lock.
 *
 * @param input - The password entered by the user
 * @returns true if the password matches
 */
export function validatePassword(input: string): boolean {
  const expected = process.env['NEXT_PUBLIC_SITE_PASSWORD']

  if (!expected) {
    // If no password is set in env, fail securely.
    // This prevents the experience from opening accidentally on a misconfigured deployment.
    console.error(
      '[For My Munchkin] NEXT_PUBLIC_SITE_PASSWORD is not set. ' +
        'Please add it to .env.local.'
    )
    return false
  }

  return input.trim().toLowerCase() === expected.trim().toLowerCase()
}

/**
 * Returns true if the password environment variable is configured.
 * Used during development to show a helpful warning.
 */
export function isPasswordConfigured(): boolean {
  return Boolean(process.env['NEXT_PUBLIC_SITE_PASSWORD'])
}
