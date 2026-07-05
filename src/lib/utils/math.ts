/**
 * Math utility functions for "For My Munchkin"
 * Shared mathematical helpers used across animations, Three.js, and cursor logic.
 */

/**
 * Linear interpolation between two values.
 * Used for smooth cursor lerping, animation blending.
 *
 * @param a - Start value
 * @param b - End value
 * @param t - Interpolation factor (0–1)
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Clamps a value between a minimum and maximum.
 *
 * @param value - The value to clamp
 * @param min - Minimum boundary
 * @param max - Maximum boundary
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Maps a value from one range to another.
 * Useful for converting scroll position to animation progress.
 *
 * @param value - The input value
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @param shouldClamp - Whether to clamp the output to [outMin, outMax]
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  shouldClamp = false,
): number {
  const mapped = ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
  return shouldClamp ? clamp(mapped, outMin, outMax) : mapped
}

/**
 * Normalizes a value within a given range to 0–1.
 *
 * @param value - The input value
 * @param min - Range minimum
 * @param max - Range maximum
 */
export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min)
}

/**
 * Rounds a number to a given number of decimal places.
 *
 * @param value - The value to round
 * @param decimals - Number of decimal places (default: 2)
 */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Returns a random float between min (inclusive) and max (exclusive).
 * Used for star positions and particle generation.
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Returns a random element from an array.
 * Typed correctly — preserves the element type.
 */
export function randomFrom<T>(array: readonly T[]): T {
  const index = Math.floor(Math.random() * array.length)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return array[index]!
}

/**
 * Converts degrees to radians.
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Converts radians to degrees.
 */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI)
}

/**
 * Eases a value using a sine curve (smooth step).
 * Input must be 0–1. Output is 0–1.
 * Creates a smooth acceleration and deceleration.
 */
export function smoothStep(t: number): number {
  return t * t * (3 - 2 * t)
}

/**
 * A smoother version of smoothStep with zero first and second derivatives at t=0 and t=1.
 * Input must be 0–1. Output is 0–1.
 */
export function smootherStep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}
