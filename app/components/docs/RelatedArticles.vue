<script setup lang="ts">
interface RelatedArticle {
    title: string
    path: string
    description: string
}

const props = defineProps<{
    currentPath: string
}>()

// Define content clusters for internal linking
const contentClusters: Record<string, RelatedArticle[]> = {
    '/getting-started': [
        { title: 'Build Your First AI Chatbot', path: '/getting-started/build-your-first-ai-chatbot', description: 'Step-by-step tutorial for beginners' },
        { title: 'Best Practices', path: '/getting-started/best-practices', description: 'Expert tips for chatbot success' },
        { title: 'Roles & Permissions', path: '/getting-started/roles-and-permissions', description: 'Manage team access' }
    ],
    '/ai-chatbot-management': [
        { title: 'Playground Testing', path: '/ai-chatbot-management/playground', description: 'Test your chatbot responses' },
        { title: 'Customize Appearance', path: '/ai-chatbot-management/customize', description: 'Brand your chatbot UI' },
        { title: 'Configure Behaviour', path: '/ai-chatbot-management/behaviour', description: 'Set AI personality' },
        { title: 'Deploy to Production', path: '/ai-chatbot-management/deploy', description: 'Go live with your chatbot' }
    ],
    '/knowledge-training': [
        { title: 'Connect Data Sources', path: '/knowledge-training/data-sources', description: 'Import docs and FAQs' },
        { title: 'Setup Actions', path: '/knowledge-training/actions', description: 'Automate workflows' }
    ],
    '/analytics': [
        { title: 'View Statistics', path: '/analytics/statistics', description: 'Performance metrics' },
        { title: 'Analyze Topics', path: '/analytics/topics', description: 'Conversation patterns' },
        { title: 'Browse Chats', path: '/analytics/chats', description: 'Full logs' },
        { title: 'Track Leads', path: '/analytics/leads', description: 'Conversion data' }
    ],
    '/channels': [
        { title: 'WhatsApp Integration', path: '/channels/whatsapp', description: 'Connect WhatsApp Business' },
        { title: 'Other Integrations', path: '/channels/integration', description: 'Website widget & API' }
    ],
    '/human-escalations': [
        { title: 'Escalation Analytics', path: '/human-escalations/esclation-analytics', description: 'Handoff metrics' },
        { title: 'Live Inbox', path: '/human-escalations/live-inbox', description: 'Human agent tools' }
    ],
    '/voice-agents': [
        { title: 'AI Voice Overview', path: '/voice-agents/welcome-to-voice-agents', description: 'Phone automation' }
    ]
}

// Get related articles based on current path
const relatedArticles = computed(() => {
    const clusterKey = Object.keys(contentClusters).find(key =>
        props.currentPath.startsWith(key)
    )

    if (!clusterKey) return []

    // Filter out current page and limit to 3 articles
    return contentClusters[clusterKey]
        .filter(article => article.path !== props.currentPath)
        .slice(0, 3)
})

// External resources for additional linking
const externalResources = computed(() => {
    const allResources = [
        { title: 'VerlyAI vs Intercom', path: '/verlyai-vs-intercom-the-complete-comparison', description: 'Feature comparison' },
        { title: 'AI Agents vs Traditional Support', path: '/why-ai-agents-are-replacing-traditional-customer-support', description: 'Industry trends' }
    ]

    // Filter out if current path matches
    return allResources.filter(r => r.path !== props.currentPath)
})
</script>

<template>
    <div v-if="relatedArticles.length || externalResources.length" class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-semibold mb-6">Related Articles</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Internal Links -->
            <NuxtLink
                v-for="article in relatedArticles"
                :key="article.path"
                :to="article.path"
                class="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
                <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <div>
                        <h4 class="font-medium text-sm group-hover:text-primary-500 transition-colors">{{ article.title }}</h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ article.description }}</p>
                    </div>
                </div>
            </NuxtLink>

            <!-- External Resources -->
            <NuxtLink
                v-for="resource in externalResources"
                :key="resource.path"
                :to="resource.path"
                class="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
                <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-external-link" class="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <div>
                        <h4 class="font-medium text-sm group-hover:text-primary-500 transition-colors">{{ resource.title }}</h4>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ resource.description }}</p>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>