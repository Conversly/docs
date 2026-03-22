import { defineAppConfig } from "nuxt/app";

export default defineAppConfig({
    docus: {
        title: 'VerlyAI Docs',
        description: 'Official documentation for VerlyAI — learn how to deploy AI agents for Voice, WhatsApp, and Web Chat. API references, quickstarts, SDKs, and integration guides.',
        socials: {
            website: {
                label: 'VerlyAI',
                href: 'https://verlyai.xyz/',
                icon: 'i-lucide-globe'
            },
            twitter: 'https://x.com/VerlyAI',
            github: '',
            linkedin: {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/verlyai/',
                icon: 'i-simple-icons-linkedin'
            }
        },
        aside: {
            level: 0,
            collapsed: false,
            exclude: []
        },
        main: {
            padded: true,
            fluid: true
        },
        header: {
            title: 'VerlyAI',
            logo: {
                light: '/logo.svg',
                dark: '/logo.svg',
                alt: 'VerlyAI Logo'
            },
            showLinkIcon: true,
            exclude: [],
            fluid: true
        }
    }
})
