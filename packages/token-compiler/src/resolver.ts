import { primitives, semantics, flattenTokenDocument, type FlatTokenMap } from '@pine-ui/tokens';
import type { ResolvedToken, TokenDictionary, TokenType } from './types.js';

/**
 * Converts a dot-notated token path to a CSS variable name.
 */
export function pathToCssVariable(path: string): string {
  const parts = path.split('.');
  const sanitized = parts.map((p) => p.replace(/([A-Z])/g, '-$1').toLowerCase());
  return `--pine-${sanitized.join('-')}`;
}

/**
 * Converts a dot-notated token path to a camelCase StyleX variable key.
 */
export function pathToStylexKey(path: string): string {
  const parts = path.split('.');
  return parts
    .map((part, index) => {
      const clean = part.replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase());
      if (index === 0) {
        return clean.charAt(0).toLowerCase() + clean.slice(1);
      }
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    })
    .join('');
}

/**
 * Infer token type from path prefix.
 */
export function inferTokenType(path: string): TokenType {
  if (
    path.startsWith('color.') ||
    path.startsWith('background.') ||
    path.startsWith('foreground.') ||
    path.startsWith('border.') ||
    path.startsWith('action.') ||
    path.startsWith('feedback.') ||
    path.startsWith('focus.')
  ) {
    return 'color';
  }
  if (
    path.startsWith('space.') ||
    path.startsWith('radius.') ||
    path.startsWith('font.size.') ||
    path.startsWith('breakpoint.') ||
    path.startsWith('borderWidth.') ||
    path.startsWith('density.')
  ) {
    return 'dimension';
  }
  if (path.startsWith('font.family.')) {
    return 'fontFamily';
  }
  if (path.startsWith('font.weight.')) {
    return 'fontWeight';
  }
  if (path.startsWith('motion.duration.')) {
    return 'duration';
  }
  if (path.startsWith('motion.easing.')) {
    return 'cubicBezier';
  }
  if (path.startsWith('shadow.')) {
    return 'shadow';
  }
  if (
    path.startsWith('layer.') ||
    path.startsWith('opacity.') ||
    path.startsWith('font.lineHeight.')
  ) {
    return 'number';
  }
  return 'custom';
}

/**
 * Recursively resolves alias references with cycle detection.
 */
export function resolveValue(
  value: string | number,
  tokenMap: FlatTokenMap,
  visited = new Set<string>(),
): { resolved: string | number; aliasTarget?: string } {
  if (typeof value !== 'string' || !value.startsWith('{') || !value.endsWith('}')) {
    return { resolved: value };
  }

  const aliasKey = value.slice(1, -1).trim();

  if (visited.has(aliasKey)) {
    throw new Error(
      `Circular token reference detected: ${Array.from(visited).join(' -> ')} -> ${aliasKey}`,
    );
  }

  const targetValue = tokenMap[aliasKey];
  if (targetValue === undefined) {
    throw new Error(`Unresolved token reference: "${value}" (key "${aliasKey}" not found)`);
  }

  visited.add(aliasKey);
  const next = resolveValue(targetValue, tokenMap, visited);
  return { resolved: next.resolved, aliasTarget: aliasKey };
}

/**
 * Builds the complete resolved token dictionary from source token documents.
 */
export function buildTokenDictionary(): TokenDictionary {
  const flatPrimitives: FlatTokenMap = {
    ...flattenTokenDocument(primitives.color),
    ...flattenTokenDocument(primitives.space),
    ...flattenTokenDocument(primitives.radius),
    ...flattenTokenDocument(primitives.typography),
    ...flattenTokenDocument(primitives.elevation),
    ...flattenTokenDocument(primitives.motion),
    ...flattenTokenDocument(primitives.layout),
  };

  const primitiveMap = new Map<string, ResolvedToken>();

  for (const [path, raw] of Object.entries(flatPrimitives)) {
    const rawValue = raw as string | number;
    const { resolved } = resolveValue(rawValue, flatPrimitives);
    primitiveMap.set(path, {
      path,
      name: path,
      type: inferTokenType(path),
      rawValue,
      resolvedValue: resolved,
      cssVariable: pathToCssVariable(path),
      stylexKey: pathToStylexKey(path),
      isAlias: typeof rawValue === 'string' && rawValue.startsWith('{'),
    });
  }

  const resolveSemanticGroup = (doc: Record<string, unknown>): Map<string, ResolvedToken> => {
    const flat = flattenTokenDocument(doc);
    const combined: FlatTokenMap = { ...flatPrimitives, ...flat };
    const map = new Map<string, ResolvedToken>();

    for (const [path, raw] of Object.entries(flat)) {
      const rawValue = raw as string | number;
      const { resolved, aliasTarget } = resolveValue(rawValue, combined);
      map.set(path, {
        path,
        name: path,
        type: inferTokenType(path),
        rawValue,
        resolvedValue: resolved,
        cssVariable: pathToCssVariable(path),
        stylexKey: pathToStylexKey(path),
        isAlias: typeof rawValue === 'string' && rawValue.startsWith('{'),
        aliasTarget,
      });
    }

    return map;
  };

  return {
    primitives: primitiveMap,
    semantics: {
      light: resolveSemanticGroup(semantics.colorLight),
      dark: resolveSemanticGroup(semantics.colorDark),
      highContrast: resolveSemanticGroup(semantics.colorHighContrast),
      space: resolveSemanticGroup(semantics.space),
      typography: resolveSemanticGroup(semantics.typography),
    },
  };
}
