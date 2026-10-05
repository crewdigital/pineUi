import * as React from 'react';

export interface DatePickerProps {
  value?: Date | null | undefined;
  defaultValue?: Date | null | undefined;
  onChange?: ((date: Date) => void) | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  label?: string | undefined;
  id?: string | undefined;
}

export function DatePicker({
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = 'Select date...',
  disabled = false,
  label,
  id: customId,
}: DatePickerProps) {
  const generatedId = React.useId();
  const inputId = customId ?? generatedId;

  const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(
    () => selectedDate ?? new Date()
  );

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

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const nextDate = new Date(year, month, day);
    if (!isControlled) {
      setInternalValue(nextDate);
    }
    onChange?.(nextDate);
    setIsOpen(false);
  };

  const formattedValue = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(
        selectedDate.getDate()
      ).padStart(2, '0')}`
    : '';

  // Generate calendar grid rows (7 days per row)
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

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
        }}
      >
        <input
          id={inputId}
          type="text"
          readOnly
          disabled={disabled}
          value={formattedValue}
          placeholder={placeholder}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={{
            border: 'none',
            outline: 'none',
            padding: '8px 12px',
            fontSize: '14px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: 'transparent',
            width: '180px',
          }}
        />

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
          }}
        >
          📅
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose date"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 1000,
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            width: '260px',
          }}
        >
          {/* Calendar Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              style={{
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              ◀
            </button>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              style={{
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              ▶
            </button>
          </div>

          {/* Calendar Table */}
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
                    style={{ fontSize: '12px', color: '#64748b', padding: '4px 0' }}
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

                    const isSelected =
                      selectedDate !== null &&
                      selectedDate.getFullYear() === year &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getDate() === day;

                    return (
                      <td
                        key={dIdx}
                        role="gridcell"
                        aria-selected={isSelected}
                        style={{ padding: '2px' }}
                      >
                        <button
                          type="button"
                          aria-label={`${monthNames[month]} ${day}, ${year}`}
                          onClick={() => handleSelectDay(day)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: isSelected ? '#2563eb' : 'transparent',
                            color: isSelected ? '#ffffff' : '#1e293b',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
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
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';
