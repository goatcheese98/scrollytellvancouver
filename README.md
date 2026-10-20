# Vancouver Restaurant Squeeze

A scrollytelling data visualization web application documenting the crisis in Vancouver's restaurant industry from 2015-2025.

The active route is now a five-chapter, keyboard-accessible reader using LUM tokens, self-hosted Geist, native menu comparison and a provider-free location plot. Original source data and legacy scene modules are retained.

- [Design translation and data limits](docs/design/LUM-STORY.md)
- [Cloud verification and baseline failures](docs/VERIFICATION.md)
- Run `npm ci`, `npm run typecheck`, `npm run typecheck:story`, `npm run lint:story`, `npm test`, `npm run build`, then `npm run test:browser` (install Chromium with `npx playwright install chromium`).
- `npm run lint` still reports pre-existing legacy scene/UI errors; the changed story modules have a separate zero-warning lint gate.

## Original animation stack (legacy scene modules)

- **Next.js 16.4.2** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Lenis** - Smooth scrolling
- **GSAP + ScrollTrigger** - Scroll-driven animations
- **Framer Motion** - React animations
- **react-intersection-observer** - Viewport detection
- **Recharts** - Data visualizations
- **react-map-gl + MapLibre** - Interactive maps
- **Local UI components** - Legacy scene presentation

## Getting Started

### Prerequisites

- Node.js 24 installed (the CI version)
- npm or pnpm package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. No application provider credentials are required by the active reading route.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
VC/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all scenes
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── scenes/
│   │   ├── Scene1.tsx      # Pho price comparison (interactive slider)
│   │   ├── Scene2.tsx      # Consumer retreat (bar charts)
│   │   ├── Scene3.tsx      # P&L waterfall (horizontal scroll)
│   │   ├── Scene4.tsx      # Investigation (tracing beam)
│   │   ├── Scene7.tsx      # Delivery apps (fee breakdown)
│   │   ├── Scene8.tsx      # Interactive map of closures
│   │   ├── Scene9.tsx      # Hollowing out (3D carousel)
│   │   └── Scene10.tsx     # The finale
│   └── ui/
│       ├── compare.tsx     # Before/after comparison component
│       ├── compare-demo.tsx  # Scene 1 pho slider using illustrated menu assets
│       └── tracing-beam.tsx
└── lib/
    └── lenis.ts            # Smooth scroll hook
```

## Legacy scene inventory (retained source)

### Scene 1: The Price Shock
Interactive before/after slider comparing 2015 ($8.50) vs 2025 ($16.00) pho prices.

### Scene 2: The Consumer Retreat
Split-screen layout with bar charts showing 81% avoiding restaurants and 75% cutting frequency.

### Scene 3: The Impossible Math
Horizontal scrolling P&L waterfall showing costs exceeding 100% of revenue.

### Scene 4: The Investigation
Tracing beam showing three cost pressures:
- Labour Crisis (16,000 shortage, +70.8% wages)
- Supply Shock (+36.2% meat, +30% dairy/vegetables)
- Admin Burden (+200% insurance)

### Scene 7: The Accelerant
iPhone mockup showing DoorDash fee breakdown and BC's 20% fee cap impact.

### Scene 8: Interactive Map
MapLibre map with clickable pins showing 5 closed Vancouver restaurants.

### Scene 9: The Hollowing Out
3D carousel showing the barbell effect: high-end thriving, mid-market vanishing, QSR expanding.

### Scene 10: The Finale
Dramatic fade-to-black with key stats and final message.

## Build for Production

```bash
npm run build
npm start
```

## Data Sources

- BC Restaurant and Food Services Association
- Statistics Canada
- BC Labour Market Outlook
- Vancouver Economic Commission (2015-2025)

## License

All rights reserved.

## Verified static output

`npm run build:static` produces a standalone `out/` directory, including the original menus/data and self-hosted assets. No Next server, application provider credentials or adapter is needed to serve those files. `STORY_STATIC_EXPORT=1 npm run test:browser -- --repeat-each=3` verifies that output using a cloud-only Python static preview. Python is a test-server convenience, not a deployment requirement.

The default `npm run build` / `npm start` Next workflow remains available. Run the default build again before `npm start` after an export build, since both commands regenerate `.next/`. No deployment is performed by either build. See [boundary/dependency follow-up](docs/BOUNDARIES.md) for audit debt and results.

## Cloudflare local static rehearsal

After `npm run build:static`, run `npm run preview:cloudflare` to serve the actual export with Cloudflare assets routing and headers in the local cloud runtime. `npm run test:hosting -- --repeat-each=3` checks reader behavior, real missing-asset/404/cache/security responses, and the retained MapLibre consumer. It requires Node 24 and local Chromium/Playwright. No credentials or deployment are needed. See [source, audit and hosting follow-up](docs/MODERNIZATION-FOLLOWUP.md) for the remaining upstream tooling advisory and evidence.
