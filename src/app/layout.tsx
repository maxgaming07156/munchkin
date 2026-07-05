/**
 * Root Layout for "For My Munchkin"
 *
 * Server Component — handles:
 *   - Font loading via next/font (zero layout shift, self-hosted)
 *   - HTML structure and meta tags
 *   - CSS variable injection for fonts
 *   - Core provider mounting
 *
 * Fonts loaded:
 *   - Cormorant (Display) — 300 weight
 *   - Cormorant Garamond (Body) — 400, 400 italic
 *   - Inter (UI only) — 300 weight — deferred
 *   - JetBrains Mono (Opening Cinematic only) — 400 — deferred
 */

import type { Metadata } from 'next'
import { Cormorant, Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/core/Providers'
import './globals.css'

// ─── Font Definitions ─────────────────────────────────────────────────────────

const cormorant = Cormorant({
  subsets:  ['latin', 'latin-ext'],
  weight:   ['300', '400'],
  style:    ['normal'],
  display:  'swap',
  preload:  true,     // Preloaded — primary display font
  variable: '--font-display-loaded',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets:  ['latin', 'latin-ext'],
  weight:   ['400'],
  style:    ['normal', 'italic'],
  display:  'swap',
  preload:  true,     // Preloaded — primary body font
  variable: '--font-body-loaded',
})

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300'],
  display:  'swap',
  preload:  false,    // Deferred — only for password input and audio toggle
  variable: '--font-ui-loaded',
})

const jetBrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  weight:   ['400'],
  display:  'swap',
  preload:  false,    // Deferred — only used in the Opening Cinematic
  variable: '--font-mono-loaded',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // Intentionally minimal — this experience is not indexed
  title:       'For My Munchkin',
  description: 'A private memory.',
  robots: {
    index:  false,   // Do not index
    follow: false,
  },
  // No Open Graph — this is not meant to be shared
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={[
        cormorant.variable,
        cormorantGaramond.variable,
        inter.variable,
        jetBrainsMono.variable,
      ].join(' ')}
    >
      <head>
        {/* Prevent zooming on mobile — this is a designed experience */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/* Preconnect to Google Fonts CDN (used by next/font) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/*
         * Grain overlay — fixed texture, rendered below all content.
         * Implemented in CSS (globals.css #grain-overlay) for performance.
         * No JavaScript needed.
         */}
        <div id="grain-overlay" role="presentation" aria-hidden="true" />

        {/*
         * Providers — mounts Lenis, GSAP, Framer Motion.
         * Client Component boundary.
         */}
        <Providers>
          {/*
           * The Three.js canvas (EnvironmentCanvas) is mounted inside the
           * experience component, not here. It is lazy-loaded post-password
           * to keep the initial bundle minimal.
           */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
