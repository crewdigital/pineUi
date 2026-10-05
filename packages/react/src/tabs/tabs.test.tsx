import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabList, Tab, TabPanel } from './tabs.js';

describe('Tabs', () => {
  it('renders with default active tab and correct ARIA roles', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
      </Tabs>
    );

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeDefined();

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab1.getAttribute('aria-selected')).toBe('true');

    const panel = screen.getByRole('tabpanel');
    expect(panel.textContent).toContain('Content 1');
  });

  it('switches tab panels when clicking different tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
      </Tabs>
    );

    // Click second tab
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

    expect(screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected')).toBe('false');
    expect(screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tabpanel').textContent).toContain('Content 2');
  });

  it('links tab to panel via aria-controls / aria-labelledby', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
      </Tabs>
    );

    const tab = screen.getByRole('tab');
    const panel = screen.getByRole('tabpanel');

    expect(tab.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(tab.id);
  });

  it('does not activate a disabled tab on click', () => {
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="tab1" onValueChange={onValueChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2" disabled>Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
      </Tabs>
    );

    const disabledTab = screen.getByRole('tab', { name: 'Tab 2' });
    expect(disabledTab.hasAttribute('disabled')).toBe(true);
    fireEvent.click(disabledTab);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('supports controlled mode', () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Tabs value="tab1" defaultValue="tab1" onValueChange={onValueChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
      </Tabs>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(onValueChange).toHaveBeenCalledWith('tab2');
  });
});
