import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../lib/i18n'
import { lockPageScroll } from '../lib/scroll'

type PrivacyDialogProps = {
  onClose: () => void
}

/**
 * The privacy and cookie statement, in the language of the page. Uses the same
 * sheet as the role details so it inherits the focus trap, Escape handling and
 * scroll lock behaviour.
 */
export default function PrivacyDialog({ onClose }: PrivacyDialogProps) {
  const { t } = useLang()
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

    lockPageScroll(true)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      lockPageScroll(false)
      previouslyFocused?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="dialog" data-lenis-prevent="">
      <button
        type="button"
        className="dialog__backdrop"
        aria-label={t.privacy.title}
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        className="dialog__sheet"
        data-lenis-prevent=""
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        tabIndex={-1}
        ref={sheetRef}
      >
        <div className="dialog__header">
          <div className="dialog__heading">
            <p className="dialog__period">{t.privacy.updated}</p>
            <h2 className="dialog__title" id="privacy-title">
              {t.privacy.title}
            </h2>
          </div>

          <button
            type="button"
            className="dialog__close"
            onClick={onClose}
            aria-label={t.dialog.close}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" />
            </svg>
          </button>
        </div>

        <div className="dialog__body dialog__body--policy">
          {t.privacy.sections.map((section) => (
            <section className="policy" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
