import { describe, it, expect } from 'vitest';
import {
  primitives,
  semantics,
  flattenTokenDocument,
  resolveTokenAlias,
  TokenDocumentSchema,
  TOKEN_FORMAT,
  TOKEN_SPEC_VERSION,
} from './index.js';

describe('@pine-ui/tokens Specification', () => {
  it('exports valid metadata', () => {
    expect(TOKEN_FORMAT).toBe('DTCG');
    expect(TOKEN_SPEC_VERSION).toBe('1.0.0');
  });

  describe('DTCG Schema Validation', () => {
    it('validates primitive color tokens against DTCG schema', () => {
      const parsed = TokenDocumentSchema.safeParse(primitives.color);
      expect(parsed.success).toBe(true);
    });

    it('validates primitive space tokens against DTCG schema', () => {
      const parsed = TokenDocumentSchema.safeParse(primitives.space);
      expect(parsed.success).toBe(true);
    });

    it('validates primitive radius tokens against DTCG schema', () => {
      const parsed = TokenDocumentSchema.safeParse(primitives.radius);
      expect(parsed.success).toBe(true);
    });

    it('validates primitive typography tokens against DTCG schema', () => {
      const parsed = TokenDocumentSchema.safeParse(primitives.typography);
      expect(parsed.success).toBe(true);
    });

    it('validates primitive elevation & motion tokens against DTCG schema', () => {
      expect(TokenDocumentSchema.safeParse(primitives.elevation).success).toBe(true);
      expect(TokenDocumentSchema.safeParse(primitives.motion).success).toBe(true);
      expect(TokenDocumentSchema.safeParse(primitives.layout).success).toBe(true);
    });

    it('validates semantic theme tokens against DTCG schema', () => {
      expect(TokenDocumentSchema.safeParse(semantics.colorLight).success).toBe(true);
      expect(TokenDocumentSchema.safeParse(semantics.colorDark).success).toBe(true);
      expect(TokenDocumentSchema.safeParse(semantics.colorHighContrast).success).toBe(true);
      expect(TokenDocumentSchema.safeParse(semantics.space).success).toBe(true);
      expect(TokenDocumentSchema.safeParse(semantics.typography).success).toBe(true);
    });
  });

  describe('Token Flattening & Reference Resolution', () => {
    const flatPrimitives = {
      ...flattenTokenDocument(primitives.color),
      ...flattenTokenDocument(primitives.space),
      ...flattenTokenDocument(primitives.radius),
      ...flattenTokenDocument(primitives.typography),
      ...flattenTokenDocument(primitives.elevation),
      ...flattenTokenDocument(primitives.motion),
      ...flattenTokenDocument(primitives.layout),
    };

    it('flattens primitive tokens correctly', () => {
      expect(flatPrimitives['color.neutral.50']).toBe('#f9fafb');
      expect(flatPrimitives['color.blue.600']).toBe('#2563eb');
      expect(flatPrimitives['space.4']).toBe('16px');
      expect(flatPrimitives['radius.md']).toBe('6px');
      expect(flatPrimitives['font.size.md']).toBe('16px');
    });

    it('resolves semantic light color aliases to primitive values without error', () => {
      const flatLight = flattenTokenDocument(semantics.colorLight);
      const combinedMap = { ...flatPrimitives, ...flatLight };

      for (const [_key, value] of Object.entries(flatLight)) {
        const resolved = resolveTokenAlias(value, combinedMap);
        expect(resolved).toBeDefined();
        expect(typeof resolved === 'string' && resolved.startsWith('{')).toBe(false);
      }
    });

    it('resolves semantic dark color aliases correctly', () => {
      const flatDark = flattenTokenDocument(semantics.colorDark);
      const combinedMap = { ...flatPrimitives, ...flatDark };

      expect(resolveTokenAlias(flatDark['background.surface']!, combinedMap)).toBe('#111827');
      expect(resolveTokenAlias(flatDark['foreground.primary']!, combinedMap)).toBe('#f9fafb');
    });

    it('resolves semantic high contrast color aliases correctly', () => {
      const flatHC = flattenTokenDocument(semantics.colorHighContrast);
      const combinedMap = { ...flatPrimitives, ...flatHC };

      expect(resolveTokenAlias(flatHC['foreground.primary']!, combinedMap)).toBe('#000000');
    });

    it('detects and throws on circular token references', () => {
      const circularMap = {
        'token.a': '{token.b}',
        'token.b': '{token.c}',
        'token.c': '{token.a}',
      };

      expect(() => resolveTokenAlias('{token.a}', circularMap)).toThrowError(
        /Circular token reference detected/,
      );
    });

    it('detects and throws on missing token references', () => {
      const map = {
        'token.a': '{non.existent.token}',
      };

      expect(() => resolveTokenAlias('{token.a}', map)).toThrowError(/Unresolved token reference/);
    });
  });
});
