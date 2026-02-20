import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    // ✅ Put routeRules inside the nitro section
    // @ts-ignore
    nitro: {
        routeRules: {
            '/sw.js': { headers: { 'Cache-Control': 'no-cache' } },
            '/': { redirect: '/getting-started/welcome-to-verlyai' }
        },
    },
    vite: {
        optimizeDeps: {
            exclude: ['@vue/runtime-core']
        }
    },
    colorMode: {
        preference: 'dark'
    },

})
