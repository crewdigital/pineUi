import type { Rule } from 'eslint';

const IMPORTANT_REGEX = /!important/i;

export const noUnsafeStyleOverride: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow !important and unsafe style overrides that break component CSS encapsulation',
      recommended: true,
    },
    schema: [],
    messages: {
      noImportant:
        "Avoid using '!important' in style definitions. Pine UI architecture relies on CSS specificity determinism.",
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string' && IMPORTANT_REGEX.test(node.value)) {
          context.report({
            node,
            messageId: 'noImportant',
          });
        }
      },
    };
  },
};
