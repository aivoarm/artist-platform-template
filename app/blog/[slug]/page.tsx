import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import type { Metadata } from 'next'
import Image from 'next/image'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
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
          width: 1200,
          height: 630,
        },
      ],
    },
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

  const { title, publishedAt, headerImage } = post.metadata;

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            datePublished: publishedAt,
            dateModified: publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      
      {/* ADDED mb-8 HERE FOR SPACING 👇 */}
      <h1 className="title font-semibold text-2xl tracking-tighter text-neutral-600 dark:text-neutral-50 mb-8">
        {title}
      </h1>        

      {/* 2. CONDITIONAL HEADER IMAGE RENDERING */}
      {headerImage && (
        <div className="relative w-full overflow-hidden mb-8" style={{ height: '250px' }}>
          <Image
            src={headerImage}
            alt={title} 
            fill
            sizes="100vw"
            className="object-cover rounded-lg" // Added rounded-lg for nicer corners
            priority
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        {/* FIXED TYPO: removed '**' from end of class string */}
        <p className="text-sm text-neutral-600 dark:text-neutral-50">
          {formatDate(publishedAt)}
        </p>
      </div>

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}