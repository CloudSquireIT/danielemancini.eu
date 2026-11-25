import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { isLang, LOCALES, type Lang, type Locale } from '../data/content'
import { detectLanguage, langForCountry, readGeoCountry } from './geo'

export const LANG_STORAGE_KEY = 'dm-cv-lang'

type LangContextValue = {
  lang: Lang
  locale: Locale
  /** Shorthand for the locale's interface strings. */
  t: Locale['ui']
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

function storedChoice(): Lang | null {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    /* Private mode blocks storage; the site still works, it just forgets. */
  }
  return null
}

/**
 * First render: a language the visitor picked beats a country detected in the
 * last 30 days, which beats English. Reading the cache synchronously means a
 * returning visitor never sees the page flip language after load.
 */
function initialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const chosen = storedChoice()
  if (chosen) return chosen
  const country = readGeoCountry()
  return country ? langForCountry(country) : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const chosenRef = useRef<Lang | null>(
    typeof window === 'undefined' ? null : storedChoice(),
  )

  const setLang = useCallback((next: Lang) => {
    chosenRef.current = next
    setLangState(next)
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      /* Ignored: storage is an enhancement, not a requirement. */
    }
  }, [])

  // IP-based default for visitors who have not chosen a language and whose
  // country is not cached yet. It never overrides a manual choice, including
  // one made while the lookup is still in flight.
  useEffect(() => {
    if (chosenRef.current || readGeoCountry()) return

    const controller = new AbortController()
    let cancelled = false

    detectLanguage(controller.signal)
      .then((result) => {
        if (cancelled || !result || chosenRef.current) return
        setLangState(result.lang)
      })
      .catch(() => {
        /* No detection: English stays. */
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  const locale = LOCALES[lang]

  // The document language drives hyphenation, screen-reader pronunciation and
  // the browser's translate prompt, so it follows the switcher.
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = locale.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', locale.meta.description)
  }, [lang, locale])

  const value = useMemo(
    () => ({ lang, locale, t: locale.ui, setLang }),
    [lang, locale, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const value = useContext(LangContext)
  if (!value) throw new Error('useLang must be used inside <LangProvider>')
  return value
}
