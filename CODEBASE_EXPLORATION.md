# ScrollyProject/VC - Codebase Exploration Report

## Project Overview
This is a **Next.js 16** scrollytelling project about "The Sticker Shock" - documenting how a large pho bowl in Vancouver increased from $8.50 (2015) to $16.00 (2025), a staggering 88% increase. The project uses interactive visualizations and narrative-driven scenes to explain the economic pressures on restaurants.

### Key Technologies
- **Framework**: Next.js 16.0.1 (React 19.2.0)
- **Styling**: Tailwind CSS v4, Tailwind CSS Animate
- **Animations**: Framer Motion v12.23.24, GSAP v3.13.0
- **Smooth Scrolling**: Lenis v1.3.13
- **Charting**: Recharts v3.3.0
- **Mapping**: MapLibre GL v5.10.0, react-map-gl v8.1.0
- **UI Libraries**: Aceternity UI v0.2.2, Lucide React icons
- **Intersection Observer**: react-intersection-observer v10.0.0

---

## Project Structure

```
/Users/rohanjasani/Documents/ScrollyProject/vc/
├── app/
│   ├── layout.tsx          # Main layout wrapper
│   ├── page.tsx            # Home page - assembles all scenes
│   ├── globals.css         # Global styles
│   └── api/               # API routes (if any)
├── components/
│   ├── scenes/             # Main scrollytelling scenes (Scene1-Scene10)
│   │   ├── Scene1.tsx      # HERO: "The Sticker Shock" - Slider demo
│   │   ├── Scene2.tsx      # "The Consumer Retreat" - Bar charts
│   │   ├── Scene3.tsx      # "The Impossible Math" - Waterfall breakdown
│   │   ├── Scene4.tsx      # "The Investigation" - 3 cost drivers
│   │   ├── Scene5.tsx      # (Empty/Unused)
│   │   ├── Scene6.tsx      # (Empty/Unused)
│   │   ├── Scene7.tsx      # "The Accelerant" - DoorDash fee breakdown
│   │   ├── Scene8.tsx      # "The Map of Loss" - Closed restaurants map
│   │   ├── Scene9.tsx      # "The Hollowing Out" - Market segments carousel
│   │   └── Scene10.tsx     # "The Math No Longer Adds Up" - Final stats
│   └── ui/
│       ├── compare-demo.tsx    # SLIDER COMPONENT (Price timeline)
│       ├── compare.tsx         # Reusable image comparison slider
│       ├── menu-card.tsx       # Menu card visual (2015 vs 2025)
│       └── tracing-beam.tsx    # Timeline/connection visual
├── lib/
│   ├── lenis.ts            # Smooth scrolling hook
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind customization
└── next.config.ts          # Next.js configuration
```

---

## Slider Component - The Sticker Shock Feature

### Location
**File**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/ui/compare-demo.tsx`

### Purpose
Interactive before/after slider showing price comparison between 2015 and 2025 for a large pho bowl.

### Key Implementation Details

#### Price Data (Lines 7-8)
```typescript
const BASE_PRICE = 8.5;        // 2015 price
const CURRENT_PRICE = 16;       // 2025 price
```

#### State Management (Lines 11-12)
```typescript
const [sliderPosition, setSliderPosition] = useState(50);  // 0-100%
const [isDragging, setIsDragging] = useState(false);
```

#### Core Features
1. **Slider Position**: Controlled via percentage (0-100%)
2. **Interaction Methods**:
   - Mouse drag/move
   - Touch drag/move
   - Click to position

3. **Visual Elements**:
   - Left side: 2015 menu card ($8.50) - Emerald theme
   - Right side: 2025 menu card ($16.00) - Rose theme
   - Divider line with animated handle
   - Dynamic price difference label

#### Price Calculation (Lines 57-64)
```typescript
const formattedDifference = useMemo(() => {
  const diff = CURRENT_PRICE - BASE_PRICE;  // $7.50
  return diff.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  });
}, []);
```

#### Clip Path Magic (Lines 91-98)
The 2025 menu is revealed using CSS `clipPath`:
```typescript
<div style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
  <MenuCard price="$16.00" year="2025" variant="2025" />
</div>
```

#### Interactive Handle (Lines 101-144)
- White circular button at slider position
- Shows up/down arrows
- Animated scale on drag
- Displays formatted price difference
- Tooltip: "{difference} more today"

### Related Component: MenuCard
**File**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/ui/menu-card.tsx`

Displays a styled menu card with:
- Restaurant name and year badge
- Dish name: "Large Pho"
- Location: "Vancouver, BC"
- Description of preparation
- Price in large text
- Feature bullets
- Footer note explaining 2015 vs 2025 context

