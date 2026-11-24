#!/usr/bin/env node
/**
 * Builds the two release artifacts from an existing build:
 *
 *   artifacts/danielemancini-cv-v0.1.html      self-contained page (CSS + JS + image inlined)
 *   artifacts/danielemancini-cv-v0.1-web.zip   index.html + styles.css + scripts.js
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
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const artifacts = join(root, 'artifacts')
const splitDir = join(root, 'dist')
const singleDir = join(root, 'dist-single')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const version = pkg.version ?? '0.1.0'
const base = `danielemancini-cv-v${version}`

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
writeFileSync(join(artifacts, 'ASSETS.txt'), `${singleOut}\n${zipOut}\n`)

console.log('Release artifacts ready:')
console.log(`  ${base}.html      ${kb(singleOut)}   self-contained`)
console.log(`  ${base}-web.zip   ${kb(zipOut)}   index.html + styles.css + scripts.js`)
