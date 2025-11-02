# The Sticker Shock - Storyboarding v1
## Vancouver Restaurant Squeeze: A Scrollytelling Experience

---

## **SCENE 1: The Hero - Price Comparison**
**Visual**: Interactive before/after slider comparing 2015 vs 2025 pho menu
**Layout**: Scrollytelling format with sticky positioning
**Scroll Height**: 400vh (4x viewport height for extended scroll)

### Scrollytelling Structure

**Fixed Element**:
- **Menu Comparison** (RIGHT SIDE): Remains visible throughout entire scene
  - Before/after slider with 2015 vs 2025 menu
  - Hover-enabled comparison
  - Sparkle animation on slider handle

**Dynamic Elements** (LEFT SIDE): Absolutely positioned with scroll-based entrance/exit
All elements occupy the same space but appear/disappear based on scroll progress.

---

### Text Block 1.1 - Opening Hook (Title)
**Scroll Progress**: 0% → 15%
**Entrance**: Visible at start (opacity: 1, y: 0)
**Exit**: Fades out early (opacity: 0, y: -50px)
**Action**: ENTRANCE → EXIT

```
2015 → 2025

The Sticker Shock

Vancouver's go-to comfort bowl now costs nearly double.
Explore how a simple large pho went from an easy weeknight
staple to a luxury line item.
```

**Animation Details**:
- `titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])`
- `titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50])`

---

### Text Block 1.2 - Context Layer
**Scroll Progress**: 10% → 50%
**Entrance**: Appears early (10-20%: opacity 0→1, y: 50→0)
**Peak**: Fully visible (20-40%)
**Exit**: Exits mid-way (40-50%: opacity 1→0, y: 0→-50)
**Action**: ENTRANCE → PEAK → EXIT

```
💡 CONTEXT

In 2015, a large pho was a $8-10 staple that fed families
across Vancouver's neighborhoods. By 2025, that same bowl
requires the equivalent of a 2015 dinner for two.

This isn't just inflation—it's a fundamental shift in
Vancouver's food accessibility.
```

**Special Effect**: Typing text animation on content paragraph (0.02s per character, 0.5s delay)

**Animation Details**:
- `contextOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0])`
- `contextY = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [50, 0, 0, -50])`

**Layout**: Card component with border, padding, and icon

---

### Text Block 1.3 - Key Statistics (Stat Cards)
**Scroll Progress**: 45% → 95%
**Entrance**: Appears after context exits (45-55%: opacity 0→1, y: 50→0)
**Peak**: Fully visible (55-85%)
**Exit**: Exits near end (85-95%: opacity 1→0)
**Action**: ENTRANCE → PEAK → EXIT

```
INCREASE
+88%
Ten-year jump in the cost of a single large pho.

DOLLAR DIFFERENCE
$7.50
Equivalent to adding a second meal to every order.

CURRENT PRICE
$16.00
Before tip, taxes, and delivery platform fees.
```

**Animation Details**:
- `statsOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.85, 0.95], [0, 1, 1, 0])`
- `statsY = useTransform(scrollYProgress, [0.45, 0.55], [50, 0])`

**Layout**: Three separate card components stacked vertically with gap-6

---

### Text Block 1.4 - The Hidden Crisis (Numbers Block)
**Scroll Progress**: 65% → 95%
**Entrance**: Appears after stats (65-75%: opacity 0→1, y: 50→0)
**Peak**: Fully visible (75-85%)
**Exit**: Exits with stats (85-95%: opacity 1→0)
**Action**: ENTRANCE → PEAK → EXIT

```
📊 THE NUMBERS TELL A STORY

• 1,200+ Vancouver restaurants closed since 2015
• 1 restaurant closes per week in 2023-2024
• Mid-market dining nearly extinct
• Families cutting back 75% on dining out

What's really happening to Vancouver's restaurant scene?

Continue scrolling to investigate →
```

**Animation Details**:
- `numbersOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0])`
- `numbersY = useTransform(scrollYProgress, [0.65, 0.75], [50, 0])`

