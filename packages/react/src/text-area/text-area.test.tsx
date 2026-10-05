import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect, vi } from 'vitest';
import { TextArea } from './text-area.js';

describe('TextArea', () => {
  it('renders a <textarea> element linked to label via id/htmlFor', () => {
    render(<TextArea label="Feedback" placeholder="Enter comments..." />);
    const textarea = screen.getByLabelText('Feedback');
    expect(textarea).toBeDefined();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('handles user text input and change events', () => {
    const handleChange = vi.fn();
    render(<TextArea label="Notes" onChange={handleChange} />);
    const textarea = screen.getByLabelText('Notes');
    fireEvent.change(textarea, { target: { value: 'Line 1\nLine 2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((textarea as HTMLTextAreaElement).value).toBe('Line 1\nLine 2');
  });

  it('links aria-describedby to helperText and errorMessage', () => {
    render(
      <TextArea
        label="Description"
        errorMessage="Description is required."
      />
    );
    const textarea = screen.getByLabelText('Description');
    const alert = screen.getByRole('alert');
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    expect(textarea.getAttribute('aria-describedby')).toBe(alert.id);
  });

  it('disables textarea when disabled={true}', () => {
    render(<TextArea label="Disabled notes" disabled />);
    const textarea = screen.getByLabelText('Disabled notes');
    expect(textarea.hasAttribute('disabled')).toBe(true);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} label="Ref test" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });
});
