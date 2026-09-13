import { render as rtlRender, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import axe from 'axe-core';

/**
 * Result interface for Axe accessibility checks.
 */
export interface AccessibilityAuditResult {
  violations: axe.Result[];
  passes: axe.Result[];
  incomplete: axe.Result[];
  inapplicable: axe.Result[];
}

/**
 * Audits a DOM node or rendered container against WCAG 2.2 Level AA accessibility rules.
 */
export async function checkAccessibility(
  container: Element,
  options?: axe.RunOptions,
): Promise<AccessibilityAuditResult> {
  const result = await axe.run(container, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
    },
    ...options,
  });

  return {
    violations: result.violations,
    passes: result.passes,
    incomplete: result.incomplete,
    inapplicable: result.inapplicable,
  };
}

/**
 * Custom render method for React components in test suites.
 */
export function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult {
  return rtlRender(ui, options);
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
