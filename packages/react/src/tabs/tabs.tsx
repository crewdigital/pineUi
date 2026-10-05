'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex/vars.stylex';
import { createScopedContext } from '@pine-ui/behaviors/create-scoped-context';
import { useControllableState } from '@pine-ui/behaviors/use-controllable-state';
import { useStableId } from '@pine-ui/behaviors/aria-linking';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TabsVariant = 'line' | 'enclosed' | 'pill';

export interface TabsProps {
  /** Controlled active tab value */
  value?: string;
  /** Default active tab (uncontrolled) */
  defaultValue: string;
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void;
  /** Visual variant for tab styling */
  variant?: TabsVariant;
  /** Orientation of the tab list */
  orientation?: 'horizontal' | 'vertical';
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
  children: React.ReactNode;
}

export interface TabListProps {
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Unique value identifying this tab */
  value: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

export interface TabPanelProps {
  /** Value matching the corresponding Tab */
  value: string;
  children: React.ReactNode;
  /** StyleX override prop */
  styleX?: stylex.StyleXStyles;
}

// ─── Scoped Context ──────────────────────────────────────────────────────────

interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
  variant: TabsVariant;
  orientation: 'horizontal' | 'vertical';
  baseId: string;
}

const [TabsProvider, useTabsContext] = createScopedContext<TabsContextValue>('Tabs');

// ─── StyleX Styles ───────────────────────────────────────────────────────────

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  rootVertical: {
    flexDirection: 'row',
  },
  tabList: {
    display: 'flex',
    flexDirection: 'row',
    gap: vars.space1,
    borderBottomWidth: vars.borderWidth1,
    borderBottomStyle: 'solid',
    borderBottomColor: vars.borderDefault,
  },
  tabListVertical: {
    flexDirection: 'column',
    borderBottomWidth: '0',
    borderInlineEndWidth: vars.borderWidth1,
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: vars.borderDefault,
  },
  tabListEnclosed: {
    backgroundColor: vars.backgroundSurface,
    borderRadius: vars.radiusMd,
    padding: vars.space1,
    borderBottomWidth: '0',
  },
  tabListPill: {
    backgroundColor: vars.backgroundSurface,
    borderRadius: vars.radiusFull,
    padding: '2px',
    borderBottomWidth: '0',
    gap: '2px',
  },
  tab: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${vars.space2} ${vars.space4}`,
    fontFamily: vars.fontFamilySans,
    fontSize: vars.fontSizeSm,
    fontWeight: vars.fontWeightMedium,
    lineHeight: vars.fontLineHeightNone,
    color: vars.foregroundSecondary,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    transitionProperty: 'color, background-color, box-shadow, border-color',
    transitionDuration: vars.motionDurationFast,
    transitionTimingFunction: vars.motionEasingStandard,
    ':hover': {
      color: vars.foregroundPrimary,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.focusOffset}, 0 0 0 4px ${vars.focusRing}`,
    },
  },
  tabActive: {
    color: vars.foregroundPrimary,
  },
  // Line variant - active indicator
  tabLineActive: {
    '::after': {
      content: '""',
      position: 'absolute',
      insetInline: 0,
      bottom: '-1px',
      height: '2px',
      backgroundColor: vars.actionPrimaryBackground,
      borderRadius: vars.radiusFull,
    },
  },
  // Enclosed variant
  tabEnclosed: {
    borderRadius: vars.radiusSm,
  },
  tabEnclosedActive: {
    backgroundColor: vars.backgroundCanvas,
    boxShadow: vars.shadowSm,
  },
  // Pill variant
  tabPill: {
    borderRadius: vars.radiusFull,
  },
  tabPillActive: {
    backgroundColor: vars.backgroundCanvas,
    boxShadow: vars.shadowSm,
  },
  tabDisabled: {
    opacity: vars.opacity50,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  panel: {
    padding: vars.space4,
    outline: 'none',
    ':focus-visible': {
      boxShadow: `inset 0 0 0 2px ${vars.focusRing}`,
      borderRadius: vars.radiusSm,
    },
  },
});

// ─── Component Definitions ───────────────────────────────────────────────────

export function Tabs({
  value: valueProp,
  defaultValue,
  onValueChange,
  variant = 'line',
  orientation = 'horizontal',
  children,
  styleX: styleXProp,
}: TabsProps) {
  const [activeValue, setActiveValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const baseId = useStableId();

  return (
    <TabsProvider
      value={{
        activeValue: activeValue ?? '',
        setActiveValue,
        variant,
        orientation,
        baseId,
      }}
    >
      <div
        {...stylex.props(
          styles.root,
          orientation === 'vertical' && styles.rootVertical,
          styleXProp
        )}
      >
        {children}
      </div>
    </TabsProvider>
  );
}

Tabs.displayName = 'Tabs';

export function TabList({ children, styleX: styleXProp }: TabListProps) {
  const { variant, orientation } = useTabsContext('TabList');

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      {...stylex.props(
        styles.tabList,
        orientation === 'vertical' && styles.tabListVertical,
        variant === 'enclosed' && styles.tabListEnclosed,
        variant === 'pill' && styles.tabListPill,
        styleXProp
      )}
    >
      {children}
    </div>
  );
}

TabList.displayName = 'TabList';

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  function Tab({ value, disabled = false, children, styleX: styleXProp, ...restProps }, ref) {
    const { activeValue, setActiveValue, variant, baseId } = useTabsContext('Tab');
    const isActive = activeValue === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <button
        ref={ref}
        id={tabId}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => setActiveValue(value)}
        data-state={isActive ? 'active' : 'inactive'}
        {...stylex.props(
          styles.tab,
          isActive && styles.tabActive,
          variant === 'line' && isActive && styles.tabLineActive,
          variant === 'enclosed' && styles.tabEnclosed,
          variant === 'enclosed' && isActive && styles.tabEnclosedActive,
          variant === 'pill' && styles.tabPill,
          variant === 'pill' && isActive && styles.tabPillActive,
          disabled && styles.tabDisabled,
          styleXProp
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

export function TabPanel({ value, children, styleX: styleXProp }: TabPanelProps) {
  const { activeValue, baseId } = useTabsContext('TabPanel');
  const isActive = activeValue === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isActive) return null;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      {...stylex.props(styles.panel, styleXProp)}
    >
      {children}
    </div>
  );
}

TabPanel.displayName = 'TabPanel';
