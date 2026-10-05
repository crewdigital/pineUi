import type { Rule } from 'eslint';

const PHYSICAL_TO_LOGICAL: Record<string, string> = {
  marginLeft: 'marginInlineStart',
  marginRight: 'marginInlineEnd',
  paddingLeft: 'paddingInlineStart',
  paddingRight: 'paddingInlineEnd',
  left: 'insetInlineStart',
  right: 'insetInlineEnd',
  borderLeft: 'borderInlineStart',
  borderRight: 'borderInlineEnd',
  borderLeftWidth: 'borderInlineStartWidth',
  borderRightWidth: 'borderInlineEndWidth',
  borderLeftColor: 'borderInlineStartColor',
  borderRightColor: 'borderInlineEndColor',
};

export const preferLogicalProperties: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce CSS logical properties over physical properties for automatic bidirectional RTL support',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      useLogicalProperty:
        "Use CSS logical property '{{logical}}' instead of physical property '{{physical}}' to guarantee zero-JS RTL compatibility.",
    },
  },
  create(context) {
    return {
      Property(node) {
        let propName: string | null = null;
        let isIdentifier = false;

        if (node.key.type === 'Identifier') {
          propName = node.key.name;
          isIdentifier = true;
        } else if (node.key.type === 'Literal' && typeof node.key.value === 'string') {
          propName = node.key.value;
        }

        const logical = propName ? PHYSICAL_TO_LOGICAL[propName] : undefined;
        if (propName && logical) {
          context.report({
            node: node.key,
            messageId: 'useLogicalProperty',
            data: { physical: propName, logical },
            fix(fixer) {
              if (isIdentifier) {
                return fixer.replaceText(node.key, logical);
              }
              return fixer.replaceText(node.key, `'${logical}'`);
            },
          });
        }
      },
    };
  },
};
