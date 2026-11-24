import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToId } from '../lib/scroll'

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
  const [active, setActive] = useState('experience')
  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * 0.55)

      const probeY = 96
      const lightSections = document.querySelectorAll<HTMLElement>('[data-theme="light"]')
      let light = false
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom >= probeY) light = true
      })
      setOnLight(light)

      let current = ''
      LINKS.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.top <= 140 && rect.bottom > 140) current = id
      })
      if (current) setActive(current)
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
    const link = linkRefs.current[active]
    const indicator = indicatorRef.current
    if (!link || !indicator) return

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
                setActive(link.id)
                scrollToId(link.id)
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
