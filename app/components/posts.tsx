import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/[lang]/blog/utils'

// 1. Define the interface for the props
interface BlogPostsProps {
  lang: string
}

// 2. Pass the lang prop into the function
export function BlogPosts({ lang }: BlogPostsProps) {
  // 3. Pass lang to getBlogPosts to fetch the correct localized content
  let allBlogs = getBlogPosts(lang)

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            // 4. Update the href to include the language prefix
            href={`/${lang}/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 text-neutral-400">
              {/* FIX 1: White date text in dark mode */}
              <p className="text-neutral-600 dark:text-neutral-50 w-[150px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              {/* FIX 2: White title text in dark mode */}
              <p className="tracking-tight text-neutral-900 dark:text-neutral-50">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}