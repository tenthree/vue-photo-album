import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const BASE_URL = '/vue-photo-album/'

const GTAG_ID = 'G-FLRD83MW2R'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: BASE_URL,
  lang: 'en-US',
  title: "Vue Photo Album",
  description: "Responsive photo gallery for Vue3",

  head: [
    ['link', { rel: 'icon', href: `${BASE_URL}/favicon.svg` }],
    [
      'script',
      { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}` }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GTAG_ID}');`
    ]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/get-started' },
      { text: 'Use Cases', link: '/use-cases/with-photoswipe' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide/get-started' },
          { text: 'Layouts', link: '/guide/layouts' },
          { text: 'Properties', link: '/guide/properties' },
          { text: 'Events', link: '/guide/events' },
          { text: 'Custom Renderers', link: '/guide/custom-renderers' }
        ]
      },
      {
        text: 'Use Cases',
        items: [
          { text: 'With PhotoSwipe', link: '/use-cases/with-photoswipe' },
          { text: 'With NuxtImage', link: '/use-cases/with-nuxt-image' }
        ]
      },
      {
        text: 'Appendix',
        items: [
          { text: 'Type Definitions', link: '/appendix/type-definitions' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tenthree/vue-photo-album' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Inspired by <a href="https://github.com/igordanchenko" target="_blank" rel="noopener noreferrer">Igor Danchenko</a> / <a href="https://github.com/igordanchenko/react-photo-album" target="_blank" rel="noopener noreferrer">react-photo-album</a>.',
      copyright: '@2024-PRESENT ported by <a href="https://github.com/tenthree" target="_blank" rel="noopener noreferrer">tenthree</a>.'
    }
  },

  markdown: {
    theme: {
      light: 'solarized-light',
      dark: 'catppuccin-mocha'
    }
  },

  vite: {
    server: {
      port: 3000
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      }
    }
  },

  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://tenthree.github.io/vue-photo-album/'
  }
})
