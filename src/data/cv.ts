export type Job = {
  id: string
  company: string
  shortCompany: string
  period: string
  summary: string
  tags: string[]
  intro: string
  bullets: Array<[title: string, detail: string]>
}

export type Certification = {
  date: string
  issuer: string
  title: string
  description: string
  featured?: boolean
}

export type EducationEntry = {
  badge: string
  title: string
  description: string
  institution: string
}

export type EthosBox = {
  title: string
  body: string
  list?: string[]
  wide?: boolean
  accent?: 'blue' | 'ink'
}

export const contact = {
  email: 'contact@danielemancini.eu',
  linkedin: 'https://be.linkedin.com/in/danimanci',
  site: 'https://www.danielemancini.eu',
}
