import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Shared horizontal-carousel state: scroll progress, nearest card index,
 * edge detection and arrow-key/button paging. Works with native scroll-snap,
 * so touch, trackpads and keyboard all behave like the platform expects.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>(reducedMotion: boolean) {
  const trackRef = useRef<T>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    const max = el.scrollWidth - el.clientWidth
    const ratio = max > 4 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 1
    setProgress(ratio)
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(max <= 4 || el.scrollLeft >= max - 4)

    const trackLeft = el.getBoundingClientRect().left
    const cards = Array.from(el.children) as HTMLElement[]
    let closest = 0
    let closestDistance = Number.POSITIVE_INFINITY
    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = index
      }
    })
    setActive(closest)
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    if (!el) return

    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [update])

  const page = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current
      if (!el) return
      const first = el.children[0] as HTMLElement | undefined
      const gap = Number.parseFloat(getComputedStyle(el).columnGap || '0') || 0
      const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth * 0.85
      el.scrollBy({ left: direction * step, behavior: reducedMotion ? 'auto' : 'smooth' })
    },
    [reducedMotion],
  )

  return { trackRef, progress, active, atStart, atEnd, update, page }
}
