import type { CSSProperties } from 'react'
import avatar from '../assets/avatar.jpg'
import { useLang } from '../lib/i18n'
import Typewriter from './Typewriter'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export default function Hero() {
  const { t } = useLang()

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
          {t.hero.role}
        </p>

        <p className="hero__mission" style={delay(380)}>
          <Typewriter text={t.hero.mission} />
        </p>

        <div className="hero__hint rise" style={delay(560)}>
          <span className="mouse" aria-hidden="true" />
          <span>{t.hero.scroll}</span>
        </div>
      </div>
    </header>
  )
}
