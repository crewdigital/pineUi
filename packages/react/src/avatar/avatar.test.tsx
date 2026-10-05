import * as React from 'react';
import { render, screen, fireEvent } from '@pine-ui/testing';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarGroup } from './avatar.js';

describe('Avatar and AvatarGroup', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Alice Smith" />);
    const avatar = screen.getByRole('img', { name: 'Alice Smith' });
    expect(avatar).toBeDefined();
    const img = avatar.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('renders initials when name is provided and no src', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeDefined();
  });

  it('falls back to initials when image fails to load', () => {
    render(<Avatar src="invalid.jpg" name="Sarah Connor" />);
    const avatar = screen.getByRole('img', { name: 'Sarah Connor' });
    const img = avatar.querySelector('img');
    expect(img).not.toBeNull();

    // Trigger image load error
    fireEvent.error(img!);
    expect(screen.getByText('SC')).toBeDefined();
  });

  it('renders status dot when status prop is provided', () => {
    render(<Avatar name="Active User" status="online" />);
    const avatar = screen.getByRole('img');
    expect(avatar.querySelector('[aria-label="Status: online"]')).not.toBeNull();
  });

  it('limits displayed avatars in AvatarGroup when max is set', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User One" />
        <Avatar name="User Two" />
        <Avatar name="User Three" />
        <Avatar name="User Four" />
      </AvatarGroup>
    );

    expect(screen.getByText('UO')).toBeDefined();
    expect(screen.getByText('UT')).toBeDefined();
    expect(screen.getByText('+2')).toBeDefined();
  });

  it('forwards ref on Avatar component', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Avatar ref={ref} name="Ref Avatar" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
