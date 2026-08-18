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
├── app/
│   ├── (site)/             # Cosmic terminal portfolio — its own root layout
│   │   ├── blog/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── studio/
│   │   └── layout.tsx      # starfield, Nyan Cat, header, footer, Fira Code
│   ├── (card)/             # /hi contact card — a SECOND root layout
│   │   ├── hi/page.tsx
│   │   ├── layout.tsx
│   │   └── card.css        # pop-art theme; does not import globals.css
│   └── globals.css
├── components/
│   ├── animation/          # Starfield, Nyan Cat, Motion toggle
│   ├── card/               # ContactCard + useCardLocale
│   ├── layout/             # Header, Footer, Container
│   ├── terminal/           # ConsoleBlock, PlanetCard, etc.
│   └── ui/                 # ShadCN components
├── hooks/                  # Custom React hooks
├── lib/
│   ├── i18n/               # Card message catalogue
│   ├── sanity/             # Sanity client, queries, schemas
│   └── utils.ts
└── types/                  # TypeScript definitions
```

The two route groups each declare their own `<html>`/`<body>`, so `/hi` renders
none of the site chrome. Adding a route means putting it in one group or the
other — there is no `src/app/layout.tsx` any more.

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

## 📇 `/hi` — mobile contact card

A single-screen, mobile-only card handed out via a QR code on 3D prints. Call,
text, and save-contact buttons sit in a fixed thumb-zone bar. It shares nothing
with the portfolio: its own root layout, its own stylesheet, no webfonts.

**Assets** live in `public/hi/`: `carlos.webp` (320×320 avatar), `og.jpg`
(1200×630 share image), `favicon.png`, `apple-touch-icon.png`, and
`carlos-masson.vcf`.

**The vCard is the fragile part.** iOS Safari only offers the native "Add to
Contacts" sheet when the file arrives as `text/vcard`; `netlify.toml` sets that
header. The link deliberately has no `download` attribute — on iOS that saves to
Files instead of opening Contacts. The vCard is vCard 3.0 with an embedded
photo, CRLF line endings, and base64 folded at 74 characters with a leading
space on continuation lines (unfolded base64 imports blank on Android). Verify
on a real iPhone; desktop browsers do not reproduce the behaviour.

**Site URL.** `NEXT_PUBLIC_SITE_URL` sets `metadataBase`, which makes `og:image`
and `og:url` absolute — iMessage, WhatsApp and Facebook will not render a
relative `og:image`, and this card gets forwarded. It falls back to Netlify's
build-time `URL`, then to a hardcoded default. The vCard's own `URL:` line is a
static file and must be edited by hand if the domain changes.

**i18n** (`src/lib/i18n/card-messages.ts`) is hand-rolled and key-based rather
than i18next — a ~40 KB runtime on the page that sells "highly performant
websites" would undercut the pitch. `MessageKey` is derived from the English
catalogue, so a missing or misspelled Spanish key is a compile error. The server
always renders English, so no-JS visitors and crawlers get a complete page;
`useCardLocale` swaps in `?lang=` → `localStorage` → `navigator.languages` after
hydration via `useSyncExternalStore`.

**Regenerating the avatar** from the source art:

```bash
SRC=~/Documents/dev-projects/flamingo-city/mascots/tiles/carlos-bust.png
magick "$SRC" -trim +repage /tmp/trim.png
magick /tmp/trim.png -crop 700x700+68+20 +repage \
  -background "#12E8F0" -alpha remove -alpha off -resize 320x320 -strip /tmp/carlos.png
cwebp -q 82 /tmp/carlos.png -o public/hi/carlos.webp
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
