/**
 * Scene manifest for "For My Munchkin"
 *
 * This is the complete definition of all 31 scenes in the experience.
 * Each scene is defined once here and automatically rendered by SceneRenderer.
 *
 * To add a scene:
 *   1. Create the component in src/components/scenes/act-N/
 *   2. Add a lazy import below
 *   3. Add an entry to the scenes array
 *   4. No other files need to change
 */

import { lazy } from 'react'
import type { SceneConfig } from '@/types/scene.types'
import { audioFiles } from './audio.config'

// ─── Lazy Scene Imports ───────────────────────────────────────────────────────

// Act 1 — The Universe Before Us
const S00_Loading               = lazy(() => import('@/components/scenes/act-1/S00_Loading'))
const S01_Password              = lazy(() => import('@/components/scenes/act-1/S01_Password'))
const S02_OpeningCinematic      = lazy(() => import('@/components/scenes/act-1/S02_OpeningCinematic'))
const S03_TheBeginning          = lazy(() => import('@/components/scenes/act-1/S03_TheBeginning'))
const S04_TwoStrangers          = lazy(() => import('@/components/scenes/act-1/S04_TwoStrangers'))
const S05_Discord               = lazy(() => import('@/components/scenes/act-1/S05_Discord'))
const S06_Instagram             = lazy(() => import('@/components/scenes/act-1/S06_Instagram'))
const S07_TheDayEverythingChanged = lazy(() => import('@/components/scenes/act-1/S07_TheDayEverythingChanged'))

// Act 2 — Finding Home
const S08_TheGirlIFellInLoveWith = lazy(() => import('@/components/scenes/act-2/S08_TheGirlIFellInLoveWith'))
const S09_TheLittleThings        = lazy(() => import('@/components/scenes/act-2/S09_TheLittleThings'))
const S10_OurInsideJokes         = lazy(() => import('@/components/scenes/act-2/S10_OurInsideJokes'))
const S11_MunchkinAndMunchlax    = lazy(() => import('@/components/scenes/act-2/S11_MunchkinAndMunchlax'))
const S12_Bro                    = lazy(() => import('@/components/scenes/act-2/S12_Bro'))
const S13_ShutUp                 = lazy(() => import('@/components/scenes/act-2/S13_ShutUp'))
const S14_YouRemindingMeToEat    = lazy(() => import('@/components/scenes/act-2/S14_YouRemindingMeToEat'))
const S15_YouMakingEveryoneSafe  = lazy(() => import('@/components/scenes/act-2/S15_YouMakingEveryoneSafe'))

// Act 3 — Growing Together
const S16_TheNightIWasAfraid    = lazy(() => import('@/components/scenes/act-3/S16_TheNightIWasAfraid'))
const S17_WhatYouTaughtMe       = lazy(() => import('@/components/scenes/act-3/S17_WhatYouTaughtMe'))
const S18_WhenYouComfortedMe    = lazy(() => import('@/components/scenes/act-3/S18_WhenYouComfortedMe'))
const S19_ThinkingAboutMyUncle  = lazy(() => import('@/components/scenes/act-3/S19_ThinkingAboutMyUncle'))
const S20_ThankYou              = lazy(() => import('@/components/scenes/act-3/S20_ThankYou'))
const S21_100Reasons            = lazy(() => import('@/components/scenes/act-3/S21_100Reasons'))
const S22_MyVoice               = lazy(() => import('@/components/scenes/act-3/S22_MyVoice'))
const S23_Letters               = lazy(() => import('@/components/scenes/act-3/S23_Letters'))

// Act 4 — Forever
const S24_TheFuture             = lazy(() => import('@/components/scenes/act-4/S24_TheFuture'))
const S25_ThePromises           = lazy(() => import('@/components/scenes/act-4/S25_ThePromises'))
const S26_OurBucketList         = lazy(() => import('@/components/scenes/act-4/S26_OurBucketList'))
const S27_StarsBecomingOne      = lazy(() => import('@/components/scenes/act-4/S27_StarsBecomingOne'))
const S28_TheFinalLetter        = lazy(() => import('@/components/scenes/act-4/S28_TheFinalLetter'))
const S29_IfIHadOneHundredLives = lazy(() => import('@/components/scenes/act-4/S29_IfIHadOneHundredLives'))
const S30_TheEnd                = lazy(() => import('@/components/scenes/act-4/S30_TheEnd'))

// ─── Scene Manifest ───────────────────────────────────────────────────────────

