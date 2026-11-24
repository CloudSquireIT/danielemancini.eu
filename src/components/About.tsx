import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import avatar from '../assets/avatar.jpg'
import { ethos } from '../data/cv'

function clampDegree(value: number | null, min: number, max: number) {
  if (value === null) return 0
  return Math.min(max, Math.max(min, value))
}

function matchCoarsePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

function useDeviceOrientation() {
  const tilt = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') {
      return
    }

    let attached = false

    const onDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return
      const targetX = clampDegree(event.gamma, -15, 15) / 15
      const targetY = clampDegree(event.beta, -10, 40) / 50
      tilt.current = {
        x: tilt.current.x * 0.55 + (targetX - tilt.current.x) * 0.45,
        y: targetY,
      }
    }

    const attach = () => {
      if (attached) return
      attached = true
      window.addEventListener('deviceorientation', onDeviceOrientation)
    }

    if (matchCoarsePointer()) {
      const requestPermission = (DeviceOrientationEvent as { requestPermission?: (() => Promise<string>) }).requestPermission
      if (typeof requestPermission === 'function') {
        requestPermission().then((result) => {
          if (result === 'granted') attach()
        }).catch(() => {
          attach()
        })
      } else {
        attach()
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', onDeviceOrientation)
      attached = false
    }
  }, [])

  return tilt.current
}

function cardTiltStyles(
  tiltX: number,
  tiltY: number,
  width: number,
  height: number,
  threshold: number,
) {
  const nx = Math.max(-1, Math.min(1, (tiltX - width / 2) / (width / 2)))
  const ny = Math.max(-1, Math.min(1, (tiltY - height / 2) / (height / 2)))
  const dist = Math.hypot(nx, ny)

  if (dist < threshold) {
    return { transform: 'rotate3d(0, 0, 0, 0deg)', '--glow': '0', '--rim': '0', '--px': '50', '--py': '40' }
  }

  const strength = Math.min(1, (dist - threshold) / (1 - threshold))
  const angleX = nx * 6 * strength
  const angleY = -ny * 6 * strength
  const px = 50 + nx * 30 * strength
  const py = 40 + ny * 20 * strength
  const glow = 35 + 65 * strength
  const rim = 25 + 75 * strength

  return {
    transform: `rotate3d(1, 0, 0, ${angleX}deg) rotate3d(0, 1, 0, ${angleY}deg)`,
    '--glow': `${glow}%`,
    '--rim': `${rim}%`,
    '--px': `${px}%`,
    '--py': `${py}%`,
  }
}

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade' | 'title'

type RevealCardProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: RevealVariant
  ref?: React.Ref<HTMLDivElement>
}

function RevealCard({ children, className = '', delay = 0, variant = 'up', ref }: RevealCardProps) {
  const elementRef = useRef<HTMLDivElement | null>(null)

  // A single callback ref that keeps both the parallax caller's ref and the
  // IntersectionObserver target in sync.
  const combinedRef = useCallbackRef((node: HTMLDivElement | null) => {
    elementRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
  })

  useReveal(elementRef, className, delay, variant)

  return (
    <article
      ref={combinedRef}
      className={`reveal reveal--${variant} ${className}`.trim()}
      style={{ '--delay': `${delay}ms` } as import('react').CSSProperties}
    >
      {children}
    </article>
  )
}

function useReveal(
  elementRef: React.RefObject<HTMLDivElement | null>,
  className: string,
  delay: number,
  variant: RevealVariant,
) {
  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [elementRef, className, delay, variant])
}

function useCallbackRef(callback: (node: HTMLDivElement | null) => void) {
  const callbackRef = useCallback(callback, [callback])
  return callbackRef
}

export default function About() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const pointerTilt = useRef({ x: 0, y: 0 })
  const pointerActive = useRef(false)
  const gyroTilt = useDeviceOrientation()

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerTilt.current = { x: event.clientX, y: event.clientY }
      pointerActive.current = true
    }

    const onPointerLeave = () => {
      pointerActive.current = false
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  useEffect(() => {
    const frames = cardRefs.current
    if (frames.length === 0) return

    let frame = 0
    const loop = () => {
      frame = 0
      for (let i = 0; i < frames.length; i++) {
        const card = frames[i]
        if (!card) continue

        const rect = card.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) continue

        let tiltX: number
        let tiltY: number

        if (pointerActive.current) {
          tiltX = pointerTilt.current.x
          tiltY = pointerTilt.current.y
        } else {
          tiltX = rect.left + rect.width / 2
          tiltY = rect.top + rect.height / 2
        }

        const { transform, '--glow': glow, '--rim': rim, '--px': px, '--py': py } = cardTiltStyles(
          tiltX,
          tiltY,
          rect.width,
          rect.height,
          0.08,
        )

        card.style.transform = transform
        card.style.setProperty('--glow', glow)
        card.style.setProperty('--rim', rim)
        card.style.setProperty('--px', px)
        card.style.setProperty('--py', py)
      }
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => {
      if (frame) cancelAnimationFrame(frame)
    }
  }, [gyroTilt])

  return (
    <section
      id="about"
      className="section section--light"
      data-theme="light"
      aria-labelledby="about-title"
    >
      <div className="section__inner">
        <RevealCard
          className="section__head"
          variant="title"
          ref={(_node) => {
            // Keep the section head out of the parallax set; it is the title
            // rail and should not tilt with the cards.
          }}
        >
          <h2 id="about-title" className="section__title">
            About me
          </h2>
          <p className="section__lede">How I work, and where that comes from.</p>
        </RevealCard>

        <div className="bento-grid">
          {ethos.map((box, index) => (
            <RevealCard
              key={box.title}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className={`bento parallax${box.wide ? ' bento--wide' : ''}${box.accent ? ` bento--${box.accent}` : ''}`}
              delay={index * 70}
              variant={index === 0 ? 'up' : index % 2 === 0 ? 'left' : 'right'}
            >
              {box.wide && index === 0 ? (
                <div className="bento__head">
                  <img src={avatar} alt="" width={400} height={400} />
                  <h3>{box.title}</h3>
                </div>
              ) : (
                <h3>{box.title}</h3>
              )}

              <p>{box.body}</p>

              {box.list ? (
                <ul>
                  {box.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// The default export of this module is the parallax-aware card used in the
// About section. Other components continue to import Reveal from Reveal.tsx.
