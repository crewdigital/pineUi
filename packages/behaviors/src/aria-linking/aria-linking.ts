'use client';

import * as React from 'react';

/**
 * Returns a stable ID string. Prefers user-provided override ID over generated React ID.
 */
export function useStableId(overrideId?: string, prefix?: string): string {
  const generatedId = React.useId();
  const id = overrideId ?? generatedId;
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Combines multiple potential ARIA IDs into a space-separated string.
 * Filters out null, undefined, or empty strings.
 */
export function combineAriaIds(
  ...ids: (string | undefined | null | false)[]
): string | undefined {
  const validIds = ids.filter((id): id is string => Boolean(id && typeof id === 'string'));
  return validIds.length > 0 ? validIds.join(' ') : undefined;
}
