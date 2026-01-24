import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/[lang]/blog/utils'
import { baseUrl } from 'app/sitemap'
import type { Metadata } from 'next'
import Image from 'next/image'

// 1. FIX: generateStaticParams must now handle the language and slug
export async function generateStaticParams() {
  const locales = ['en', 'fr', 'es', 'it', 'de', 'hy', 'ru', 'ar'];
  
  // We need to return an array of { lang, slug } for every combination
  // to ensure all pages are pre-rendered correctly.
  const params: { lang: string; slug: string }[] = [];

  locales.forEach((lang) => {
    const posts = getBlogPosts(lang);
    posts.forEach((post) => {
      params.push({ lang, slug: post.slug });
    });
  });

  return params;
}

// 2. FIX: generateMetadata needs to await params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>
}): Promise<Metadata | undefined> {
  const { slug, lang } = await params; // ⬅️ Await the promise
  const post = getBlogPosts(lang).find((post) => post.slug === slug)
  
  if (!post) return;

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/${lang}/blog/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// 3. FIX: Main Blog Page component
export default async function Blog({ 
  params: paramsPromise 
}: { 
  params: Promise<{ slug: string; lang: string }> 
}) {
  const { slug, lang } = await paramsPromise; // ⬅️ Await the promise
  
  // Pass 'lang' to getBlogPosts to fetch from the correct folder
  const post = getBlogPosts(lang).find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const { title, publishedAt, headerImage, summary } = post.metadata;

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
            description: summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(title)}`,
            url: `${baseUrl}/${lang}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Arman Ayva',
            },
          }),
        }}
      />
      
      <h1 className="title font-semibold text-2xl tracking-tighter text-neutral-600 dark:text-neutral-50 mb-8">
        {title}
      </h1>        

      {headerImage && (
        <div className="relative w-full overflow-hidden mb-8 rounded-lg" style={{ height: '250px' }}>
          <Image
            src={headerImage}
            alt={title} 
            fill
            sizes="100vw"
            className="object-cover" 
            priority
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-50">
          {formatDate(publishedAt)}
        </p>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}