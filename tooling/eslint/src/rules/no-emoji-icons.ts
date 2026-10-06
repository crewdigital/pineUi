import type { Rule } from 'eslint';

// Regex detecting emojis, ASCII/Unicode symbol icons (e.g. 🔍, 📅, ✕, ★, ✓, ⌘, etc.)
const EMOJI_AND_UNICODE_ICON_REGEX =
  /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{2B50}-\u{2B55}]|[\u{2300}-\u{23FF}]|[✕✖✗✓✔★☆♥❤☰⚙🔍📅⌘↑↓↵]/u;

export const noEmojiIcons: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow emojis, ASCII glyphs, and Unicode icon symbols in favor of @pine-ui/icons or accessible text',
      recommended: true,
    },
    schema: [],
    messages: {
      noEmojiIcon:
        'Avoid using emoji or Unicode icon symbol "{{found}}". Use SVG icons from @pine-ui/icons or clean accessible text instead.',
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string' && EMOJI_AND_UNICODE_ICON_REGEX.test(node.value)) {
          const match = node.value.match(EMOJI_AND_UNICODE_ICON_REGEX);
          context.report({
            node,
            messageId: 'noEmojiIcon',
            data: { found: match ? match[0] : node.value },
          });
        }
      },
      JSXText(node: Rule.Node) {
        const textNode = node as unknown as { value?: string };
        if (typeof textNode.value === 'string' && EMOJI_AND_UNICODE_ICON_REGEX.test(textNode.value)) {
          const match = textNode.value.match(EMOJI_AND_UNICODE_ICON_REGEX);
          context.report({
            node,
            messageId: 'noEmojiIcon',
            data: { found: match ? match[0] : textNode.value.trim() },
          });
        }
      },
    };
  },
};
