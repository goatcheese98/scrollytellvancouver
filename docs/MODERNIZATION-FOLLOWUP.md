# Retained source, dependency and static-host follow-up

Baseline: `7e2b31eb5fe598a6ea3ac053e58ccb5fa82f8f05`, on the existing draft PR #1. This follow-up preserves the candidate LUM layout and exact Paper readback; it does not constitute design approval. Earlier checkpoint results in BOUNDARIES.md remain historical.

## Debt inventory

| Area | Before | After |
| --- | --- | --- |
| Full ESLint | 56 errors, 11 warnings | 0 errors, 0 warnings; full lint now gates CI |
| Hook ordering / effects | Conditional useTransform; redundant effect state; omitted dependencies | Unconditional hook; derived gradient; once-in-view text animation with cleanup; complete dependencies |
| Retained UI types | Two explicit any casts; unchecked empty sticky content | Typed div ref and particle resize options; empty-safe content and indexed access |
| Decorative rendering | Math.random during render/hydration | Stable deterministic samples, same 20 decorative particles |
| Production npm audit | 3 findings: critical, high, moderate | 0 findings |
| Full npm audit | 15 affected packages: 1 critical, 11 high, 3 moderate | 5 high affected tooling packages from one unpatched upstream braces advisory |
| Static-host proof | Python generic static export only | Actual local Wrangler/workerd assets runtime, real 404/security/cache/ETag tests plus full reader matrix |

JSX text entities preserve original rendered punctuation. The original source/data/math and synchronous anchor focus repair are retained. The source AST comparison confirms every retained JSX text node renders the original copy. Public asset bytes, historical JSON and `lib/restaurants.ts` remain unchanged. Active reader source, CSS and chapter layout are unchanged by this follow-up. Retained image components use unoptimized Next Image with explicit dimensions or fill, keeping direct asset delivery and avoiding an optimizer/provider requirement.

Full lint ignores generated `.wrangler/`, browser reports/results, and existing Next/export build output. No source directory is excluded, rule disabled, placeholder substituted or type suppression added. Two focused SSR regressions extend the original 13 tests: stable decorative markup and safe empty/populated sticky snapshots.

## Runtime and tooling dependency graph

The [complete source import graph](evidence/source-import-graph.json) records all app/component/library imports and route reachability. The active page/layout reaches ten local TS/TSX modules and only React, Next and self-hosted Geist package imports. Retained Scene8 still consumes `react-map-gl/maplibre` and MapLibre CSS; its native interactive map is not removed simply because it is outside the active reader route. The active reader continues using its provider-free native coordinate plot and text records.

Compatible lockfile fixes include source-map-js **1.2.1 → 1.2.2** (Tailwind/PostCSS path), protocol-buffers-schema **3.6.0 → 3.6.1** (Mapbox → pbf → resolve-protobuf-schema path), humanfs, ajv, brace-expansion, flatted, js-yaml, minimatch and picomatch. These are resolved within existing ranges, without force or overrides. Existing direct dependencies without TS source imports are recorded, not speculatively deleted: some are CSS/build plugins, framework peers or transitive dependencies.

