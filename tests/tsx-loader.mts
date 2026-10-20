import { existsSync, readFileSync } from 'node:fs';
import type { ResolveHook, LoadHook } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
export const resolve: ResolveHook = (specifier, context, nextResolve) => {
  if (specifier.startsWith('@/')) {
    const path = specifier.slice(2);
    const file = ['.ts', '.tsx'].map(extension => new URL(path + extension, root)).find(url => existsSync(fileURLToPath(url)));
    if (file) return nextResolve(file.href, context);
  }
  return nextResolve(specifier, context);
};
export const load: LoadHook = (url, context, nextLoad) => {
  if (url.startsWith(root.href) && !url.includes('/node_modules/') && url.endsWith('.tsx')) {
    return {
      format: 'module', shortCircuit: true,
      source: ts.transpileModule(readFileSync(new URL(url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
      }).outputText,
    };
  }
  return nextLoad(url, context);
};
