import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Three production builds:
 *  - `vite build`               → dist/, module script + hashed assets (for a normal web server)
 *  - `vite build --mode web`    → dist-web/, one stylesheet, one classic script and a real
 *                                 assets/ folder: opens straight from a disk (file://) and
 *                                 uploads to any host or FTP unchanged
 *  - `vite build --mode single` → dist-single/index.html, a single self-contained file
 */
export default defineConfig(({ mode }) => {
  const single = mode === 'single'
  const web = mode === 'web'

  return {
    base: './',
    plugins: [
      react(),
      ...(single ? [viteSingleFile()] : []),
      ...(web
        ? [
            {
              name: 'file-url-friendly-html',
              // Browsers refuse module scripts and cross-origin stylesheets on
              // file://, and opening from disk is exactly what this build is
              // for. Load the bundle as a classic deferred script and drop the
              // crossorigin attributes so nothing asks for CORS headers a
              // local folder (or a plain FTP host) will not send.
              transformIndexHtml(html: string) {
                return html
                  .replace(/\s+crossorigin(?:="[^"]*")?/g, '')
                  .replace(/<script type="module"/g, '<script defer')
              },
            },
          ]
        : []),
    ],
    build: {
      outDir: single ? 'dist-single' : web ? 'dist-web' : 'dist',
      emptyOutDir: true,
      // Only the single file carries its assets inline; the web build keeps the
      // avatar as a real file so the folder looks like a normal website.
      assetsInlineLimit: single ? 100_000_000 : 0,
      cssCodeSplit: false,
      rollupOptions: {
        output: single
          ? {}
          : {
              ...(web ? { format: 'iife' as const, inlineDynamicImports: true } : {}),
              entryFileNames: 'scripts.js',
              chunkFileNames: 'scripts-[hash].js',
              assetFileNames: (asset) => {
                const names = (asset.names ?? (asset.name ? [asset.name] : [])) as string[]
                if (names.some((name) => name.endsWith('.css'))) return 'styles.css'
                // Plain file names for the uploadable build: readable in an FTP
                // client and stable across releases.
                return web ? 'assets/[name][extname]' : 'assets/[name]-[hash][extname]'
              },
            },
      },
    },
  }
})
