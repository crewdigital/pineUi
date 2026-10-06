'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface BaseAvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image / accessible label */
  alt?: string;
  /** Person or entity name (used to generate fallback initials) */
  name?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Shape border-radius variant */
  shape?: AvatarShape;
  /** Online status indicator */
  status?: AvatarStatus;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type AvatarProps = BaseAvatarProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseAvatarProps>;

export interface AvatarGroupProps {
  /** Maximum visible avatars before rendering +N counter badge */
  max?: number;
  /** Size for all avatars in group */
  size?: AvatarSize;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

// ─── Helper Functions ────────────────────────────────────────────────────────

function getInitials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    userSelect: 'none',
    backgroundColor: vars.backgroundSurfaceSubtle,
    color: vars.foregroundSecondary,
    fontFamily: vars.fontFamilySans,
    fontWeight: vars.fontWeightSemibold,
    lineHeight: vars.fontLineHeightNone,
    overflow: 'hidden',
    flexShrink: 0,
  },

  // Shapes
  circle: { borderRadius: vars.radiusFull },
  square: { borderRadius: vars.radiusMd },

  // Sizes
  xs: { width: '24px', height: '24px', fontSize: '10px' },
  sm: { width: '32px', height: '32px', fontSize: vars.fontSizeXs },
  md: { width: '40px', height: '40px', fontSize: vars.fontSizeSm },
  lg: { width: '48px', height: '48px', fontSize: vars.fontSizeMd },
  xl: { width: '64px', height: '64px', fontSize: vars.fontSizeXl },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    borderRadius: vars.radiusFull,
    borderWidth: vars.borderWidth2,
    borderStyle: 'solid',
    borderColor: vars.backgroundSurface,
  },

  statusOnline: { backgroundColor: vars.feedbackSuccessSolid },
  statusOffline: { backgroundColor: vars.foregroundMuted },
  statusBusy: { backgroundColor: vars.feedbackDangerSolid },
  statusAway: { backgroundColor: vars.feedbackWarningSolid },

  // Status Dot Sizes
  xsStatus: { width: '8px', height: '8px' },
  smStatus: { width: '10px', height: '10px' },
  mdStatus: { width: '12px', height: '12px' },
  lgStatus: { width: '14px', height: '14px' },
  xlStatus: { width: '16px', height: '16px' },

  // Group styles
  group: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  groupItem: {
    marginInlineStart: '-8px',
    borderWidth: vars.borderWidth2,
    borderStyle: 'solid',
    borderColor: vars.backgroundSurface,
  },
  firstGroupItem: {
    marginInlineStart: 0,
  },
  excessBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: vars.radiusFull,
    backgroundColor: vars.backgroundSurfaceSubtle,
    color: vars.foregroundSecondary,
    fontFamily: vars.fontFamilySans,
    fontSize: vars.fontSizeXs,
    fontWeight: vars.fontWeightSemibold,
    marginInlineStart: '-8px',
    borderWidth: vars.borderWidth2,
    borderStyle: 'solid',
    borderColor: vars.backgroundSurface,
  },
});

function UserFallbackIcon() {
  return (
    <svg
      width="60%"
      height="60%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(
    {
      src,
      alt,
      name,
      size = 'md',
      shape = 'circle',
      status,
      styleX,
      ...restProps
    },
    ref
  ) {
    const [imageError, setImageError] = React.useState(false);
    const initials = getInitials(name);

    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt ?? name ?? 'User avatar'}
        {...stylex.props(
          styles.base,
          styles[shape],
          styles[size],
          styleX
        )}
        {...restProps}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt=""
            onError={() => setImageError(true)}
            {...stylex.props(styles.image)}
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <UserFallbackIcon />
        )}

        {status ? (
          <span
            {...stylex.props(
              styles.statusDot,
              styles[`${status[0]!.toUpperCase()}${status.slice(1)}` as keyof typeof styles],
              styles[`${size}Status`]
            )}
            aria-label={`Status: ${status}`}
          />
        ) : null}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ─── AvatarGroup Component ───────────────────────────────────────────────────

export function AvatarGroup({
  max,
  size = 'md',
  styleX,
  children,
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;

  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const excess = max && total > max ? total - max : 0;

  return (
    <div {...stylex.props(styles.group, styleX)}>
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          {...stylex.props(
            styles.groupItem,
            index === 0 && styles.firstGroupItem
          )}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ size?: AvatarSize }>, { size })
            : child}
        </div>
      ))}

      {excess > 0 ? (
        <div
          {...stylex.props(
            styles.excessBadge,
            styles[size]
          )}
          aria-label={`${excess} more users`}
        >
          +{excess}
        </div>
      ) : null}
    </div>
  );
}
