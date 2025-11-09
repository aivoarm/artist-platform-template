import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import type { Metadata } from 'next'
import Image from 'next/image' // <-- 1. Import Next.js Image Component
// Next.js automatically calls this to pre-render pages
export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for the shareable link card
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  
  // FIX: Access params.slug directly (no need for await or decode)
  const post = getBlogPosts().find((post) => post.slug === params.slug)
  
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  
  // 🔑 KEY TO NICE LOOKING LINKS: Use the dynamic /og route if no specific image is set.
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200, // Standard OG image width
          height: 630, // Standard OG image height
        },
      ],
    },
    // Twitter card setup is essential for platforms like Slack, Discord, and X (Twitter)
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Destructure the headerImage from metadata
  const { title, publishedAt, headerImage } = post.metadata;

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            // ... (your schema markup) ...
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {title}
      </h1>

      {/* 2. CONDITIONAL HEADER IMAGE RENDERING */}
      {headerImage && (
        // The image container must be relative if using fill
        <div className="relative w-full overflow-hidden mb-8" style={{ height: '250px' }}>
          <Image
            // Use the headerImage URL from the post's frontmatter
            src={headerImage}
            alt={title} 
            fill // Fills the parent div (height: 250px)
            sizes="100vw" // Tells Next.js the image spans the full width of the screen
            className="object-cover" 
            priority
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}