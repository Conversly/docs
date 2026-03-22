import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },

    modules: [
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
    ],

    // @ts-ignore
    nitro: {
        routeRules: {
            '/sw.js': { headers: { 'Cache-Control': 'no-cache' } },
            '/': { redirect: '/getting-started/welcome-to-verlyai' },
        },
    },

    app: {
        head: {
            htmlAttrs: { lang: 'en' },
            meta: [
                { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
                { property: 'og:site_name', content: 'VerlyAI Docs' },
                { property: 'og:locale', content: 'en_US' },
                { name: 'twitter:site', content: '@VerlyAI' },
                { name: 'twitter:creator', content: '@VerlyAI' },
                { name: 'twitter:card', content: 'summary_large_image' },
            ],
            link: [
                { rel: 'preconnect', href: 'https://verlyai.xyz' },
            ],
        },
    },

    // @nuxtjs/sitemap v7 config
    sitemap: {
        siteUrl: 'https://docs.verlyai.xyz',
        sources: [
            '/api/__sitemap__/urls',
        ],
    },

    // @nuxtjs/robots v5 config
    robots: {
        groups: [
            {
                userAgent: ['*'],
                allow: ['/'],
                disallow: ['/api/'],
            },
        ],
        sitemap: ['https://docs.verlyai.xyz/sitemap.xml'],
    },

    colorMode: {
        preference: 'dark',
    },
})
