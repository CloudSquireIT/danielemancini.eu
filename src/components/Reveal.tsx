import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'ul' | 'li'
}

/** Fades an element in once, the first time it enters the viewport. */
export default function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
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
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
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
      className={`reveal ${className}`.trim()}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  )
}
