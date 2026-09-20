#!/usr/bin/env node
import { compileTokens } from './compiler.js';

async function main(): Promise<void> {
  console.log('🚀 Compiling Pine UI DTCG Design Tokens...');
  await compileTokens();
  console.log('✅ Tokens compiled successfully to @pine-ui/stylex and @pine-ui/themes!');
}

main().catch((err) => {
  console.error('❌ Token compiler failed:', err);
  process.exit(1);
});
