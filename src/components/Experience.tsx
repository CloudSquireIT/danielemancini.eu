import { useState, type CSSProperties } from 'react'
import { jobs } from '../data/cv'
import { useCarousel } from '../hooks/useCarousel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import JobDialog from './JobDialog'
import Reveal from './Reveal'

const MILESTONES = [
  { label: 'Now', left: '0%' },
  { label: '2021', left: '33.33%' },
  { label: '2020', left: '66.66%' },
  { label: '2019', left: '100%' },
]

export default function Experience() {
  const reducedMotion = usePrefersReducedMotion()
  const { trackRef, progress, active, atStart, atEnd, update, page } =
    useCarousel<HTMLUListElement>(reducedMotion)
  const [openJobId, setOpenJobId] = useState<string | null>(null)
  const openJob = jobs.find((job) => job.id === openJobId) ?? null

  return (
    <section id="experience" className="section section--dark" aria-labelledby="experience-title">
      <div className="section__inner">
        <Reveal className="section__head">
          <h2 id="experience-title" className="section__title">
            Work experience
          </h2>
          <p className="section__lede">
            Six years across enterprise support, classified systems and parliamentary IT.
          </p>
        </Reveal>

        <Reveal className="panel" delay={80}>
          <div className="carousel__bar">
            <div className="carousel__btns">
              <button
                type="button"
                className="icon-btn"
                onClick={() => page(-1)}
                disabled={atStart}
                aria-label="Previous role"
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
                aria-label="Next role"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4L13.2 12z" />
                </svg>
              </button>
            </div>

            <div className="carousel__railwrap">
              <div className="rail">
                <span
                  className="rail__fill"
                  style={{ '--progress': progress } as CSSProperties}
                />
              </div>
              <div className="rail__marks" aria-hidden="true">
                {MILESTONES.map((milestone) => (
                  <span key={milestone.label} className="rail__mark" style={{ left: milestone.left }}>
                    {milestone.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ul
            className="carousel__track"
            ref={trackRef}
            onScroll={update}
            aria-label="Roles, in reverse chronological order"
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
                    Details
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

      {openJob ? <JobDialog job={openJob} onClose={() => setOpenJobId(null)} /> : null}
    </section>
  )
}
