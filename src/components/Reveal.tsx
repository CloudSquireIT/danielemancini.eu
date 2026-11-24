import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade' | 'title'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'ul' | 'li'
  variant?: RevealVariant
}

/**
 * Fades an element in when it enters the viewport and back out when it leaves,
 * so the page closes up again on the way back instead of only ever opening.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  variant = 'up',
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null)

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
  }, [])

  const Component = as as 'div'

  return (
    <Component
      ref={(node: HTMLDivElement | null) => {
        elementRef.current = node
      }}
      className={`reveal reveal--${variant} ${className}`.trim()}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  )
}
