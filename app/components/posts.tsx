import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

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
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 text-neutral-400" >
              {/* FIX 1: Changed dark:text-neutral-400 to dark:text-neutral-50 for white date text */}
              <p className="text-neutral-600 dark:text-neutral-50 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              {/* FIX 2: Changed dark:text-neutral-100 to dark:text-neutral-50 for white title text */}
              <p className="tracking-tight text-neutral-400">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}