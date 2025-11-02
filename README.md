# Vancouver Restaurant Squeeze

A scrollytelling data visualization web application documenting the crisis in Vancouver's restaurant industry from 2015-2025.

## Tech Stack

- **Next.js 16.0.1** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Lenis** - Smooth scrolling
- **GSAP + ScrollTrigger** - Scroll-driven animations
- **Framer Motion** - React animations
- **react-intersection-observer** - Viewport detection
- **Recharts** - Data visualizations
- **react-map-gl + MapLibre** - Interactive maps
- **Aceternity UI** - Pre-built components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```bash
# Get your Mapbox token from https://account.mapbox.com/access-tokens/
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

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

## Scenes Overview

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
