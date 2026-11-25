/**
 * Deployment settings. Everything here ends up in the public bundle, so no
 * secrets belong in this file.
 *
 * Traffic measurement is opt-in: with both values empty the site loads no
 * analytics at all, which is also what the privacy policy describes.
 */
export const ANALYTICS = {
  /**
   * Cloudflare Web Analytics token (Cloudflare dashboard → Web Analytics →
   * add the site, then copy the token from the snippet). Cookieless, no
   * fingerprinting, no consent banner needed.
   */
  cloudflareToken: '',

  /**
   * Optional alternative: a Plausible domain, e.g. 'danielemancini.eu'.
   * Leave empty unless you use Plausible instead of Cloudflare.
   */
  plausibleDomain: '',
}