**Layout**: Card component with icon, title, bullet list, and CTA

---

### Technical Implementation Notes

**Container Structure**:
```typescript
<section ref={sectionRef} className="relative h-[400vh]">
  <div className="sticky top-0 h-screen">
    <div className="grid grid-cols-2 gap-12">
      {/* LEFT: Dynamic content with absolute positioning */}
      <div className="relative h-[600px]">
        <motion.div style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute inset-0">
          {/* Title content */}
        </motion.div>
        <motion.div style={{ opacity: contextOpacity, y: contextY }}
                    className="absolute inset-0">
          {/* Context content */}
        </motion.div>
        {/* ... other layers */}
      </div>

      {/* RIGHT: Fixed menu comparison */}
      <div className="flex items-center justify-center">
        <CompareDemo />
      </div>
    </div>
  </div>
</section>
```

**Scroll Choreography Overlap**:
- Title and Context overlap slightly (15% title exit, 10% context enter)
- Context and Stats overlap (40-45% transition window)
- Stats and Numbers overlap (65-75% both visible together)
- This creates smooth transitions without abrupt changes

**Components Used**:
- `TypingText` component for typewriter effect
- `CompareDemo` for menu comparison slider
- Framer Motion's `useScroll`, `useTransform`, and `motion` primitives

---

## **SCENE 2: The Consumer Retreat**
**Visual**: Vancouver skyline background with data visualization

### Text Block 2.1 - Section Header
**Timing**: On scroll into view
**Duration**: Stay visible during scene
**Action**: KEEP ON SCREEN

```
The Consumer Retreat

The result? A consumer retreat.
```

### Text Block 2.2 - Demographic Impact
**Timing**: Pause scroll, appears after 1.5 seconds
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 2.3

```
🎯 WHO'S AFFECTED MOST?

Young Adults (18-34 years):
• 81% cutting back on dining out
• Pho moved from "weekly staple" to "monthly treat"
• Average 3.2 restaurant visits per month → 0.8 visits

All Canadians:
• 75% reducing restaurant spending
• Average household spending down 42%
• "Cooking at home" searches up 340% since 2019
```

### Text Block 2.3 - Behavioral Shifts
**Timing**: Replace 2.2
**Duration**: 4 seconds
**Action**: FADE OUT → Replace with 2.4

```
📉 CHANGING HABITS

Before (2015):
• Weekend pho: Family tradition
• Weeknight backup: "Too tired to cook"
• Social gathering: "Meet for pho?"

After (2025):
• Special occasions only
• Home cooking prioritized
• Delivery apps for rare treats (with guilt)

The casual dining experience has fundamentally changed.
```

### Text Block 2.4 - Economic Ripple
**Timing**: Replace 2.3
**Duration**: 4 seconds
**Action**: FADE OUT → Continue scroll

```
💸 THE RIPPLE EFFECT

When consumers pull back:
✗ Restaurants see 30-40% revenue drops
✗ Staff hours cut by 25% on average
✗ Suppliers lose steady customers
✗ Local food economy contracts

But what's driving these price increases?

[Scroll to investigate the cost drivers →]
```

---

## **SCENE 3: Restaurant Economics Breakdown**
**Visual**: Waterfall chart showing cost breakdown

### Text Block 3.1 - Section Header
**Timing**: On scroll into view
**Duration**: Stay visible
**Action**: KEEP ON SCREEN

```
The Economics of a Bowl

How a $8.50 pho became $16.00
```

### Text Block 3.2 - The Math Introduction
**Timing**: Pause scroll, appears after 1.5 seconds
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 3.3

```
📊 BREAKING DOWN THE BOWL

2015 Large Pho - $8.50:
• Ingredients: $2.95 (35%)
• Labour: $2.55 (30%)
• Rent: $1.70 (20%)
• Utilities & Ops: $0.85 (10%)
• Profit: $0.45 (5%)

Simple. Sustainable. Profitable.
```

