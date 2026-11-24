import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Job } from '../data/cv'

type JobDialogProps = {
  job: Job
  onClose: () => void
}

export default function JobDialog({ job, onClose }: JobDialogProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const sheet = sheetRef.current
    sheet?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !sheet) return

      const focusable = sheet.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="dialog">
      <button
        type="button"
        className="dialog__backdrop"
        aria-label="Close role details"
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        className="dialog__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-dialog-title"
        tabIndex={-1}
        ref={sheetRef}
      >
        <button type="button" className="dialog__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" />
          </svg>
        </button>

        <p className="dialog__period">{job.period}</p>
        <h2 className="dialog__title" id="job-dialog-title">
          {job.company}
        </h2>

        <div className="dialog__body">
          <p>{job.intro}</p>
          <ul>
            {job.bullets.map(([title, detail]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  )
}
