import { register } from 'node:module';
// Test-only JSX loading uses the existing TypeScript compiler; no emitted JS or extra runner.
register(new URL('./tsx-loader.mts', import.meta.url));