### Text Block 3.3 - The 2025 Reality
**Timing**: Replace 3.2
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 3.4

```
💰 2025 LARGE PHO - $16.00

• Ingredients: $4.02 (+36.2%) - $4.02
• Labour: $4.36 (+70.8%) - $4.36
• Rent: $3.20 (+88.2%) - $3.20
• Insurance: $1.80 (+200%) - $1.80
• Utilities: $1.44 (+69.4%) - $1.44
• Delivery Platform Fees: $1.12 (new cost)
• Profit: -$0.64 (LOSS)

Even at $16, restaurants lose money.
```

### Text Block 3.4 - The Squeeze
**Timing**: Replace 3.3
**Duration**: 4 seconds
**Action**: FADE OUT → Continue scroll

```
⚠️ THE RESTAURANT SQUEEZE

Operating at a LOSS:
• -4% average net margin
• Many operating at -8% hoping to survive
• Owners dipping into savings to stay open
• "One bad month and we're done"

Three major cost drivers are crushing the industry:
1. Labour costs
2. Supply chain inflation
3. Commercial insurance

[Scroll to examine each driver →]
```

---

## **SCENE 4: The Three Cost Drivers**
**Visual**: Vertical timeline/investigation nodes

### Text Block 4.1 - Section Header
**Timing**: On scroll into view
**Duration**: Stay visible
**Action**: KEEP ON SCREEN

```
Three Forces Driving the Squeeze

An investigation into what's really happening
```

### Text Block 4.2 - Driver 1: Labour (Node 1)
**Timing**: Pause at first node, appears after 1.5 seconds
**Duration**: 6 seconds
**Action**: FADE OUT → Replace with 4.3

```
🏢 DRIVER #1: LABOUR COSTS (+70.8%)

BC Minimum Wage History:
• 2015: $10.25/hour
• 2020: $14.60/hour
• 2025: $17.50/hour

The Impact:
• Entry cook (2015): $12/hr → (2025): $22/hr (+83%)
• Experienced chef (2015): $18/hr → (2025): $32/hr (+78%)
• Server (2015): $10.25/hr → (2025): $17.50/hr (+71%)

For a typical pho restaurant with 8 employees:
2015 monthly labour: $21,000
2025 monthly labour: $36,000 (+$15,000/month)

Annual increase: $180,000
```

### Text Block 4.3 - Labour Context
**Timing**: Replace 4.2
**Duration**: 4 seconds
**Action**: FADE OUT → Continue to Node 2

```
💭 THE LABOUR PARADOX

"We support fair wages. Our staff deserve to earn a living.
But when labour costs increase 70% in a decade, we can't
just raise prices 70% without losing all our customers.

We're stuck between doing right by our employees and
staying in business."

- Vancouver Restaurant Owner, 2024

[Continue to next driver →]
```

### Text Block 4.4 - Driver 2: Supply Chain (Node 2)
**Timing**: Pause at second node, appears after 1.5 seconds
**Duration**: 6 seconds
**Action**: FADE OUT → Replace with 4.5

```
📦 DRIVER #2: SUPPLY CHAIN INFLATION

2015-2025 Ingredient Price Changes:

Proteins:
• Beef (brisket): +36.2%
• Chicken: +28.5%
• Pork: +31.8%

Produce:
• Fresh herbs (Thai basil, cilantro): +45%
• Bean sprouts: +38%
• Lime/lemon: +52%
• Onions/ginger: +41%

Staples:
• Rice noodles: +33%
• Fish sauce: +48%
• Cooking oil: +67%

One pho restaurant's weekly grocery bill:
2015: $1,800
2025: $2,600 (+44%)
```

### Text Block 4.5 - Supply Chain Context
**Timing**: Replace 4.4
**Duration**: 4 seconds
**Action**: FADE OUT → Continue to Node 3

