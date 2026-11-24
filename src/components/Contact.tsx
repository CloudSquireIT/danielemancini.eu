import { contact } from '../data/cv'
import Reveal from './Reveal'
import Typewriter from './Typewriter'

export default function Contact() {
  return (
    <footer id="contact" className="footer" data-theme="light" aria-labelledby="contact-title">
      <Reveal className="footer__inner" variant="fade">
        <h2 className="footer__title" id="contact-title">
          <Typewriter text={'Let\u2019s connect.'} />
        </h2>
        <p className="footer__lede">
          Reach out for exciting opportunities or a technical conversation.
        </p>

        <div className="footer__actions">
          <a className="btn btn--primary" href={`mailto:${contact.email}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {contact.email}
          </a>

          <a className="btn btn--light" href={contact.linkedin} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            LinkedIn
          </a>

          <button
            type="button"
            className="btn btn--light"
            onClick={() => window.print()}
            aria-describedby="print-hint"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 8H5a3 3 0 0 0-3 3v6h4v4h12v-4h4v-6a3 3 0 0 0-3-3zm-3 11H8v-5h8v5zm3-7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM18 3H6v4h12V3z" />
            </svg>
            Save CV as PDF
          </button>
        </div>

        <p id="print-hint" className="footer__lede" style={{ marginTop: '18px', fontSize: '0.85rem' }}>
          Opens your browser&rsquo;s print dialogue — choose &ldquo;Save as PDF&rdquo;.
        </p>
      </Reveal>

      <p className="footer__bottom">
        &copy; 2026 Daniele Mancini. All rights reserved.
      </p>
    </footer>
  )
}
