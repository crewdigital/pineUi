import * as React from 'react';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DatePickerPreset {
  label: string;
  getValue: () => Date | DateRange;
}

export interface DatePickerProps {
  mode?: 'single' | 'range' | undefined;
  value?: Date | null | undefined;
  defaultValue?: Date | null | undefined;
  onChange?: ((date: Date) => void) | undefined;
  range?: DateRange | undefined;
  defaultRange?: DateRange | undefined;
  onRangeChange?: ((range: DateRange) => void) | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  label?: string | undefined;
  id?: string | undefined;
  months?: 1 | 2 | undefined;
  presets?: boolean | DatePickerPreset[] | undefined;
}

function CalendarIcon({ style }: { style?: React.CSSProperties }) {
  return (
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
      style={style}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ChevronLeftIcon({ style }: { style?: React.CSSProperties }) {
  return (
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
      style={style}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ style }: { style?: React.CSSProperties }) {
  return (
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
      style={style}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ArrowRightIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function DatePicker({
  mode = 'single',
  value: controlledValue,
  defaultValue = null,
  onChange,
  range: controlledRange,
  defaultRange = { start: null, end: null },
  onRangeChange,
  placeholder = 'Select date...',
  disabled = false,
  label,
  id: customId,
  months = 1,
  presets = false,
}: DatePickerProps) {
  const generatedId = React.useId();
  const inputId = customId ?? generatedId;

  // Single date state
  const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue);
  const isControlledSingle = controlledValue !== undefined;
  const selectedDate = isControlledSingle ? controlledValue : internalValue;

  // Range date state
  const [internalRange, setInternalRange] = React.useState<DateRange>(defaultRange);
  const isControlledRange = controlledRange !== undefined;
  const selectedRange = isControlledRange ? controlledRange! : internalRange;

  const [isOpen, setIsOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(() => {
    if (mode === 'range' && selectedRange.start) return selectedRange.start;
    return selectedDate ?? new Date();
  });

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Close calendar on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isBetween = (d: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return target > s && target < e;
  };

  const handleSelectDay = (targetDate: Date) => {
    if (mode === 'single') {
      if (!isControlledSingle) {
        setInternalValue(targetDate);
      }
      onChange?.(targetDate);
      setIsOpen(false);
    } else {
      // Range mode selection logic
      let nextRange: DateRange;
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        nextRange = { start: targetDate, end: null };
      } else {
        if (targetDate.getTime() < selectedRange.start.getTime()) {
          nextRange = { start: targetDate, end: selectedRange.start };
        } else {
          nextRange = { start: selectedRange.start, end: targetDate };
        }
      }

      if (!isControlledRange) {
        setInternalRange(nextRange);
      }
      onRangeChange?.(nextRange);
      if (nextRange.start && nextRange.end) {
        setIsOpen(false);
      }
    }
  };

  const formatDateStr = (d: Date | null) => {
    if (!d) return '';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const formattedDisplayValue = React.useMemo(() => {
    if (mode === 'single') {
      return formatDateStr(selectedDate);
    }
    if (selectedRange.start && selectedRange.end) {
      return `${formatDateStr(selectedRange.start)} to ${formatDateStr(selectedRange.end)}`;
    }
    if (selectedRange.start) {
      return formatDateStr(selectedRange.start);
    }
    return '';
  }, [mode, selectedDate, selectedRange]);

  // Default presets
  const standardPresets: DatePickerPreset[] = React.useMemo(() => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const yesterday = new Date(startOfToday);
    yesterday.setDate(yesterday.getDate() - 1);

    const last7Days = new Date(startOfToday);
    last7Days.setDate(last7Days.getDate() - 6);

    const last30Days = new Date(startOfToday);
    last30Days.setDate(last30Days.getDate() - 29);

    const currentQuarter = Math.floor(today.getMonth() / 3);
    const startOfQuarter = new Date(today.getFullYear(), currentQuarter * 3, 1);

    if (mode === 'single') {
      return [
        { label: 'Today', getValue: () => startOfToday },
        { label: 'Yesterday', getValue: () => yesterday },
      ];
    }

    return [
      { label: 'Today', getValue: () => ({ start: startOfToday, end: startOfToday }) },
      { label: 'Yesterday', getValue: () => ({ start: yesterday, end: yesterday }) },
      { label: 'Last 7 Days', getValue: () => ({ start: last7Days, end: startOfToday }) },
      { label: 'Last 30 Days', getValue: () => ({ start: last30Days, end: startOfToday }) },
      { label: 'This Quarter', getValue: () => ({ start: startOfQuarter, end: startOfToday }) },
    ];
  }, [mode]);

  const activePresets = Array.isArray(presets) ? presets : presets ? standardPresets : [];

  const handleApplyPreset = (preset: DatePickerPreset) => {
    const val = preset.getValue();
    if (mode === 'single' && val instanceof Date) {
      if (!isControlledSingle) setInternalValue(val);
      onChange?.(val);
      setViewDate(val);
      setIsOpen(false);
    } else if (mode === 'range' && typeof val === 'object' && !(val instanceof Date)) {
      if (!isControlledRange) setInternalRange(val);
      onRangeChange?.(val);
      if (val.start) setViewDate(val.start);
      setIsOpen(false);
    }
  };

  // Helper to generate weeks grid for a given year & month
  const getMonthWeeks = (y: number, m: number) => {
    const daysInM = new Date(y, m + 1, 0).getDate();
    const firstDay = new Date(y, m, 1).getDay();

    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let d = 1; d <= daysInM; d++) {
      calendarDays.push(d);
    }

    const w: (number | null)[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      w.push(calendarDays.slice(i, i + 7));
    }
    return w;
  };

  const renderedMonths = React.useMemo(() => {
    const res: { year: number; month: number }[] = [];
    res.push({ year: viewDate.getFullYear(), month: viewDate.getMonth() });
    if (months === 2) {
      const nextM = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
      res.push({ year: nextM.getFullYear(), month: nextM.getMonth() });
    }
    return res;
  }, [viewDate, months]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '6px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          position: 'relative',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          backgroundColor: disabled ? '#f8fafc' : '#ffffff',
          minWidth: mode === 'range' ? '300px' : '180px',
        }}
      >
        {mode === 'range' ? (
          <div
            onClick={() => !disabled && setIsOpen(!isOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flex: 1,
              padding: '7px 12px',
              fontSize: '13px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
              gap: '6px',
            }}
          >
            <span style={{ color: selectedRange.start ? '#0f172a' : '#94a3b8' }}>
              {selectedRange.start ? formatDateStr(selectedRange.start) : 'Start date'}
            </span>
            <ArrowRightIcon
              style={{
                color: '#94a3b8',
                flexShrink: 0,
                transform: 'scaleX(var(--pine-rtl-flip, 1))',
              }}
            />
            <span style={{ color: selectedRange.end ? '#0f172a' : '#94a3b8' }}>
              {selectedRange.end ? formatDateStr(selectedRange.end) : 'End date'}
            </span>
            <input
              id={inputId}
              type="hidden"
              value={formattedDisplayValue}
              readOnly
            />
          </div>
        ) : (
          <input
            id={inputId}
            type="text"
            readOnly
            disabled={disabled}
            value={formattedDisplayValue}
            placeholder={placeholder}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            style={{
              border: 'none',
              outline: 'none',
              padding: '8px 12px',
              fontSize: '13px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              backgroundColor: 'transparent',
              flex: 1,
              color: '#0f172a',
            }}
          />
        )}

        <button
          type="button"
          disabled={disabled}
          aria-label="Toggle calendar"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={{
            border: 'none',
            background: 'none',
            padding: '8px 10px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            color: '#64748b',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CalendarIcon />
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose date"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            insetInlineStart: 0,
            zIndex: 1000,
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Quick-select presets chip bar */}
          {activePresets.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
                paddingBottom: '10px',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              {activePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '9999px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#475569',
                    cursor: 'pointer',
                    transition: 'all 120ms ease',
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Calendar Months Display (Single or Dual Month) */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            {renderedMonths.map(({ year, month }, monthIndex) => {
              const weeks = getMonthWeeks(year, month);
              const isFirstMonth = monthIndex === 0;
              const isLastMonth = monthIndex === renderedMonths.length - 1;

              return (
                <div key={`${year}-${month}`} style={{ width: '240px' }}>
                  {/* Header navigation */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    {isFirstMonth ? (
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        aria-label="Previous month"
                        style={{
                          border: '1px solid #e2e8f0',
                          background: '#f8fafc',
                          borderRadius: '4px',
                          padding: '3px 8px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ChevronLeftIcon
                          style={{
                            display: 'inline-block',
                            transform: 'scaleX(var(--pine-rtl-flip, 1))',
                          }}
                        />
                      </button>
                    ) : (
                      <div style={{ width: '28px' }} />
                    )}

                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                      {monthNames[month]} {year}
                    </span>

                    {isLastMonth ? (
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        aria-label="Next month"
                        style={{
                          border: '1px solid #e2e8f0',
                          background: '#f8fafc',
                          borderRadius: '4px',
                          padding: '3px 8px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ChevronRightIcon
                          style={{
                            display: 'inline-block',
                            transform: 'scaleX(var(--pine-rtl-flip, 1))',
                          }}
                        />
                      </button>
                    ) : (
                      <div style={{ width: '28px' }} />
                    )}
                  </div>

                  {/* Day table */}
                  <table
                    role="grid"
                    aria-label={`${monthNames[month]} ${year}`}
                    style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}
                  >
                    <thead role="rowgroup">
                      <tr role="row">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <th
                            key={d}
                            role="columnheader"
                            style={{ fontSize: '11px', color: '#64748b', padding: '4px 0', fontWeight: 600 }}
                          >
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody role="rowgroup">
                      {weeks.map((week, wIdx) => (
                        <tr key={wIdx} role="row">
                          {week.map((day, dIdx) => {
                            if (day === null) {
                              return <td key={dIdx} role="gridcell" style={{ padding: '2px' }} />;
                            }

                            const cellDate = new Date(year, month, day);

                            const isSingleSelected =
                              mode === 'single' && isSameDay(selectedDate, cellDate);
                            const isRangeStart =
                              mode === 'range' && isSameDay(selectedRange.start, cellDate);
                            const isRangeEnd =
                              mode === 'range' && isSameDay(selectedRange.end, cellDate);
                            const isInRange =
                              mode === 'range' && isBetween(cellDate, selectedRange.start, selectedRange.end);

                            return (
                              <td
                                key={dIdx}
                                role="gridcell"
                                aria-selected={isSingleSelected || isRangeStart || isRangeEnd || isInRange}
                                style={{
                                  padding: '2px 0',
                                  backgroundColor: isInRange
                                    ? '#dbeafe'
                                    : isRangeStart && selectedRange.end
                                    ? 'rgba(219, 234, 254, 0.5)'
                                    : isRangeEnd && selectedRange.start
                                    ? 'rgba(219, 234, 254, 0.5)'
                                    : 'transparent',
                                  borderTopLeftRadius: isRangeStart ? '9999px' : '0',
                                  borderBottomLeftRadius: isRangeStart ? '9999px' : '0',
                                  borderTopRightRadius: isRangeEnd ? '9999px' : '0',
                                  borderBottomRightRadius: isRangeEnd ? '9999px' : '0',
                                }}
                              >
                                <button
                                  type="button"
                                  aria-label={`${monthNames[month]} ${day}, ${year}`}
                                  onClick={() => handleSelectDay(cellDate)}
                                  style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor:
                                      isSingleSelected || isRangeStart || isRangeEnd
                                        ? '#2563eb'
                                        : 'transparent',
                                    color:
                                      isSingleSelected || isRangeStart || isRangeEnd
                                        ? '#ffffff'
                                        : isInRange
                                        ? '#1d4ed8'
                                        : '#1e293b',
                                    fontWeight:
                                      isSingleSelected || isRangeStart || isRangeEnd || isInRange ? 700 : 400,
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 100ms ease',
                                  }}
                                >
                                  {day}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';
