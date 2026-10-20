# Vancouver story controls — LUM implementation candidate

[Exact Paper candidate](https://app.paper.design/file/01M5B2XNM0W1XG0A8598FKZZ6R/p-1-0) · [supplied readback](readback.json).
Candidate, not user-approved. The Paper PNG was not attached and is not committed. Screens under `screens/` are cloud Chromium implementation captures, not the Paper export.

## Contract and translation

Read through the GitHub connector on October 19, 2026:

- `goatcheese98/lum-brain/src/styles/design-tokens.ts`, blob `e7e0c2362848c209914a5d9da2bcaa5657b663b8`.
- `src/styles/fonts.ts`, blob `d32cace0ed25de3f8e164b9b2d906ca6e782c0e9`.
- `src/dashboard-shell-css/primitives.ts`, blob `86324ebdaca47f0837b09c774e31a96f4d81b2d5`.
- `src/dashboard-shell-css/shell-chrome.ts`, blob `9678f3e1bf6d00e4f2701b355b8612b2a488574b`.

`app/story.css` uses the canonical semantic palette (`--bg`, `--panel`, `--panel2`, `--line`, `--line2`, `--fg`, `--mut`, `--mut2`, `--acc`, `--on-acc`), light ink/dark gold accent, radius scale and Geist. Geist is self-hosted through the pinned font package; no Google Fonts build or runtime call. Numeric values use Geist Mono. `--mut2` is not used for body text. Dark mode follows the system preference.

Paper layout translated to semantic header/main/article/section/nav, one h1, chapter h2s, real anchors and native inputs/buttons/details. Desktop chapter lane is 272px, gap 64px at >=1024px, body max 720px, opening max 760px, title 30/40px with -.03em tracking, chapter title 24/30px. Page padding is 24/32/48px at <768/768/1024px. No fixed artboard height. The destination spacing tokens and 24px body leading are new aliases from the handoff, not claimed as canonical LUM tokens.

Native 44px control targets enlarge the candidate's compact header. The 768px layout uses a 32px column gap to preserve reading width. Below 768px navigation becomes an in-flow native details element. Candidate narrative sentences are not treated as researched facts: existing Vancouver copy and records supply the story. The nine active legacy scene components map into five chapters; Scene2 was already a null placeholder and Scene6 an empty file.

## Reading behavior and states

All article text and chart tables are server-rendered. There is no asynchronous chart boundary, so prose is never gated by a skeleton. Images reserve their aspect ratio; failed images show an explanation, disable comparison, and leave menu prices/links available. Missing/invalid menu evidence is unavailable rather than zero. A missing/unsafe source URL displays an unavailable label without discarding valid evidence. The local map has a neutral unselected state, explicit selected record and all-records text alternative; it also handles an empty dataset. No fake reading success state.

Motion defaults off. Opt-in affects only a bounded chart transition. Reduced-motion disables the opt-in and removes that transition even if the preference changes mid-session. There are no parallax, scroll traps, Lenis, canvas or WebGL instances on the active route. Explicit chapter/continue links update the fragment natively and focus the destination; scrolling changes the current marker without announcing every chapter. Modified clicks keep native behavior. Reading, tables, original menu links and chapter anchors survive disabled JavaScript.

## Data and dependency boundaries

The original `public/data/sources.json`, menus, research plan and legacy scenes are unchanged. Menu math uses the JSON signature dish: $8.50 -> $17.00, +100%; the old finale's +88% is not repeated. The original cost allocation is explicitly illustrative: 38+38+18+10=104%, not a measured industry average. The delivery illustration totals $35.89 and is not a live order. Delivery policy descriptions retain their 2023/2025 research dates; no claims about today's law or fees were added. Source URLs/dates were retained, not externally re-researched in this implementation.

Original closure records are copied verbatim into typed `lib/restaurants.ts` and identified as historical, unverified records. Conflicting closure dates, aggregate closure totals and unsourced market-growth percentages require editorial research; they are not promoted as new validated findings. Original sources remain in the repository. No costproj data was imported: the separate costproj checkout has no matching menu `sources.json`, and shared authorship is not shared provenance.

Usage audit: the old `lib/lenis.ts` imports `lenis`; `@studio-freight/lenis` has no import. Scene8 imports `react-map-gl/maplibre`/MapLibre; no source imports Mapbox directly. Framer Motion imports remain in legacy components; GSAP and the `motion` package have no direct source imports. The active route uses native controls/CSS and a provider-free coordinate plot with selection instead of a pan/zoom basemap. Legacy scenes and their dependencies remain for separate review, so this is not a full repository migration or package cleanup. No legacy JavaScript was edited; new runtime modules are strict TypeScript with JSON/URL validation. The boundary follow-up adds stricter indexed-access/optional-property checks, constructs normalized menu evidence without a whole-object assertion, and validates map records and local plot extents.

## Hosting

The default Next build/start workflow remains available. `npm run build:static` now verifies standalone Next export into `out/`, including `/index.html`, local font/script/style assets, original menus and `/data/sources.json`. Both the Next server and a separate static-file server pass the 45 browser executions in cloud. No Cloudflare adapter, credential provisioning, domain change, deployment or release is included. See [boundary follow-up](../BOUNDARIES.md) for exact commands and dependency limits.
