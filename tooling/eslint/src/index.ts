import { noRawColors } from './rules/no-raw-colors.js';
import { noRawSpacing } from './rules/no-raw-spacing.js';
import { preferSemanticToken } from './rules/prefer-semantic-token.js';
import { preferLogicalProperties } from './rules/prefer-logical-properties.js';
import { noUnsafeStyleOverride } from './rules/no-unsafe-style-override.js';

export const rules = {
  'no-raw-colors': noRawColors,
  'no-raw-spacing': noRawSpacing,
  'prefer-semantic-token': preferSemanticToken,
  'prefer-logical-properties': preferLogicalProperties,
  'no-unsafe-style-override': noUnsafeStyleOverride,
};

export const configs = {
  recommended: {
    plugins: {
      '@pine-ui': {
        rules,
      },
    },
    rules: {
      '@pine-ui/no-raw-colors': 'warn',
      '@pine-ui/no-raw-spacing': 'warn',
      '@pine-ui/prefer-semantic-token': 'warn',
      '@pine-ui/prefer-logical-properties': 'error',
      '@pine-ui/no-unsafe-style-override': 'error',
    },
  },
};

const plugin = {
  rules,
  configs,
};

export default plugin;
