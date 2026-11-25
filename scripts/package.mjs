#!/usr/bin/env node
/**
 * Builds the two release artifacts from existing builds and derives their
 * metadata straight from the files on disk, so the release notes never drift
 * from what was actually built and uploaded.
 *
 *   artifacts/<name>.html        self-contained page (CSS + JS + image inlined)
 *   artifacts/<name>-web.zip     a normal website structure:
 *                                  index.html, styles.css, scripts.js, assets/
 *                                built from the same source as the single file,
 *                                just split up. It opens from a folder on disk
 *                                (classic script, no crossorigin attributes) and
 *                                uploads unchanged to a host or an FTP account.
 *   artifacts/ASSETS.txt         relative paths to the built artifacts (one per line)
 *   artifacts/RELEASE-BODY.md    markdown for the GitHub release, generated from the
 *                                built artifacts + package.json metadata (version, date)
 *
 * Run after `bun run build:web` and `bun run build:single`, or use `bun run release`.
 */
import { execFileSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const artifacts = join(root, 'artifacts')
const webBuild = join(root, 'dist-web')
const singleDir = join(root, 'dist-single')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const version = pkg.version ?? '0.1.0'
const repo = pkg.name ?? 'danielemancini-cv'
const base = `${repo}-v${version}`

const required = [
  [join(webBuild, 'index.html'), 'dist-web/index.html'],
  [join(webBuild, 'styles.css'), 'dist-web/styles.css'],
  [join(webBuild, 'scripts.js'), 'dist-web/scripts.js'],
  [join(singleDir, 'index.html'), 'dist-single/index.html'],
]

for (const [file, label] of required) {
  if (!existsSync(file)) {
    console.error(`Missing ${label}. Run "bun run build:web" and "bun run build:single" first.`)
    process.exit(1)
  }
}

/** Every relative path the built page points at, from HTML, CSS and the bundle. */
function localReferences(dir) {
  const html = readFileSync(join(dir, 'index.html'), 'utf8')
  const css = readFileSync(join(dir, 'styles.css'), 'utf8')
  const js = readFileSync(join(dir, 'scripts.js'), 'utf8')
  const refs = new Set()

  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) refs.add(match[1])
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) refs.add(match[1])
  // Asset URLs land in the bundle as string literals such as "assets/avatar.jpg".
  for (const match of js.matchAll(/["'](assets\/[^"']+)["']/g)) refs.add(match[1])

  return [...refs].filter(
    (ref) => !/^(?:[a-z]+:|\/\/|#|data:)/i.test(ref) && ref.length > 0,
  )
}

function fail(problems) {
  if (problems.length === 0) return
  for (const problem of problems) console.error(`  ✗ ${problem}`)
  process.exit(1)
}

/** Shared sanity checks for the uploadable folder. */
function checkWebBuild(dir) {
  const html = readFileSync(join(dir, 'index.html'), 'utf8')
  const js = readFileSync(join(dir, 'scripts.js'), 'utf8')
  const problems = []

  if (/type="module"/.test(html)) {
    problems.push('index.html still loads a module script, which browsers block on file://')
  }
  if (/\scrossorigin(?:=|\s|>)/.test(html)) {
    problems.push('index.html still has crossorigin attributes, which need CORS headers on file://')
  }
  if (!html.includes('./styles.css')) problems.push('index.html does not link ./styles.css')
  if (!html.includes('./scripts.js')) problems.push('index.html does not load ./scripts.js')
  if (/^\s*(?:import|export)\b/m.test(js)) {
    problems.push('scripts.js is still an ES module instead of a classic script')
  }

  const missing = localReferences(dir).filter((ref) => !existsSync(resolve(dir, ref)))
  for (const ref of missing) problems.push(`index.html/CSS/JS references ${ref}, which is not in the folder`)

  fail(problems)
}

rmSync(artifacts, { recursive: true, force: true })
mkdirSync(artifacts, { recursive: true })

// 1. Single self-contained file.
const singleOut = join(artifacts, `${base}.html`)
cpSync(join(singleDir, 'index.html'), singleOut)

// No external script/style/asset references may survive inlining.
const singleHtml = readFileSync(singleOut, 'utf8')
const external = [...singleHtml.matchAll(/<(?:script|link)[^>]+(?:src|href)="(?!data:)([^"]+)"/g)]
  .map((match) => match[1])
  .filter((url) => !url.startsWith('#'))
