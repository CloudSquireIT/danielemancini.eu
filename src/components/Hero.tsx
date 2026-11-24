import { useEffect, useState, type CSSProperties } from 'react'
import avatar from '../assets/avatar.jpg'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import HeroScene from './HeroScene'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setShowScene(false)
      return
    }
    const capable = window.matchMedia('(min-width: 900px) and (pointer: fine)').matches
    setShowScene(capable && supportsWebGL())
  }, [reducedMotion])

  return (
    <header className="hero">
      <div className="hero__glow" aria-hidden="true" />
      {showScene ? <HeroScene /> : null}

      <div className="hero__inner">
        <div className="hero__row rise" style={{ '--delay': '60ms' } as CSSProperties}>
          <img className="hero__avatar" src={avatar} alt="" width={400} height={400} />
          <h1 className="hero__title">Daniele Mancini</h1>
        </div>

        <p className="hero__role rise" style={{ '--delay': '220ms' } as CSSProperties}>
          IT Expert, Classified Systems &amp; VIP IT Support
        </p>

        <p className="hero__mission rise" style={{ '--delay': '380ms' } as CSSProperties}>
          <strong>Computer lover since I was a child.</strong> Devoted to IT and newer technologies,
          for a smarter and more secure digital world.
        </p>

        <div className="hero__hint rise" style={{ '--delay': '560ms' } as CSSProperties}>
          <span className="mouse" aria-hidden="true" />
          <span>Scroll for more</span>
        </div>
      </div>
    </header>
  )
}
