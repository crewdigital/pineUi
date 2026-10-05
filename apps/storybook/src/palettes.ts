export interface StandardPalette {
  id: string;
  name: string;
  primary: string;
  hover: string;
  active: string;
  subtle: string;
  focus: string;
}

export const STANDARD_PALETTES: Record<string, StandardPalette> = {
  emerald: {
    id: 'emerald',
    name: 'Pine Emerald',
    primary: '#059669',
    hover: '#047857',
    active: '#065f46',
    subtle: '#ecfdf5',
    focus: '#10b981',
  },
  blue: {
    id: 'blue',
    name: 'Sapphire Blue',
    primary: '#2563eb',
    hover: '#1d4ed8',
    active: '#1e40af',
    subtle: '#eff6ff',
    focus: '#3b82f6',
  },
  indigo: {
    id: 'indigo',
    name: 'Deep Indigo',
    primary: '#4f46e5',
    hover: '#4338ca',
    active: '#3730a3',
    subtle: '#eef2ff',
    focus: '#6366f1',
  },
  purple: {
    id: 'purple',
    name: 'Amethyst Purple',
    primary: '#7c3aed',
    hover: '#6d28d9',
    active: '#5b21b6',
    subtle: '#f5f3ff',
    focus: '#8b5cf6',
  },
  rose: {
    id: 'rose',
    name: 'Ruby Rose',
    primary: '#e11d48',
    hover: '#be123c',
    active: '#9f1239',
    subtle: '#fff1f2',
    focus: '#f43f5e',
  },
  amber: {
    id: 'amber',
    name: 'Amber Sun',
    primary: '#d97706',
    hover: '#b45309',
    active: '#92400e',
    subtle: '#fffbeb',
    focus: '#f59e0b',
  },
  slate: {
    id: 'slate',
    name: 'Minimal Slate',
    primary: '#0f172a',
    hover: '#1e293b',
    active: '#334155',
    subtle: '#f8fafc',
    focus: '#64748b',
  },
};
