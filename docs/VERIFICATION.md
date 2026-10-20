# Cloud verification — story controls

Source baseline: clean restored checkout at `74ddb78ead6a11c763a5587991c3a06c6a563f00`, confirmed against GitHub `main`. Work branch: `codex/lum-story-controls`. No other repository was changed. All commands and Chromium execution ran in the managed cloud workspace; no local desktop/browser, local credentials or Paper runtime were used.

## Baseline reproduced

- Locked `npm ci`: exit 0, unchanged original lock inputs before focused dependencies.
- `npx tsc --noEmit`: exit 0.
- `npm run lint`: exit 1, 56 errors and 11 warnings in existing scenes/UI.
- `npm run build`: exit 1; Google Inter font download unavailable in restricted cloud. The dev server reproduced the failed font fetch, then served with fallback.
- Chromium at 320px/reduced motion: document width 794px; no h1, chapter nav or keyboard slider; two canvases. Application provider requests were intercepted/blocked during reproduction.

## Final commands

Run with Node 24 and a locked install. `npm run test:browser` starts the built Next app on cloud loopback. This environment used `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`; CI installs Playwright Chromium instead.

| Command | Exit | Result |
| --- | --- | --- |
| `npm ci --no-audit --no-fund` | 0 | Focused Geist and Playwright additions only |
| `npm run typecheck` | 0 | Full strict TypeScript check |
| `npm run lint:story` | 0 | Read-only, zero warnings, all changed TS/TSX and tests |
| `npm test` | 0 | Six meaningful fixture/data/navigation checks |
| `npm run build` | 0 | Production compilation and static prerender |
| `npm run test:browser` | 0 · 45 passed (15 cases × 3) | Cloud Chromium functional matrix |
| `npm run lint` | 1 | Same baseline 56 errors/11 warnings; no added lint issues |
| `git diff --check` | 0 | Patch whitespace check |

The browser matrix covers 320/390/768/1024/1440 CSS px in light and dark, explicit keyboard chapter and continue navigation, fragment/focus/current state, menu Home/End keys, map selection and all-records fallback, zero horizontal overflow, no canvases/running animations under reduced motion, no external requests, and no console/page/HTTP errors on successful paths. Additional tests cover deep links/back history, live motion preference changes, image failure, no JavaScript, and 200% equivalent layout with enlarged text. The zoom check uses the 720 CSS px equivalent of 1440px at 200% plus enlarged text; native browser toolbar zoom is not automated.

The first matrix found an image error before hydration and a stale current marker after returning to the top. Both were fixed and regression checks added. Font variables were moved to the root so LUM font aliases resolve correctly; the matrix asserts Geist inheritance as well as contrast/focus/touch targets. Initial no-JavaScript testing also exposed a test-harness style-injection timeout; the no-JavaScript journey and text/zoom stress test were separated.

CI is bounded to 15 minutes, contents-read permission, locked install, checks/build and Chromium tests with seven-day evidence retention. GitHub-hosted CI results are separate from the cloud results recorded here.

## Review and limits

Reviewed changed code for event cleanup, modified-link behavior, focus/history, runtime validation, integer fee arithmetic, theme contrast, motion preference changes, static content independence, safe source links and provider isolation. No secret values, build output, dependency folders or credentials are committed. Full-repo baseline lint debt remains. The legacy animation scenes/dependencies remain inactive and are not claimed migrated. The candidate PNG is unavailable. Historical closure records and source-policy claims are preserved with dates/limitations, not newly verified. Next server hosting is retained; standalone export/Cloudflare is unverified.

[Implementation screenshots](design/screens/) include opening and cost chapter captures at 320/768/1440px, both themes.

## Hosted focus-race correction

Push run [39335584591](https://github.com/goatcheese98/scrollytellvancouver/actions/runs/39335584591), job 118344152541, failed the 1440px/light menu `Home` assertion: expected 0, received 50. The same-head PR run passed; that duplicate result did not establish correctness.

Cause: `focusFragment` queued `target.focus()` in `requestAnimationFrame` after native anchor navigation already focused the heading. A user/test could focus the menu slider before that queued frame, which then stole focus back to the source heading. The subsequent Home key therefore never reached the slider. A cloud regression holds animation-frame callbacks, navigates to cost references, focuses the slider, then releases the callbacks. It failed on the old code at the slider-focus assertion, exit 1, deterministically.

Correction: focus synchronously during explicit anchor activation, preserving default fragment/history/scroll behavior; no deferred second focus change. The regression verifies focus survives frame release and Home/End still reach 0/100. The matrix also asserts slider focus before sending keys. No sleeps, retries, increased assertion timeouts or skipped checks. CI now runs all 15 browser cases three times (45 executions), with retries explicitly disabled. The corrected cloud run passed all 45 executions (exit 0); full typecheck, changed-code lint, six unit tests and production build also exited 0.

Latest boundary, dependency and standalone-output evidence: [typed boundary follow-up](BOUNDARIES.md). The checkpoint results above remain the historical baseline.
