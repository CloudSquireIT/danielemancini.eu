import type { CSSProperties } from 'react'
import avatar from '../assets/avatar.jpg'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--a" />
        <span className="hero__blob hero__blob--b" />
        <span className="hero__blob hero__blob--c" />
        <span className="hero__grid" />
        <span className="hero__beam" />
      </div>

      <div className="hero__inner">
        <div className="hero__row rise" style={delay(60)}>
          <span className="hero__avatarwrap">
            <img className="hero__avatar" src={avatar} alt="" width={400} height={400} />
          </span>
          <h1 className="hero__title">Daniele Mancini</h1>
        </div>

        <p className="hero__role rise" style={delay(220)}>
          IT Expert, Classified Systems &amp; VIP IT Support
        </p>

        <p className="hero__mission rise" style={delay(380)}>
          <strong>Computer lover since I was a child.</strong> Devoted to IT and newer technologies,
          for a smarter and more secure digital world.
        </p>

        <div className="hero__hint rise" style={delay(560)}>
          <span className="mouse" aria-hidden="true" />
          <span>Scroll for more</span>
        </div>
      </div>
    </header>
  )
}
