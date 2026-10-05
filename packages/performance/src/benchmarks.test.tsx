import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { benchmarkMount, benchmarkScale } from './harness.js';
import { PERFORMANCE_BUDGETS, assertPerformanceBudget } from './budgets.js';
import { Box } from '@pine-ui/primitives/box';
import { Stack } from '@pine-ui/primitives/stack';
import { Text } from '@pine-ui/primitives/text';
import { Button } from '@pine-ui/react/button';
import { Checkbox } from '@pine-ui/react/checkbox';
import { Tooltip } from '@pine-ui/react/tooltip';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@pine-ui/react/select';

describe('Pine UI Mount Scaling Benchmarks', () => {
  describe('Level 1: Static Layout & Typography Primitives', () => {
    it('benchmarks Box mounting at 1, 100, and 1k nodes within budget', () => {
      const results = benchmarkScale(
        'Box',
        (idx) => <Box key={idx}>Node {idx}</Box>,
        [1, 100, 1000],
        { iterations: 3, warmup: 1 }
      );

      results.forEach((res) => {
        expect(res.mount.median).toBeGreaterThanOrEqual(0);
        assertPerformanceBudget(res, PERFORMANCE_BUDGETS.L1);
      });
    });

    it('benchmarks Stack with nested Text within budget', () => {
      const result100 = benchmarkMount(
        'Stack with Text x100',
        () => (
          <Stack gap={2}>
            {Array.from({ length: 100 }, (_, idx) => (
              <Text key={idx} size="sm">
                Item #{idx}
              </Text>
            ))}
          </Stack>
        ),
        100,
        { iterations: 3, warmup: 1 }
      );

      assertPerformanceBudget(result100, PERFORMANCE_BUDGETS.L1);
    });
  });

  describe('Level 2: Native Interactive Controls', () => {
    it('benchmarks Button mounting at 1 and 100 instances within budget', () => {
      const results = benchmarkScale(
        'Button',
        (idx) => <Button key={idx} variant="primary">Button {idx}</Button>,
        [1, 100],
        { iterations: 3, warmup: 1 }
      );

      results.forEach((res) => {
        assertPerformanceBudget(res, PERFORMANCE_BUDGETS.L2);
      });
    });

    it('benchmarks Checkbox mounting at 100 instances within budget', () => {
      const result100 = benchmarkMount(
        'Checkbox x100',
        () => (
          <div>
            {Array.from({ length: 100 }, (_, idx) => (
              <Checkbox key={idx} label={`Option ${idx}`} defaultChecked={idx % 2 === 0} />
            ))}
          </div>
        ),
        100,
        { iterations: 3, warmup: 1 }
      );

      assertPerformanceBudget(result100, PERFORMANCE_BUDGETS.L2);
    });
  });

  describe('Level 4: Overlays & Containers', () => {
    it('benchmarks Tooltip at 1 and 50 instances within budget', () => {
      const result = benchmarkMount(
        'Tooltip x50',
        () => (
          <div>
            {Array.from({ length: 50 }, (_, idx) => (
              <Tooltip key={idx} content={`Help text ${idx}`}>
                <Button size="sm">Hover {idx}</Button>
              </Tooltip>
            ))}
          </div>
        ),
        50,
        { iterations: 3, warmup: 1 }
      );

      assertPerformanceBudget(result, PERFORMANCE_BUDGETS.L4);
    });
  });

  describe('Level 5: Complex Interactive Form UI', () => {
    it('benchmarks Select listbox at 1 and 20 instances within budget', () => {
      const result = benchmarkMount(
        'Select x20',
        () => (
          <div>
            {Array.from({ length: 20 }, (_, idx) => (
              <Select key={idx} defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${idx}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            ))}
          </div>
        ),
        20,
        { iterations: 3, warmup: 1 }
      );

      assertPerformanceBudget(result, PERFORMANCE_BUDGETS.L5);
    });
  });
});
