#!/usr/bin/env node
import { compileTokens } from './compiler.js';

async function main(): Promise<void> {
  console.log('[Pine UI] Compiling DTCG Design Tokens...');
  await compileTokens();
  console.log('[Pine UI] Tokens compiled successfully to @pine-ui/stylex and @pine-ui/themes.');
}

main().catch((err) => {
  console.error('[Pine UI] Token compiler failed:', err);
  process.exit(1);
});
