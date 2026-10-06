'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this represents the currently active page */
  isActive?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface PaginationPreviousProps extends Omit<PaginationLinkProps, 'children'> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children?: React.ReactNode;
}

export interface PaginationNextProps extends Omit<PaginationLinkProps, 'children'> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children?: React.ReactNode;
}

export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  nav: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vars.space1,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    height: '36px',
    paddingInlineStart: vars.space3,
    paddingInlineEnd: vars.space3,
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightMedium,
    borderRadius: vars.radiusSm,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    color: vars.foregroundSecondary,
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    transitionProperty: 'background-color, color, border-color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':hover': {
      backgroundColor: vars.actionSecondaryBackgroundHover,
      color: vars.foregroundPrimary,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },
  linkActive: {
    backgroundColor: vars.actionSecondaryBackgroundActive,
    borderColor: vars.borderDefault,
    color: vars.foregroundPrimary,
    fontWeight: vars.fontWeightSemibold,
  },
  linkDisabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  arrowButton: {
    gap: vars.space1,
  },
  arrowIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':is([dir="rtl"] *)': {
      transform: 'scaleX(-1)',
    },
  },
  ellipsis: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    color: vars.foregroundSecondary,
  },
});

// ─── Components ──────────────────────────────────────────────────────────────

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  function Pagination({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        {...stylex.props(styles.nav, styleXProp)}
        {...restProps}
      >
        {children}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  function PaginationContent({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <ul
        ref={ref}
        {...stylex.props(styles.content, styleXProp)}
        {...restProps}
      >
        {children}
      </ul>
    );
  }
);

PaginationContent.displayName = 'PaginationContent';

export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  function PaginationItem({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <li
        ref={ref}
        {...stylex.props(styles.item, styleXProp)}
        {...restProps}
      >
        {children}
      </li>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

export const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  function PaginationLink(
    {
      isActive = false,
      disabled = false,
      styleX: styleXProp,
      children,
      ...restProps
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-current={isActive ? 'page' : undefined}
        disabled={disabled}
        {...stylex.props(
          styles.link,
          isActive && styles.linkActive,
          disabled && styles.linkDisabled,
          styleXProp
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

PaginationLink.displayName = 'PaginationLink';

export const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  function PaginationPrevious(
    { children, styleX: styleXProp, ...restProps },
    ref
  ) {
    return (
      <PaginationLink
        ref={ref}
        aria-label="Go to previous page"
        styleX={[styles.arrowButton, styleXProp]}
        {...restProps}
      >
        <span {...stylex.props(styles.arrowIcon)}>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </span>
        <span>{children ?? 'Previous'}</span>
      </PaginationLink>
    );
  }
);

PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  function PaginationNext(
    { children, styleX: styleXProp, ...restProps },
    ref
  ) {
    return (
      <PaginationLink
        ref={ref}
        aria-label="Go to next page"
        styleX={[styles.arrowButton, styleXProp]}
        {...restProps}
      >
        <span>{children ?? 'Next'}</span>
        <span {...stylex.props(styles.arrowIcon)}>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </PaginationLink>
    );
  }
);

PaginationNext.displayName = 'PaginationNext';

export const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  function PaginationEllipsis({ styleX: styleXProp, ...restProps }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        role="presentation"
        {...stylex.props(styles.ellipsis, styleXProp)}
        {...restProps}
      >
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
        <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
          More pages
        </span>
      </span>
    );
  }
);

PaginationEllipsis.displayName = 'PaginationEllipsis';
