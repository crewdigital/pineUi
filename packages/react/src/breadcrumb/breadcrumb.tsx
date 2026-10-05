'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Polymorphic element tag */
  as?: React.ElementType;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Custom separator node (defaults to chevron) */
  children?: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: vars.space1,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: vars.fontSizeSm,
    color: vars.foregroundSecondary,
  },
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space1,
  },
  link: {
    color: vars.foregroundSecondary,
    textDecoration: 'none',
    transitionProperty: 'color',
    transitionDuration: vars.motionDurationFast,
    ':hover': {
      color: vars.foregroundPrimary,
      textDecoration: 'underline',
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
      borderRadius: vars.radiusXs,
    },
  },
  page: {
    fontWeight: vars.fontWeightMedium,
    color: vars.foregroundPrimary,
    cursor: 'default',
  },
  separator: {
    display: 'inline-flex',
    alignItems: 'center',
    color: vars.foregroundMuted,
    userSelect: 'none',
  },
  ellipsis: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    color: vars.foregroundSecondary,
  },
});

// ─── Components ──────────────────────────────────────────────────────────────

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        {...stylex.props(styles.nav, styleXProp)}
        {...restProps}
      >
        {children}
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <ol
        ref={ref}
        {...stylex.props(styles.list, styleXProp)}
        {...restProps}
      >
        {children}
      </ol>
    );
  }
);

BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ styleX: styleXProp, children, ...restProps }, ref) {
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

BreadcrumbItem.displayName = 'BreadcrumbItem';

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ as: Component = 'a', styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <Component
        ref={ref}
        {...stylex.props(styles.link, styleXProp)}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ styleX: styleXProp, children, ...restProps }, ref) {
    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        {...stylex.props(styles.page, styleXProp)}
        {...restProps}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ children, styleX: styleXProp, ...restProps }, ref) {
    return (
      <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        {...stylex.props(styles.separator, styleXProp)}
        {...restProps}
      >
        {children ?? (
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </li>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  function BreadcrumbEllipsis({ styleX: styleXProp, ...restProps }, ref) {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
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
          More
        </span>
      </span>
    );
  }
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
