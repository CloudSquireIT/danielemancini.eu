import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { LANGS } from '../data/content'
import { useLang } from '../lib/i18n'

/**
 * The pill's language control: a three-stop slider whose knob follows the
 * active language, with the current code and a menu. The knob slides to the
 * stop that matches the choice, so the state reads at a glance on every
 * screen size without spending width on three labels.
 *
 * The menu follows the menu-button pattern it advertises: opening it moves
 * focus to the current language, arrows/Home/End move between the entries with
 * a single tab stop (roving tabindex), Enter or Space picks one, and Escape or
 * Tab closes it and hands focus back to the button.
 */
export default function LanguageSwitch() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

  const index = Math.max(
    0,
    LANGS.findIndex((entry) => entry.code === lang),
  )
  const current = LANGS[index]

  const openMenu = useCallback(
    (at: number) => {
      setFocusIndex(at)
      setOpen(true)
    },
    [],
  )

  // Move focus into the menu once it is rendered, and follow it while the
  // arrow keys walk the entries.
  useEffect(() => {
    if (!open) return
    itemRefs.current[focusIndex]?.focus()
  }, [open, focusIndex])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const choose = (code: typeof lang) => {
    setLang(code)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const onButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    openMenu(index)
  }

  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    const last = LANGS.length - 1
    let next: number | null = null

    if (event.key === 'ArrowDown') next = focusIndex === last ? 0 : focusIndex + 1
    else if (event.key === 'ArrowUp') next = focusIndex === 0 ? last : focusIndex - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last

    if (next !== null) {
      event.preventDefault()
      setFocusIndex(next)
      return
    }

    // Tab leaves the menu: close it and put focus back on the button, which is
    // the menu's own tab stop, so the next Tab continues from the pill.
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
      buttonRef.current?.focus()
    }
  }

  return (
    <div className="langswitch" ref={rootRef} data-open={open}>
      <button
        ref={buttonRef}
        type="button"
        className="langswitch__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.nav.language}: ${current.name}`}
        title={t.nav.chooseLanguage}
        onClick={() => (open ? setOpen(false) : openMenu(index))}
        onKeyDown={onButtonKeyDown}
      >
        <span className="langswitch__rail" aria-hidden="true">
          <span
            className="langswitch__thumb"
            style={{ '--i': index } as CSSProperties}
          />
        </span>
        <span className="langswitch__code">{current.short}</span>
        <svg
          className="langswitch__caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M6 9.6 12 15.4l6-5.8" />
        </svg>
      </button>

      {open ? (
        <ul
          className="langswitch__menu"
          role="menu"
          aria-label={t.nav.chooseLanguage}
          onKeyDown={onMenuKeyDown}
        >
          {LANGS.map((entry, position) => (
            <li key={entry.code} role="none">
              <button
                ref={(node) => {
                  itemRefs.current[position] = node
                }}
                type="button"
                role="menuitemradio"
                aria-checked={entry.code === lang}
                aria-label={entry.name}
                tabIndex={position === focusIndex ? 0 : -1}
                onFocus={() => setFocusIndex(position)}
                onClick={() => choose(entry.code)}
              >
                {entry.short}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
