#!/usr/bin/env node
/**
 * Builds the two release artifacts from an existing build and derives their
 * metadata straight from the files on disk, so the release notes never drift
 * from what was actually built and uploaded.
 *
 *   artifacts/<name>.html        self-contained page (CSS + JS + image inlined)
 *   artifacts/<name>-web.zip     index.html + styles.css + scripts.js
 *   artifacts/ASSETS.txt         relative paths to the built artifacts (one per line)
 *   artifacts/RELEASE-BODY.md    markdown for the GitHub release, generated from the
 *                                built artifacts + package.json metadata (version, date)
 *
 * Run after `bun run build` and `bun run build:single`, or use `bun run release`.
 */
import { execFileSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const artifacts = join(root, 'artifacts')
const splitDir = join(root, 'dist')
const singleDir = join(root, 'dist-single')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const version = pkg.version ?? '0.1.0'
const repo = pkg.name ?? 'danielemancini-cv'
const base = `${repo}-v${version}`

const required = [
  [join(splitDir, 'index.html'), 'dist/index.html'],
  [join(splitDir, 'styles.css'), 'dist/styles.css'],
  [join(splitDir, 'scripts.js'), 'dist/scripts.js'],
  [join(singleDir, 'index.html'), 'dist-single/index.html'],
]

for (const [file, label] of required) {
  if (!existsSync(file)) {
    console.error(`Missing ${label}. Run "bun run build" and "bun run build:single" first.`)
    process.exit(1)
  }
}

rmSync(artifacts, { recursive: true, force: true })
mkdirSync(artifacts, { recursive: true })

// 1. Single self-contained file.
const singleOut = join(artifacts, `${base}.html`)
copyFileSync(join(singleDir, 'index.html'), singleOut)

// 2. Split build: html + styles.css + scripts.js at the zip root.
const webDir = join(artifacts, 'web')
mkdirSync(webDir, { recursive: true })
copyFileSync(join(splitDir, 'index.html'), join(webDir, 'index.html'))
copyFileSync(join(splitDir, 'styles.css'), join(webDir, 'styles.css'))
copyFileSync(join(splitDir, 'scripts.js'), join(webDir, 'scripts.js'))

const zipOut = join(artifacts, `${base}-web.zip`)
rmSync(zipOut, { force: true })
execFileSync('zip', ['-q', '-j', '-X', zipOut, 'index.html', 'styles.css', 'scripts.js'], {
  cwd: webDir,
})
rmSync(webDir, { recursive: true, force: true })

// Sanity checks: no external script/style/asset references left behind.
const singleHtml = readFileSync(singleOut, 'utf8')
const external = [...singleHtml.matchAll(/<(?:script|link)[^>]+(?:src|href)="(?!data:)([^"]+)"/g)]
  .map((match) => match[1])
  .filter((url) => !url.startsWith('#'))

if (external.length > 0) {
  console.error(`Single-file build still references external assets: ${external.join(', ')}`)
  process.exit(1)
}

const kb = (file) => `${(statSync(file).size / 1024).toFixed(0)} kB`

// Paths relative to the repo root, so the release body and any upload tooling can
// use them without hard-coding absolute filesystem paths.
const relSingle = relative(root, singleOut)
const relZip = relative(root, zipOut)

writeFileSync(join(artifacts, 'ASSETS.txt'), `${relSingle}\n${relZip}\n`)

// Build release notes from the real built artifacts, not typed by hand.
const isoDate = new Date().toISOString().slice(0, 10)

function sha256File(file) {
  const raw = readFileSync(file)
  const hash = execFileSync('shasum', ['-a', '256', file], { encoding: 'utf8' }).trim()
  const first = hash.indexOf(' ')
  return hash.slice(0, first === -1 ? undefined : first)
}

const shaSingle = sha256File(singleOut)
const shaZip = sha256File(zipOut)

const lines = [
  `# ${base}`,
  '',
  `Self-contained single-file HTML (${kb(singleOut)}) and a split web bundle (${kb(zipOut)}) built from the \`${version}\` tag on \`main\`.`,
  '',
  '## Artifacts',
  '',
  '| Artifact | Size | Path |',
  '| --- | --- | --- |',
  `| ${base}.html | ${kb(singleOut)} | \`${relSingle}\` |`,
  `| ${base}-web.zip | ${kb(zipOut)} | \`${relZip}\` |`,
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
console.log(`  ${base}-web.zip   ${kb(zipOut)}   index.html + styles.css + scripts.js`)
console.log(`  ASSETS.txt        relative artifact paths`)
console.log(`  RELEASE-BODY.md   generated from built artifacts`)
