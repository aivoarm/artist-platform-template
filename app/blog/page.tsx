import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-neutral-400 dark:text-neutral-50">
        My Blog
      </h1>
      {/* Passing "en" satisfies the TypeScript requirement and fetches English posts */}
      <BlogPosts lang="en" />
    </section>
  )
}