import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },

    // Enable Static Site Generation (SSG)
    ssr: true,

    nitro: {
        // Static generation configuration
        preset: 'static',

        // Prerender all routes at build time
        prerender: {
            crawlLinks: true,
            routes: [
                '/',
                '/getting-started/welcome-to-verlyai',
                '/sitemap.xml'
            ],
            ignore: ['/404.html']
        },

        routeRules: {
            '/sw.js': { headers: { 'Cache-Control': 'no-cache' } },
            '/': { redirect: '/getting-started/welcome-to-verlyai' },
            // Cache static assets
            '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }
        },
    },

    // SEO Modules
    modules: [
        '@nuxtjs/sitemap',
        '@nuxtjs/robots'
    ],

    // Sitemap configuration
    // @ts-ignore - Module configuration type augmentation
    sitemap: {
        sources: [
            '/api/__sitemap__/urls'
        ],
        defaultSitemaps: true,
        urls: async () => {
            // Return all your content routes
            const routes = [
                // Getting Started
                { url: '/getting-started/welcome-to-verlyai', priority: 1.0 },
                { url: '/getting-started/best-practices', priority: 0.9 },
                { url: '/getting-started/build-your-first-ai-chatbot', priority: 0.9 },
                { url: '/getting-started/roles-and-permissions', priority: 0.8 },
                // Management
                { url: '/ai-chatbot-management/playground', priority: 0.8 },
                { url: '/ai-chatbot-management/customize', priority: 0.8 },
                { url: '/ai-chatbot-management/behaviour', priority: 0.8 },
                { url: '/ai-chatbot-management/deploy', priority: 0.8 },
                // Knowledge Training
                { url: '/knowledge-training/data-sources', priority: 0.8 },
                { url: '/knowledge-training/actions', priority: 0.8 },
                // Analytics
                { url: '/analytics/statistics', priority: 0.7 },
                { url: '/analytics/topics', priority: 0.7 },
                { url: '/analytics/chats', priority: 0.7 },
                { url: '/analytics/leads', priority: 0.7 },
                // Human Escalations
                { url: '/human-escalations/esclation-analytics', priority: 0.7 },
                { url: '/human-escalations/live-inbox', priority: 0.7 },
                // Channels
                { url: '/channels/whatsapp', priority: 0.7 },
                { url: '/channels/integration', priority: 0.7 },
                // Voice Agents
                { url: '/voice-agents/welcome-to-voice-agents', priority: 0.7 },
            ];
            return routes.map(route => ({
                loc: route.url,
                priority: route.priority,
                changefreq: 'weekly',
                lastmod: new Date().toISOString()
            }));
        }
    },

    // Robots configuration
    robots: {
        allow: '/',  // Allow all
        sitemap: 'https://docs.verlyai.xyz/sitemap.xml',
        disallow: ['/404.html']
    },

    colorMode: {
        preference: 'dark'
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'theme-color', content: '#000000' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'msapplication-TileColor', content: '#000000' },
                // Open Graph defaults
                { property: 'og:site_name', content: 'VerlyAI Documentation' },
                { property: 'og:type', content: 'website' },
                // Twitter defaults
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: '@VerlyAI' }
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
                { rel: 'alternate', hreflang: 'en', href: '/' }
            ]
        }
    }

});
