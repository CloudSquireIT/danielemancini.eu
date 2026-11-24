import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: -88, duration: 1.1 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Smooth wheel scrolling on pointer devices; native scrolling everywhere else. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      instance = null
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    })
    instance = lenis

    let frame = 0
    const loop = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      instance = null
      lenis.destroy()
    }
  }, [enabled])
}
