import { copyFile, access, readFile, writeFile, readdir } from 'node:fs/promises';
// Fail if the actual Next export was not built. Never substitute a SPA fallback.
await Promise.all(['out/index.html', 'out/404.html'].map(path => access(path)));
await copyFile('hosting/_headers', 'out/_headers');
// Exact existing paths avoid giving absent hashed URLs a year-long 404 cache.
const files = await readdir('out/_next/static', { recursive: true, withFileTypes: true });
const rules = files.filter(file => file.isFile()).map(file => {
  const path = `${file.parentPath}/${file.name}`.replace(/^out/, '');
  return `${path}\n  Cache-Control: public, max-age=31536000, immutable\n`;
});
if (rules.length + 5 > 100) throw new Error('Cloudflare _headers rule limit exceeded');
await writeFile('out/_headers', `${await readFile('hosting/_headers', 'utf8')}${rules.sort().join('')}`);