if (external.length > 0) {
  console.error(`Single-file build still references external assets: ${external.join(', ')}`)
  process.exit(1)
}

// 2. Web build: html + styles.css + scripts.js + assets/, zipped as-is.
const webDir = join(artifacts, 'web')
cpSync(webBuild, webDir, { recursive: true })
checkWebBuild(webDir)

const zipOut = join(artifacts, `${base}-web.zip`)
rmSync(zipOut, { force: true })
const entries = ['index.html', 'styles.css', 'scripts.js'].filter((name) =>
  existsSync(join(webDir, name)),
)
if (existsSync(join(webDir, 'assets'))) entries.push('assets')

execFileSync('zip', ['-q', '-r', '-X', zipOut, ...entries], { cwd: webDir })

// The zip must open with exactly the files that were checked above.
const zipListing = execFileSync('unzip', ['-Z1', zipOut], { encoding: 'utf8' })
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.endsWith('/'))

const missingInZip = entries
  .filter((entry) => entry !== 'assets')
  .filter((entry) => !zipListing.includes(entry))
fail(missingInZip.map((entry) => `${entry} is missing from the zip`))

// 3. Folder contents, for the release notes.
const webFiles = []
const walk = (dir, prefix = '') => {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) walk(join(dir, entry.name), rel)
    else webFiles.push({ rel, size: statSync(join(dir, entry.name)).size })
  }
}
walk(webDir)
rmSync(webDir, { recursive: true, force: true })

const kb = (file) => `${(statSync(file).size / 1024).toFixed(0)} kB`

// Paths relative to the repo root, so the release body and any upload tooling can
// use them without hard-coding absolute filesystem paths.
const relSingle = relative(root, singleOut)
const relZip = relative(root, zipOut)

writeFileSync(join(artifacts, 'ASSETS.txt'), `${relSingle}\n${relZip}\n`)

// Build release notes from the real built artifacts, not typed by hand.
const isoDate = new Date().toISOString().slice(0, 10)

function sha256File(file) {
  const hash = execFileSync('shasum', ['-a', '256', file], { encoding: 'utf8' }).trim()
  const first = hash.indexOf(' ')
  return hash.slice(0, first === -1 ? undefined : first)
}

const shaSingle = sha256File(singleOut)
const shaZip = sha256File(zipOut)

const lines = [
  `# ${base}`,
  '',
  `Self-contained single-file HTML (${kb(singleOut)}) and a web bundle (${kb(zipOut)}) built from the \`${version}\` tag on \`main\`.`,
  '',
  '## Artifacts',
  '',
  '| Artifact | Size | Path |',
  '| --- | --- | --- |',
  `| ${base}.html | ${kb(singleOut)} | \`${relSingle}\` |`,
  `| ${base}-web.zip | ${kb(zipOut)} | \`${relZip}\` |`,
  '',
  `The zip unzips to a normal website structure and is ready for FTP or any static host — open \`index.html\` from the folder and it works, upload the same folder and it works:`,
  '',
  '```',
  ...webFiles.map((file) => file.rel),
  '```',
  '',
  'Same markup, styles and script as the single file, only split into files: no bundler, no build step, no absolute paths.',
  '',
  '## Checksums (SHA-256)',
  '',
  '```',
  `${shaSingle}  ${relSingle}`,
  `${shaZip}  ${relZip}`,
  '```',
  '',
  'Download URLs (GitHub Releases):',
  '',
  `- \`${base}.html\`: \`https://github.com/CloudSquireIT/danielemancini.eu/releases/download/v${version}/${base}.html\``,
  `- \`${base}-web.zip\`: \`https://github.com/CloudSquireIT/danielemancini.eu/releases/download/v${version}/${base}-web.zip\``,
  '',
  `Built \`${isoDate}\` from the \`v${version}\` tag on \`main\`.`,
]

writeFileSync(join(artifacts, 'RELEASE-BODY.md'), lines.join('\n') + '\n')

console.log('Release artifacts ready:')
console.log(`  ${base}.html      ${kb(singleOut)}   self-contained`)
console.log(`  ${base}-web.zip   ${kb(zipOut)}   ${webFiles.map((file) => file.rel).join(', ')}`)
console.log('  ASSETS.txt        relative artifact paths')
console.log('  RELEASE-BODY.md   generated from built artifacts')
