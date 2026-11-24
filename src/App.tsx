import About from './components/About'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Skills from './components/Skills'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSmoothScroll } from './lib/scroll'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  useSmoothScroll(!reducedMotion)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
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
