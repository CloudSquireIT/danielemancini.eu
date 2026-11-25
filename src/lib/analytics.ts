import { ANALYTICS } from '../config'

let started = false

/**
 * Loads the configured traffic counter, if any. Both options are cookieless:
 * no identifier is written to the browser, so the site keeps working without a
 * consent banner. Injected at runtime rather than written into index.html, so
 * the single-file build stays self-contained.
 */
export function startAnalytics() {
  if (started || typeof document === 'undefined') return
  started = true

  const { cloudflareToken, plausibleDomain } = ANALYTICS

  if (cloudflareToken) {
    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: cloudflareToken }))
    document.head.appendChild(script)
  }

  if (plausibleDomain) {
    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://plausible.io/js/script.js'
    script.setAttribute('data-domain', plausibleDomain)
    document.head.appendChild(script)
  }
}
