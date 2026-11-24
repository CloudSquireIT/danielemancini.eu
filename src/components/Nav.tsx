import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { navAtBottom, navProbeY, scrollToSection } from '../lib/scroll'

type SectionLink = {
  id: string
  /** Also the link's accessible name: phones show the icon alone. */
  long: string
  /** Drawn with currentColor, so it follows the pill's light and dark themes. */
  icon: ReactNode
}

const LINKS: SectionLink[] = [
  {
    id: 'experience',
    long: 'Experience',
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
  {
    id: 'education',
    long: 'Education',
    icon: (
      <>
        <path d="M21.4 10.9a1 1 0 0 0 0-1.8L12.8 5.2a2 2 0 0 0-1.7 0L2.6 9.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.7 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </>
    ),
  },
  {
    id: 'skills',
    long: 'Skills',
    icon: (
      <>
        <path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3" />
        <path d="M14 2v4M8 10v4M16 18v4" />
      </>
    ),
  },
  {
    id: 'certifications',
    long: 'Certifications',
    icon: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" />
      </>
    ),
  },
  {
    id: 'about',
    long: 'About',
    icon: (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
  {
    id: 'contact',
    long: 'Contact',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-9 5.7a2 2 0 0 1-2 0L2 7" />
      </>
    ),
  },
]

export default function Nav() {
  const [visible, setVisible] = useState(false)
  const [onLight, setOnLight] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const manualRef = useRef<{ id: string; until: number } | null>(null)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * 0.55)

      const probeY = navProbeY()
      let light = false
      document.querySelectorAll<HTMLElement>('[data-theme="light"]').forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom >= probeY) light = true
      })
      setOnLight(light)

      const manual = manualRef.current
      if (manual && performance.now() < manual.until) {
        setActive(manual.id)
        return
      }
      manualRef.current = null

      // Whichever section covers the reading line is the one the page is on.
      // With the pill at the bottom the line follows it down.
      const line = Math.round(window.innerHeight * (navAtBottom() ? 0.7 : 0.34))
      let current: string | null = null
      for (const { id } of LINKS) {
        const section = document.getElementById(id)
        if (!section) continue
        const rect = section.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) {
          current = id
          break
        }
      }
      setActive(current)
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const moveIndicator = useCallback(() => {
    const link = active ? linkRefs.current[active] : null
    const indicator = indicatorRef.current
    if (!indicator) return

    if (!link) {
      indicator.style.opacity = '0'
      return
    }

    indicator.style.width = `${link.offsetWidth}px`
    indicator.style.transform = `translateX(${link.offsetLeft}px)`
    indicator.style.opacity = '1'

    const list = listRef.current
    if (list && list.scrollWidth > list.clientWidth + 2) {
      const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2
      list.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
    }
  }, [active])

  useEffect(() => {
    moveIndicator()
    window.addEventListener('resize', moveIndicator)
    return () => window.removeEventListener('resize', moveIndicator)
  }, [moveIndicator])

  return (
    <nav
      className="nav"
      data-visible={visible}
      data-theme={onLight ? 'light' : 'dark'}
      aria-label="Sections"
    >
      <div className="nav__pill">
        <div className="nav__list" ref={listRef}>
          <span className="nav__indicator" ref={indicatorRef} aria-hidden="true" />
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav__link"
              ref={(node) => {
                linkRefs.current[link.id] = node
              }}
              aria-label={link.long}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault()
                manualRef.current = { id: link.id, until: performance.now() + 1200 }
                setActive(link.id)
                scrollToSection(link.id)
              }}
            >
              <svg
                className="nav__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {link.icon}
              </svg>
              <span className="nav__long">{link.long}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
