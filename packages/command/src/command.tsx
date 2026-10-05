import * as React from 'react';

interface CommandContextValue {
  search: string;
  setSearch: (query: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  filteredCount: number;
  setFilteredCount: React.Dispatch<React.SetStateAction<number>>;
  listId: string;
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
  children?: React.ReactNode | undefined;
}

export const Command = React.forwardRef<HTMLDivElement, CommandProps>(function Command(
  { children, style, className, ...restProps },
  ref
) {
  const listId = React.useId();
  const [search, setSearch] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [filteredCount, setFilteredCount] = React.useState(0);

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
      }}
    >
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
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
          borderBottom: '1px solid #e2e8f0',
          gap: '8px',
        }}
      >
        <span aria-hidden="true" style={{ color: '#94a3b8', fontSize: '16px' }}>
          🔍
        </span>
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
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '15px',
            backgroundColor: 'transparent',
            color: '#0f172a',
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

export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  function CommandList({ children, id, style, ...restProps }, ref) {
    const { listId } = useCommandContext();
    return (
      <div
        ref={ref}
        id={id ?? listId}
        role="listbox"
        aria-label="Commands"
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
);

CommandList.displayName = 'CommandList';

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | undefined;
}

export function CommandEmpty({ children = 'No results found.', style, ...restProps }: CommandEmptyProps) {
  const { filteredCount } = useCommandContext();
  if (filteredCount > 0) return null;

  return (
    <div
      style={{
        padding: '24px 16px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#64748b',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  children?: React.ReactNode | undefined;
}

export function CommandGroup({ heading, children, style, ...restProps }: CommandGroupProps) {
  return (
    <div role="group" aria-label={heading} style={{ padding: '4px 0', ...style }} {...restProps}>
      <div
        style={{
          padding: '6px 10px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {heading}
      </div>
      {children}
    </div>
  );
}

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
  const { search } = useCommandContext();
  const itemText = (value ?? (typeof children === 'string' ? children : '')).toLowerCase();

  const isVisible =
    !search.trim() || itemText.includes(search.toLowerCase().trim());

  if (!isVisible) return null;

  return (
    <div
      role="option"
      tabIndex={-1}
      aria-selected={false}
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#334155',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.12s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f1f5f9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
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
        color: '#94a3b8',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        padding: '2px 6px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        marginLeft: 'auto',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </span>
  );
}
