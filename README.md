# 🎹 Artist Platform & Interactive Blog Template

A high-performance, multi-lingual portfolio and interactive blog built with **Next.js 15**, **Tailwind v4**, and **MDX**. This platform is designed for creators and musicians to showcase work through interactive games, AI-driven chat, and localized content.

## 🚀 Quick Start (For New Users)

The easiest way to get your own version of this platform live is to use our **Setup Wizard**.

### 1. One-Click Deploy
Deploy your own instance directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aivoarm/artist-platform-template)

### 2. Local Customization
After cloning the repository, run the Setup Wizard to personalize the site with your name, social links, and API keys:

```bash
# Install dependencies
pnpm install

# Run the Setup Wizard
python3 scripts/setup-wizard.py

# Start development
pnpm dev

✨ Key Features

🤖 AI Professor: Integrated ProfessorGrooveBot using Gemini for site-specific intelligence.


🌍 Multi-lingual Support: Full i18n support for 10+ languages via dynamic dictionaries.


🎮 Interactive Music Games: Built-in BpmDetective, KeyGame, and MusicPuzzle components.


📝 MDX-Powered Blog: Write posts in Markdown with full support for React components.

📈 SEO Optimized: Automated sitemap.ts, robots.ts, and dynamic OG image generation.


🎨 Advanced Audio: Integration with Spotify and local audio segments for a rich music experience.

🛠️ Configuration
Environment Variables
To enable the interactive features, you must provide the following in your .env.local (the Setup Wizard can do this for you):

GEMINI_API_KEY: 
NEXT_PUBLIC_SITE_URL: 
GROQ_API_KEY
NEXT_PUBLIC_GA_ID
GTM_ID
YOUTUBE_API_KEY
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET

Content Structure

Blog Posts: Located in app/[lang]/blog/posts/[lang]/.


Translations: Located in the /dictionaries folder.

Site Logic: Managed through dictionaries/site-knowledge.json.

📦 Tech Stack
Framework: Next.js 15 (App Router)

Styling: Tailwind CSS v4

Runtime: Node.js / pnpm


AI Engine: Google Gemini API , Groq

📝 Maintenance
To build, commit, and push updates to your live site:

Bash
pnpm run build && git add . && git commit -m "Upgrade" && git push -u origin main

Using free 
    https://www.jotform.com/ for contact
    https://cloudinary.com/ for images


