import { en } from './locales/en'
import { fr } from './locales/fr'
import { it } from './locales/it'
import type { Lang, Locale } from './locales/types'

export type { Lang, Locale } from './locales/types'

export const LANGS: { code: Lang; short: string; name: string }[] = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'it', short: 'IT', name: 'Italiano' },
  { code: 'fr', short: 'FR', name: 'Français' },
]

export const LOCALES: Record<Lang, Locale> = { en, it, fr }

export function isLang(value: string | null | undefined): value is Lang {
  return value === 'en' || value === 'it' || value === 'fr'
}
