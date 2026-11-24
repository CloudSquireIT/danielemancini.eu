import { useCallback, useEffect, useRef, useState } from 'react'
import { navOffset, scrollToSection } from '../lib/scroll'

const LINKS = [
  { id: 'experience', short: 'Work', long: 'Experience' },
  { id: 'education', short: 'Edu', long: 'Education' },
  { id: 'skills', short: 'Skills', long: 'Skills' },
  { id: 'certifications', short: 'Certs', long: 'Certifications' },
  { id: 'about', short: 'About', long: 'About' },
  { id: 'contact', short: 'Contact', long: 'Contact' },
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

      const probeY = navOffset()
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
      const line = Math.round(window.innerHeight * 0.34)
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
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault()
                manualRef.current = { id: link.id, until: performance.now() + 1200 }
                setActive(link.id)
                scrollToSection(link.id)
              }}
            >
              <span className="nav__long">{link.long}</span>
              <span className="nav__short">{link.short}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
