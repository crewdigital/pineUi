import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface BaseAlertProps {
  /** Visual severity variant */
  variant?: AlertVariant;
  /** Optional alert title / headline */
  title?: React.ReactNode;
  /** Custom status icon override */
  icon?: React.ReactNode;
  /** Dismiss callback — renders close button when provided */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible aria-label for close button */
  closeLabel?: string;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type AlertProps = BaseAlertProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseAlertProps>;

// ─── Icons ───────────────────────────────────────────────────────────────────

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function DangerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: vars.space3,
    padding: vars.space4,
    borderRadius: vars.radiusLg,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    fontFamily: vars.fontFamilySans,
    fontSize: vars.fontSizeSm,
    lineHeight: vars.fontLineHeightNormal,
    boxSizing: 'border-box',
    width: '100%',
  },

  info: {
    backgroundColor: vars.feedbackInfoBackground,
    color: vars.feedbackInfoForeground,
    borderColor: vars.feedbackInfoBorder,
  },
  success: {
    backgroundColor: vars.feedbackSuccessBackground,
    color: vars.feedbackSuccessForeground,
    borderColor: vars.feedbackSuccessBorder,
  },
  warning: {
    backgroundColor: vars.feedbackWarningBackground,
    color: vars.feedbackWarningForeground,
    borderColor: vars.feedbackWarningBorder,
  },
  danger: {
    backgroundColor: vars.feedbackDangerBackground,
    color: vars.feedbackDangerForeground,
    borderColor: vars.feedbackDangerBorder,
  },

  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space1,
    flex: 1,
  },

  title: {
    fontWeight: vars.fontWeightSemibold,
    lineHeight: vars.fontLineHeightSnug,
  },

  closeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: vars.space1,
    margin: '-4px -4px -4px 0',
    cursor: 'pointer',
    color: 'currentColor',
    opacity: 0.7,
    borderRadius: vars.radiusSm,
    outline: 'none',
    transitionProperty: 'opacity, background-color',
    transitionDuration: vars.motionDurationFast,
    ':hover': {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusRing}`,
    },
  },
});

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = 'info',
    title,
    icon: customIcon,
    onClose,
    closeLabel = 'Dismiss alert',
    styleX,
    children,
    ...restProps
  },
  ref
) {
  const defaultIcon =
    variant === 'success' ? (
      <SuccessIcon />
    ) : variant === 'warning' ? (
      <WarningIcon />
    ) : variant === 'danger' ? (
      <DangerIcon />
    ) : (
      <InfoIcon />
    );

  const statusIcon = customIcon ?? defaultIcon;
  const role = variant === 'danger' ? 'alert' : 'status';

  return (
    <div
      ref={ref}
      role={role}
      {...stylex.props(styles.base, styles[variant], styleX)}
      {...restProps}
    >
      <div {...stylex.props(styles.iconContainer)}>{statusIcon}</div>

      <div {...stylex.props(styles.content)}>
        {title ? <div {...stylex.props(styles.title)}>{title}</div> : null}
        {children ? <div>{children}</div> : null}
      </div>

      {onClose ? (
        <button
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          {...stylex.props(styles.closeButton)}
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
});

Alert.displayName = 'Alert';