MapLibre **5.10.0 → 6.15.0** fixes [GHSA-jrc7-96c5-q579](https://github.com/advisories/GHSA-jrc7-96c5-q579). Its declared React adapter peer range alone was insufficient proof: the first real Scene8 browser run with react-map-gl 8.1.0 failed reading the changed transform internals (`Cannot read properties of undefined (reading 'center')`). Updating react-map-gl and its adapters to **8.1.3** resolves this; it uses the current transform accessor. The isolated browser fixture bundles the actual retained Scene8, real adapter, real MapLibre and local worker. It supplies an empty local basemap style, intercepts all network requests and checks all five markers, selection/copy, popup close and controlled pan, with no page or console errors. No production fixture route is added. This proves the native consumer mechanics; it does not validate external Carto basemap availability, and no provider request is sent.

Pinned dev tools: Wrangler **4.151.2** (Node >=22) and esbuild **0.28.2** (Node >=18). CI uses Node 24. Tooling is included in the full audit. The initially considered esbuild 0.27.4 was rejected for its audit finding before publication. Next remains 16.4.2 with matching eslint-config-next; React stays 19.2.0. Other available releases were inspected with `npm outdated`, not blindly installed.

Remaining full-audit chain: eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces 3.0.3, [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), stack exhaustion from deeply nested glob patterns. Published braces latest is 3.0.3 and remains affected; npm's proposed “fix” downgrades eslint-config-next to 14.2.35. That would mismatch Next 16 and is not accepted. No override, audit suppression or disabled lint is used. Tooling inputs here are checked-in source/file patterns; this is still genuine upstream dependency debt. Production `npm audit --omit=dev` exits 0; full `npm audit` exits 1 honestly for those five affected package entries.

## Cloudflare assets dry-run

`npm run build:static` exports the actual Next `out/` and then runs typed `scripts/prepare-static.mts`. Preparation requires both exported index.html and 404.html and copies hosting headers; it does not generate substitute page content. `wrangler.jsonc` targets `./out`, uses `404-page` rather than SPA fallback, and declares HTML canonicalization. There is no Worker application script, account identifier, route, domain, credential, secret or remote binding.

`npm run preview:cloudflare` runs Wrangler **--local** on loopback in cloud. Metrics and Request.cf metadata fetching are disabled (`WRANGLER_SEND_METRICS=false`, `CLOUDFLARE_CF_FETCH_ENABLED=false`); no login or remote preview is required. This is a local production-runtime rehearsal, not a deployed site/CDN proof. Edge TLS, actual CDN geography and production account settings remain outside this verification.

Headers include nosniff, DENY/frame-ancestors, referrer and permissions policies, plus a same-origin CSP. Next's static inline bootstrap and React inline styles require unsafe-inline for script/style; no stronger nonce/hash policy is claimed. HTML/data revalidate, original images cache one hour, and existing fingerprinted Next assets cache one year immutable. The first regression caught wildcard immutable headers applying to **missing** chunks; preparation now emits exact rules only for existing fingerprinted assets and fails if the Cloudflare 100-rule limit would be exceeded. Missing routes/assets receive the exported 404 body and status 404 without immutable caching, rather than a successful story shell.

HTTP regressions verify actual file-byte equality, JSON/image MIME types, headers on successful and missing paths, ETag/304 behavior and missing route/JSON/image/chunk responses. The complete reader suite additionally runs under Cloudflare CSP/security headers, including keyboard focus, image failure, no-JS, reduced motion and zoom-equivalent layout. Python and Next-server matrices remain independently available and required in CI.

## Verification and limits

See the draft PR's exact final SHA and Actions runs for published results. Commands and evidence are recorded after the final clean-install verification below. No merge, deployment, package publication, credentials/accounts/domains, provider traffic or historical data changes are authorized or performed. The original Paper canvas PNGs and human approval remain unavailable; saved exact handoffs remain the design source. Model ID and reasoning setting are not exposed to this session.

| Final cloud command | Result |
| --- | --- |
| `npm ci --no-audit --no-fund` | exit 0 |
| `npm run typecheck`, `npm run typecheck:story` | both exit 0 |
| `npm run lint`, `npm run lint:story` | both exit 0; full lint 0 errors / 0 warnings |
| `npm test` | exit 0; original 13 + 2 focused regressions = 15 passing |
| `npm run build` | exit 0 |
| `CI=1 npm run test:browser -- --repeat-each=3` | exit 0; 45 passed |
| `npm run build:static` | exit 0; actual export and headers prepared |
| `CI=1 STORY_STATIC_EXPORT=1 npm run test:browser -- --repeat-each=3 --output=test-results-static` | exit 0; 45 passed |
| `CI=1 npm run test:hosting -- --repeat-each=3` | exit 0; 54 passed (45 reader + 6 HTTP + 3 actual Scene8/MapLibre) |
| `CLOUDFLARE_CF_FETCH_ENABLED=false WRANGLER_SEND_METRICS=false npx wrangler deploy --dry-run --outdir <cloud-work-dir>` | exit 0; read 70 exported files, no bindings, `--dry-run: exiting now` |
| `npm ls --all --json` | exit 0; complete runtime/tooling graph resolved |
| `npm audit --omit=dev --json` / `npm audit --json` | exits 0 / 1; 0 production / 5 upstream tooling package findings |
| Original-source comparison and `git diff --check` | exit 0; active reader/CSS, original public inputs and record/math modules unchanged |

Cloud browser retries remain **0**. All execution uses cloud Chromium; hosted CI installs the locked Playwright Chromium. The [audit snapshot](evidence/dependency-audit.json) records full before/after counts and the remaining upstream advisory, without excluding dev dependencies from the debt report.

Fresh Cloudflare implementation captures: [1440px light](design/screens/cloudflare-opening-1440-light.png), [320px dark](design/screens/cloudflare-opening-320-dark.png). Both are byte-identical to the previous boundary captures. [Retained Scene8 on MapLibre 6](design/screens/legacy-maplibre6.png) is a test-only local basemap fixture, not a proposed product layout or a design approval. Full browser screenshots/traces are retained by the existing Actions artifact (7 days).