export const scenes: SceneConfig[] = [
  // ── ACT I: The Universe Before Us ──────────────────────────────────────────

  {
    id: 's00-loading',
    slug: 'loading',
    act: 1,
    index: 0,
    title: 'Loading',
    component: S00_Loading,
    transition: 'environmental',
    pinned: false,
    interactionType: 'wait',
    waitDuration: 3500,
    audioLayer3: undefined,
    colorTemperature: 'cool',
  },
  {
    id: 's01-password',
    slug: 'password',
    act: 1,
    index: 1,
    title: 'Password',
    component: S01_Password,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'discover',
    audioLayer3: undefined,
    colorTemperature: 'cool',
  },
  {
    id: 's02-opening-cinematic',
    slug: 'opening-cinematic',
    act: 1,
    index: 2,
    title: 'Opening Cinematic',
    component: S02_OpeningCinematic,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '500vh',
    interactionType: 'wait',
    waitDuration: 26000,    // 26s — the full typing sequence
    audioLayer3: undefined, // Silence during typing. Intent is the cursor sound only.
    colorTemperature: 'cool',
  },
  {
    id: 's03-the-beginning',
    slug: 'the-beginning',
    act: 1,
    index: 3,
    title: 'The Beginning',
    component: S03_TheBeginning,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'cool',
  },
  {
    id: 's04-two-strangers',
    slug: 'two-strangers',
    act: 1,
    index: 4,
    title: '"We Were Just Two Strangers"',
    component: S04_TwoStrangers,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '200vh',
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'cool',
  },
  {
    id: 's05-discord',
    slug: 'discord',
    act: 1,
    index: 5,
    title: 'Discord',
    component: S05_Discord,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: audioFiles.scene.cassetteClick,
    colorTemperature: 'cool',
  },
  {
    id: 's06-instagram',
    slug: 'instagram',
    act: 1,
    index: 6,
    title: 'Instagram',
    component: S06_Instagram,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: audioFiles.scene.cassetteClick,
    colorTemperature: 'cool',
  },
  {
    id: 's07-day-everything-changed',
    slug: 'day-everything-changed',
    act: 1,
    index: 7,
    title: 'The Day Everything Changed',
    component: S07_TheDayEverythingChanged,
    transition: 'vertical-veil',    // Act I → Act II boundary
    pinned: true,
    pinScrollDistance: '300vh',
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'warming',
    isActBoundary: true,
  },

  // ── ACT II: Finding Home ────────────────────────────────────────────────────

  {
    id: 's08-the-girl-i-fell-in-love-with',
    slug: 'the-girl-i-fell-in-love-with',
    act: 2,
    index: 8,
    title: 'The Girl I Fell In Love With',
    component: S08_TheGirlIFellInLoveWith,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,   // Score (Layer 2) begins fading in here
    colorTemperature: 'warm',
  },
  {
    id: 's09-the-little-things',
    slug: 'the-little-things',
    act: 2,
    index: 9,
    title: 'The Little Things',
    component: S09_TheLittleThings,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: audioFiles.scene.paperTurn,
    colorTemperature: 'warm',
  },
  {
    id: 's10-our-inside-jokes',
    slug: 'our-inside-jokes',
    act: 2,
    index: 10,
    title: 'Our Inside Jokes',
    component: S10_OurInsideJokes,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'warm',
  },
  {
    id: 's11-munchkin-and-munchlax',
    slug: 'munchkin-and-munchlax',
    act: 2,
    index: 11,
    title: 'Munchkin & Munchlax',
    component: S11_MunchkinAndMunchlax,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '200vh',
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'warm',
  },
  {
    id: 's12-bro',
    slug: 'bro',
    act: 2,
    index: 12,
    title: '"Bro."',
    component: S12_Bro,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '150vh',
    interactionType: 'wait',
    waitDuration: 3000,
    audioLayer3: undefined,    // Silence moment: Layer 1 dips here
    colorTemperature: 'warm',
  },
  {
    id: 's13-shut-up',
    slug: 'shut-up',
    act: 2,
    index: 13,
    title: '"Shut up."',
    component: S13_ShutUp,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '150vh',
    interactionType: 'wait',
    waitDuration: 3000,
    audioLayer3: undefined,    // Silence moment: Layer 1 dips here
    colorTemperature: 'warm',
  },
  {
    id: 's14-you-reminding-me-to-eat',
    slug: 'you-reminding-me-to-eat',
    act: 2,
    index: 14,
    title: 'You Reminding Me to Eat',
    component: S14_YouRemindingMeToEat,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'warm',
  },
  {
    id: 's15-you-making-everyone-safe',
    slug: 'you-making-everyone-safe',
    act: 2,
    index: 15,
    title: 'You Making Everyone Feel Safe',
    component: S15_YouMakingEveryoneSafe,
    transition: 'vertical-veil',    // Act II → Act III boundary
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'warm',
    isActBoundary: true,
  },

  // ── ACT III: Growing Together ───────────────────────────────────────────────

  {
    id: 's16-the-night-i-was-afraid',
    slug: 'the-night-i-was-afraid',
    act: 3,
    index: 16,
    title: 'The Night I Was Afraid',
    component: S16_TheNightIWasAfraid,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'dual',
  },
  {
    id: 's17-what-you-taught-me',
    slug: 'what-you-taught-me',
    act: 3,
    index: 17,
    title: 'What You Taught Me',
    component: S17_WhatYouTaughtMe,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'dual',
  },
  {
    id: 's18-when-you-comforted-me',
    slug: 'when-you-comforted-me',
    act: 3,
    index: 18,
    title: 'When You Comforted Me',
    component: S18_WhenYouComfortedMe,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'dual',
  },
  {
    id: 's19-thinking-about-my-uncle',
    slug: 'thinking-about-my-uncle',
    act: 3,
    index: 19,
    title: 'Thinking About My Uncle',
    component: S19_ThinkingAboutMyUncle,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '250vh',
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'dual',
  },
  {
    id: 's20-thank-you',
    slug: 'thank-you',
    act: 3,
    index: 20,
    title: 'Thank You',
    component: S20_ThankYou,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '300vh',
    interactionType: 'scroll',
    audioLayer3: undefined,    // Silence moment: Layer 1 dips here
    colorTemperature: 'dual',
  },
  {
    id: 's21-100-reasons',
    slug: '100-reasons',
    act: 3,
    index: 21,
    title: '100 Reasons',
    component: S21_100Reasons,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'dual',
  },
  {
    id: 's22-my-voice',
    slug: 'my-voice',
    act: 3,
    index: 22,
    title: 'My Voice',
    component: S22_MyVoice,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'dual',
  },
  {
    id: 's23-letters',
    slug: 'letters',
    act: 3,
    index: 23,
    title: 'Letters',
    component: S23_Letters,
    transition: 'vertical-veil',    // Act III → Act IV boundary
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: audioFiles.scene.paperRustle,
    colorTemperature: 'dual',
    isActBoundary: true,
  },

  // ── ACT IV: Forever ─────────────────────────────────────────────────────────

  {
    id: 's24-the-future',
    slug: 'the-future',
    act: 4,
    index: 24,
    title: 'The Future',
    component: S24_TheFuture,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'converging',
  },
  {
    id: 's25-the-promises',
    slug: 'the-promises',
    act: 4,
    index: 25,
    title: 'The Promises',
    component: S25_ThePromises,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'converging',
  },
  {
    id: 's26-our-bucket-list',
    slug: 'our-bucket-list',
    act: 4,
    index: 26,
    title: 'Our Bucket List',
    component: S26_OurBucketList,
    transition: 'dissolve',
    pinned: false,
    interactionType: 'scroll',
    audioLayer3: undefined,
    colorTemperature: 'converging',
  },
  {
    id: 's27-stars-becoming-one',
    slug: 'stars-becoming-one',
    act: 4,
    index: 27,
    title: 'Stars Becoming One',
    component: S27_StarsBecomingOne,
    transition: 'environmental',
    pinned: true,
    pinScrollDistance: '400vh',
    interactionType: 'wait',
    waitDuration: 18000,     // 18s — full constellation convergence animation
    audioLayer3: undefined,  // Score reaches peak here. Rain fades out.
    colorTemperature: 'unified',
  },
  {
    id: 's28-the-final-letter',
    slug: 'the-final-letter',
    act: 4,
    index: 28,
    title: 'The Final Letter',
    component: S28_TheFinalLetter,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '350vh',
    interactionType: 'scroll',
    audioLayer3: undefined,   // All layers except solo piano fade out here
    colorTemperature: 'unified',
  },
  {
    id: 's29-if-i-had-one-hundred-lives',
    slug: 'if-i-had-one-hundred-lives',
    act: 4,
    index: 29,
    title: '"If I had one hundred lives..."',
    component: S29_IfIHadOneHundredLives,
    transition: 'dissolve',
    pinned: true,
    pinScrollDistance: '300vh',
    interactionType: 'wait',
    waitDuration: 8000,
    audioLayer3: undefined,
    colorTemperature: 'unified',
  },
  {
    id: 's30-the-end',
    slug: 'the-end',
    act: 4,
    index: 30,
    title: 'The End.',
    component: S30_TheEnd,
    transition: 'environmental',
    pinned: false,
    interactionType: 'wait',
    waitDuration: Infinity,   // The experience stays open. She decides when to leave.
    audioLayer3: undefined,   // Complete silence → then distant rain returns after 8s
    colorTemperature: 'unified',
  },
] as const

// ─── Utility Functions ────────────────────────────────────────────────────────

/** Get a scene by its index. Returns undefined if index is out of range. */
export function getSceneByIndex(index: number): SceneConfig | undefined {
  return scenes[index]
}

/** Get all scenes belonging to a given act */
export function getScenesByAct(act: 1 | 2 | 3 | 4): SceneConfig[] {
  return scenes.filter((scene) => scene.act === act)
}

/** Returns true if the given scene index is the last scene of its act */
export function isActBoundary(index: number): boolean {
  return scenes[index]?.isActBoundary === true
}

/** Returns the total number of scenes */
export const TOTAL_SCENES = scenes.length
