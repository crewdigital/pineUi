import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { calculateMetrics, benchmarkMount, benchmarkScale } from './harness.js';
import { PERFORMANCE_BUDGETS, assertPerformanceBudget, PerformanceRegressionError } from './budgets.js';
import { validatePackageTreeShaking } from './tree-shaking.js';
import { Box } from '@pine-ui/primitives/box';
import { Button } from '@pine-ui/react/button';

describe('@pine-ui/performance Harness', () => {
  it('calculates statistical metrics correctly', () => {
    const samples = [10, 20, 30, 40, 50];
    const metrics = calculateMetrics(samples);

    expect(metrics.mean).toBe(30);
    expect(metrics.median).toBe(30);
    expect(metrics.min).toBe(10);
    expect(metrics.max).toBe(50);
    expect(metrics.p95).toBe(50);
    expect(metrics.stdDev).toBeGreaterThan(0);
  });

  it('measures mounting of Level 1 primitives without leaking DOM nodes', () => {
    const initialDomCount = document.body.children.length;

    const result = benchmarkMount(
      'Box Primitive',
      () => <Box data-testid="bench-box">Performance Test</Box>,
      1,
      { iterations: 5, warmup: 1 }
    );

    expect(result.name).toBe('Box Primitive');
    expect(result.count).toBe(1);
    expect(result.mount.samples.length).toBe(5);
    expect(result.mount.mean).toBeGreaterThanOrEqual(0);

    // Ensure DOM container was cleaned up
    expect(document.body.children.length).toBe(initialDomCount);
  });

  it('runs scaling benchmarks across instance counts', () => {
    const results = benchmarkScale(
      'Button Primitive',
      (idx) => <Button key={idx}>Button #{idx}</Button>,
      [1, 10],
      { iterations: 3, warmup: 1 }
    );

    expect(results.length).toBe(2);
    expect(results[0]?.count).toBe(1);
    expect(results[1]?.count).toBe(10);
  });

  it('enforces performance regression budgets', () => {
    const passingResult = {
      name: 'FastComponent',
      count: 1,
      mount: {
        mean: 0.1,
        median: 0.1,
        p95: 0.15,
        min: 0.05,
        max: 0.2,
        stdDev: 0.02,
        samples: [0.1],
      },
    };

    expect(() => assertPerformanceBudget(passingResult, PERFORMANCE_BUDGETS.L1)).not.toThrow();

    const failingResult = {
      name: 'SlowComponent',
      count: 1,
      mount: {
        mean: 50.0,
        median: 50.0,
        p95: 60.0,
        min: 40.0,
        max: 70.0,
        stdDev: 5.0,
        samples: [50.0],
      },
    };

    expect(() => assertPerformanceBudget(failingResult, PERFORMANCE_BUDGETS.L1)).toThrow(
      PerformanceRegressionError
    );
  });

  it('validates tree-shaking guarantees for core packages', () => {
    const reactPkgDir = path.resolve(__dirname, '../../react');
    const primitivesPkgDir = path.resolve(__dirname, '../../primitives');

    const reactResult = validatePackageTreeShaking(reactPkgDir);
    expect(reactResult.hasSideEffectsFalse).toBe(true);
    expect(reactResult.exports.length).toBeGreaterThan(10);
    expect(reactResult.isolatedEntriesValid).toBe(true);

    const primitivesResult = validatePackageTreeShaking(primitivesPkgDir);
    expect(primitivesResult.hasSideEffectsFalse).toBe(true);
    expect(primitivesResult.exports.length).toBeGreaterThan(5);
    expect(primitivesResult.isolatedEntriesValid).toBe(true);
  });
});
