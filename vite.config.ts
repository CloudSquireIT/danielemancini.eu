import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Two production builds:
 *  - `vite build`                → dist/index.html + styles.css + scripts.js
 *  - `vite build --mode single`  → dist-single/index.html, fully self-contained
 */
export default defineConfig(({ mode }) => {
  const single = mode === 'single'

  return {
    base: './',
    plugins: [react(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: single ? 'dist-single' : 'dist',
      emptyOutDir: true,
      // Inline assets (the avatar) in both builds so each release contains
      // only the HTML, one stylesheet and one script.
      assetsInlineLimit: 100_000_000,
      cssCodeSplit: false,
      rollupOptions: {
        output: single
          ? {}
          : {
              entryFileNames: 'scripts.js',
              chunkFileNames: 'scripts-[hash].js',
              assetFileNames: (asset) => {
                const names = (asset.names ?? (asset.name ? [asset.name] : [])) as string[]
                return names.some((name) => name.endsWith('.css'))
                  ? 'styles.css'
                  : 'assets/[name]-[hash][extname]'
              },
            },
      },
    },
  }
})
