import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Button,
  TextField,
  Checkbox,
  Tooltip,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  Badge,
} from '@pine-ui/react';
import { Box, Stack, Inline, Surface, Heading, Text } from '@pine-ui/primitives';
import { Check, Sun, Moon } from '@pine-ui/icons';

function App() {
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark' | 'high-contrast'>('light');
  const [brand, setBrand] = React.useState<'corporate' | 'creative' | 'minimal'>('corporate');

  const toggleTheme = () => {
    const next = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'high-contrast' : 'light';
    setThemeMode(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const changeBrand = (newBrand: 'corporate' | 'creative' | 'minimal') => {
    setBrand(newBrand);
    document.documentElement.setAttribute('data-brand', newBrand);
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        padding: '32px',
        backgroundColor: themeMode === 'dark' ? '#0f172a' : '#f8fafc',
        color: themeMode === 'dark' ? '#f8fafc' : '#0f172a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Stack gap={6} style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header with White-Label Brand & Theme Switchers */}
        <Surface
          variant="raised"
          bordered
          style={{
            padding: '24px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack gap={1}>
            <Inline gap={2} align="center">
              <Heading level={2}>Pine UI Platform</Heading>
              <Badge variant="success">WCAG 2.2 AA</Badge>
              <Badge variant="neutral">Zero-Runtime CSS</Badge>
            </Inline>
            <Text size="sm" color="muted">
              Enterprise React Design System with Multi-Brand Orthogonal Theming
            </Text>
          </Stack>

          <Inline gap={3} align="center">
            <Select
              defaultValue={brand}
              onValueChange={(val) => changeBrand(val as 'corporate' | 'creative' | 'minimal')}
            >
              <SelectTrigger style={{ width: '140px' }}>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {themeMode === 'dark' ? <Sun size="sm" /> : <Moon size="sm" />}
              <span style={{ textTransform: 'capitalize' }}>{themeMode}</span>
            </Button>
          </Inline>
        </Surface>

        {/* Interactive Controls & Complex Components Showcase */}
        <Surface variant="raised" bordered style={{ padding: '24px', borderRadius: '12px' }}>
          <Stack gap={4}>
            <Heading level={3}>Interactive Controls & Overlays</Heading>

            <Inline gap={4} align="center">
              <Tooltip content="Dispatches action using Pine UI token pipeline">
                <Button variant="primary">
                  <Check size="sm" /> Primary Action
                </Button>
              </Tooltip>

              <Dialog>
                <DialogTrigger>Open Modal Dialog</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enterprise Security Audit</DialogTitle>
                    <DialogDescription>
                      All Pine UI components conform strictly to WCAG 2.2 Level AA guidelines.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <DialogClose>Confirm</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Inline>

            <Inline gap={4}>
              <Box style={{ flex: 1 }}>
                <TextField label="User Email" placeholder="alex@enterprise.com" />
              </Box>

              <Box style={{ flex: 1 }}>
                <Combobox>
                  <ComboboxInput placeholder="Search components..." />
                  <ComboboxContent>
                    <ComboboxItem value="button">Button (Level 2)</ComboboxItem>
                    <ComboboxItem value="dialog">Dialog (Level 4)</ComboboxItem>
                    <ComboboxItem value="select">Select (Level 5)</ComboboxItem>
                    <ComboboxItem value="combobox">Combobox (Level 5)</ComboboxItem>
                  </ComboboxContent>
                </Combobox>
              </Box>
            </Inline>

            <Checkbox label="Enable strict zero-runtime StyleX compiler enforcement" defaultChecked />
          </Stack>
        </Surface>
      </Stack>
    </Box>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
