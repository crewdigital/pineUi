import primitiveColor from './primitives/color.json' with { type: 'json' };
import primitiveSpace from './primitives/space.json' with { type: 'json' };
import primitiveRadius from './primitives/radius.json' with { type: 'json' };
import primitiveTypography from './primitives/typography.json' with { type: 'json' };
import primitiveElevation from './primitives/elevation.json' with { type: 'json' };
import primitiveMotion from './primitives/motion.json' with { type: 'json' };
import primitiveLayout from './primitives/layout.json' with { type: 'json' };

import semanticColorLight from './semantics/color-light.json' with { type: 'json' };
import semanticColorDark from './semantics/color-dark.json' with { type: 'json' };
import semanticColorHighContrast from './semantics/color-high-contrast.json' with { type: 'json' };
import semanticSpace from './semantics/space.json' with { type: 'json' };
import semanticTypography from './semantics/typography.json' with { type: 'json' };

export * from './schema.js';

export const primitives = {
  color: primitiveColor,
  space: primitiveSpace,
  radius: primitiveRadius,
  typography: primitiveTypography,
  elevation: primitiveElevation,
  motion: primitiveMotion,
  layout: primitiveLayout,
};

export const semantics = {
  colorLight: semanticColorLight,
  colorDark: semanticColorDark,
  colorHighContrast: semanticColorHighContrast,
  space: semanticSpace,
  typography: semanticTypography,
};

export interface FlatTokenMap {
  [path: string]: string | number;
}

/**
 * Flattens a nested DTCG token document into dot-notated paths.
 */
export function flattenTokenDocument(doc: Record<string, unknown>, prefix = ''): FlatTokenMap {
  const result: FlatTokenMap = {};

  for (const [key, value] of Object.entries(doc)) {
    if (key.startsWith('$')) continue;

    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object') {
      if ('$value' in value) {
        result[currentPath] = (value as { $value: string | number }).$value;
      } else {
        Object.assign(result, flattenTokenDocument(value as Record<string, unknown>, currentPath));
      }
    }
  }

  return result;
}

/**
 * Resolves token aliases (e.g. `{color.blue.600}`) against a flat token dictionary.
 */
export function resolveTokenAlias(
  value: string | number,
  tokenMap: FlatTokenMap,
  visited = new Set<string>(),
): string | number {
  if (typeof value !== 'string' || !value.startsWith('{') || !value.endsWith('}')) {
    return value;
  }

  const aliasKey = value.slice(1, -1).trim();

  if (visited.has(aliasKey)) {
    throw new Error(
      `Circular token reference detected: ${Array.from(visited).join(' -> ')} -> ${aliasKey}`,
    );
  }

  const resolved = tokenMap[aliasKey];
  if (resolved === undefined) {
    throw new Error(`Unresolved token reference: "${value}" (key "${aliasKey}" not found)`);
  }

  visited.add(aliasKey);
  return resolveTokenAlias(resolved, tokenMap, visited);
}

export const TOKEN_SPEC_VERSION = '1.0.0';
export const TOKEN_FORMAT = 'DTCG';
