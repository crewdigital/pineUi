import * as React from 'react';
import { renderHook } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { useStableId, combineAriaIds } from './aria-linking.js';

describe('useStableId & combineAriaIds', () => {
  it('prefers user override ID over generated React ID', () => {
    const { result } = renderHook(() => useStableId('custom-id'));
    expect(result.current).toBe('custom-id');
  });

  it('generates stable ID when no override is provided', () => {
    const { result } = renderHook(() => useStableId());
    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('string');
  });

  it('combines valid ARIA IDs and filters out undefined/null/empty strings', () => {
    const combined = combineAriaIds('helper-1', undefined, 'error-2', '', false);
    expect(combined).toBe('helper-1 error-2');
  });

  it('returns undefined when no valid IDs are passed to combineAriaIds', () => {
    expect(combineAriaIds(undefined, null, false)).toBeUndefined();
  });
});
