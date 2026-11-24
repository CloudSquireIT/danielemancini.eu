import { certifications } from '../data/cv'
import { useCarousel } from '../hooks/useCarousel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import Reveal from './Reveal'

export default function Certifications() {
  const reducedMotion = usePrefersReducedMotion()
  const { trackRef, atStart, atEnd, update, page } = useCarousel<HTMLUListElement>(reducedMotion)

  return (
    <section
      id="certifications"
      className="section section--light"
      data-theme="light"
      aria-labelledby="certifications-title"
    >
      <div className="section__inner">
        <Reveal className="section__head">
          <h2 id="certifications-title" className="section__title">
            Certifications
          </h2>
          <p className="section__lede">
            Recognised standards and continuous learning, from ITIL to NATO cyber defence.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="carousel__bar" style={{ marginTop: 'clamp(24px, 4vw, 36px)' }}>
            <div className="carousel__btns">
              <button
                type="button"
                className="icon-btn icon-btn--light"
                onClick={() => page(-1)}
                disabled={atStart}
                aria-label="Previous certifications"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
                </svg>
              </button>
              <button
                type="button"
                className="icon-btn icon-btn--light"
                onClick={() => page(1)}
                disabled={atEnd}
                aria-label="Next certifications"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4L13.2 12z" />
                </svg>
              </button>
            </div>
          </div>

          <ul
            className="cert-track"
            ref={trackRef}
            onScroll={update}
            aria-label="Certifications, newest first"
          >
            {certifications.map((certification) => (
              <li
                className={`cert${certification.featured ? ' cert--featured' : ''}`}
                key={certification.title}
              >
                <div>
                  <p className="cert__date">{certification.date}</p>
                  <p className="cert__issuer">{certification.issuer}</p>
                  <h3>{certification.title}</h3>
                </div>
                <p>{certification.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
