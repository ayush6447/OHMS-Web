import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { cssVarsStylesheet } from './src/theme/tokens.ts'

/** Inlines the theme tokens as CSS custom properties so the first paint is already on-brand. */
function omhsTokens(): Plugin {
  return {
    name: 'omhs-tokens',
    transformIndexHtml: {
      order: 'pre',
      handler: () => [
        {
          tag: 'style',
          attrs: { id: 'omhs-tokens' },
          children: cssVarsStylesheet(),
          injectTo: 'head-prepend',
        },
      ],
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), omhsTokens()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        // Long-lived vendor chunks so app changes don't bust the framework cache.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'gsap', test: /node_modules[\\/](gsap|@gsap|lenis)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/ },
          ],
        },
      },
    },
  },
})