```
🌍 GLOBAL FACTORS

What's driving food inflation:
• Climate change affecting crop yields
• Fuel costs (+90% since 2015)
• Supply chain disruptions (2020-2023)
• Currency exchange (CAD weakness)
• Consolidation in food distribution

"We used to have 3-4 suppliers competing for our business.
Now there's 1-2 monopolies setting the prices."

[Continue to final driver →]
```

### Text Block 4.6 - Driver 3: Insurance (Node 3)
**Timing**: Pause at third node, appears after 1.5 seconds
**Duration**: 6 seconds
**Action**: FADE OUT → Replace with 4.7

```
🛡️ DRIVER #3: COMMERCIAL INSURANCE (+200%)

The Hidden Cost Explosion:

2015 Annual Insurance:
• General Liability: $2,400
• Property: $1,800
• Workers Comp: $4,200
Total: $8,400/year ($700/month)

2025 Annual Insurance:
• General Liability: $7,200
• Property: $5,400
• Workers Comp: $12,600
Total: $25,200/year ($2,100/month)

That's +$1,400/month just for insurance.
Equivalent to: 88 bowls of pho sold just to cover insurance.
```

### Text Block 4.7 - Insurance Crisis
**Timing**: Replace 4.6
**Duration**: 4 seconds
**Action**: FADE OUT → Continue scroll

```
⚠️ THE INSURANCE CRISIS

Why such massive increases?

• Climate events → property claims surge
• Slip-and-fall lawsuits doubled (2015-2025)
• COVID business interruption claims
• Insurance companies exiting BC market
• Remaining insurers raising premiums 40-60% annually

"Our insurance went up so much, we had to choose:
Drop coverage or close down. We chose to take the risk
and go uninsured. If something happens, we're done."

- Richmond Restaurant Owner

But there's one more cost eating into margins...

[Scroll to see the platform economy →]
```

---

## **SCENE 5: Delivery Platform Economics**
**Visual**: Mobile phone mockup showing DoorDash order breakdown

### Text Block 5.1 - Section Header
**Timing**: On scroll into view
**Duration**: Stay visible
**Action**: KEEP ON SCREEN

```
The Platform Tax

How delivery apps changed the game
```

### Text Block 5.2 - The Order Breakdown
**Timing**: Pause scroll, appears after 1.5 seconds
**Duration**: 6 seconds
**Action**: FADE OUT → Replace with 5.3

```
📱 ANATOMY OF A DELIVERY ORDER

Customer Orders: Large Pho ($16.00)

What the customer pays:
• Food: $16.00
• Service fee (15%): $2.40
• Delivery fee: $4.99
• Small order fee: $2.00
• Taxes: $3.50
• Tip (18%): $2.88
Total customer pays: $31.77

What the restaurant receives:
• Gross: $16.00
• DoorDash commission (30%): -$4.80
• Payment processing (3%): -$0.48
• Marketing fee: -$0.72
Net to restaurant: $10.00

Restaurant's actual revenue: $10 (62.5% of menu price)
Customer total cost: $31.77
Platform/fees: $21.77 (68% markup on food cost)
```

### Text Block 5.3 - The Platform Dilemma
**Timing**: Replace 5.2
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 5.4

```
🎯 THE CATCH-22

Restaurants must be on delivery apps because:
✓ 40% of revenue now comes from delivery
✓ Customers won't order without app convenience
✓ Competitors are all on the platforms
✓ Visibility depends on platform algorithms

But platforms take 30-40% of revenue:
✗ Restaurants operate at a loss on delivery
✗ Can't raise prices too high (customer resistance)
✗ Can't refuse platforms (lose customers)
✗ Trapped in unprofitable business model

"We lose money on every delivery order, but if we leave
DoorDash, we lose 40% of our revenue overnight."
```

### Text Block 5.4 - Pre-Platform Era
**Timing**: Replace 5.3
**Duration**: 4 seconds
**Action**: FADE OUT → Continue scroll

