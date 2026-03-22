// @ts-nocheck - Nitro auto-imported types are not available in editor

import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
    // Query all content pages (no prefix filter — content lives at the root of /content/)
    const docs = await serverQueryContent(event).find()

    const urls = docs
        .filter((page) => page._path && !page._path.startsWith('/api/'))
        .map((page) => {
            const lastmod = page?.updatedAt || page?.publishedAt || new Date().toISOString()
            const priority = calculatePriority(page)

            return {
                loc: page._path,
                lastmod: new Date(lastmod).toISOString(),
                changefreq: 'weekly',
                priority,
            }
        })

    return urls
})

function calculatePriority(page: any): number {
    const path = page._path || ''

    if (path === '/getting-started/welcome-to-verlyai') {
        return 1.0
    }

    if (path.includes('getting-started')) {
        return 0.9
    }

    // Comparison & editorial articles get high priority for SEO
    if (
        path.includes('verlyai-vs') ||
        path.includes('why-ai-agents')
    ) {
        return 0.9
    }

    const pathDepth = path.split('/').filter(Boolean).length

    if (pathDepth === 1) {
        return 0.8
    }

    return 0.7
}
