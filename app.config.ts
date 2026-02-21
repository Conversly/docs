import { defineAppConfig } from "nuxt/app";

export default defineAppConfig({
    docus: {
        title: 'VerlyAI',
        description: 'The best place to start your documentation.',
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
