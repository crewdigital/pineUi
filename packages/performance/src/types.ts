export interface BenchmarkOptions {
  /** Number of measurement iterations. Defaults to 10 */
  iterations?: number | undefined;
  /** Number of untracked warmup iterations. Defaults to 2 */
  warmup?: number | undefined;
}

export interface BenchmarkMetrics {
  mean: number;
  median: number;
  p95: number;
  min: number;
  max: number;
  stdDev: number;
  samples: number[];
}

export interface BenchmarkResult {
  name: string;
  count: number;
  mount: BenchmarkMetrics;
  memoryDeltaBytes?: number | undefined;
}

export interface ComponentPerformanceBudget {
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  maxMountTimeSingleMs: number;
  maxMountTime100Ms: number;
  maxMountTime1kMs: number;
}
