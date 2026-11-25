import type { Certification, EducationEntry, EthosBox, Job } from '../cv'

export type Lang = 'en' | 'it' | 'fr'

export type Ui = {
  skip: string
  hero: { role: string; mission: string; scroll: string }
  nav: {
    sections: string
    experience: string
    education: string
    skills: string
    certifications: string
    about: string
    contact: string
    language: string
    chooseLanguage: string
  }
  experience: {
    title: string
    lede: string
    prev: string
    next: string
    track: string
    details: string
    now: string
  }
  education: { title: string }
  skills: {
    title: string
    lede: string
    languagesTitle: string
    languagesLede: string
    proficiency: string
  }
  certifications: { title: string; lede: string; prev: string; next: string; track: string }
  about: { title: string; lede: string }
  footer: { title: string; lede: string; print: string; printHint: string; rights: string }
  dialog: { close: string; closeDetails: string }
  privacy: {
    link: string
    title: string
    updated: string
    sections: { title: string; body: string }[]
  }
}

export type Copy = {
  meta: { title: string; description: string }
  ui: Ui
  jobs: Job[]
  education: EducationEntry[]
  skillRows: string[][]
  languages: { name: string; level: string; value: number }[]
  certifications: Certification[]
  ethos: EthosBox[]
}

/** The three locales, in the order the slider lists them. */
export type Locale = Copy
