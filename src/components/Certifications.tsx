import { usePinnedTrack } from '../hooks/usePinnedTrack'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useLang } from '../lib/i18n'
import Reveal from './Reveal'

export default function Certifications() {
  const { locale, t } = useLang()
  const reducedMotion = usePrefersReducedMotion()
  const { sectionRef, stickyRef, trackRef, pinned, active, atStart, atEnd, page, onFocusCard, onTrackScroll } =
    usePinnedTrack(reducedMotion)

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section section--light pin"
      data-pin="true"
      data-pinned={pinned}
      data-theme="light"
      aria-labelledby="certifications-title"
    >
      <div className="pin__sticky" ref={stickyRef}>
        <div className="section__inner">
          <Reveal className="section__head" variant="title">
            <h2 id="certifications-title" className="section__title">
              {t.certifications.title}
            </h2>
            <p className="section__lede">{t.certifications.lede}</p>
          </Reveal>

          <Reveal className="pin__body" delay={60} variant="fade">
            <div className="carousel__bar">
              <div className="carousel__btns">
                <button
                  type="button"
                  className="icon-btn icon-btn--light"
                  onClick={() => page(-1)}
                  disabled={atStart}
                  aria-label={t.certifications.prev}
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
                  aria-label={t.certifications.next}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4L13.2 12z" />
                  </svg>
                </button>
              </div>

              <div className="carousel__railwrap">
                <div className="rail rail--light">
                  <span className="rail__fill" />
                </div>
              </div>
            </div>

            <ul
              className="cert-track pin__track"
              ref={trackRef}
              onScroll={onTrackScroll}
              onFocusCapture={onFocusCard}
              aria-label={t.certifications.track}
            >
              {locale.certifications.map((certification, index) => (
                <li
                  className={`cert${certification.featured ? ' cert--featured' : ''}`}
                  key={certification.title}
                  data-active={active === index}
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
      </div>
    </section>
  )
}
