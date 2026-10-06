'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { useIsRtl, type Direction } from '@pine-ui/behaviors';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface BaseSwitchProps {
  /** Visible label text */
  label?: React.ReactNode;
  /** Helper text displayed below label */
  helperText?: React.ReactNode;
  /** Error message displayed below label */
  errorMessage?: React.ReactNode;
  /** Size variant */
  size?: SwitchSize;
  /** Error state */
  error?: boolean;
  /** Reading/layout direction ('ltr' or 'rtl') */
  dir?: Direction | undefined;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type SwitchProps = BaseSwitchProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseSwitchProps | 'type' | 'size'>;

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  container: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: vars.space3,
    fontFamily: vars.fontFamilySans,
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
  },
  containerDisabled: {
    cursor: 'not-allowed',
    opacity: vars.opacity75,
  },

  wrapper: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
  },

  nativeInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    cursor: 'inherit',
    zIndex: 1,
  },

  track: {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: vars.radiusFull,
    backgroundColor: {
      default: vars.backgroundSurfaceMuted,
      ':hover': vars.borderStrong,
    },
    padding: '2px',
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },

  trackChecked: {
    backgroundColor: vars.actionPrimaryBackground,
  },

  trackDisabled: {
    backgroundColor: vars.backgroundSurfaceDisabled,
  },

  trackCheckedDisabled: {
    backgroundColor: vars.actionPrimaryBackground,
    opacity: vars.opacity50,
  },

  focusRing: {
    ':focus-within': {
      borderRadius: vars.radiusFull,
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },

  thumb: {
    borderRadius: vars.radiusFull,
    backgroundColor: vars.colorNeutral0,
    boxShadow: vars.shadowSm,
    transitionProperty: 'transform, background-color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },

  // Track & Thumb Sizes
  smTrack: { width: '32px', height: '18px' },
  smThumb: { width: '14px', height: '14px' },
  smThumbChecked: { transform: 'translateX(14px)' },
  smThumbCheckedRtl: { transform: 'translateX(-14px)' },

  mdTrack: { width: '44px', height: '24px' },
  mdThumb: { width: '20px', height: '20px' },
  mdThumbChecked: { transform: 'translateX(20px)' },
  mdThumbCheckedRtl: { transform: 'translateX(-20px)' },

  lgTrack: { width: '56px', height: '30px' },
  lgThumb: { width: '26px', height: '26px' },
  lgThumbChecked: { transform: 'translateX(26px)' },
  lgThumbCheckedRtl: { transform: 'translateX(-26px)' },

  textGroup: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: vars.space1,
  },

  label: {
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightMedium,
    color: vars.foregroundPrimary,
    lineHeight: vars.fontLineHeightSnug,
  },

  helperText: {
    fontSize: vars.fontSizeXs,
    color: vars.foregroundSecondary,
    lineHeight: vars.fontLineHeightNormal,
  },

  errorMessage: {
    fontSize: vars.fontSizeXs,
    color: vars.feedbackDangerForeground,
    fontWeight: vars.fontWeightMedium,
    lineHeight: vars.fontLineHeightNormal,
  },
});

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    {
      id: passedId,
      label,
      helperText,
      errorMessage,
      error = false,
      checked: passedChecked,
      defaultChecked,
      size = 'md',
      disabled = false,
      dir,
      styleX,
      onChange,
      ...restProps
    },
    ref
  ) {
    const generatedId = React.useId();
    const id = passedId ?? generatedId;
    const labelRef = React.useRef<HTMLLabelElement | null>(null);
    const isRtl = useIsRtl(dir, labelRef);

    const [checkedState, setCheckedState] = React.useState(
      Boolean(passedChecked ?? defaultChecked)
    );

    const isControlled = passedChecked !== undefined;
    const isChecked = isControlled ? Boolean(passedChecked) : checkedState;

    const isError = Boolean(error || errorMessage);
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const describedBy = [
      errorMessage ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setCheckedState(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        ref={labelRef}
        htmlFor={id}
        dir={dir}
        data-direction={isRtl ? 'rtl' : 'ltr'}
        {...stylex.props(
          styles.container,
          disabled && styles.containerDisabled,
          styleX
        )}
      >
        <div {...stylex.props(styles.wrapper, styles.focusRing)}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            checked={isChecked}
            disabled={disabled}
            aria-checked={isChecked}
            aria-invalid={isError || undefined}
            aria-describedby={describedBy || undefined}
            onChange={handleChange}
            {...stylex.props(styles.nativeInput)}
            {...restProps}
          />
          <div
            {...stylex.props(
              styles.track,
              styles[`${size}Track`],
              isChecked && styles.trackChecked,
              disabled && (isChecked ? styles.trackCheckedDisabled : styles.trackDisabled)
            )}
          >
            <div
              {...stylex.props(
                styles.thumb,
                styles[`${size}Thumb`],
                isChecked && (isRtl ? styles[`${size}ThumbCheckedRtl`] : styles[`${size}ThumbChecked`])
              )}
            />
          </div>
        </div>

        {label || helperText || errorMessage ? (
          <div {...stylex.props(styles.textGroup)}>
            {label ? <span {...stylex.props(styles.label)}>{label}</span> : null}
            {errorMessage ? (
              <span id={errorId} role="alert" {...stylex.props(styles.errorMessage)}>
                {errorMessage}
              </span>
            ) : helperText ? (
              <span id={helperId} {...stylex.props(styles.helperText)}>
                {helperText}
              </span>
            ) : null}
          </div>
        ) : null}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
