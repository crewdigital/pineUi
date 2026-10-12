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
          'Interactive real-time theme customizer for Pine UI. Customize standard color palettes, light/dark/high-contrast modes, border radiuses, preview live application mockups, and export directly as CSS, Tailwind, or StyleX.',
      },
    },
  },
};

export default meta;

interface PresetTheme {
  name: string;
  paletteKey: string;
  customColor?: string;
  mode: 'light' | 'dark' | 'high-contrast';
  radius: string;
  density: 'compact' | 'default' | 'comfortable';
}

const PRESET_THEMES: PresetTheme[] = [
  {
    name: 'Pine Enterprise',
    paletteKey: 'emerald',
    mode: 'light',
    radius: '8px',
    density: 'default',
  },
  {
    name: 'Midnight Nebula',
    paletteKey: 'violet',
    customColor: '#7c3aed',
    mode: 'dark',
    radius: '12px',
    density: 'comfortable',
  },
  {
    name: 'Linear Minimal',
    paletteKey: 'custom',
    customColor: '#52525b',
    mode: 'dark',
    radius: '6px',
    density: 'compact',
  },
  {
    name: 'Sunset Amber',
    paletteKey: 'amber',
    customColor: '#f59e0b',
    mode: 'dark',
    radius: '10px',
    density: 'default',
  },
];

export const LiveCustomizer: StoryObj = {
  render: () => {
    const [selectedPaletteKey, setSelectedPaletteKey] = React.useState<string>('emerald');
    const [customColor, setCustomColor] = React.useState<string>('#059669');
    const [colorMode, setColorMode] = React.useState<'light' | 'dark' | 'high-contrast'>('light');
    const [radius, setRadius] = React.useState<string>('8px');
    const [density, setDensity] = React.useState<'compact' | 'default' | 'comfortable'>('default');
    const [switchValue, setSwitchValue] = React.useState<boolean>(true);
    const [previewTab, setPreviewTab] = React.useState<'components' | 'mockup'>('components');
    const [exportFormat, setExportFormat] = React.useState<'css' | 'tailwind' | 'stylex'>('css');
    const [copied, setCopied] = React.useState<boolean>(false);

    const applyPreset = (preset: PresetTheme) => {
      setSelectedPaletteKey(preset.paletteKey);
      if (preset.customColor) setCustomColor(preset.customColor);
      setColorMode(preset.mode);
      setRadius(preset.radius);
      setDensity(preset.density);
    };

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

    const generatedTailwind = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '${activePalette.primary}',
          hover: '${activePalette.hover}',
          active: '${activePalette.active}',
          subtle: '${activePalette.subtle}',
          focus: '${activePalette.focus}',
        },
      },
      borderRadius: {
        brand: '${radius}',
      },
    },
  },
};`;

    const generatedStylex = `// theme.stylex.ts
import * as stylex from '@stylexjs/stylex';
import { vars } from '@pine-ui/stylex';

