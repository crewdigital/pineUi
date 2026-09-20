import { describe, it, expect } from 'vitest';
import {
  pathToCssVariable,
  pathToStylexKey,
  inferTokenType,
  buildTokenDictionary,
  generateStylexVars,
  generateBaseCss,
  generateDarkSchemeCss,
  generateHighContrastSchemeCss,
  generateDensityCss,
  compileTokens,
} from './index.js';

describe('@pine-ui/token-compiler', () => {
  describe('Path & String Transformers', () => {
    it('converts token paths to valid CSS variables', () => {
      expect(pathToCssVariable('color.neutral.50')).toBe('--pine-color-neutral-50');
      expect(pathToCssVariable('background.canvas')).toBe('--pine-background-canvas');
      expect(pathToCssVariable('action.primary.hover')).toBe('--pine-action-primary-hover');
    });

    it('converts token paths to camelCase StyleX variable keys', () => {
      expect(pathToStylexKey('color.neutral.50')).toBe('colorNeutral50');
      expect(pathToStylexKey('background.canvas')).toBe('backgroundCanvas');
      expect(pathToStylexKey('action.primary.hover')).toBe('actionPrimaryHover');
    });

    it('infers token types accurately', () => {
      expect(inferTokenType('color.blue.500')).toBe('color');
      expect(inferTokenType('background.surface')).toBe('color');
      expect(inferTokenType('space.4')).toBe('dimension');
      expect(inferTokenType('radius.md')).toBe('dimension');
      expect(inferTokenType('font.family.sans')).toBe('fontFamily');
      expect(inferTokenType('font.weight.bold')).toBe('fontWeight');
      expect(inferTokenType('motion.duration.fast')).toBe('duration');
      expect(inferTokenType('motion.easing.standard')).toBe('cubicBezier');
      expect(inferTokenType('shadow.md')).toBe('shadow');
      expect(inferTokenType('layer.modal')).toBe('number');
    });
  });

  describe('AST Resolution & Dictionaries', () => {
    const dict = buildTokenDictionary();

    it('builds primitive dictionary with resolved values', () => {
      expect(dict.primitives.size).toBeGreaterThan(30);
      const blue600 = dict.primitives.get('color.blue.600');
      expect(blue600).toBeDefined();
      expect(blue600?.resolvedValue).toBe('#2563eb');
      expect(blue600?.cssVariable).toBe('--pine-color-blue-600');
    });

    it('builds semantic light dictionary with resolved aliases', () => {
      const bgCanvas = dict.semantics.light.get('background.canvas');
      expect(bgCanvas).toBeDefined();
      expect(bgCanvas?.resolvedValue).toBe('#f9fafb');
      expect(bgCanvas?.isAlias).toBe(true);
      expect(bgCanvas?.aliasTarget).toBe('color.neutral.50');
    });

    it('builds semantic dark dictionary with resolved aliases', () => {
      const bgCanvas = dict.semantics.dark.get('background.canvas');
      expect(bgCanvas).toBeDefined();
      expect(bgCanvas?.resolvedValue).toBe('#030712');
    });
  });

  describe('Code Generators', () => {
    const dict = buildTokenDictionary();

    it('generates valid StyleX defineVars TypeScript code', () => {
      const code = generateStylexVars(dict);
      expect(code).toContain("import * as stylex from '@stylexjs/stylex';");
      expect(code).toContain('export const vars = stylex.defineVars({');
      expect(code).toContain('backgroundCanvas:');
      expect(code).toContain('colorBlue600:');
      expect(code).toContain('export const tokens = vars;');
    });

    it('generates valid base CSS stylesheet', () => {
      const css = generateBaseCss(dict);
      expect(css).toContain(':root {');
      expect(css).toContain('--pine-color-blue-600: #2563eb;');
      expect(css).toContain('--pine-background-canvas: #f9fafb;');
    });

    it('generates dark scheme CSS stylesheet', () => {
      const css = generateDarkSchemeCss(dict);
      expect(css).toContain('[data-scheme="dark"], .theme-dark {');
      expect(css).toContain('--pine-background-canvas: #030712;');
    });

    it('generates high contrast scheme CSS stylesheet', () => {
      const css = generateHighContrastSchemeCss(dict);
      expect(css).toContain('[data-scheme="high-contrast"], .theme-high-contrast {');
      expect(css).toContain('--pine-foreground-primary: #000000;');
    });

    it('generates density CSS stylesheet', () => {
      const css = generateDensityCss(dict);
      expect(css).toContain('[data-density="compact"]');
      expect(css).toContain('[data-density="default"]');
      expect(css).toContain('[data-density="comfortable"]');
    });
  });

  describe('End-to-End Compiler Execution', () => {
    it('executes compiler pipeline without error', async () => {
      await expect(compileTokens()).resolves.toBeUndefined();
    });
  });
});
