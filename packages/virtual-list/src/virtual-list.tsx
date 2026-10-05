import * as React from 'react';

export interface VirtualListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total number of items in the dataset */
  itemCount: number;
  /** Fixed height of each individual row item in pixels */
  itemHeight: number;
  /** Height of the scrollable viewport container in pixels */
  height: number;
  /** Optional width of the container in pixels or CSS string */
  width?: number | string | undefined;
  /** Number of buffer items to render outside the viewport boundary. Defaults to 3 */
  overscan?: number | undefined;
  /** Render function for each row item */
  renderItem: (index: number) => React.ReactNode;
}

export const VirtualList = React.forwardRef<HTMLDivElement, VirtualListProps>(
  function VirtualList(
    {
      itemCount,
      itemHeight,
      height,
      width = '100%',
      overscan = 3,
      renderItem,
      style,
      className,
      ...restProps
    },
    ref
  ) {
    const [scrollTop, setScrollTop] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Synchronize forwarded ref and local ref
    React.useImperativeHandle(ref, () => containerRef.current!);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    };

    const totalHeight = itemCount * itemHeight;

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      itemCount,
      Math.ceil((scrollTop + height) / itemHeight) + overscan
    );

    const visibleItems: React.ReactNode[] = [];
    for (let i = startIndex; i < endIndex; i++) {
      const top = i * itemHeight;
      visibleItems.push(
        <div
          key={i}
          role="listitem"
          aria-setsize={itemCount}
          aria-posinset={i + 1}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${itemHeight}px`,
            transform: `translateY(${top}px)`,
            boxSizing: 'border-box',
          }}
        >
          {renderItem(i)}
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        role="list"
        tabIndex={0}
        onScroll={handleScroll}
        style={{
          position: 'relative',
          height: `${height}px`,
          width: typeof width === 'number' ? `${width}px` : width,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          boxSizing: 'border-box',
          ...style,
        }}
        className={className}
        {...restProps}
      >
        <div
          style={{
            height: `${totalHeight}px`,
            width: '100%',
            position: 'relative',
            pointerEvents: 'none',
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>{visibleItems}</div>
        </div>
      </div>
    );
  }
);

VirtualList.displayName = 'VirtualList';
