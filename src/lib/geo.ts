import type { Lang } from '../data/content'

/** Two-letter code of the country detected on the first visit. */
export const GEO_STORAGE_KEY = 'dm-cv-geo'
export const GEO_TTL_MS = 30 * 24 * 60 * 60 * 1000

/** French is the default for these countries. */
const FRENCH_SPEAKING = new Set(['FR', 'BE', 'LU', 'CA', 'MC'])
/** Italian is the default here. */
const ITALIAN_SPEAKING = new Set(['IT', 'SM', 'VA'])

export function langForCountry(country: string | null | undefined): Lang {
  const code = (country ?? '').trim().toUpperCase()
  if (FRENCH_SPEAKING.has(code)) return 'fr'
  if (ITALIAN_SPEAKING.has(code)) return 'it'
  return 'en'
}

type CachedGeo = { c?: string; t?: number }

/** A country detected recently enough to be reused without asking again. */
export function readGeoCountry(): string | null {
  try {
    const raw = window.localStorage.getItem(GEO_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedGeo
    if (!parsed.c || typeof parsed.t !== 'number') return null
    if (Date.now() - parsed.t > GEO_TTL_MS) return null
    return parsed.c
  } catch {
    return null
  }
}

function rememberGeoCountry(country: string) {
  try {
    window.localStorage.setItem(
      GEO_STORAGE_KEY,
      JSON.stringify({ c: country, t: Date.now() } satisfies CachedGeo),
    )
  } catch {
    /* Storage unavailable: the language is still applied for this visit. */
  }
}

/**
 * Asks a public, key-free IP geolocation service for the visitor's country.
 * Both answers are CORS-open; the second is only tried when the first fails.
 * The IP is needed by the service to answer and is never stored here.
 */
async function lookupCountry(signal: AbortSignal): Promise<string | null> {
  const endpoints: Array<{ url: string; read: (data: unknown) => string | null }> = [
    {
      url: 'https://api.country.is/',
      read: (data) => {
        const country = (data as { country?: unknown } | null)?.country
        return typeof country === 'string' ? country : null
      },
    },
    {
      url: 'https://get.geojs.io/v1/ip/country.json',
      read: (data) => {
        const country = (data as { country?: unknown } | null)?.country
        return typeof country === 'string' ? country : null
      },
    },
  ]

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url, {
        signal,
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        cache: 'no-store',
      })
      if (!response.ok) continue
      const country = endpoint.read(await response.json())
      if (country) return country
    } catch (error) {
      if (signal.aborted) return null
      // Try the next provider; a blocked lookup simply means "no detection".
    }
  }

  return null
}

/**
 * Resolves the language for this visit: an explicit choice always wins, then a
 * country cached in the last 30 days, otherwise the network lookup (bounded by
 * a short timeout so a slow provider never holds the page back).
 */
export async function detectLanguage(
  signal: AbortSignal,
): Promise<{ country: string; lang: Lang } | null> {
  const timeout = new AbortController()
  const abort = () => timeout.abort()
  signal.addEventListener('abort', abort)
  const timer = window.setTimeout(abort, 3500)

  try {
    const country = await lookupCountry(timeout.signal)
    if (!country) return null
    rememberGeoCountry(country)
    return { country, lang: langForCountry(country) }
  } finally {
    window.clearTimeout(timer)
    signal.removeEventListener('abort', abort)
  }
}
