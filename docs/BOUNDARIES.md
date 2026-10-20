# Typed story boundaries and verified output

This follow-up starts at `be8a88295a961ca46984dcd84fa27d21dcf87d42` on the existing draft branch. The remote and restored checkout matched, with no repository AGENTS.md found. The exact Paper readback remains in `docs/design/readback.json`; it is still a candidate without human approval or its original PNG. No new design approval is claimed.

## Before / after debt

| Area | Before | Follow-up |
| --- | --- | --- |
| Handwritten runtime JS | 0 files; active story already TypeScript | Still 0; `allowJs` is now false rather than claiming another JS migration |
| Tool configuration JS | 2 `.mjs` files | Retained in supported Next/PostCSS and ESLint formats; no custom production loader |
| Stronger story diagnostics | 27 with indexed-access, exact optional-property and index-signature checks | 0, enforced by `npm run typecheck:story` in CI |
| Menu boundary | Whole-object `as MenuEvidence`; empty price list/year mismatch accepted | Field-by-field typed construction, nonempty prices, exact 2015–2025 span and normalized nullable safe URLs |
| Chapter targets | Arbitrary string continue targets; valid encoded fragments unresolved by lookup | Closed target union; safe single decoding and malformed-fragment rejection |
| Map boundary | Trusted props, hard-coded count of five and unbounded coordinates | Validated records, unique IDs, actual count and bounded projection; readable records survive missing/out-of-area coordinates |
| Selection lifetime | Selected ID could survive a changed data snapshot | Selection belongs to the normalized snapshot and resets when that snapshot changes |
| Framework security | Next / eslint-config-next 16.0.1 | Compatible Next 16.4.2 / matching config; React 19.2.0, Node 24 and Playwright 1.56.1 peers verified |
| Unused packages | Deprecated duplicate `@studio-freight/lenis` and unused `aceternity-ui` | Removed only after source import search; actual `lenis` hook and local UI source remain |
| Production dependency audit | 25 findings: 2 critical, 18 high, 3 moderate, 2 low | 3 findings: MapLibre critical, source-map-js high, protocol-buffers-schema moderate |
| Deployment output | Next prerender proven; standalone export unverified | Both default Next server and standalone `out/` export verified in cloud |
| Full legacy lint | 56 errors / 11 warnings | Unchanged; no checks disabled or suppressions added |

The stricter baseline exited 2 with 27 diagnostics; original full typecheck and scoped lint exited 0. New encoded-fragment and empty-price-list regressions failed on the old implementation (unit exit 1). The unsafe whole-object assertion is removed, not moved into a wrapper. New guards construct the exact values they validate, without coercing missing numbers to zero.

The historical `public/` inputs and `lib/restaurants.ts` are unchanged. Original math remains 100% signature-dish increase, 104% illustrative costs and $35.89 delivery order. Missing or out-of-area coordinates never produce an off-canvas pin; the text fallback opens when records/locations are incomplete. Malformed record collections produce an unavailable state instead of throwing. Duplicate IDs cannot create ambiguous selection or React keys. Native chapter anchors and the synchronous focus repair remain intact.

## Verification

| Command | Result |
| --- | --- |
| Locked `npm ci --no-audit --no-fund` | exit 0 |
| `npm run typecheck` | exit 0; native `next typegen` then full TypeScript check |
| `npm run typecheck:story` | exit 0; 27 stronger diagnostics reduced to 0 |
| `npm run lint:story` | exit 0; expanded to new modules, tests and Next config |
| `npm test` | exit 0; 13 parser, arithmetic, navigation and actual component-render tests |
| `npm run build` | exit 0; default Next build |
| `CI=1 npm run test:browser -- --repeat-each=3` | exit 0; 45 executions against the Next server |
| `npm run build:static` | exit 0; native Next export |
| `CI=1 STORY_STATIC_EXPORT=1 npm run test:browser -- --repeat-each=3 --output=test-results-static` | exit 0; 45 executions against exported files |
| `npm ls next react react-dom geist @playwright/test typescript` | exit 0; compatible installed peers |
| `npm audit --omit=dev --json` | exit 1; remaining 3 advisories recorded, not hidden |
| `npm run lint` | exit 1; unchanged 56 legacy errors / 11 warnings |

Cloud Chromium uses `/usr/bin/chromium`; hosted CI installs the locked Playwright browser. Retries remain disabled. All 15 cases run three times per hosting mode: five widths/both themes, keyboard/focus/contrast, menu input, map selection, history/deep links (including encoded fragments), image failure, no-JavaScript reading, zoom-equivalent layout and the deterministic delayed-frame focus regression. No provider calls, desktop browser, local credentials, deployment or release are involved.

Actual component rendering tests use the existing TypeScript compiler through a test-only Node loader to exercise malformed/empty/partial/duplicate map props. No runner dependency, generated JS or production test route was added. The Next upgrade exposed four stale generated `.next` type errors; the old generated cache was preserved outside the repository and current types regenerated. The typecheck command now regenerates route types before checking instead of editing or suppressing generated errors.

Current implementation captures: [desktop/light](design/screens/boundaries-opening-1440-light.png) and [mobile/dark](design/screens/boundaries-opening-320-dark.png). Both are fresh cloud captures and byte-identical to the prior checkpoint, confirming the default visual presentation is unchanged. They are application screenshots, not the missing original Paper PNG.

## Output and remaining limits

`npm run build:static` produces `out/index.html`, `out/404.html`, local `_next/static/` assets, menus and `/data/sources.json`. The exported source JSON is byte-identical to the original. A generic static-file host can serve this directory without a Next server or adapter. Python is used only as the cloud test preview server. The default Next build/start workflow remains available; rebuild normally before `npm start` after an export because both modes regenerate `.next/`.

CI runs both 45-execution matrices within the existing 15-minute bound and retains screenshots under both test-results directories. No Cloudflare adapter/configuration, provider provisioning, domain change or production deployment was performed.

MapLibre's audit-recommended fix is a major 5.x-to-6.x update; it is not silently applied to archived map code. Remaining dependency advisories and legacy lint/source migrations need separately scoped work; the audit is not claimed clean. The original Paper PNG and human design approval remain unavailable. The implementation has no credential or human-approval blocker for its tested boundary/output slice.
