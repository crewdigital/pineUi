import * as React from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode | undefined;
  children?: TreeNode[] | undefined;
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreeNode[];
  expandedIds?: string[] | undefined;
  defaultExpandedIds?: string[] | undefined;
  onToggleExpand?: ((id: string, isExpanded: boolean) => void) | undefined;
  selectedId?: string | null | undefined;
  onSelectNode?: ((node: TreeNode) => void) | undefined;
}

export function TreeView({
  data,
  expandedIds: controlledExpanded,
  defaultExpandedIds = [],
  onToggleExpand,
  selectedId,
  onSelectNode,
  style,
  className,
  ...restProps
}: TreeViewProps) {
  const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );

  const isControlled = controlledExpanded !== undefined;
  const expandedSet = isControlled ? new Set(controlledExpanded) : internalExpanded;

  const toggleExpand = (id: string) => {
    const isCurrentlyExpanded = expandedSet.has(id);
    const nextState = !isCurrentlyExpanded;

    if (!isControlled) {
      setInternalExpanded((prev) => {
        const next = new Set(prev);
        if (nextState) next.add(id);
        else next.delete(id);
        return next;
      });
    }

    onToggleExpand?.(id, nextState);
  };

  const renderTreeNodes = (nodes: TreeNode[], depth = 1): React.ReactNode => {
    return nodes.map((node) => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      const isExpanded = expandedSet.has(node.id);
      const isSelected = selectedId === node.id;

      return (
        <li
          key={node.id}
          role="treeitem"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-selected={isSelected}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
              e.preventDefault();
              toggleExpand(node.id);
            } else if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
              e.preventDefault();
              toggleExpand(node.id);
            } else if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectNode?.(node);
            }
          }}
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            outline: 'none',
          }}
        >
          <div
            onClick={() => {
              if (hasChildren) toggleExpand(node.id);
              onSelectNode?.(node);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              paddingInlineStart: `${depth * 16}px`,
              borderRadius: '6px',
              cursor: 'pointer',
              userSelect: 'none',
              backgroundColor: isSelected ? '#e0f2fe' : 'transparent',
              color: isSelected ? '#0369a1' : '#334155',
              fontWeight: isSelected ? 600 : 400,
              fontSize: '14px',
              transition: 'background-color 0.15s ease',
            }}
          >
            {hasChildren ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            ) : (
              <span style={{ width: '12px' }} />
            )}

            {node.icon && <span style={{ display: 'inline-flex' }}>{node.icon}</span>}
            <span>{node.label}</span>
          </div>

          {hasChildren && isExpanded && (
            <ul
              role="group"
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              {renderTreeNodes(node.children!, depth + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        ...style,
      }}
      className={className}
      {...restProps}
    >
      <ul
        role="tree"
        aria-label={restProps['aria-label']}
        aria-labelledby={restProps['aria-labelledby']}
        style={{
          margin: 0,
          padding: '4px 0',
        }}
      >
        {renderTreeNodes(data)}
      </ul>
    </div>
  );
}

TreeView.displayName = 'TreeView';
