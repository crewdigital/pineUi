import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { Radio, RadioGroup } from './radio.js';

describe('Radio and RadioGroup', () => {
  it('renders radio inputs with fieldset/legend in RadioGroup', () => {
    render(
      <RadioGroup label="Select plan" defaultValue="pro">
        <Radio value="free" label="Free Plan" />
        <Radio value="pro" label="Pro Plan" />
        <Radio value="enterprise" label="Enterprise Plan" />
      </RadioGroup>
    );

    const legend = screen.getByText('Select plan');
    expect(legend).toBeDefined();

    const proRadio = screen.getByLabelText('Pro Plan') as HTMLInputElement;
    const freeRadio = screen.getByLabelText('Free Plan') as HTMLInputElement;

    expect(proRadio.checked).toBe(true);
    expect(freeRadio.checked).toBe(false);
  });

  it('updates selected radio when clicked in RadioGroup', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup label="Notifications" defaultValue="email" onChange={handleChange}>
        <Radio value="email" label="Email" />
        <Radio value="sms" label="SMS" />
      </RadioGroup>
    );

    const smsRadio = screen.getByLabelText('SMS') as HTMLInputElement;
    fireEvent.click(smsRadio);

    expect(smsRadio.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledWith('sms', expect.any(Object));
  });

  it('disables all radios when RadioGroup is disabled', () => {
    render(
      <RadioGroup label="Disabled options" disabled>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    );

    const radioA = screen.getByLabelText('Option A');
    const radioB = screen.getByLabelText('Option B');

    expect(radioA.hasAttribute('disabled')).toBe(true);
    expect(radioB.hasAttribute('disabled')).toBe(true);
  });

  it('forwards ref on standalone Radio', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio ref={ref} value="test" label="Standalone radio" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
