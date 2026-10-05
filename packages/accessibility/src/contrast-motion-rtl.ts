export interface ThemeAccessibilityAudit {
  isHighContrast: boolean;
  respectsReducedMotion: boolean;
  isRtl: boolean;
}

export function verifyThemeMode(container: Element, expectedTheme: string): boolean {
  const themeAttr =
    container.getAttribute('data-theme') ??
    container.closest('[data-theme]')?.getAttribute('data-theme') ??
    document.documentElement.getAttribute('data-theme');

  return themeAttr === expectedTheme;
}

export function verifyRtlDirection(container: Element): boolean {
  const dir =
    container.getAttribute('dir') ??
    container.closest('[dir]')?.getAttribute('dir') ??
    document.documentElement.getAttribute('dir');

  return dir === 'rtl';
}

export function inspectLogicalProperties(element: HTMLElement): {
  usesLogicalMargin: boolean;
  usesLogicalPadding: boolean;
} {
  const style = window.getComputedStyle(element);
  return {
    usesLogicalMargin: style.marginInlineStart !== undefined,
    usesLogicalPadding: style.paddingInlineStart !== undefined,
  };
}
