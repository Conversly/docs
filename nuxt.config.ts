import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    // ✅ Put routeRules inside the nitro section
    // @ts-ignore
    nitro: {
        routeRules: {
            '/sw.js': { headers: { 'Cache-Control': 'no-cache' } },
        },
    },

    // Your existing app config
    appConfig: {
        docus: {
            assistant: {
                floatingInput: true,
                explainWithAi: true,
                faqQuestions: [
                    'How do I install Docus?',
                    'How do I customize the theme?'
                ]
            }
        }
    }
})
