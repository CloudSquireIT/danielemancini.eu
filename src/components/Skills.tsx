import type { CSSProperties } from 'react'
import { languages, skillRows } from '../data/cv'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section id="skills" className="section section--tint" aria-labelledby="skills-title">
      <div className="section__inner">
        <Reveal className="section__head" variant="title">
          <h2 id="skills-title" className="section__title">
            Technical skills
          </h2>
          <p className="section__lede">Enterprise-grade tools, systems and technical capabilities.</p>
        </Reveal>

        {skillRows.map((row, rowIndex) => (
          <Reveal
            key={rowIndex}
            className={`marquee${rowIndex === 1 ? ' marquee--reverse' : ''}`}
            variant={rowIndex === 0 ? 'left' : 'right'}
            delay={rowIndex * 80}
          >
            <div className="marquee__track">
              <div className="marquee__group">
                {row.map((skill) => (
                  <span className="pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
              <div className="marquee__group" aria-hidden="true">
                {row.map((skill) => (
                  <span className="pill" key={`${skill}-copy`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal className="section__head" delay={60} variant="title">
          <h2 className="section__title" style={{ marginTop: 'clamp(40px, 6vw, 64px)' }}>
            Language proficiency
          </h2>
          <p className="section__lede">International multilingual communication.</p>
        </Reveal>

        <div className="lang-grid">
          {languages.map((language, index) => (
            <Reveal
              key={language.name}
              className="lang"
              variant={index === 1 ? 'up' : index === 0 ? 'left' : 'right'}
              delay={index * 80}
            >
              <div className="lang__top">
                <span className="lang__name">{language.name}</span>
                <span className="lang__level">{language.level}</span>
              </div>
              <div
                className="lang__bar"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={language.value}
                aria-label={`${language.name} proficiency`}
              >
                <div
                  className="lang__fill"
                  style={{ '--value': `${language.value}%` } as CSSProperties}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
