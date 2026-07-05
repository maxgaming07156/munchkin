/**
 * useTypewriter — A precise typewriter state machine hook.
 *
 * Drives the Opening Cinematic sequence. Each "sequence" types text,
 * pauses, optionally deletes, then proceeds to the next.
 *
 * State machine:
 *   IDLE → TYPING → PAUSING → DELETING → GAP → TYPING (loop)
 *   Last sequence with deleteAll: false → PAUSING → COMPLETE
 *
 * Usage:
 *   const { displayedText, isComplete } = useTypewriter(sequences, onComplete)
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import type { TypewriterSequence } from '@/types/animation.types'

type MachineState = 'idle' | 'typing' | 'pausing' | 'deleting' | 'gap' | 'complete'

interface UseTypewriterReturn {
  displayedText:  string
  isComplete:     boolean
  sequenceIndex:  number
  machineState:   MachineState
}

export function useTypewriter(
  sequences: readonly TypewriterSequence[],
  onComplete?: () => void,
  autoStart = true,
): UseTypewriterReturn {
  const [displayedText,  setDisplayedText]  = useState('')
  const [sequenceIndex,  setSequenceIndex]  = useState(0)
  const [machineState,   setMachineState]   = useState<MachineState>(autoStart ? 'typing' : 'idle')

  // Stable ref for onComplete — avoids stale closure in timeouts
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  // Current character position in the typing/deleting pass
  const charIndexRef = useRef(0)

  // When autoStart becomes true (deferred start), transition from idle to typing
  useEffect(() => {
    if (autoStart && machineState === 'idle') {
      setMachineState('typing')
    }
  }, [autoStart, machineState])

  const advance = useCallback(() => {
    const seq = sequences[sequenceIndex]
    if (!seq) return

    switch (machineState) {

      case 'typing': {
        if (charIndexRef.current < seq.text.length) {
          // Type the next character
          charIndexRef.current++
          setDisplayedText(seq.text.slice(0, charIndexRef.current))
        } else {
          // Typing done — pause before deciding to delete or complete
          setMachineState('pausing')
        }
        break
      }

      case 'pausing': {
        // After pause: delete or complete
        if (seq.deleteAll) {
          setMachineState('deleting')
        } else {
          // This is the last sequence — it's complete
          setMachineState('complete')
          onCompleteRef.current?.()
        }
        break
      }

      case 'deleting': {
        if (charIndexRef.current > 0) {
          charIndexRef.current--
          setDisplayedText(seq.text.slice(0, charIndexRef.current))
        } else {
          // Deletion done — brief gap then next sequence
          setMachineState('gap')
        }
        break
      }

      case 'gap': {
        // Move to next sequence
        charIndexRef.current = 0
        setSequenceIndex((i) => i + 1)
        setMachineState('typing')
        break
      }
    }
  }, [machineState, sequenceIndex, sequences])

  useEffect(() => {
    if (machineState === 'idle' || machineState === 'complete') return

    const seq = sequences[sequenceIndex]
    if (!seq) return

    let delay: number

    switch (machineState) {
      case 'typing':   delay = seq.typeSpeed   ?? 65;  break
      case 'pausing':  delay = seq.pauseAfter  ?? 1200; break
      case 'deleting': delay = seq.deleteSpeed ?? 35;  break
      case 'gap':      delay = 350;                    break
      default:         delay = 65
    }

    const timer = setTimeout(advance, delay)
    return () => clearTimeout(timer)
  }, [machineState, sequenceIndex, advance, sequences, displayedText])

  return {
    displayedText,
    isComplete:    machineState === 'complete',
    sequenceIndex,
    machineState,
  }
}
