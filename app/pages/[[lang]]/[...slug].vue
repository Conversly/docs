<script setup lang="ts">
import { kebabCase } from 'scule'
import type { ContentNavigationItem, Collections, DocsCollectionItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { locale, isEnabled, t } = useDocusI18n()
const appConfig = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { shouldPushContent: shouldHideToc } = useAssistant()
const collectionName = computed(() => isEnabled.value ? `docs_${locale.value}` : 'docs')

const [{ data: page }, { data: surround }] = await Promise.all([
  useAsyncData(kebabCase(route.path), () => queryCollection(collectionName.value as keyof Collections).path(route.path).first() as Promise<DocsCollectionItem>),
  useAsyncData(`${kebabCase(route.path)}-surround`, () => {
    return queryCollectionItemSurroundings(collectionName.value as keyof Collections, route.path, {
      fields: ['description'],
    })
  }),
])

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description
const headline = ref(findPageHeadline(navigation?.value, page.value?.path))
const breadcrumbs = computed(() => findPageBreadcrumbs(navigation?.value, page.value?.path || ''))

const fullTitle = `${title} | VerlyAI Documentation`
const canonicalUrl = `https://docs.verlyai.xyz${route.path}`

// Enhanced SEO metadata with useHead
useHead({
  title: fullTitle,
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    // Basic SEO
    { name: 'description', content: description },
    { name: 'author', content: 'VerlyAI' },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'bingbot', content: 'index, follow' },

    // Open Graph
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: (page.value as any).publishedAt || new Date().toISOString() },
    { property: 'article:modified_time', content: (page.value as any).modifiedAt || new Date().toISOString() },

    // Twitter
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@VerlyAI' },
    { name: 'twitter:creator', content: '@VerlyAI' },

    // Article section
    { property: 'article:section', content: headline.value || 'Documentation' }
  ],

  // Structured Data (JSON-LD)
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: title,
        description: description,
        image: 'https://docs.verlyai.xyz/og-image.png',
        datePublished: (page.value as any).publishedAt || new Date().toISOString(),
        dateModified: (page.value as any).modifiedAt || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'VerlyAI',
          url: 'https://verlyai.xyz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://docs.verlyai.xyz/logo.svg'
          }
        },
        publisher: {
          '@type': 'Organization',
          name: 'VerlyAI',
          url: 'https://verlyai.xyz',
          logo: {
            '@type': 'ImageObject',
            url: 'https://docs.verlyai.xyz/logo.svg'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.value.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            item: `https://docs.verlyai.xyz${crumb.to}`
          }))
        }
      })
    }
  ]
})

useSeo({
  title,
  description,
  type: 'article',
  modifiedAt: (page.value as unknown as Record<string, unknown>).modifiedAt as string | undefined,
  breadcrumbs,
})

watch(() => navigation?.value, () => {
  headline.value = findPageHeadline(navigation?.value, page.value?.path) || headline.value
})

defineOgImageComponent('Docs', {
  headline: headline.value,
})

// Add the page path to the prerender list
addPrerenderPath(`/raw${route.path}.md`)
</script>

<template>
  <UPage
    v-if="page"
    :key="`page-${shouldHideToc}`"
  >
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
      :ui="{
        wrapper: 'flex-row items-center flex-wrap justify-between',
      }"
    >
      <template #links>
        <UButton
          v-for="(link, index) in (page as DocsCollectionItem).links"
          :key="index"
          size="sm"
          v-bind="link"
        />

        <DocsPageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <DocsRelatedArticles :current-path="route.path" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length && !shouldHideToc"
      #right
    >
      <UContentToc
        highlight
        :title="appConfig.toc?.title || t('docs.toc')"
        :links="page.body?.toc?.links"
      >
        <template #bottom>
          <DocsAsideRightBottom />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
