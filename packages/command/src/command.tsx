import * as React from 'react';

interface CommandContextValue {
  search: string;
  setSearch: (query: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  filteredCount: number;
  setFilteredCount: React.Dispatch<React.SetStateAction<number>>;
  listId: string;
  recentItems: string[];
  addRecentItem: (item: string) => void;
  clearRecentItems: () => void;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const ctx = React.useContext(CommandContext);
  if (!ctx) {
    throw new Error('[Pine UI]: Command sub-components must be rendered within a <Command />');
  }
  return ctx;
}

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Local storage key to persist recent searches / items (set false/undefined to disable) */
  recentStorageKey?: string | false;
  /** Explicit reading direction for accessibility and layout */
  dir?: 'ltr' | 'rtl' | undefined;
  children?: React.ReactNode | undefined;
}

export const Command = React.forwardRef<HTMLDivElement, CommandProps>(function Command(
  { recentStorageKey = 'pine-command-recent', dir, children, style, className, ...restProps },
  ref
) {
  const listId = React.useId();
  const [search, setSearch] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [filteredCount, setFilteredCount] = React.useState(0);

  const [recentItems, setRecentItems] = React.useState<string[]>(() => {
    if (typeof window === 'undefined' || !recentStorageKey) return [];
    try {
      const stored = window.localStorage.getItem(recentStorageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRecentItem = React.useCallback(
    (item: string) => {
      if (!recentStorageKey || !item) return;
      setRecentItems((prev) => {
        const next = [item, ...prev.filter((i) => i !== item)].slice(0, 5);
        try {
          window.localStorage.setItem(recentStorageKey, JSON.stringify(next));
        } catch {
          // Ignore storage errors in restricted contexts
        }
        return next;
      });
    },
    [recentStorageKey]
  );

  const clearRecentItems = React.useCallback(() => {
    if (recentStorageKey && typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(recentStorageKey);
      } catch {
        // Ignore
      }
    }
    setRecentItems([]);
  }, [recentStorageKey]);

  return (
    <CommandContext.Provider
      value={{
        search,
        setSearch,
        activeIndex,
        setActiveIndex,
        filteredCount,
        setFilteredCount,
        listId,
        recentItems,
        addRecentItem,
        clearRecentItems,
      }}
    >
      <div
        ref={ref}
        dir={dir}
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--pine-background-surface, #ffffff)',
          borderRadius: 'var(--pine-radius-xl, 10px)',
          border: '1px solid var(--pine-border-default, #e2e8f0)',
          overflow: 'hidden',
          boxShadow: 'var(--pine-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1))',
          fontFamily: 'var(--pine-font-family-sans, system-ui, -apple-system, sans-serif)',
          ...style,
        }}
        className={className}
        {...restProps}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
});

Command.displayName = 'Command';

export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string | undefined;
}

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  function CommandInput(
    { placeholder = 'Type a command or search...', style, 'aria-label': ariaLabel, ...restProps },
    ref
  ) {
    const { search, setSearch, setActiveIndex, filteredCount, listId } = useCommandContext();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filteredCount > 0 ? (prev + 1) % filteredCount : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (filteredCount > 0 ? (prev - 1 + filteredCount) % filteredCount : 0));
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid var(--pine-border-default, #e2e8f0)',
          gap: '8px',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ color: 'var(--pine-foreground-muted, #94a3b8)', flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={ref}
          type="text"
          role="combobox"
          aria-expanded={true}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-label={ariaLabel ?? placeholder}
          value={search}
          placeholder={placeholder}
          onChange={(e) => {
            setSearch(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            color: 'var(--pine-foreground-primary, #1e293b)',
            backgroundColor: 'transparent',
            ...style,
          }}
          {...restProps}
        />
      </div>
    );
  }
);

CommandInput.displayName = 'CommandInput';

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | undefined;
}

