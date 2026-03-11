// @ts-nocheck - Nitro auto-imported types are not available in editor

import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
    const docs = await serverQueryContent(event, 'docs').find()

    const urls = docs.map(page => {
        const lastmod = page?.updatedAt || page?.publishedAt || new Date().toISOString()
        const priority = calculatePriority(page)

        return {
            loc: page.path,
            lastmod: new Date(lastmod).toISOString(),
            changefreq: 'weekly',
            priority,
        }
    })

    return urls
})

function calculatePriority(page: any): number {
    // Higher priority for top-level pages
    const pathDepth = page.path.split('/').length - 1

    if (page.path === '/getting-started/welcome-to-verlyai') {
        return 1.0
    }

    if (page.path.includes('getting-started')) {
        return 0.9
    }

    if (pathDepth === 2) {
        return 0.8
    }

    return 0.7
}
