# 🌌 Nyan Cat Space — Portfolio Next.js

A cosmic terminal-inspired portfolio built with Next.js 14+, ShadCN/UI, Tailwind CSS, and Sanity CMS. Features animated starfields, Nyan Cat fly-bys, and accessible terminal aesthetics.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Components**: ShadCN/UI + Custom terminal components
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity v3
- **Animations**: Framer Motion
- **Deployment**: Netlify

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── blog/[slug]/
│   ├── contact/
│   ├── projects/[slug]/
│   └── layout.tsx
├── components/
│   ├── animation/          # Starfield, Nyan Cat, Motion toggle
│   ├── layout/             # Header, Footer, Container
│   ├── terminal/           # ConsoleBlock, PlanetCard, etc.
│   └── ui/                 # ShadCN components
├── hooks/                  # Custom React hooks
├── lib/
│   ├── sanity/             # Sanity client, queries, schemas
│   └── utils.ts
└── types/                  # TypeScript definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/1cmasson/portfolio-next-js.git
cd portfolio-next-js

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the cosmic terminal.

## 🎨 Sanity CMS Setup

1. Create a new project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy your project ID and add it to `.env.local`
3. Deploy the Sanity Studio or use the embedded studio

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token  # Optional, for preview mode
```

## 🌐 Deployment

### Netlify

The project includes a `netlify.toml` configuration. To deploy:

1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy!

```bash
# Build command (already in netlify.toml)
pnpm run build
```

## ♿ Accessibility Features

- Skip link for keyboard navigation
- `prefers-reduced-motion` support with manual toggle
- Semantic HTML structure
- ARIA labels and live regions
- Focus-visible styles

## 🎬 Animation Features

- **Starfield Canvas**: Animated stars drifting through space
- **Nyan Cat Flyby**: Periodic rainbow cat animations
- **Star Wars Crawl**: Scrolling intro text with pause control
- **Motion Toggle**: User control over all animations

## 📝 License

MIT License - feel free to use this as a template for your own cosmic portfolio!

---

Built with 🌈 and accessibility at the helm.