```
⏮️ BEFORE THE PLATFORMS (2015)

In-house delivery model:
• Restaurant kept 100% of order value
• Delivery driver: $15/hour + tips
• 5-6 deliveries per hour
• Direct customer relationship
• Average order: $25-30

Platform era (2025):
• Restaurant keeps 60-70% of order
• No driver costs (but 30% commission)
• Lost customer relationship (owned by platform)
• Average order: $30-40 (inflated prices)
• Customer complaints go to platform, not restaurant

The convenience came at a massive cost to restaurants.

[Continue to see the closures →]
```

---

## **SCENE 6: The Closure Map**
**Visual**: Interactive map of Vancouver showing closed restaurants

### Text Block 6.1 - Section Header
**Timing**: On scroll into view
**Duration**: Stay visible
**Action**: KEEP ON SCREEN

```
1,200 Stories of Closure

Every dot represents a closed restaurant since 2015
```

### Text Block 6.2 - The Scale
**Timing**: Pause scroll, appears after 2 seconds
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 6.3

```
📍 THE MAP OF LOSS

Red dots across Vancouver:
• 1,200+ closures since 2015
• ~120 closures per year
• ~10 closures per month
• ~1 closure every 3 days (2023-2024)

Neighborhoods hit hardest:
1. Downtown: 320 closures
2. Commercial Drive: 185 closures
3. Main Street: 142 closures
4. Chinatown: 128 closures
5. Kitsilano: 96 closures

These aren't just statistics. Each dot is:
• Someone's dream
• Years of family recipes
• A community gathering place
• Lost jobs and livelihoods
```

### Text Block 6.3 - Categories of Closure
**Timing**: Replace 6.2
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 6.4

```
🏪 WHAT CLOSED

By cuisine type:
• Vietnamese (Pho): 186 restaurants
• Chinese: 234 restaurants
• Japanese: 142 restaurants
• Italian: 128 restaurants
• Indian: 94 restaurants
• Cafes/Breakfast: 176 restaurants
• Other: 240 restaurants

By business age:
• 0-2 years: 380 closures (new businesses failing fast)
• 3-5 years: 290 closures
• 6-10 years: 245 closures
• 11-20 years: 185 closures
• 20+ years: 100 closures (family institutions gone)

Average business age at closure: 6.8 years
```

### Text Block 6.4 - Human Stories
**Timing**: Replace 6.3
**Duration**: 6 seconds
**Action**: FADE OUT → Continue scroll

```
💬 VOICES FROM THE CLOSURES

"We lasted 18 years. Survived recessions, Olympics,
everything. But the last 3 years? We couldn't keep up."
- Vietnamese restaurant, Commercial Drive (closed 2023)

"Every month we hoped next month would be better.
Finally admitted it wasn't coming back."
- Family-owned Chinese restaurant, 22 years (closed 2024)

"We raised our prices twice. Lost half our regulars.
Then had to raise again. That's when we knew it was over."
- Pho restaurant, Kitsilano (closed 2024)

Who's surviving—and who's thriving?

[Continue to see the market split →]
```

---

## **SCENE 7: The Market Fragmentation**
**Visual**: Carousel showing three market segments

### Text Block 7.1 - Section Header
**Timing**: On scroll into view
**Duration**: Stay visible
**Action**: KEEP ON SCREEN

```
The Three-Tier Market

Vancouver's restaurant scene has split into extremes
```

### Text Block 7.2 - Segment 1: Luxury Thriving
**Timing**: Pause on luxury carousel card, appears after 1.5 seconds
**Duration**: 5 seconds
**Action**: FADE OUT → Move to next card

```
💎 TIER 1: LUXURY DINING (THRIVING)

Price point: $80-150+ per person
Examples: Published, Hawksworth, St. Lawrence

Why they're winning:
✓ Targeting wealthy demographics (unaffected by inflation)
✓ Premium ingredients justify high prices
✓ "Experience" pricing (beyond just food)
✓ Strong profit margins (25-35%)
✓ Built-in demand for special occasions

Growth: +15% locations since 2015
Revenue: +40% average per location

"Our customers aren't price sensitive. When you're
spending $200 on dinner, an extra $20 doesn't matter."
- High-end restaurant owner
```