export function CommandList({ children, style, ...restProps }: CommandListProps) {
  const { listId } = useCommandContext();

  return (
    <div
      id={listId}
      role="listbox"
      tabIndex={-1}
      style={{
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '6px',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}

CommandList.displayName = 'CommandList';

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | undefined;
  /** Suggested queries or commands when no exact match is found */
  suggestions?: string[] | undefined;
  /** Callback when a suggestion is clicked (defaults to updating search query) */
  onSuggestionSelect?: ((suggestion: string) => void) | undefined;
}

export function CommandEmpty({
  children = 'No results found.',
  suggestions,
  onSuggestionSelect,
  style,
  ...restProps
}: CommandEmptyProps) {
  const { search, setSearch, listId } = useCommandContext();
  const [hasVisibleItems, setHasVisibleItems] = React.useState(true);

  React.useLayoutEffect(() => {
    const parentList = document.getElementById(listId);
    if (!parentList) return;

    const visibleItems = parentList.querySelectorAll('[role="option"]');
    setHasVisibleItems(visibleItems.length > 0);
  }, [search, listId]);

  if (hasVisibleItems) return null;

  const handleSelectSuggestion = (s: string) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(s);
    } else {
      setSearch(s);
    }
  };

  return (
    <div
      style={{
        padding: '24px 16px',
        textAlign: 'center',
        fontSize: '14px',
        color: 'var(--pine-foreground-muted, #94a3b8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        ...style,
      }}
      {...restProps}
    >
      <div>{children}</div>
      {suggestions && suggestions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--pine-foreground-tertiary, #64748b)', marginInlineEnd: '2px', alignSelf: 'center' }}>
            Suggestions:
          </span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSelectSuggestion(s)}
              style={{
                backgroundColor: 'var(--pine-background-surface-subtle, rgba(255, 255, 255, 0.08))',
                border: '1px solid var(--pine-border-default, rgba(255, 255, 255, 0.12))',
                borderRadius: 'var(--pine-radius-md, 6px)',
                padding: '3px 8px',
                fontSize: '12px',
                color: 'var(--pine-foreground-secondary, #cbd5e1)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

CommandEmpty.displayName = 'CommandEmpty';

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode | undefined;
  children?: React.ReactNode | undefined;
}

export function CommandGroup({ heading, children, style, ...restProps }: CommandGroupProps) {
  return (
    <div
      role="group"
      style={{
        marginBottom: '6px',
        ...style,
      }}
      {...restProps}
    >
      {heading ? (
        <div
          style={{
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--pine-foreground-muted, #94a3b8)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {heading}
        </div>
      ) : null}
      {children}
    </div>
  );
}

CommandGroup.displayName = 'CommandGroup';

export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  value?: string | undefined;
  onSelect?: (() => void) | undefined;
  children?: React.ReactNode | undefined;
}

export function CommandItem({
  value,
  onSelect,
  children,
  style,
  ...restProps
}: CommandItemProps) {
  const { search, addRecentItem } = useCommandContext();
  const itemText = (value ?? (typeof children === 'string' ? children : '')).toLowerCase();

  const isVisible =
    !search.trim() || itemText.includes(search.toLowerCase().trim());

  if (!isVisible) return null;

  const handleClick = () => {
    if (value) {
      addRecentItem(value);
    }
    onSelect?.();
  };

  return (
    <div
      role="option"
      tabIndex={-1}
      aria-selected={false}
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: 'var(--pine-radius-md, 6px)',
        fontSize: '14px',
        color: 'var(--pine-foreground-secondary, #334155)',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color var(--pine-motion-duration-faster, 0.12s) ease, transform var(--pine-motion-duration-press, 0.08s) cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--pine-action-subtle-background-hover, var(--pine-background-surface-subtle, #f1f5f9))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.99)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}

CommandItem.displayName = 'CommandItem';

export function CommandShortcut({
  children,
  style,
  ...restProps
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      style={{
        fontSize: '11px',
        color: 'var(--pine-foreground-muted, #94a3b8)',
        backgroundColor: 'var(--pine-background-surface-subtle, #f8fafc)',
        border: '1px solid var(--pine-border-default, #e2e8f0)',
        padding: '2px 6px',
        borderRadius: 'var(--pine-radius-sm, 4px)',
        fontFamily: 'var(--pine-font-family-mono, monospace)',
        marginInlineStart: 'auto',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </span>
  );
}

CommandShortcut.displayName = 'CommandShortcut';

export interface CommandLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcuts?: Array<{ key: string; label: string }>;
}

export function CommandLegend({
  shortcuts = [
    { key: 'Up/Down', label: 'Navigate' },
    { key: 'Enter', label: 'Select' },
    { key: 'Esc', label: 'Close' },
  ],
  style,
  ...restProps
}: CommandLegendProps) {
  return (
    <div
      data-testid="command-legend"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '12px',
        padding: '8px 16px',
        fontSize: '12px',
        color: 'var(--pine-foreground-tertiary, #64748b)',
        backgroundColor: 'var(--pine-background-surface-subtle, #f8fafc)',
        borderTop: '1px solid var(--pine-border-default, #e2e8f0)',
        userSelect: 'none',
        ...style,
      }}
      {...restProps}
    >
      {shortcuts.map(({ key, label }) => (
        <span key={key} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <kbd
            style={{
              backgroundColor: 'var(--pine-background-surface, #ffffff)',
              border: '1px solid var(--pine-border-strong, #cbd5e1)',
              borderRadius: 'var(--pine-radius-xs, 3px)',
              padding: '1px 5px',
              fontSize: '11px',
              fontFamily: 'var(--pine-font-family-sans, system-ui, -apple-system, sans-serif)',
              lineHeight: 1.2,
            }}
          >
            {key}
          </kbd>
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
}

CommandLegend.displayName = 'CommandLegend';

export interface CommandRecentProps {
  heading?: React.ReactNode;
  onSelect?: (value: string) => void;
  children?: (item: string) => React.ReactNode;
}

export function CommandRecent({
  heading = 'Recent Searches',
  onSelect,
  children,
}: CommandRecentProps) {
  const { recentItems, search } = useCommandContext();

  if (recentItems.length === 0 || search.trim().length > 0) return null;

  return (
    <CommandGroup heading={heading}>
      {recentItems.map((item) => (
        <CommandItem key={item} value={item} onSelect={() => onSelect?.(item)}>
          {children ? children(item) : <span>{item}</span>}
          <CommandShortcut>Recent</CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

CommandRecent.displayName = 'CommandRecent';