#### Theme Variants
**2015 Theme (Emerald)**:
- Background: Light emerald gradient
- Accent color: Emerald green
- Price color: Emerald text
- Footer note: "Neighborhood staple families relied on for weeknight dinners"

**2025 Theme (Rose)**:
- Background: Light rose gradient
- Accent color: Rose/red
- Price color: Rose/red text
- Footer note: "Includes added surcharges for labour, rent, and insurance pressures"

---

## Scene Breakdown & Price Data

### Scene 1: The Sticker Shock (HERO)
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene1.tsx`

- **Intro**: 2015 → 2025 timeline
- **Title**: "The Sticker Shock"
- **Description**: Vancouver pho price evolution narrative
- **Key Stats**:
  - 2015 Price: $8.50
  - 2025 Price: $16.00
  - Increase: +88%
  - Dollar difference: $7.50
- **Interactive**: CompareDemo slider component
- **Call to action**: "Drag or tap the divider to witness a decade of price creep"

### Scene 2: The Consumer Retreat
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene2.tsx`

- Bar charts showing consumer behavior
- 81% of 18-34 year-olds cutting back
- 75% of all Canadians cutting back
- Testimonials about financial pressure
- Stats: -11% full-service spending, +7.6% QSR lunch traffic

### Scene 3: The Impossible Math
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene3.tsx`

- Horizontal scrolling breakdown of restaurant economics
- Shows revenue vs. costs breakdown:
  - 100% Revenue starting point
  - 38% Cost of Goods (COGS)
  - 38% Labour (+70% wages)
  - 18% Rent
  - 10% Other (overflow - bleeding red)
  - Result: -4% Net Margin (41% of restaurants operate at loss)

### Scene 4: The Investigation
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene4.tsx`

- Three cost drivers with tracing beam timeline:
  1. **Labour Crisis**: 16,000 worker shortage + 70.8% wage increase
  2. **Supply Shock**: Meat +36.2%, Dairy/Eggs +30%, Vegetables +30%
  3. **Admin Burden**: Insurance doubled/tripled (+200%), new mandatory costs

### Scene 7: The Accelerant
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene7.tsx`

- Mobile phone mockup showing DoorDash order breakdown
- Order example:
  - Large Pho: $16.00
  - Spring Rolls: $8.00
  - Subtotal: $24.00
  - Delivery Fee: $3.99
  - Service Fee: $4.20
  - Regulatory Fee: $2.00
  - Taxes: $1.70
  - **Total: $35.89**
  - Restaurant receives only: $20.00 (43% of order value)
  
- Fee discussion:
  - B.C. 20% delivery fee cap (2023)
  - Platforms added "regulatory response fees" instead
  - Result: +49.5% in fees on food cost

### Scene 8: The Map of Loss
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene8.tsx`

- Interactive MapLibre GL map of Vancouver
- 5 Example closed restaurants:
  - Kent's Kitchen (2023) - 30-year family restaurant
  - Zefferelli's (2022) - Italian fine dining
  - The Templeton (2024) - Historic 70+ year diner
  - Burgoo Bistro (2023) - Multi-location casual dining
  - The Arbor (2024) - Farm-to-table restaurant

- Stats:
  - 1,200+ restaurants closed since 2015
  - 30% won't reopen (post-pandemic)
  - ~1 closure per week (2023-2024)

