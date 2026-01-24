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
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    return { metadata: {} as Metadata, content: fileContent }
  }

  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    // Improved split to handle values containing colons (like URLs)
    let firstColonIndex = line.indexOf(':')
    if (firstColonIndex > -1) {
      let key = line.slice(0, firstColonIndex).trim()
      let value = line.slice(firstColonIndex + 1).trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
      metadata[key as keyof Metadata] = value
    }
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    // Use the filename as the slug
    const slug = path.parse(file).name 
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/_/g, '-')
      .replace(/[^\w\-]+/g, '')
    
    return {
      metadata,
      slug,
      content,
    }
  })
}



export function formatDate(date: string | null | undefined, includeRelative = false) {
  if (!date) return 'Date TBD' 

  let currentDate = new Date()
  // Ensure ISO format for parsing
  let dateString = date.includes('T') ? date : `${date}T00:00:00`
  let targetDate = new Date(dateString)

  // Calculate differences
  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) return fullDate

  const diffInMs = currentDate.getTime() - targetDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  let relative = '';
  if (diffInDays < 1) relative = 'Today';
  else if (diffInDays < 30) relative = `${diffInDays}d ago`;
  else if (diffInDays < 365) relative = `${Math.floor(diffInDays / 30)}mo ago`;
  else relative = `${Math.floor(diffInDays / 365)}y ago`;

  return `${fullDate} (${relative})`
} 


export function getBlogPosts(lang: string) {
  const targetLang = lang || 'en';

  // FIX: Based on your log, 'posts' is INSIDE 'blog'.
  // We need to look into: app/[lang]/blog/posts
  // Then we find the specific language folder inside 'posts'.
  const postsPath = path.join(
    process.cwd(),
    'app',
    '[lang]',
    'blog',
    'posts',
    targetLang
  );

  if (!fs.existsSync(postsPath)) {
    // FALLBACK: If you didn't create subfolders for each language yet,
    // and your .mdx files are just sitting inside 'posts' directly:
    const flatPath = path.join(process.cwd(), 'app', '[lang]', 'blog', 'posts');
    
    if (fs.existsSync(flatPath)) {
      console.log(`Found posts in flat structure: ${flatPath}`);
      return getMDXData(flatPath);
    }

    console.error(`❌ MDX directory not found at: ${postsPath}`);
    return [];
  }

  return getMDXData(postsPath);
}