### Text Block 7.3 - Segment 2: Mid-Market Vanishing
**Timing**: Pause on mid-market carousel card, appears after card transition
**Duration**: 6 seconds
**Action**: FADE OUT → Move to next card

```
⚠️ TIER 2: MID-MARKET (VANISHING)

Price point: $15-35 per person
Examples: Family pho, independent cafes, neighborhood Italian

Why they're dying:
✗ Squeezed between rising costs and price-sensitive customers
✗ Can't compete with chains on price
✗ Can't justify luxury pricing
✗ Lost the "affordable treat" position
✗ Margins too thin to survive shocks

Decline: -42% locations since 2015
This is the "missing middle" of Vancouver dining

The Pho Dilemma:
• 2015: Perfect mid-market food ($8-12)
• 2025: Awkward price point ($14-18)
  - Too expensive for "casual"
  - Too cheap to justify as "premium"
  - Caught in no-man's-land

"We're not fancy enough to charge $25 for pho,
but $16 is already too much for our regulars."
```

### Text Block 7.4 - Segment 3: Chains Expanding
**Timing**: Pause on chains carousel card, appears after card transition
**Duration**: 5 seconds
**Action**: FADE OUT → Continue scroll

```
🏢 TIER 3: CHAINS & FAST-CASUAL (EXPANDING)

Price point: $12-20 per person
Examples: Cactus Club, Earls, Browns, Chipotle, Freshii

Why they're winning:
✓ Economies of scale (bulk purchasing)
✓ Standardized processes (lower labour costs)
✓ Brand recognition (marketing budgets)
✓ Delivery platform negotiations (better rates)
✓ Access to capital (weather downturns)

Growth: +28% locations since 2015

The corporate advantage:
• 30% lower food costs (volume discounts)
• 20% lower labour costs (efficiency)
• Better insurance rates (fleet policies)
• Platform commissions: 18-22% vs 30% for independents

"We can't compete with Cactus Club. They pay what
we pay for rent, but serve 3x the customers."

The independent restaurant is becoming extinct.

[Continue to the conclusion →]
```

---

## **SCENE 8: The Future & Solutions**
**Visual**: Data summary with forward-looking insights

### Text Block 8.1 - Section Header
**Timing**: On scroll into view
**Duration**: Stay visible
**Action**: KEEP ON SCREEN

```
What Comes Next?

The path forward for Vancouver's food scene
```

### Text Block 8.2 - The Projection
**Timing**: Pause scroll, appears after 1.5 seconds
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 8.3

```
📈 2025-2030 PROJECTIONS

If current trends continue:

Restaurant closures:
• Additional 800-1,000 closures expected
• Independent restaurants: -60% by 2030
• Chains/franchises: +40% by 2030

Price increases:
• Average pho bowl: $16 → $22-24
• Mid-range dinner: $25 → $38-45
• Family of 4 dining out: $120 → $180

Market composition (2030):
• High-end/luxury: 15% of market
• Chains/corporate: 65% of market
• Independent: 20% of market (vs 55% in 2015)

Vancouver becomes a city of chains and luxury,
with almost nothing in between.
```

### Text Block 8.3 - Policy Solutions
**Timing**: Replace 8.2
**Duration**: 6 seconds
**Action**: FADE OUT → Replace with 8.4

```
🏛️ POLICY INTERVENTIONS NEEDED

1. DELIVERY PLATFORM REGULATION
• Cap commissions at 15-20% (like NYC, SF)
• Require transparent fee disclosure
• Protect restaurant-customer relationships

2. COMMERCIAL RENT CONTROLS
• Limit annual increases to inflation + 2%
• Protect long-term tenants from displacement
• Vacancy tax on empty commercial spaces

3. INSURANCE REFORM
• Public option for restaurant insurance
• Cap annual premium increases
• Reform liability laws (reduce frivolous claims)

4. TAX INCENTIVES
• GST/PST exemption for small restaurants (<$1M revenue)
• Payroll tax credits for independent operators
• Grant programs for kitchen upgrades/efficiency

5. STREAMLINE PERMITS & LICENSING
• Faster approval processes
• Lower licensing fees for small operators
• Reduce bureaucratic barriers to entry
```