### Scene 9: The Hollowing Out
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene9.tsx`

- Interactive 3D carousel of market segments:

  **High-End Dining (Thriving)**:
  - Examples: Hawksworth, Boulevard, Published on Main
  - Revenue: $100+ per person
  - Status: Luxury market survives

  **Mid-Market Casual (Vanishing)**:
  - Examples: Local diners, family restaurants, neighborhood bistros
  - Revenue: $15-30 per person
  - Status: Caught between rising costs and price-sensitive customers

  **Quick Service (Expanding)**:
  - Examples: McDonald's, Subway, Chipotle
  - Revenue: $10-15 per person
  - Status: Chains with scale absorb costs

- Market trends:
  - High-end growth: +15%
  - Mid-market closures: -40%
  - QSR expansion: +25%

### Scene 10: The Math No Longer Adds Up
**Location**: `/Users/rohanjasani/Documents/ScrollyProject/vc/components/scenes/Scene10.tsx`

- Final impact summary with scroll-based animations
- Key stats:
  - +88% Price Increase
  - 16,000 Worker Shortage
  - 1,200+ Restaurant Closures
  - 0% Profit Margin (impossible math)
- Conclusion: "Without systemic change, the middle will continue to vanish"
- Data sources: BC Restaurant Association, Statistics Canada, BC Labour Market Outlook

---

## Price Data Summary

### Core Price Points
| Year | Price | Notes |
|------|-------|-------|
| 2015 | $8.50 | Base price for large pho |
| 2025 | $16.00 | After fees & surcharges |
| Increase | +$7.50 | 88% increase |

### Related Costs (2025 Example Order)
- Food: $24.00 (Large pho + spring rolls)
- Delivery Fee: $3.99
- Service Fee: $4.20
- Regulatory Fee: $2.00
- Taxes: $1.70
- **Total: $35.89**
- Restaurant net: $20.00 (43% of total order value)

### Cost Breakdown for Restaurants
- Cost of Goods: 38% of revenue
- Labour: 38% (+70% wage increase)
- Rent: 18%
- Insurance & Other: 10%+
- **Net Margin: -4% (losses)**

### Price Increases by Input
- Meat: +36.2%
- Dairy & Eggs: +30%
- Vegetables: +30%
- Labour wages: +70.8%
- Insurance: +200%

---

## Interactive Features

### 1. CompareDemo Slider
- Drag to reveal 2025 menu over 2015
- Touch-enabled
- Shows real-time price difference
- Smooth animations with Framer Motion

### 2. Horizontal Scroll (Scene 3)
- Scrollytelling effect
- Reveals cost breakdown steps
- Waterfall visualization

### 3. Map Interaction (Scene 8)
- Click markers to view closed restaurant details
- Pan and zoom
- Popup cards with stories

### 4. 3D Carousel (Scene 9)
- Click cards to select
- 3D perspective transform
- Navigation dots

### 5. Scroll-driven Animations
- Lenis smooth scrolling
- useScroll hooks for parallax
- useTransform for scroll-linked animations
- Intersection Observer for view-triggered animations

---

## Key Files to Understand

### Essential for Slider Feature
1. **`components/ui/compare-demo.tsx`** - Main slider component
   - Price constants: $8.50 vs $16.00
   - Slider position state (0-100%)
   - Mouse/touch handlers
   - ClipPath for reveal effect

2. **`components/ui/menu-card.tsx`** - Visual component shown in slider
   - Two theme variants (2015 emerald, 2025 rose)
   - Menu item details
   - Price display

3. **`components/scenes/Scene1.tsx`** - Hero scene containing slider
   - Intro narrative
   - Embeds CompareDemo component
   - Key statistics display

### Architecture
- **`app/page.tsx`** - Assembles all scenes in order
- **`app/layout.tsx`** - Global layout with metadata
- **`lib/lenis.ts`** - Custom hook for smooth scrolling
- **`tailwind.config.ts`** - Design tokens and customization

---

## Design System

### Color Palette
- **2015 Theme**: Emerald green (#10b981, #059669)
- **2025 Theme**: Rose/red (#ea580c, #dc2626)
- **Background**: Slate dark theme (slate-900, slate-950)
- **Accents**: Cyan, orange, purple, blue for different sections

### Typography
- Large headings: 5xl-9xl bold
- Body text: Regular weight, gray-300/gray-400
- Labels: Uppercase, small, tracking widened

### Spacing & Borders
- Rounded corners: 2xl-3xl (rounded-2xl, rounded-3xl)
- Borders: Subtle white/10 or color-specific
- Padding: 6-8 units standard

### Animations
- Spring physics for interactive elements
- Stagger children for list animations
- Scroll transforms for parallax
- Fade in/out on intersection

---

## Development Notes

### Running the Project
```bash
npm run dev      # Development with Webpack
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint
```

### Key Dependencies
- Lenis for smooth scrolling
- Framer Motion for animations
- MapLibre for the restaurant closure map
- Recharts/custom bars for charts
- Aceternity UI for styled components

### Performance Considerations
- Intersection Observer for lazy animations
- Smooth scroll with Lenis
- MapLibre for efficient map rendering
- CSS clipPath for slider reveal (GPU-accelerated)

---

## Summary

This project is a sophisticated scrollytelling experience about inflation and restaurant economics in Vancouver. The centerpiece is the **CompareDemo slider component** in Scene 1, which interactively shows the price increase from $8.50 to $16.00 over 10 years. 

The slider uses:
- **React useState** for position tracking (0-100%)
- **CSS clipPath** for smooth image/menu reveal
- **Framer Motion** for animated handle and transitions
- **Mouse and touch events** for cross-platform interaction
- **Memoized formatting** for currency display

All price data and statistics are hardcoded in the scene components, creating a cohesive narrative that builds from the simple pho price increase to broader economic analysis of why restaurants are closing and the market is "hollowing out" into luxury and chains only.
