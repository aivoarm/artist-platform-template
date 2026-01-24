import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/[lang]/blog/utils'

// 1. Internal Component: This handles the UI list
// We keep this in the same file or export it for reuse
export function BlogPosts({ lang }: { lang: string }) {
  let allBlogs = getBlogPosts(lang)

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            // FIX: Added ${lang} to the href to keep the user in their language context
            href={`/${lang}/blog/${post.slug}`} 
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}

// 2. The Page Component: Must be the default export for Next.js routing
// We use 'await params' because in Next.js 15+, params is a Promise
export default async function BlogPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts lang={lang} />
    </section>
  );
}