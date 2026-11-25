import { useState } from 'react'
import { usePinnedTrack } from '../hooks/usePinnedTrack'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useLang } from '../lib/i18n'
import JobDialog from './JobDialog'
import Reveal from './Reveal'

export default function Experience() {
  const { locale, t } = useLang()
  const jobs = locale.jobs
  const milestones = [
    { label: t.experience.now, left: '0%' },
    { label: '2021', left: '33.33%' },
    { label: '2020', left: '66.66%' },
    { label: '2019', left: '100%' },
  ]
  const reducedMotion = usePrefersReducedMotion()
  const { sectionRef, stickyRef, trackRef, pinned, active, atStart, atEnd, page, onFocusCard, onTrackScroll } =
    usePinnedTrack(reducedMotion)
  const [openJobId, setOpenJobId] = useState<string | null>(null)
  const openJob = jobs.find((job) => job.id === openJobId) ?? null

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section section--dark pin"
      data-pin="true"
      data-pinned={pinned}
      aria-labelledby="experience-title"
    >
      <div className="pin__sticky" ref={stickyRef}>
        <div className="section__inner">
          <Reveal className="section__head" variant="title">
            <h2 id="experience-title" className="section__title">
              {t.experience.title}
            </h2>
            <p className="section__lede">{t.experience.lede}</p>
          </Reveal>

          <Reveal className="pin__body" delay={80} variant="fade">
            <div className="carousel__bar">
              <div className="carousel__btns">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => page(-1)}
                  disabled={atStart}
                  aria-label={t.experience.prev}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => page(1)}
                  disabled={atEnd}
                  aria-label={t.experience.next}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4L13.2 12z" />
                  </svg>
                </button>
              </div>

              <div className="carousel__railwrap">
                <div className="rail">
                  <span className="rail__fill" />
                </div>
                <div className="rail__marks" aria-hidden="true">
                  {milestones.map((milestone) => (
                    <span
                      key={milestone.label}
                      className="rail__mark"
                      style={{ left: milestone.left }}
                    >
                      {milestone.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ul
              className="carousel__track pin__track"
              ref={trackRef}
              onScroll={onTrackScroll}
              onFocusCapture={onFocusCard}
              aria-label={t.experience.track}
            >
              {jobs.map((job, index) => (
                <li className="job" key={job.id} data-active={active === index}>
                  <div>
                    <p className="job__period">{job.period}</p>
                    <h3 className="job__company">{job.company}</h3>
                    <p className="job__summary">{job.summary}</p>
                    <div className="job__tags">
                      {job.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="job__foot">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setOpenJobId(job.id)}
                      aria-haspopup="dialog"
                    >
                      {t.experience.details}
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9.4 6 8 7.4l4.6 4.6L8 16.6 9.4 18l6-6z" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {openJob ? <JobDialog job={openJob} onClose={() => setOpenJobId(null)} /> : null}
    </section>
  )
}
