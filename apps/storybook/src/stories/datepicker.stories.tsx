import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, type DateRange } from '@pine-ui/datepicker';
import { ArrowRight } from '@pine-ui/icons';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', padding: '32px' }}>
      <DatePicker
        label="Departure Date"
        placeholder="Choose a departure date"
      />
    </div>
  ),
};

export const WithPresets: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', padding: '32px' }}>
      <DatePicker
        label="Appointment Date"
        placeholder="Pick appointment date"
        presets
      />
    </div>
  ),
};

export const DateRangeSelection: Story = {
  render: () => {
    function DateRangeDemo() {
      const [range, setRange] = React.useState<DateRange>({
        start: new Date(2026, 9, 5),
        end: new Date(2026, 9, 12),
      });

      return (
        <div style={{ maxWidth: '400px', padding: '32px' }}>
          <DatePicker
            mode="range"
            label="Booking Period"
            range={range}
            onRangeChange={setRange}
            placeholder="Select date range"
          />
          <div style={{ marginTop: '16px', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Selected Range:</span>
            <strong style={{ color: '#0f172a' }}>
              {range.start ? range.start.toLocaleDateString() : 'None'}
            </strong>
            <ArrowRight size={14} style={{ color: '#94a3b8' }} />
            <strong style={{ color: '#0f172a' }}>
              {range.end ? range.end.toLocaleDateString() : 'None'}
            </strong>
          </div>
        </div>
      );
    }
    return <DateRangeDemo />;
  },
};

export const DualMonthRangeWithPresets: Story = {
  render: () => (
    <div style={{ maxWidth: '440px', padding: '32px' }}>
      <DatePicker
        mode="range"
        months={2}
        presets
        label="Analytics Reporting Window"
        placeholder="Select reporting window"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function ControlledDemo() {
      const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date(2026, 9, 15));

      return (
        <div style={{ maxWidth: '360px', padding: '32px' }}>
          <DatePicker
            label="Scheduled Deployment"
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <div style={{ marginTop: '16px', fontSize: '13px', color: '#64748b' }}>
            Current value:{' '}
            <strong style={{ color: '#0f172a' }}>
              {selectedDate ? selectedDate.toDateString() : 'None'}
            </strong>
          </div>
        </div>
      );
    }
    return <ControlledDemo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', padding: '32px' }}>
      <DatePicker
        disabled
        label="Locked Schedule"
        defaultValue={new Date(2026, 9, 1)}
      />
    </div>
  ),
};
