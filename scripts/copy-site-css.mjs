/**
 * Copies the kit's compiled stylesheet into dist. The components here write
 * the kit's own class strings, so the kit's site.css styles them, and this
 * package ships that file rather than a stylesheet of its own.
 */

import { copyFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const source = require.resolve('@lyeve-labs/ui-kit/site.css');
const target = fileURLToPath(new URL('../dist/site.css', import.meta.url));

copyFileSync(source, target);
console.log(`dist/site.css: ${statSync(target).size} bytes`);
