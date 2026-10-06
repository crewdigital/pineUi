import type { BenchmarkResult, ComponentPerformanceBudget } from './types.js';

export const PERFORMANCE_BUDGETS: Record<'L1' | 'L2' | 'L3' | 'L4' | 'L5', ComponentPerformanceBudget> = {
  L1: {
    level: 'L1',
    maxMountTimeSingleMs: 15.0,
    maxMountTime100Ms: 200.0,
    maxMountTime1kMs: 800.0,
  },
  L2: {
    level: 'L2',
    maxMountTimeSingleMs: 25.0,
    maxMountTime100Ms: 300.0,
    maxMountTime1kMs: 1000.0,
  },
  L3: {
    level: 'L3',
    maxMountTimeSingleMs: 30.0,
    maxMountTime100Ms: 350.0,
    maxMountTime1kMs: 1200.0,
  },
  L4: {
    level: 'L4',
    maxMountTimeSingleMs: 35.0,
    maxMountTime100Ms: 400.0,
    maxMountTime1kMs: 1500.0,
  },
  L5: {
    level: 'L5',
    maxMountTimeSingleMs: 50.0,
    maxMountTime100Ms: 500.0,
    maxMountTime1kMs: 2000.0,
  },
};

export class PerformanceRegressionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PerformanceRegressionError';
  }
}

export function assertPerformanceBudget(
  result: BenchmarkResult,
  budget: ComponentPerformanceBudget
): void {
  let threshold: number;

  if (result.count <= 1) {
    threshold = budget.maxMountTimeSingleMs;
  } else if (result.count <= 100) {
    threshold = budget.maxMountTime100Ms;
  } else {
    threshold = budget.maxMountTime1kMs;
  }

  // JSDOM in test runners is slower than native browser engines, so we compare median
  if (result.mount.median > threshold) {
    throw new PerformanceRegressionError(
      `[Performance Regression]: Component ${result.name} (x${result.count}) exceeded budget for ${budget.level}. ` +
        `Observed median mount time: ${result.mount.median}ms, Allowed budget: ${threshold}ms.`
    );
  }
}
