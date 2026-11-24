import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null
let locks = 0

/**
 * Phones and tablets park the pill along the bottom edge instead of the top.
 * The stylesheet owns that breakpoint and publishes the outcome as --nav-dock,
 * so this reads the CSS rather than repeating the media query: the pill cannot
 * sit in one place for the layout and another for the scroll logic.
 */
export function navAtBottom() {
  if (typeof window === 'undefined') return false
  const dock = getComputedStyle(document.documentElement).getPropertyValue('--nav-dock')
  return dock.trim() === 'bottom'
}

/** Height the floating pill nav occupies, so unpinned sections land below it. */
export function navOffset() {
  if (navAtBottom()) return 0
  return window.matchMedia('(max-width: 640px)').matches ? 88 : 96
}

/** Where the pill's tint is sampled — under the pill itself, wherever it sits. */
export function navProbeY() {
  return navAtBottom() ? window.innerHeight - 34 : navOffset()
}

export function scrollToY(top: number) {
  const target = Math.max(0, Math.round(top))
  if (instance) {
    instance.scrollTo(target, { duration: 1.05 })
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
}

/**
 * Scrolls to a section. Pinned sections start their horizontal choreography at
 * their very top edge, so they are targeted exactly; everything else clears the
 * floating nav.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const pinned = el.hasAttribute('data-pin')
  const top = el.getBoundingClientRect().top + window.scrollY - (pinned ? 0 : navOffset())
  scrollToY(top)
}

/** Freezes the page behind the dialog, including Lenis' virtual wheel scroll. */
export function lockPageScroll(lock: boolean) {
  const html = document.documentElement
  locks = Math.max(0, locks + (lock ? 1 : -1))

  if (locks > 0) {
    instance?.stop()
    if (!html.dataset.scrollLocked) {
      const gutter = window.innerWidth - html.clientWidth
      html.dataset.scrollLocked = 'true'
      html.style.overflow = 'hidden'
      if (gutter > 0) document.body.style.paddingRight = `${gutter}px`
    }
    return
  }

  delete html.dataset.scrollLocked
  html.style.overflow = ''
  document.body.style.paddingRight = ''
  instance?.start()
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
    if (locks > 0) lenis.stop()

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
