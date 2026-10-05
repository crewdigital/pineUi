import axe, { type RunOptions, type AxeResults, type Result } from 'axe-core';

export class AccessibilityViolationError extends Error {
  public readonly violations: Result[];

  constructor(violations: Result[]) {
    const formatted = violations
      .map((v) => {
        const nodesSummary = v.nodes
          .map((n) => `    - Target: ${n.target.join(' ')}\n      HTML: ${n.html}`)
          .join('\n');
        return `[WCAG Violation] [${v.impact?.toUpperCase() ?? 'UNKNOWN'}] Rule: ${v.id}\n  Help: ${v.help} (${v.helpUrl})\n  Nodes:\n${nodesSummary}`;
      })
      .join('\n\n');

    super(`Found ${violations.length} accessibility violation(s):\n\n${formatted}`);
    this.name = 'AccessibilityViolationError';
    this.violations = violations;
  }
}

export const DEFAULT_AXE_OPTIONS: RunOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
  },
};

export async function auditAccessibility(
  element: Element,
  options: RunOptions = DEFAULT_AXE_OPTIONS
): Promise<AxeResults> {
  return axe.run(element, options);
}

export async function assertNoA11yViolations(
  element: Element,
  options: RunOptions = DEFAULT_AXE_OPTIONS
): Promise<void> {
  const results = await auditAccessibility(element, options);
  if (results.violations.length > 0) {
    throw new AccessibilityViolationError(results.violations);
  }
}
