import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type TypewriterProps = {
  text: string
}

/**
 * Types a line out the first time it scrolls into view, then leaves it alone:
 * once started it runs to the end even if the section moves away, so returning
 * to it does not retype the sentence. The caret keeps blinking behind it.
 */
export default function Typewriter({ text }: TypewriterProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    if (typeof IntersectionObserver === 'undefined') {
      setStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setStarted(true)
        observer.disconnect()
      },
      { threshold: 0.3 },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  // A language switch swaps the sentence: start it over rather than keep a
  // character count that belongs to the previous one.
  useEffect(() => {
    setCount(0)
  }, [text])

  useEffect(() => {
    if (reducedMotion) {
      setCount(text.length)
      return
    }

    if (!started || count >= text.length) return

    // Uneven beats read as typing rather than as a progress bar.
    const timer = window.setTimeout(
      () => setCount((value) => Math.min(text.length, value + 1)),
      42 + (count % 4) * 22,
    )
    return () => window.clearTimeout(timer)
  }, [count, reducedMotion, started, text.length])

  return (
    <span className="typewriter" ref={hostRef}>
      <span className="sr-only">{text}</span>
      <span className="typewriter__line" aria-hidden="true">
        <span className="typewriter__ghost">{text}</span>
        <span className="typewriter__text">
          {text.slice(0, count)}
          <span className="typewriter__caret" />
        </span>
      </span>
    </span>
  )
}
