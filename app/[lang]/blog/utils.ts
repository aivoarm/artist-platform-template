import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  headerImage?: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    return { metadata: {} as Metadata, content: fileContent }
  }

  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const metadata: Partial<Metadata> = {}

  frontMatterBlock.trim().split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // Strip quotes
      metadata[key.trim() as keyof Metadata] = value
    }
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXData(dir: string) {
  if (!fs.existsSync(dir)) return []

  const mdxFiles = fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
  
  return mdxFiles.map((file) => {
    const rawContent = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { metadata, content } = parseFrontmatter(rawContent)
    
    // Improved slug: removes extension and replaces non-alphanumeric with hyphens
    const slug = path.parse(file).name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    return { metadata, slug, content }
  })
}

export function formatDate(date: string | null | undefined, includeRelative = false) {
  if (!date) return 'Date TBD' 
  const targetDate = new Date(date.includes('T') ? date : `${date}T00:00:00`)
  
  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  if (!includeRelative) return fullDate

  const diffInDays = Math.floor((new Date().getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))
  
  let relative = ''
  if (diffInDays < 1) relative = 'Today'
  else if (diffInDays < 30) relative = `${diffInDays}d ago`
  else if (diffInDays < 365) relative = `${Math.floor(diffInDays / 30)}mo ago`
  else relative = `${Math.floor(diffInDays / 365)}y ago`

  return `${fullDate} (${relative})`
}

/**
 * Optimized Blog Fetcher
 * Looks for posts in: /app/[lang]/blog/posts/{lang}/*.mdx
 */
export function getBlogPosts(lang: string = 'en') {
  // Path for localized posts
  const localizedPath = path.join(process.cwd(), 'app', '[lang]', 'blog', 'posts', lang);
  // Fallback path for general posts
  const flatPath = path.join(process.cwd(), 'app', '[lang]', 'blog', 'posts');

  if (fs.existsSync(localizedPath) && fs.readdirSync(localizedPath).some(f => f.endsWith('.mdx'))) {
    return getMDXData(localizedPath);
  }

  if (fs.existsSync(flatPath)) {
    return getMDXData(flatPath);
  }

  return [];
}