export const customTheme = stylex.createTheme(vars, {
  actionPrimaryBackground: '${activePalette.primary}',
  actionPrimaryBackgroundHover: '${activePalette.hover}',
  actionPrimaryBackgroundActive: '${activePalette.active}',
  backgroundBrand: '${activePalette.primary}',
  backgroundBrandSubtle: '${activePalette.subtle}',
  focusRing: '${activePalette.focus}',
  radiusMd: '${radius}',
});`;

    const currentExportCode =
      exportFormat === 'css'
        ? generatedCss
        : exportFormat === 'tailwind'
        ? generatedTailwind
        : generatedStylex;

    const handleCopy = () => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(currentExportCode);
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
          fontFamily: "var(--pine-font-family-sans, Inter, -apple-system, sans-serif)",
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
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: textColor }}>
                Pine UI Theme Studio & Export Engine
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: subtextColor }}>
                Real-time theme architect with dual-layer elevation, spring physics, and multi-target code generation.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open('https://github.com/crewdigital/pineui', '_blank')}
              >
                GitHub
              </Button>
              <Button variant="primary" size="sm" onClick={handleCopy}>
                {copied ? 'Copied Code!' : `Copy ${exportFormat.toUpperCase()}`}
              </Button>
            </div>
          </div>

          {/* 1-Click Preset Themes Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: surfaceBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: subtextColor, marginRight: '4px' }}>
              1-Click Presets:
            </span>
            {PRESET_THEMES.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: canvasBg,
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
              >
                {preset.name}
              </button>
            ))}
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
              <div>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                  Palette & Brand Hue
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {Object.entries(STANDARD_PALETTES).map(([key, pal]) => {
                    const isSelected = selectedPaletteKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPaletteKey(key)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '8px 4px',
                          border: `2px solid ${isSelected ? activePalette.focus : 'transparent'}`,
                          borderRadius: '8px',
                          backgroundColor: canvasBg,
                          cursor: 'pointer',
                          gap: '6px',
                          outline: 'none',
                        }}
                      >
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: pal.primary,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                          }}
                        />
                        <span style={{ fontSize: '11px', color: textColor, fontWeight: isSelected ? 700 : 500 }}>
                          {pal.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                  Color Appearance
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {(['light', 'dark', 'high-contrast'] as const).map((mode) => (
                    <Button
                      key={mode}
                      size="sm"
                      variant={colorMode === mode ? 'primary' : 'outline'}
                      onClick={() => setColorMode(mode)}
                    >
                      {mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'Contrast'}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                  Corner Radius
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[
                    { label: 'None', val: '0px' },
                    { label: 'Sm', val: '4px' },
                    { label: 'Md', val: '8px' },
                    { label: 'Lg', val: '12px' },
                  ].map((r) => (
                    <Button
                      key={r.val}
                      size="sm"
                      variant={radius === r.val ? 'primary' : 'outline'}
                      onClick={() => setRadius(r.val)}
                    >
                      {r.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Export Format Selector */}
              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                  Export Engine
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '12px' }}>
                  <Button
                    size="sm"
                    variant={exportFormat === 'css' ? 'primary' : 'outline'}
                    onClick={() => setExportFormat('css')}
                  >
                    CSS Variables
                  </Button>
                  <Button
                    size="sm"
                    variant={exportFormat === 'tailwind' ? 'primary' : 'outline'}
                    onClick={() => setExportFormat('tailwind')}
                  >
                    Tailwind
                  </Button>
                  <Button
                    size="sm"
                    variant={exportFormat === 'stylex' ? 'primary' : 'outline'}
                    onClick={() => setExportFormat('stylex')}
                  >
                    StyleX
                  </Button>
                </div>
                <pre
                  style={{
                    backgroundColor: canvasBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    overflowX: 'auto',
                    margin: 0,
                    maxHeight: '160px',
                    color: textColor,
                  }}
                >
                  {currentExportCode}
                </pre>
              </div>
            </div>

            {/* Right Column: Live Interactive Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Preview Mode Switcher */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Button
                  size="sm"
                  variant={previewTab === 'components' ? 'primary' : 'outline'}
                  onClick={() => setPreviewTab('components')}
                >
                  Component Suite Preview
                </Button>
                <Button
                  size="sm"
                  variant={previewTab === 'mockup' ? 'primary' : 'outline'}
                  onClick={() => setPreviewTab('mockup')}
                >
                  Full App Mockup View
                </Button>
              </div>

              {previewTab === 'mockup' ? (
                /* Full App Mockup Preview */
                <div
                  style={{
                    backgroundColor: surfaceBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: radius,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Mock App Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 20px',
                      borderBottom: `1px solid ${borderColor}`,
                      backgroundColor: canvasBg,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontWeight: 800, fontSize: '16px', color: activePalette.primary }}>
                        PineMetrics
                      </span>
                      <Badge variant="primary">Production</Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <TextField size="sm" placeholder="Search resources... (Ctrl+K)" />
                      <Button variant="primary" size="sm">
                        New Project
                      </Button>
                    </div>
                  </div>

                  {/* Mock App Body */}
                  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '340px' }}>
                    {/* Mock Sidebar */}
                    <div
                      style={{
                        borderRight: `1px solid ${borderColor}`,
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        backgroundColor: canvasBg,
                      }}
                    >
                      {['Overview', 'Analytics', 'Customers', 'Billing', 'Settings'].map((item, idx) => (
                        <div
                          key={item}
                          style={{
                            padding: '8px 12px',
                            borderRadius: radius,
                            fontSize: '13px',
                            fontWeight: idx === 0 ? 600 : 400,
                            backgroundColor: idx === 0 ? activePalette.subtle : 'transparent',
                            color: idx === 0 ? activePalette.primary : subtextColor,
                            cursor: 'pointer',
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Mock Content */}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Metric Cards Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {[
                          { title: 'Total Revenue', value: '$84,230', trend: '+14.2%' },
                          { title: 'Active Subscriptions', value: '1,420', trend: '+8.1%' },
                          { title: 'System Health', value: '99.98%', trend: 'Operational' },
                        ].map((m) => (
                          <div
                            key={m.title}
                            style={{
                              padding: '16px',
                              backgroundColor: canvasBg,
                              border: `1px solid ${borderColor}`,
                              borderRadius: radius,
                            }}
                          >
                            <span style={{ fontSize: '12px', color: subtextColor }}>{m.title}</span>
                            <div style={{ fontSize: '20px', fontWeight: 700, margin: '6px 0', color: textColor }}>
                              {m.value}
                            </div>
                            <Badge variant="success">{m.trend}</Badge>
                          </div>
                        ))}
                      </div>

                      {/* Mock Table */}
                      <div
                        style={{
                          border: `1px solid ${borderColor}`,
                          borderRadius: radius,
                          overflow: 'hidden',
                        }}
                      >
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                          <thead>
                            <tr style={{ backgroundColor: canvasBg, borderBottom: `1px solid ${borderColor}` }}>
                              <th style={{ padding: '10px 14px', textAlign: 'left', color: subtextColor }}>Customer</th>
                              <th style={{ padding: '10px 14px', textAlign: 'left', color: subtextColor }}>Status</th>
                              <th style={{ padding: '10px 14px', textAlign: 'left', color: subtextColor }}>Plan</th>
                              <th style={{ padding: '10px 14px', textAlign: 'right', color: subtextColor }}>MRR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'Acme Global Corp', status: 'Active', plan: 'Enterprise', mrr: '$1,200/mo' },
                              { name: 'Vercel Labs', status: 'Active', plan: 'Pro Scale', mrr: '$450/mo' },
                              { name: 'Linear Systems', status: 'Trial', plan: 'Team', mrr: '$120/mo' },
                            ].map((row, i) => (
                              <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                                <td style={{ padding: '10px 14px', fontWeight: 500, color: textColor }}>{row.name}</td>
                                <td style={{ padding: '10px 14px' }}>
                                  <Badge variant={row.status === 'Active' ? 'success' : 'warning'}>{row.status}</Badge>
                                </td>
                                <td style={{ padding: '10px 14px', color: subtextColor }}>{row.plan}</td>
                                <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: textColor }}>
                                  {row.mrr}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Component Suite Preview */
                <>
                  <Alert variant="info" title="Custom Theme Preview">
                    Real-time styling changes apply to all Pine UI primitives, tokens, and components dynamically.
                  </Alert>

                  <div
                    style={{
                      backgroundColor: surfaceBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: radius,
                      padding: '24px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                      Interactive Buttons & Badges
                    </h4>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Button variant="primary">Primary Action</Button>
                      <Button variant="secondary">Secondary Action</Button>
                      <Button variant="outline">Outline Action</Button>
                      <Button variant="ghost">Ghost Action</Button>
                      <Badge variant="primary">Brand Tag</Badge>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: surfaceBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: radius,
                      padding: '24px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                      Form Controls & Input Adornments
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <TextField
                          label="Workspace Domain"
                          prefix="https://"
                          suffix=".pineui.app"
                          defaultValue="acme"
                          clearable
                        />
                        <TextField
                          label="Master Password"
                          type="password"
                          defaultValue="supersecret"
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Switch
                          checked={switchValue}
                          onChange={(e) => setSwitchValue(e.target.checked)}
                          label="Live Sync Active"
                        />
                      </div>

                      <div>
                        <span style={{ fontSize: '12px', color: subtextColor, marginBottom: '8px', display: 'block' }}>
                          Progress & Loading Rhythm
                        </span>
                        <Progress value={65} max={100} label="Theme Generation Progress" />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: surfaceBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: radius,
                      padding: '24px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>
                      Navigation & Tabs
                    </h4>
                    <Tabs defaultValue="overview">
                      <TabList aria-label="Component categories">
                        <Tab value="overview">Overview</Tab>
                        <Tab value="tokens">Design Tokens</Tab>
                        <Tab value="specs">A11y Standards</Tab>
                      </TabList>
                      <TabPanel value="overview">
                        <p style={{ marginTop: '12px', fontSize: '14px', color: subtextColor }}>
                          Pine UI components dynamically bind to your customized CSS custom properties and StyleX tokens.
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
