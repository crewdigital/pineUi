import type { Rule } from 'eslint';

const SPACING_PROPERTIES = new Set([
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
  'gap',
  'rowGap',
  'columnGap',
]);

const RAW_PX_REGEX = /^-?\d+(?:\.\d+)?px$/;

export const noRawSpacing: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow raw spacing pixel values in favor of design system spacing tokens',
      recommended: true,
    },
    schema: [],
    messages: {
      noRawSpacing:
        "Avoid using raw spacing value '{{value}}' for property '{{prop}}'. Use Pine UI spacing tokens instead.",
    },
  },
  create(context) {
    return {
      Property(node) {
        let propName: string | null = null;
        if (node.key.type === 'Identifier') {
          propName = node.key.name;
        } else if (node.key.type === 'Literal' && typeof node.key.value === 'string') {
          propName = node.key.value;
        }

        if (!propName || !SPACING_PROPERTIES.has(propName)) {
          return;
        }

        if (node.value.type === 'Literal') {
          const val = String(node.value.value).trim();
          if (RAW_PX_REGEX.test(val)) {
            context.report({
              node: node.value,
              messageId: 'noRawSpacing',
              data: { prop: propName, value: val },
            });
          }
        }
      },
    };
  },
};
