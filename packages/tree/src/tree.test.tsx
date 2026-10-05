import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, expectNoA11yViolations } from '@pine-ui/testing';
import { TreeView, type TreeNode } from './tree.js';

const testTreeData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'components', label: 'components', children: [{ id: 'button', label: 'button.tsx' }] },
      { id: 'index', label: 'index.ts' },
    ],
  },
  {
    id: 'package',
    label: 'package.json',
  },
];

describe('@pine-ui/tree', () => {
  it('renders tree and root nodes with role tree and treeitem', async () => {
    const { container } = render(
      <TreeView data={testTreeData} aria-label="Project files" />
    );

    const tree = screen.getByRole('tree', { name: 'Project files' });
    expect(tree).toBeDefined();

    const rootItems = screen.getAllByRole('treeitem');
    // 'src' and 'package.json' initially
    expect(rootItems.length).toBe(2);
    expect(screen.getByText('src')).toBeDefined();
    expect(screen.getByText('package.json')).toBeDefined();

    await expectNoA11yViolations(container);
  });

  it('expands and collapses nodes on click', () => {
    const onToggle = vi.fn();
    render(
      <TreeView data={testTreeData} onToggleExpand={onToggle} />
    );

    const srcNode = screen.getByText('src');
    expect(screen.queryByText('components')).toBeNull();

    // Click to expand
    fireEvent.click(srcNode);
    expect(onToggle).toHaveBeenCalledWith('src', true);
    expect(screen.getByText('components')).toBeDefined();

    // Click to collapse
    fireEvent.click(srcNode);
    expect(onToggle).toHaveBeenCalledWith('src', false);
    expect(screen.queryByText('components')).toBeNull();
  });

  it('selects node and calls onSelectNode', () => {
    const onSelect = vi.fn();
    render(
      <TreeView data={testTreeData} onSelectNode={onSelect} />
    );

    const pkgNode = screen.getByText('package.json');
    fireEvent.click(pkgNode);

    expect(onSelect).toHaveBeenCalled();
    const selected = onSelect.mock.calls[0]?.[0] as TreeNode;
    expect(selected.id).toBe('package');
  });

  it('navigates and expands via keyboard arrow keys', () => {
    const onToggle = vi.fn();
    const { container } = render(
      <TreeView data={testTreeData} onToggleExpand={onToggle} />
    );

    const srcItem = container.querySelectorAll('[role="treeitem"]')[0]!;

    // ArrowRight on collapsed parent expands it
    fireEvent.keyDown(srcItem, { key: 'ArrowRight' });
    expect(onToggle).toHaveBeenCalledWith('src', true);
  });
});
