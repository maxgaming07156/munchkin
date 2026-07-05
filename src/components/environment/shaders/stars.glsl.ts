/**
 * Star Field GLSL Shaders — inlined as TypeScript template literals
 *
 * Inlined to avoid any bundler complexity with .glsl imports.
 * The star rendering approach:
 *
 * Vertex: Each point has a unique "phase" attribute (0–2π) driving a slow
 *   sine-wave brightness pulse. Cursor proximity slightly brightens nearby stars.
 *
 * Fragment: Circular points with a soft radial falloff. The center is bright,
 *   edges fade to transparent — creating a natural star bloom effect
 *   without a post-processing pass.
 */

export const starVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aBrightness;

  uniform float uTime;
  uniform vec2  uCursorPosition;   // normalized 0–1
  uniform float uCursorRadius;     // world-space influence radius
  uniform float uGlobalBrightness; // 0.0–1.0 from environment store

  varying float vBrightness;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Slow pulse: each star breathes at its own rhythm
    float pulse = sin(uTime * 0.4 + aPhase) * 0.15 + 0.85;

    // Cursor proximity brightening
    // Convert cursor from normalized to clip space (–1 to 1)
    vec2 cursorClip = uCursorPosition * 2.0 - 1.0;
    vec4 clipPos = projectionMatrix * mvPosition;
    vec2 ndcPos  = clipPos.xy / clipPos.w;
    float dist   = length(ndcPos - cursorClip);
    float cursorInfluence = smoothstep(uCursorRadius, 0.0, dist) * 0.35;

    vBrightness = aBrightness * pulse * uGlobalBrightness + cursorInfluence;
    vAlpha      = vBrightness;

    // Size: base size + cursor-proximity size boost
    float pointSize = aSize * (1.0 + cursorInfluence * 0.8);
    gl_PointSize    = pointSize * (300.0 / -mvPosition.z);
    gl_Position     = clipPos;
  }
`

export const starFragmentShader = /* glsl */ `
  uniform vec3 uColorTint;  // RGB 0–1 driven by color temperature

  varying float vBrightness;
  varying float vAlpha;

  void main() {
    // Circular point: distance from center of gl_PointCoord (0.5, 0.5)
    float dist = length(gl_PointCoord - vec2(0.5));

    // Discard corners — only draw the circle
    if (dist > 0.5) discard;

    // Soft radial falloff: bright center, transparent edges
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;

    // Inner glow: extra brightness at center
    float glow  = smoothstep(0.25, 0.0, dist) * 0.4 * vBrightness;

    vec3 color  = mix(uColorTint, vec3(1.0), glow);

    gl_FragColor = vec4(color, alpha);
  }
`
