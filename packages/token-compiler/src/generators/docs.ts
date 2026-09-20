import type { TokenDictionary } from '../types.js';

/**
 * Generates a complete JSON metadata object describing every token.
 */
export function generateTokenMetadata(dict: TokenDictionary): Record<string, unknown> {
  const metadata: Record<string, unknown> = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    primitives: {},
    semantics: {
      light: {},
      dark: {},
      highContrast: {},
    },
  };

  const primitivesObj: Record<string, unknown> = {};
  for (const [path, token] of dict.primitives.entries()) {
    primitivesObj[path] = {
      name: token.name,
      type: token.type,
      rawValue: token.rawValue,
      resolvedValue: token.resolvedValue,
      cssVariable: token.cssVariable,
      stylexKey: token.stylexKey,
    };
  }
  metadata.primitives = primitivesObj;

  const semanticsObj: Record<string, unknown> = {};
  for (const [path, token] of dict.semantics.light.entries()) {
    semanticsObj[path] = {
      name: token.name,
      type: token.type,
      rawValue: token.rawValue,
      resolvedValue: token.resolvedValue,
      cssVariable: token.cssVariable,
      stylexKey: token.stylexKey,
      aliasTarget: token.aliasTarget,
    };
  }
  (metadata.semantics as Record<string, unknown>).light = semanticsObj;

  return metadata;
}

/**
 * Generates a Markdown reference table of all semantic tokens.
 */
export function generateTokenMarkdownTable(dict: TokenDictionary): string {
  const lines: string[] = [
    '# Design Token Reference Table',
    '',
    '| Token Path | CSS Variable | StyleX Property | Light Value | Dark Value |',
    '|---|---|---|---|---|',
  ];

  for (const [path, lightToken] of dict.semantics.light.entries()) {
    const darkToken = dict.semantics.dark.get(path);
    const darkVal = darkToken ? darkToken.resolvedValue : '-';
    lines.push(
      `| \`${path}\` | \`${lightToken.cssVariable}\` | \`vars.${lightToken.stylexKey}\` | \`${lightToken.resolvedValue}\` | \`${darkVal}\` |`,
    );
  }

  lines.push('');
  return lines.join('\n');
}
