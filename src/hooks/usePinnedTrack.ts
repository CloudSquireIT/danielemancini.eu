import { useCallback, useEffect, useRef, useState, type FocusEvent } from 'react'
import { scrollToY } from '../lib/scroll'

type TrackMetrics = {
  distance: number
  offsets: number[]
  widths: number[]
  count: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Below this viewport height the pin cannot frame a card, so it stays a rail. */
const SHORT_VIEWPORT = 460

/**
 * Drives a carousel from the page scroll: the section pins for one viewport plus
 * the width the cards overflow by, and vertical scrolling translates the track
 * sideways until the last card is in view. Nothing is scroll-jacked — the browser
 * keeps its own scrolling, so touch, keyboards and the pin stay in sync.
 *
 * With reduced motion the section is not pinned and the track keeps native
 * horizontal scrolling instead.
 */
export function usePinnedTrack(reducedMotion: boolean) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLUListElement | null>(null)

  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [shortViewport, setShortViewport] = useState(
    () => typeof window !== 'undefined' && window.innerHeight < SHORT_VIEWPORT,
  )

  const activeRef = useRef(0)
  const metrics = useRef<TrackMetrics>({ distance: 0, offsets: [], widths: [], count: 0 })
  // A landscape phone has no room for a card plus a pinned viewport, so it gets
  // the native horizontal rail instead — same as reduced motion.
  const pinned = !reducedMotion && !shortViewport

  const setIndex = useCallback((index: number) => {
    if (index === activeRef.current) return
    activeRef.current = index
    setActive(index)
  }, [])

  const measure = useCallback(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Measured px rather than svh: the pin has to agree with the real viewport
    // even after a resize or a mobile toolbar collapse.
    section.style.setProperty('--pin-viewport', `${window.innerHeight}px`)

    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return

    const first = cards[0].getBoundingClientRect()
    const viewport = track.clientWidth
    const offsets = cards.map((card) => card.getBoundingClientRect().left - first.left)
    const widths = cards.map((card) => card.getBoundingClientRect().width)
    const last = cards.length - 1

    // Travel until the final card sits at the right end of the rail, inset just
    // enough to clear the edge fade. Centring it would leave a rail-width of
    // empty space to its right; stopping at the geometric edge would leave the
    // card at the left edge with the whole rail empty beside it.
    const inset = Math.min(48, Math.max(12, viewport * 0.035))
    const tail = Math.max(0, viewport - (widths[last] ?? 0) - inset)
    const distance = Math.max(0, Math.round((offsets[last] ?? 0) - tail))

    metrics.current = { distance, offsets, widths, count: cards.length }
    section.style.setProperty('--pin-distance', `${distance}px`)
  }, [])

  const applyProgress = useCallback(
    (progress: number) => {
      const sticky = stickyRef.current
      const track = trackRef.current
      if (!sticky || !track) return

      const { distance, count } = metrics.current
      const exhausted = distance <= 0
      const value = exhausted ? 0 : clamp(progress, 0, 1)

      sticky.style.setProperty('--pin-p', value.toFixed(4))
      if (pinned) track.style.transform = `translate3d(${(-value * distance).toFixed(2)}px, 0, 0)`

      // Every card owns an equal slice of the pin, so the last one keeps focus
      // for as long as the first instead of flashing past at the release point.
      const index = exhausted || count <= 1 ? 0 : clamp(Math.round(value * (count - 1)), 0, count - 1)

      setIndex(index)
      setAtStart(exhausted || value <= 0.001)
      setAtEnd(exhausted || value >= 0.999)
    },
    [pinned, setIndex],
  )

  const readProgress = useCallback(() => {
    const section = sectionRef.current
    const { distance } = metrics.current
    if (!section || distance <= 0) return 0
    return clamp(-section.getBoundingClientRect().top / distance, 0, 1)
  }, [])

  const goToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      const section = sectionRef.current
      const { distance, count } = metrics.current
      if (!track || count === 0) return

      const target = clamp(index, 0, count - 1)

      if (!pinned) {
        const card = track.children[target] as HTMLElement | undefined
        if (!card) return
        const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft
        track.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' })
        return
      }

      if (!section || distance <= 0) return
      // The same slices the page scroll uses, so an arrow lands where the pin would.
      const progress = count > 1 ? target / (count - 1) : 0
      scrollToY(section.getBoundingClientRect().top + window.scrollY + progress * distance)
    },
    [pinned, reducedMotion],
  )

  const page = useCallback(
    (direction: 1 | -1) => {
      goToIndex(activeRef.current + direction)
    },
    [goToIndex],
  )

  /** Keeps an off-screen card from receiving focus without being brought into view. */
  const onFocusCard = useCallback(
    (event: FocusEvent<HTMLUListElement>) => {
      const track = trackRef.current
      const card = (event.target as HTMLElement | null)?.closest('li')
      if (!track || !card) return
      const index = Array.from(track.children).indexOf(card)
      if (index < 0 || index === activeRef.current) return
      goToIndex(index)
    },
    [goToIndex],
  )

  /** Native horizontal scrolling mode (reduced motion). */
  const onTrackScroll = useCallback(() => {
    const track = trackRef.current
    if (!track || pinned) return

    const max = track.scrollWidth - track.clientWidth
    const progress = max > 4 ? clamp(track.scrollLeft / max, 0, 1) : 1
    stickyRef.current?.style.setProperty('--pin-p', progress.toFixed(4))

    const cards = Array.from(track.children) as HTMLElement[]
    let nearest = 0
    let best = Number.POSITIVE_INFINITY
    cards.forEach((card, index) => {
      const delta = Math.abs(card.offsetLeft - cards[0].offsetLeft - track.scrollLeft)
      if (delta < best) {
        best = delta
        nearest = index
      }
    })

    setIndex(nearest)
    setAtStart(max <= 4 || track.scrollLeft <= 4)
    setAtEnd(max <= 4 || track.scrollLeft >= max - 4)
  }, [pinned, setIndex])

  useEffect(() => {
    const onResize = () => setShortViewport(window.innerHeight < SHORT_VIEWPORT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || !pinned) return

    let frame = 0

    const sync = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        applyProgress(readProgress())
      })
    }

    const remeasure = () => {
      measure()
      applyProgress(readProgress())
    }

    remeasure()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', remeasure)

    const observer = new ResizeObserver(remeasure)
    observer.observe(track)

    const settle = window.setTimeout(remeasure, 400)
    document.fonts?.ready.then(remeasure).catch(() => undefined)
    window.addEventListener('load', remeasure)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.clearTimeout(settle)
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('load', remeasure)
      observer.disconnect()
      track.style.removeProperty('transform')
      section.style.removeProperty('--pin-distance')
      section.style.removeProperty('--pin-viewport')
    }
  }, [applyProgress, measure, pinned, readProgress])

  return {
    sectionRef,
    stickyRef,
    trackRef,
    pinned,
    active,
    atStart,
    atEnd,
    page,
    onFocusCard,
    onTrackScroll,
  }
}
