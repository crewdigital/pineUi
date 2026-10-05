import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Badge,
  Switch,
  Progress,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TextField,
  Alert,
} from '@pine-ui/react';
import { STANDARD_PALETTES, type StandardPalette } from '../palettes.js';

const meta: Meta = {
  title: 'Platform/Theme Customizer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive real-time theme customizer for Pine UI. Customize standard color palettes, light/dark/high-contrast modes, border radiuses, and copy production-ready CSS variables directly.',
      },
    },
  },
};

export default meta;

export const LiveCustomizer: StoryObj = {
  render: () => {
    const [selectedPaletteKey, setSelectedPaletteKey] = React.useState<string>('emerald');
    const [customColor, setCustomColor] = React.useState<string>('#059669');
    const [colorMode, setColorMode] = React.useState<'light' | 'dark' | 'high-contrast'>('light');
    const [radius, setRadius] = React.useState<string>('8px');
    const [density, setDensity] = React.useState<'compact' | 'default' | 'comfortable'>('default');
    const [switchValue, setSwitchValue] = React.useState<boolean>(true);
    const [copied, setCopied] = React.useState<boolean>(false);

    const activePalette: StandardPalette =
      selectedPaletteKey === 'custom'
        ? {
            id: 'custom',
            name: 'Custom Hex',
            primary: customColor,
            hover: customColor,
            active: customColor,
            subtle: `${customColor}1a`,
            focus: customColor,
          }
        : (STANDARD_PALETTES[selectedPaletteKey] ?? STANDARD_PALETTES['emerald']!);

    const isDark = colorMode === 'dark';
    const isHighContrast = colorMode === 'high-contrast';

    const canvasBg = isHighContrast ? '#000000' : isDark ? '#090d16' : '#f8fafc';
    const surfaceBg = isHighContrast ? '#0a0a0a' : isDark ? '#111827' : '#ffffff';
    const textColor = isHighContrast ? '#ffffff' : isDark ? '#f9fafb' : '#0f172a';
    const subtextColor = isHighContrast ? '#d1d5db' : isDark ? '#9ca3af' : '#64748b';
    const borderColor = isHighContrast ? '#ffffff' : isDark ? '#1f2937' : '#e2e8f0';

    const generatedCss = `:root[data-theme="custom"] {
  /* Brand Primary */
  --pine-action-primary-background: ${activePalette.primary};
  --pine-action-primary-background-hover: ${activePalette.hover};
  --pine-action-primary-background-active: ${activePalette.active};
  --pine-background-brand: ${activePalette.primary};
  --pine-background-brand-subtle: ${activePalette.subtle};
  --pine-border-focus: ${activePalette.focus};
  --pine-focus-ring: ${activePalette.focus};
  --pine-foreground-brand: ${activePalette.primary};

  /* Corner Radius */
  --pine-radius-md: ${radius};
  --pine-radius-lg: calc(${radius} + 4px);
}`;

    const handleCopy = () => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(generatedCss);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div
        data-scheme={colorMode}
        data-density={density}
        style={{
          minHeight: '100vh',
          backgroundColor: canvasBg,
          color: textColor,
          padding: '32px',
          boxSizing: 'border-box',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          ['--pine-action-primary-background' as string]: activePalette.primary,
          ['--pine-action-primary-background-hover' as string]: activePalette.hover,
          ['--pine-action-primary-background-active' as string]: activePalette.active,
          ['--pine-background-brand' as string]: activePalette.primary,
          ['--pine-background-brand-subtle' as string]: activePalette.subtle,
          ['--pine-border-focus' as string]: activePalette.focus,
          ['--pine-focus-ring' as string]: activePalette.focus,
          ['--pine-foreground-brand' as string]: activePalette.primary,
          ['--pine-radius-md' as string]: radius,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: textColor }}>
                🎨 Pine UI Theme Studio
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: subtextColor }}>
                Interactive real-time theme customizer adhering to standard WCAG AA color palettes.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open('https://github.com/crewdigital/pineui', '_blank')}
              >
                GitHub Repository ↗
              </Button>
              <Button variant="primary" size="sm" onClick={handleCopy}>
                {copied ? '✓ Copied CSS!' : 'Copy Theme CSS'}
              </Button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '28px' }}>
            {/* Left Column: Theme Controls */}
            <div
              style={{
                backgroundColor: surfaceBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                height: 'fit-content',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* Palette Choice */}
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', display: 'block', color: textColor }}>
                  Standard Color Palette
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {Object.entries(STANDARD_PALETTES).map(([key, pal]) => {
                    const isSelected = selectedPaletteKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedPaletteKey(key)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 4px',
                          border: `2px solid ${isSelected ? pal.primary : borderColor}`,
                          borderRadius: '8px',
                          backgroundColor: isSelected ? (isDark ? '#1e293b' : '#f1f5f9') : 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: pal.primary,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                          }}
                        />
                        <span style={{ fontSize: '11px', color: textColor, fontWeight: isSelected ? 700 : 500 }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Input */}
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    id="custom-color-picker"
                    aria-label="Custom Hex Color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setSelectedPaletteKey('custom');
                    }}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    Custom Hex: <code style={{ fontWeight: 600 }}>{activePalette.primary}</code>
                  </span>
                </div>
              </div>

              {/* Color Scheme / Mode */}
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px', display: 'block', color: textColor }}>
                  Color Scheme
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {(['light', 'dark', 'high-contrast'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setColorMode(m)}
                      style={{
                        padding: '8px 4px',
                        fontSize: '12px',
                        fontWeight: colorMode === m ? 700 : 500,
                        border: `1px solid ${colorMode === m ? activePalette.primary : borderColor}`,
                        borderRadius: '6px',
                        backgroundColor: colorMode === m ? activePalette.primary : 'transparent',
                        color: colorMode === m ? '#ffffff' : textColor,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {m.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner Radius */}
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px', display: 'block', color: textColor }}>
                  Corner Radius: {radius}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { label: 'None', val: '0px' },
                    { label: 'Sm (4px)', val: '4px' },
                    { label: 'Md (8px)', val: '8px' },
                    { label: 'Lg (12px)', val: '12px' },
                    { label: 'Pill', val: '9999px' },
                  ].map((r) => (
                    <button
                      key={r.label}
                      type="button"
                      onClick={() => setRadius(r.val)}
                      style={{
                        flex: 1,
                        padding: '6px 2px',
                        fontSize: '11px',
                        fontWeight: radius === r.val ? 700 : 500,
                        border: `1px solid ${radius === r.val ? activePalette.primary : borderColor}`,
                        borderRadius: '6px',
                        backgroundColor: radius === r.val ? (isDark ? '#1e293b' : '#f1f5f9') : 'transparent',
                        color: textColor,
                        cursor: 'pointer',
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interface Density */}
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px', display: 'block', color: textColor }}>
                  Density
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {(['compact', 'default', 'comfortable'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDensity(d)}
                      style={{
                        padding: '6px 4px',
                        fontSize: '12px',
                        fontWeight: density === d ? 700 : 500,
                        border: `1px solid ${density === d ? activePalette.primary : borderColor}`,
                        borderRadius: '6px',
                        backgroundColor: density === d ? (isDark ? '#1e293b' : '#f1f5f9') : 'transparent',
                        color: textColor,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Code snippet */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: subtextColor }}>
                    CSS Variables Code
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activePalette.primary,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: isDark ? '#030712' : '#f1f5f9',
                    border: `1px solid ${borderColor}`,
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    color: subtextColor,
                    margin: 0,
                  }}
                >
                  {generatedCss}
                </pre>
              </div>
            </div>

            {/* Right Column: Live Component Playground */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Alert Feedback Banner */}
              <Alert variant="info" title="Dynamic Theme Preview">
                {`Currently previewing ${activePalette.name} in ${colorMode} mode with ${radius} radius.`}
              </Alert>

              {/* Section 1: Buttons & Actions */}
              <div
                style={{
                  backgroundColor: surfaceBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                }}
              >
                <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                  Buttons & Interactive Controls
                </h4>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button variant="primary">
                    Primary Action
                  </Button>
                  <Button variant="secondary">
                    Secondary
                  </Button>
                  <Button variant="danger">
                    Destructive
                  </Button>
                  <Button variant="subtle">
                    Subtle
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              {/* Section 2: Form Controls */}
              <div
                style={{
                  backgroundColor: surfaceBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                }}
              >
                <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                  Form Inputs & State Toggles
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <TextField
                      label="Workspace Domain"
                      placeholder="e.g. acme.pineui.design"
                      defaultValue="acme.pineui.design"
                    />
                    <TextField
                      label="Organization Email"
                      placeholder="alex@company.org"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Switch
                      checked={switchValue}
                      onChange={(e) => setSwitchValue(e.target.checked)}
                      label="Enable Instant Theme Sync"
                    />
                    <Badge variant="primary">Theme Active</Badge>
                    <Badge variant="success">WCAG AA Passed</Badge>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: subtextColor, marginBottom: '8px', display: 'block' }}>
                      Progress & Completion Indicator
                    </span>
                    <Progress value={65} max={100} label="Theme Generation Progress" />
                  </div>
                </div>
              </div>

              {/* Section 3: Navigation & Tabs */}
              <div
                style={{
                  backgroundColor: surfaceBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                }}
              >
                <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                  Navigation & Structured Panels
                </h4>
                <Tabs defaultValue="overview">
                  <TabList aria-label="Component categories">
                    <Tab value="overview">Overview</Tab>
                    <Tab value="tokens">Design Tokens</Tab>
                    <Tab value="specs">A11y Specs</Tab>
                  </TabList>
                  <TabPanel value="overview">
                    <p style={{ marginTop: '12px', fontSize: '14px', color: subtextColor }}>
                      Pine UI components dynamically bind to your customized CSS custom properties without
                      requiring React context re-renders or style re-computations.
                    </p>
                  </TabPanel>
                  <TabPanel value="tokens">
                    <p style={{ marginTop: '12px', fontSize: '14px', color: subtextColor }}>
                      Selected brand primary hex: <strong>{activePalette.primary}</strong>. Focus ring:{' '}
                      <strong>{activePalette.focus}</strong>.
                    </p>
                  </TabPanel>
                  <TabPanel value="specs">
                    <p style={{ marginTop: '12px', fontSize: '14px', color: subtextColor }}>
                      All standard color combinations maintain a minimum contrast ratio of 4.5:1 against
                      their relative surface and canvas colors in compliance with WCAG 2.2 AA standards.
                    </p>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
