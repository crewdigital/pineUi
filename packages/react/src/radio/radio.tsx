'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';

// ─── Radio Group Context ─────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: RadioSize;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
);

// ─── Types ───────────────────────────────────────────────────────────────────

export type RadioSize = 'sm' | 'md' | 'lg';

export interface BaseRadioProps {
  /** Visible label text */
  label?: React.ReactNode;
  /** Helper text */
  helperText?: React.ReactNode;
  /** Radio value */
  value: string;
  /** Size variant */
  size?: RadioSize;
  /** Error state */
  error?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export type RadioProps = BaseRadioProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseRadioProps | 'type' | 'size'>;

export interface RadioGroupProps {
  /** Form name for radio group */
  name?: string;
  /** Controlled active value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Value change callback */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label for the group */
  label?: React.ReactNode;
  /** Helper text for the group */
  helperText?: React.ReactNode;
  /** Error message for the group */
  errorMessage?: React.ReactNode;
  /** Disabled state for all radios in group */
  disabled?: boolean;
  /** Size for all radios in group */
  size?: RadioSize;
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  container: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: vars.space2,
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
    justifyContent: 'center',
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

  visualCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: vars.radiusFull,
    borderWidth: vars.borderWidth1,
    borderStyle: 'solid',
    borderColor: {
      default: vars.borderStrong,
      ':hover': vars.actionPrimaryBackgroundHover,
    },
    backgroundColor: vars.backgroundSurface,
    transitionProperty: 'border-color, background-color, box-shadow',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },

  visualCircleChecked: {
    borderColor: vars.actionPrimaryBackground,
  },

  visualCircleError: {
    borderColor: vars.feedbackDangerSolid,
  },

  visualCircleDisabled: {
    backgroundColor: vars.backgroundSurfaceDisabled,
    borderColor: vars.borderDisabled,
  },

  dot: {
    borderRadius: vars.radiusFull,
    backgroundColor: vars.actionPrimaryBackground,
    transitionProperty: 'transform, opacity',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
  },
  dotDisabled: {
    backgroundColor: vars.foregroundDisabled,
  },

  // Sizes (Radio circle & inner dot)
  smCircle: { width: '16px', height: '16px' },
  smDot: { width: '8px', height: '8px' },

  mdCircle: { width: '20px', height: '20px' },
  mdDot: { width: '10px', height: '10px' },

  lgCircle: { width: '24px', height: '24px' },
  lgDot: { width: '12px', height: '12px' },

  focusRing: {
    ':focus-within': {
      borderRadius: vars.radiusFull,
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },

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

  // Group styles
  groupContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: vars.space2,
    fontFamily: vars.fontFamilySans,
    border: 'none',
    padding: 0,
    margin: 0,
  },
  groupLegend: {
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightMedium,
    color: vars.foregroundPrimary,
    marginBottom: vars.space1,
    padding: 0,
  },
  groupListVertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space2,
  },
  groupListHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    gap: vars.space4,
    alignItems: 'center',
  },
  groupErrorMessage: {
    fontSize: vars.fontSizeXs,
    color: vars.feedbackDangerForeground,
    fontWeight: vars.fontWeightMedium,
  },
});

// ─── Radio Component ─────────────────────────────────────────────────────────

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    {
      id: passedId,
      label,
      helperText,
      value,
      checked: passedChecked,
      defaultChecked,
      size: passedSize,
      disabled: passedDisabled,
      error = false,
      styleX,
      onChange,
      name: passedName,
      ...restProps
    },
    ref
  ) {
    const group = React.useContext(RadioGroupContext);
    const generatedId = React.useId();
    const id = passedId ?? generatedId;

    const name = passedName ?? group?.name;
    const disabled = passedDisabled ?? group?.disabled ?? false;
    const size = passedSize ?? group?.size ?? 'md';

    const isControlled = passedChecked !== undefined || group?.value !== undefined;
    const isChecked = group?.value !== undefined
      ? group.value === value
      : passedChecked !== undefined
      ? Boolean(passedChecked)
      : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      group?.onChange?.(e);
    };

    return (
      <label
        htmlFor={id}
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
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            aria-invalid={error || undefined}
            onChange={handleChange}
            {...stylex.props(styles.nativeInput)}
            {...restProps}
          />
          <div
            {...stylex.props(
              styles.visualCircle,
              styles[`${size}Circle`],
              isChecked && styles.visualCircleChecked,
              error && !isChecked && styles.visualCircleError,
              disabled && styles.visualCircleDisabled
            )}
          >
            {isChecked ? (
              <div
                {...stylex.props(
                  styles.dot,
                  styles[`${size}Dot`],
                  disabled && styles.dotDisabled
                )}
              />
            ) : null}
          </div>
        </div>

        {label || helperText ? (
          <div {...stylex.props(styles.textGroup)}>
            {label ? <span {...stylex.props(styles.label)}>{label}</span> : null}
            {helperText ? (
              <span {...stylex.props(styles.helperText)}>{helperText}</span>
            ) : null}
          </div>
        ) : null}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

// ─── RadioGroup Component ────────────────────────────────────────────────────

export function RadioGroup({
  name: passedName,
  value: passedValue,
  defaultValue,
  onChange,
  label,
  helperText,
  errorMessage,
  disabled = false,
  size = 'md',
  orientation = 'vertical',
  styleX,
  children,
}: RadioGroupProps) {
  const generatedName = React.useId();
  const name = passedName ?? generatedName;

  const [valueState, setValueState] = React.useState(defaultValue ?? '');
  const isControlled = passedValue !== undefined;
  const currentValue = isControlled ? passedValue : valueState;

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) {
      setValueState(val);
    }
    onChange?.(val, e);
  };

  const contextValue = React.useMemo(
    () => ({
      name,
      value: currentValue,
      onChange: handleRadioChange,
      disabled,
      size,
    }),
    [name, currentValue, disabled, size]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <fieldset {...stylex.props(styles.groupContainer, styleX)}>
        {label ? <legend {...stylex.props(styles.groupLegend)}>{label}</legend> : null}
        <div
          {...stylex.props(
            orientation === 'horizontal'
              ? styles.groupListHorizontal
              : styles.groupListVertical
          )}
        >
          {children}
        </div>
        {errorMessage ? (
          <span role="alert" {...stylex.props(styles.groupErrorMessage)}>
            {errorMessage}
          </span>
        ) : helperText ? (
          <span {...stylex.props(styles.helperText)}>{helperText}</span>
        ) : null}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}
