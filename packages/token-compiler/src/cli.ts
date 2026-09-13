#!/usr/bin/env node
import { compileTokens } from './index.js';

async function run(): Promise<void> {
  await compileTokens({
    sourceDir: './packages/tokens/src',
    outputDir: './packages/stylex/src',
  });
}

run().catch((error) => {
  console.error('Compiler error:', error);
  process.exit(1);
});
