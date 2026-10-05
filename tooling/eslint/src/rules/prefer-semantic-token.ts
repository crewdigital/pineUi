import type { Rule } from 'eslint';

const PRIMITIVE_PALETTE_REGEX = /\b(?:colors?\.(?:blue|red|green|yellow|slate|gray|neutral)\.\d+|color\.(?:blue|red|green|yellow|neutral)\.\d+)\b/i;

export const preferSemanticToken: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer context-aware semantic tokens over raw primitive palette scales',
      recommended: true,
    },
    schema: [],
    messages: {
      preferSemantic:
        "Avoid directly referencing primitive palette '{{token}}'. Use semantic tokens (e.g., action.primary, feedback.danger, surface.background) instead.",
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          const match = node.value.match(PRIMITIVE_PALETTE_REGEX);
          if (match) {
            context.report({
              node,
              messageId: 'preferSemantic',
              data: { token: match[0] },
            });
          }
        }
      },
    };
  },
};
