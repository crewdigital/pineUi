'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { createScopedContext } from '@pine-ui/behaviors/create-scoped-context';
import { useControllableState } from '@pine-ui/behaviors/use-controllable-state';
import { useStableId } from '@pine-ui/behaviors/aria-linking';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AccordionType = 'single' | 'multiple';

export interface AccordionBaseProps {
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface AccordionSingleProps extends AccordionBaseProps {
  /** Only one item open at a time */
  type?: 'single';
  /** Controlled value for single mode */
  value?: string;
  /** Default value for single mode (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Allow collapsing the active item */
  collapsible?: boolean;
}

export interface AccordionMultipleProps extends AccordionBaseProps {
  /** Multiple items can be open simultaneously */
  type: 'multiple';
  /** Controlled values for multiple mode */
  value?: string[];
  /** Default values for multiple mode (uncontrolled) */
  defaultValue?: string[];
  /** Callback when values change */
  onValueChange?: (value: string[]) => void;
  collapsible?: never;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps {
  /** Unique identifier for this item */
  value: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  children: React.ReactNode;
}

export interface AccordionTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface AccordionContentProps {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

// ─── Scoped Context ──────────────────────────────────────────────────────────

interface AccordionContextValue {
  toggleItem: (value: string) => void;
  isItemOpen: (value: string) => boolean;
}

const [AccordionProvider, useAccordionContext] =
  createScopedContext<AccordionContextValue>('Accordion');

interface AccordionItemContextValue {
  value: string;
  triggerId: string;
  contentId: string;
  disabled: boolean;
  open: boolean;
}

const [AccordionItemProvider, useAccordionItemContext] =
  createScopedContext<AccordionItemContextValue>('AccordionItem');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    borderBottomWidth: vars.borderWidth1,
    borderBottomStyle: 'solid',
    borderBottomColor: vars.borderDefault,
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: vars.space4,
    paddingInlineEnd: vars.space4,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: vars.fontFamilySans,
    fontSize: vars.fontSizeMd,
    fontWeight: vars.fontWeightMedium,
    lineHeight: vars.fontLineHeightNormal,
    color: vars.foregroundPrimary,
    textAlign: 'start',
    outline: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':hover': {
      backgroundColor: vars.actionSubtleBackgroundHover,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },
  triggerDisabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  chevron: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transitionProperty: 'transform',
    transitionDuration: vars.motionDurationNormal,
    transitionTimingFunction: vars.motionEasingStandard,
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  contentWrapper: {
    overflow: 'hidden',
  },
  contentWrapperOpen: {
    // Animated via inline styles for dynamic height
  },
  contentWrapperClosed: {
    height: '0px',
  },
  content: {
    padding: vars.space4,
    paddingBlockStart: '0',
    fontSize: vars.fontSizeMd,
    lineHeight: vars.fontLineHeightRelaxed,
    color: vars.foregroundSecondary,
  },
});

// ─── Component Definitions ───────────────────────────────────────────────────

export function Accordion(props: AccordionProps) {
  const { type = 'single', children, styleX: styleXProp } = props;

  if (type === 'multiple') {
    return (
      <AccordionMultipleImpl {...(props as AccordionMultipleProps)} styleX={styleXProp}>
        {children}
      </AccordionMultipleImpl>
    );
  }

  return (
    <AccordionSingleImpl {...(props as AccordionSingleProps)} styleX={styleXProp}>
      {children}
    </AccordionSingleImpl>
  );
}

function AccordionSingleImpl({
  value: valueProp,
  defaultValue,
  onValueChange,
  collapsible = false,
  children,
  styleX: styleXProp,
}: AccordionSingleProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? '',
    onChange: onValueChange,
  });

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      if (value === itemValue) {
        if (collapsible) {
          setValue('');
        }
      } else {
        setValue(itemValue);
      }
    },
    [value, collapsible, setValue]
  );

  const isItemOpen = React.useCallback(
    (itemValue: string) => value === itemValue,
    [value]
  );

  return (
    <AccordionProvider value={{ toggleItem, isItemOpen }}>
      <div role="presentation" {...stylex.props(styles.root, styleXProp)}>
        {children}
      </div>
    </AccordionProvider>
  );
}

function AccordionMultipleImpl({
  value: valueProp,
  defaultValue,
  onValueChange,
  children,
  styleX: styleXProp,
}: AccordionMultipleProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
  });

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      setValue((prev: string[]) =>
        prev.includes(itemValue)
          ? prev.filter((v: string) => v !== itemValue)
          : [...prev, itemValue]
      );
    },
    [setValue]
  );

  const isItemOpen = React.useCallback(
    (itemValue: string) => value.includes(itemValue),
    [value]
  );

  return (
    <AccordionProvider value={{ toggleItem, isItemOpen }}>
      <div role="presentation" {...stylex.props(styles.root, styleXProp)}>
        {children}
      </div>
    </AccordionProvider>
  );
}

export function AccordionItem({ value, disabled = false, children }: AccordionItemProps) {
  const { isItemOpen } = useAccordionContext('AccordionItem');
  const triggerId = useStableId();
  const contentId = useStableId();
  const open = isItemOpen(value);

  return (
    <AccordionItemProvider
      value={{
        value,
        triggerId,
        contentId,
        disabled,
        open,
      }}
    >
      <div {...stylex.props(styles.item)} data-state={open ? 'open' : 'closed'}>
        {children}
      </div>
    </AccordionItemProvider>
  );
}

AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, styleX: styleXProp, disabled: disabledProp, ...restProps }, ref) {
    const { toggleItem } = useAccordionContext('AccordionTrigger');
    const { value, triggerId, contentId, disabled: itemDisabled, open } =
      useAccordionItemContext('AccordionTrigger');

    const isDisabled = disabledProp ?? itemDisabled;

    return (
      <h3 style={{ margin: 0 }}>
        <button
          ref={ref}
          id={triggerId}
          type="button"
          role="button"
          aria-expanded={open}
          aria-controls={contentId}
          aria-disabled={isDisabled || undefined}
          disabled={isDisabled}
          onClick={() => toggleItem(value)}
          data-state={open ? 'open' : 'closed'}
          {...stylex.props(
            styles.trigger,
            isDisabled && styles.triggerDisabled,
            styleXProp
          )}
          {...restProps}
        >
          <span>{children}</span>
          <ChevronIcon open={open} />
        </button>
      </h3>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      {...stylex.props(styles.chevron, open && styles.chevronOpen)}
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function AccordionContent({ children, styleX: styleXProp }: AccordionContentProps) {
  const { contentId, triggerId, open } = useAccordionItemContext('AccordionContent');

  return (
    <div
      {...stylex.props(
        styles.contentWrapper,
        open ? styles.contentWrapperOpen : styles.contentWrapperClosed
      )}
    >
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!open}
        {...stylex.props(styles.content, styleXProp)}
      >
        {children}
      </div>
    </div>
  );
}

AccordionContent.displayName = 'AccordionContent';

Accordion.displayName = 'Accordion';