### Text Block 8.4 - Community Action
**Timing**: Replace 8.3
**Duration**: 5 seconds
**Action**: FADE OUT → Replace with 8.5

```
🤝 WHAT WE CAN DO

As consumers:
✓ Order direct from restaurants (not platforms)
✓ Pick up instead of delivery when possible
✓ Support independents over chains
✓ Understand why prices have increased
✓ Tip fairly (it helps offset losses)
✓ Become regulars (loyalty sustains restaurants)

As a community:
✓ Advocate for policy changes
✓ Support restaurant workers' wages
✓ Shop at independent grocery stores
✓ Share positive reviews (free marketing)
✓ Attend community consultations
✓ Vote for pro-small-business candidates

"Every time you choose an independent restaurant,
you're voting for the kind of city you want to live in."
```

### Text Block 8.5 - The Final Message
**Timing**: Replace 8.4
**Duration**: Stay visible
**Action**: KEEP ON SCREEN as final message

```
🥢 THE STICKER SHOCK ISN'T JUST ABOUT PHO

This story isn't about one bowl of noodles.

It's about:
• Economic accessibility
• Cultural diversity in food
• Community gathering spaces
• Small business survival
• The soul of a city

That $7.50 increase represents a fundamental
restructuring of urban life.

The question isn't whether we can afford pho.

The question is: What kind of city do we want to be?

---

Data sources: Statistics Canada, BC Restaurant Association,
City of Vancouver Business Licensing, BC Assessment Authority,
DoorDash/UberEats financial reports, Industry interviews (2024)

Research: Vancouver Restaurant Squeeze Analysis
Story: The Sticker Shock
Built with: Next.js, Framer Motion, Mapbox

© 2025
```

---

## **ANIMATION & TIMING SPECIFICATIONS**

### Scroll-Based Animation Approach
- **NO overlays**: All text blocks are part of the natural scroll flow
- **Animate on scroll**: Text blocks fade in with upward motion as user scrolls
- **Staggered delays**: Each text block has delay (0.6s, 0.8s, etc.) for sequential appearance
- **User control**: User scrolls at their own pace, no forced pauses
- **Progressive disclosure**: Content reveals as you scroll down

### Text Transitions
- **Fade in**: 0.4s ease-out with Y: 32px → 0px motion
- **Entrance delay**: Staggered (0.6s for first block, 0.8s for second, etc.)
- **Stay visible**: All content remains visible once scrolled into view
- **No auto-dismiss**: Content stays on screen, no timed fadeouts

### Visual States
```
ANIMATE IN = Fades in when scrolled into view (one-time animation)
STAY VISIBLE = Remains on screen after animating in
SCROLL FLOW = Part of natural page flow, not overlay
```

### Interactive Elements
- Hoverable data points reveal more detail
- Click/tap statistics for source citations
- Expandable sections for deeper dives
- Share buttons for specific statistics

---

## **CONTENT HIERARCHY**

### Priority Levels
**P0 - Critical**: Must include for story to work
**P1 - Important**: Strongly recommended for depth
**P2 - Enhanced**: Nice-to-have additional context
**P3 - Optional**: Can be cut if space/time limited

Each text block tagged with priority for editing purposes.

---

## **NEXT STEPS**

1. **Review & Refine**: Adjust text blocks based on available data
2. **Design Overlays**: Create visual treatment for text overlays
3. **Timing Tests**: Test scroll pause/resume UX
4. **Data Verification**: Confirm all statistics with sources
5. **User Testing**: Validate reading speed and comprehension
6. **Accessibility**: Add audio descriptions and screen reader support
7. **Mobile Optimization**: Adjust text length/pacing for mobile

---

**Version**: 1.0
**Date**: 2025-01-01
**Status**: Draft for Review
