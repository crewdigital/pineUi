/**
 * @pine-ui/token-compiler
 * Deterministic compiler from DTCG JSON tokens to StyleX & CSS variables.
 */

export interface CompilerConfig {
  sourceDir: string;
  outputDir: string;
}

export function compileTokens(_config: CompilerConfig): Promise<void> {
  // Compiler core will be implemented in Phase 3
  return Promise.resolve();
}
