import type { Rule } from 'eslint';

const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB_OR_HSL_REGEX = /^(?:rgb|rgba|hsl|hsla)\(/i;

export const noRawColors: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow raw hardcoded colors in favor of Pine UI design tokens',
      recommended: true,
    },
    schema: [],
    messages: {
      noRawColor:
        "Avoid using raw color string '{{value}}'. Use semantic color tokens from @pine-ui/stylex or CSS variables instead.",
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          const val = node.value.trim();
          if (HEX_COLOR_REGEX.test(val) || RGB_OR_HSL_REGEX.test(val)) {
            context.report({
              node,
              messageId: 'noRawColor',
              data: { value: val },
            });
          }
        }
      },
    };
  },
};
