/* eslint-disable @pine-ui/no-emoji-icons */
import { describe, it } from 'vitest';
import { RuleTester } from 'eslint';
import { noRawColors } from './rules/no-raw-colors.js';
import { noRawSpacing } from './rules/no-raw-spacing.js';
import { preferSemanticToken } from './rules/prefer-semantic-token.js';
import { preferLogicalProperties } from './rules/prefer-logical-properties.js';
import { noUnsafeStyleOverride } from './rules/no-unsafe-style-override.js';
import { noEmojiIcons } from './rules/no-emoji-icons.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
});

describe('@pine-ui/eslint-plugin', () => {
  it('no-raw-colors', () => {
    ruleTester.run('no-raw-colors', noRawColors, {
      valid: [
        { code: "const styles = { color: 'var(--pine-color-text-primary)' };" },
        { code: "const val = 'not-a-color';" },
      ],
      invalid: [
        {
          code: "const styles = { color: '#ffffff' };",
          errors: [{ messageId: 'noRawColor' }],
        },
        {
          code: "const styles = { bg: 'rgb(255, 0, 0)' };",
          errors: [{ messageId: 'noRawColor' }],
        },
        {
          code: "const styles = { fill: 'rgba(0, 0, 0, 0.5)' };",
          errors: [{ messageId: 'noRawColor' }],
        },
      ],
    });
  });

  it('no-raw-spacing', () => {
    ruleTester.run('no-raw-spacing', noRawSpacing, {
      valid: [
        { code: "const styles = { margin: 'var(--pine-space-4)' };" },
        { code: "const styles = { width: '16px' };" },
      ],
      invalid: [
        {
          code: "const styles = { margin: '16px' };",
          errors: [{ messageId: 'noRawSpacing' }],
        },
        {
          code: "const styles = { paddingLeft: '24px' };",
          errors: [{ messageId: 'noRawSpacing' }],
        },
        {
          code: "const styles = { gap: '8px' };",
          errors: [{ messageId: 'noRawSpacing' }],
        },
      ],
    });
  });

  it('prefer-semantic-token', () => {
    ruleTester.run('prefer-semantic-token', preferSemanticToken, {
      valid: [
        { code: "const token = 'action.primary.background';" },
        { code: "const name = 'blue';" },
      ],
      invalid: [
        {
          code: "const token = 'color.blue.600';",
          errors: [{ messageId: 'preferSemantic' }],
        },
        {
          code: "const token = 'colors.neutral.50';",
          errors: [{ messageId: 'preferSemantic' }],
        },
      ],
    });
  });

  it('prefer-logical-properties', () => {
    ruleTester.run('prefer-logical-properties', preferLogicalProperties, {
      valid: [
        { code: "const styles = { marginInlineStart: '16px' };" },
        { code: "const styles = { paddingInlineEnd: '8px' };" },
        { code: "const styles = { insetInlineStart: 0 };" },
      ],
      invalid: [
        {
          code: "const styles = { marginLeft: 16 };",
          output: "const styles = { marginInlineStart: 16 };",
          errors: [{ messageId: 'useLogicalProperty' }],
        },
        {
          code: "const styles = { paddingRight: 8 };",
          output: "const styles = { paddingInlineEnd: 8 };",
          errors: [{ messageId: 'useLogicalProperty' }],
        },
        {
          code: "const styles = { left: 0 };",
          output: "const styles = { insetInlineStart: 0 };",
          errors: [{ messageId: 'useLogicalProperty' }],
        },
      ],
    });
  });

  it('no-unsafe-style-override', () => {
    ruleTester.run('no-unsafe-style-override', noUnsafeStyleOverride, {
      valid: [
        { code: "const styles = { color: 'red' };" },
        { code: "const note = 'This is important text';" },
      ],
      invalid: [
        {
          code: "const styles = { color: 'red !important' };",
          errors: [{ messageId: 'noImportant' }],
        },
      ],
    });
  });

  it('no-emoji-icons', () => {
    ruleTester.run('no-emoji-icons', noEmojiIcons, {
      valid: [
        { code: "const label = 'Search';" },
        { code: "const element = '<SearchIcon />';" },
        { code: "const shortcut = 'Ctrl+K';" },
      ],
      invalid: [
        {
          code: "const icon = '🔍';",
          errors: [{ messageId: 'noEmojiIcon' }],
        },
        {
          code: "const button = '📅 Calendar';",
          errors: [{ messageId: 'noEmojiIcon' }],
        },
        {
          code: "const close = '✕';",
          errors: [{ messageId: 'noEmojiIcon' }],
        },
      ],
    });
  });
});
