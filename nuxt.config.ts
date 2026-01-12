import tscondigPaths from 'vite-tsconfig-paths'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true
    }
  },
  features: {
    inlineStyles: true
  },
  vite: {
    plugins: [tscondigPaths()]
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['cpp'],
          theme: 'github-dark'
        }
      }
    }
  },
  modules: ['@primevue/nuxt-module', '@nuxt/image', '@nuxt/content'],
  css: ['~/assets/css/variables.css', 'primeicons/primeicons.css', '~/assets/css/content.css'],
})