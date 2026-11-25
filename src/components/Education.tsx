import { useLang } from '../lib/i18n'
import Reveal from './Reveal'

const DIRECTIONS = ['left', 'right'] as const

export default function Education() {
  const { locale, t } = useLang()

  return (
    <section id="education" className="section section--dark" aria-labelledby="education-title">
      <div className="section__inner">
        <Reveal className="section__head" variant="title">
          <h2 id="education-title" className="section__title">
            {t.education.title}
          </h2>
        </Reveal>

        <div className="edu-grid">
          {locale.education.map((entry, index) => (
            <Reveal
              key={entry.title}
              as="article"
              className="edu-card"
              variant={DIRECTIONS[index % DIRECTIONS.length]}
              delay={index * 90}
            >
              <div>
                <span className="badge">{entry.badge}</span>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </div>
              <p className="edu-card__org">{entry.institution}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
