import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@pine-ui/testing';
import {
  auditAccessibility,
  assertNoA11yViolations,
  AccessibilityViolationError,
} from './axe-audit.js';
import {
  findFocusableElements,
  simulateKey,
  FocusTracker,
  verifyFocusRestoration,
} from './keyboard.js';
import {
  verifyThemeMode,
  verifyRtlDirection,
  inspectLogicalProperties,
} from './contrast-motion-rtl.js';

describe('@pine-ui/accessibility', () => {
  describe('Axe-Core Automated Audit Pipeline', () => {
    it('passes audit for fully accessible component markup', async () => {
      const { container } = render(
        <div>
          <label htmlFor="name-input">User Name</label>
          <input id="name-input" type="text" defaultValue="Alex" />
          <button type="submit">Submit Form</button>
        </div>
      );

      const results = await auditAccessibility(container);
      expect(results.violations.length).toBe(0);

      await expect(assertNoA11yViolations(container)).resolves.not.toThrow();
    });

    it('detects violations and throws AccessibilityViolationError on inaccessible markup', async () => {
      const { container } = render(
        <div>
          {/* Missing alt attribute on meaningful image */}
          <img src="avatar.jpg" />
        </div>
      );

      const results = await auditAccessibility(container);
      expect(results.violations.length).toBeGreaterThan(0);
      expect(results.violations.some((v) => v.id === 'image-alt')).toBe(true);

      await expect(assertNoA11yViolations(container)).rejects.toThrow(
        AccessibilityViolationError
      );
    });
  });

  describe('Keyboard Navigation & Focus Order Harness', () => {
    it('discovers focusable elements and excludes disabled or aria-hidden items', () => {
      const { container } = render(
        <div>
          <button id="btn-1">Active 1</button>
          <button id="btn-disabled" disabled>
            Disabled
          </button>
          <a id="link-1" href="#test">
            Link
          </a>
          <div aria-hidden="true">
            <button id="btn-hidden">Hidden</button>
          </div>
          <input id="input-1" type="text" />
        </div>
      );

      const focusable = findFocusableElements(container);
      const ids = focusable.map((el) => el.id);

      expect(ids).toEqual(['btn-1', 'link-1', 'input-1']);
    });

    it('simulates keyboard events accurately', () => {
      const { container } = render(<button id="test-btn">Click me</button>);
      const btn = container.querySelector('#test-btn')!;

      let keyPassed = '';
      btn.addEventListener('keydown', (e: Event) => {
        keyPassed = (e as KeyboardEvent).key;
      });

      simulateKey(btn, 'Enter');
      expect(keyPassed).toBe('Enter');
    });

    it('tracks focus history across elements', () => {
      const { container } = render(
        <div>
          <button id="first">First</button>
          <button id="second">Second</button>
        </div>
      );

      const first = container.querySelector<HTMLElement>('#first')!;
      const second = container.querySelector<HTMLElement>('#second')!;

      const tracker = new FocusTracker();
      tracker.start();

      first.focus();
      second.focus();

      const history = tracker.stop();
      expect(history).toContain(first);
      expect(history).toContain(second);
    });

    it('verifies focus restoration upon dismissal', () => {
      const { container } = render(
        <div>
          <button id="trigger">Open</button>
          <div id="dialog" style={{ display: 'none' }}>
            <button id="inside">Inside</button>
          </div>
        </div>
      );

      const trigger = container.querySelector<HTMLElement>('#trigger')!;
      const inside = container.querySelector<HTMLElement>('#inside')!;

      const isRestored = verifyFocusRestoration(
        trigger,
        () => {
          inside.focus();
        },
        () => {
          trigger.focus();
        }
      );

      expect(isRestored).toBe(true);
    });
  });

  describe('High Contrast & RTL Verification Suites', () => {
    it('verifies theme modes such as high-contrast', () => {
      const { container } = render(<div data-theme="high-contrast">Content</div>);
      expect(verifyThemeMode(container.firstElementChild!, 'high-contrast')).toBe(true);
      expect(verifyThemeMode(container.firstElementChild!, 'light')).toBe(false);
    });

    it('verifies RTL direction attributes', () => {
      const { container } = render(<div dir="rtl">Arabic / Hebrew Text</div>);
      expect(verifyRtlDirection(container.firstElementChild!)).toBe(true);
    });

    it('inspects CSS logical property availability', () => {
      const { container } = render(<div style={{ marginInlineStart: '16px' }}>Box</div>);
      const props = inspectLogicalProperties(container.firstElementChild as HTMLElement);
      expect(props).toBeDefined();
    });
  });
});
