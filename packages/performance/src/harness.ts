import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { flushSync } from 'react-dom';
import type { BenchmarkMetrics, BenchmarkOptions, BenchmarkResult } from './types.js';

export function calculateMetrics(samples: number[]): BenchmarkMetrics {
  if (samples.length === 0) {
    return { mean: 0, median: 0, p95: 0, min: 0, max: 0, stdDev: 0, samples: [] };
  }

  const sorted = [...samples].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, val) => acc + val, 0);
  const mean = sum / sorted.length;

  const mid = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 !== 0
      ? (sorted[mid] ?? 0)
      : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;

  const p95Index = Math.min(Math.floor(sorted.length * 0.95), sorted.length - 1);
  const p95 = sorted[p95Index] ?? 0;

  const min = sorted[0] ?? 0;
  const max = sorted[sorted.length - 1] ?? 0;

  const variance =
    sorted.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / sorted.length;
  const stdDev = Math.sqrt(variance);

  return {
    mean: Number(mean.toFixed(3)),
    median: Number(median.toFixed(3)),
    p95: Number(p95.toFixed(3)),
    min: Number(min.toFixed(3)),
    max: Number(max.toFixed(3)),
    stdDev: Number(stdDev.toFixed(3)),
    samples,
  };
}

export function benchmarkMount(
  name: string,
  elementFactory: () => React.ReactElement,
  count = 1,
  options: BenchmarkOptions = {}
): BenchmarkResult {
  const { iterations = 10, warmup = 2 } = options;
  const samples: number[] = [];

  // Helper container
  const container = document.createElement('div');
  document.body.appendChild(container);

  try {
    // Warmup phase
    for (let i = 0; i < warmup; i++) {
      const root = ReactDOMClient.createRoot(container);
      flushSync(() => {
        root.render(elementFactory());
      });
      flushSync(() => {
        root.unmount();
      });
    }

    // Measurement phase
    for (let i = 0; i < iterations; i++) {
      const root = ReactDOMClient.createRoot(container);
      const start = performance.now();
      flushSync(() => {
        root.render(elementFactory());
      });
      const end = performance.now();
      samples.push(end - start);

      flushSync(() => {
        root.unmount();
      });
    }
  } finally {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  const metrics = calculateMetrics(samples);

  return {
    name,
    count,
    mount: metrics,
  };
}

export function benchmarkScale(
  name: string,
  singleItemFactory: (index: number) => React.ReactElement,
  counts: number[] = [1, 100, 1000],
  options: BenchmarkOptions = {}
): BenchmarkResult[] {
  return counts.map((count) => {
    const listFactory = () =>
      React.createElement(
        React.Fragment,
        null,
        Array.from({ length: count }, (_, idx) =>
          React.cloneElement(singleItemFactory(idx), { key: idx })
        )
      );

    return benchmarkMount(`${name} x${count}`, listFactory, count, options);
  });
}
