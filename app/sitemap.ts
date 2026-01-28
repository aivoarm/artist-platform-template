import { MetadataRoute } from 'next'
import { getBlogPosts } from 'app/[lang]/blog/utils'

export const baseUrl = 'https://www.username.com'
const locales = ['en', 'fr', 'es', 'it', 'de', 'hy', 'ru', 'ar']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Initialize arrays with correct types to avoid 'never' error
  const blogEntries: MetadataRoute.Sitemap = []
  const staticEntries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const posts = getBlogPosts(locale)

    // Map blog posts for this locale
    const langBlogs = posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt || new Date().toISOString(),
    }))

    // FIX: blogEntries is now typed, so langBlogs won't be 'never'
    blogEntries.push(...langBlogs)

    // Map static routes for this locale
    const routes = ['', '/blog', '/puzzle', '/radio', '/videos'].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

    staticEntries.push(...routes)
  }

  const rootEntry = {
    url: baseUrl,
    lastModified: new Date().toISOString().split('T')[0],
  }

  return [rootEntry, ...staticEntries, ...blogEntries]
}