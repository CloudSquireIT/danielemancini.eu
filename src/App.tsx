import { useEffect } from 'react'
import About from './components/About'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Skills from './components/Skills'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { startAnalytics } from './lib/analytics'
import { useLang } from './lib/i18n'
import { useSmoothScroll } from './lib/scroll'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  const { t } = useLang()
  useSmoothScroll(!reducedMotion)

  // Cookieless traffic measurement, and only when a token is configured.
  useEffect(() => {
    startAnalytics()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <About />
      </main>

      <Contact />
    </>
  )
}
