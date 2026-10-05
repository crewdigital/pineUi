import * as React from 'react';
import { createIcon } from './create-icon.js';

// Navigation & Arrows
export const ChevronDown = createIcon({
  displayName: 'ChevronDown',
  path: <path d="m6 9 6 6 6-6" />,
});

export const ChevronUp = createIcon({
  displayName: 'ChevronUp',
  path: <path d="m18 15-6-6-6 6" />,
});

export const ChevronLeft = createIcon({
  displayName: 'ChevronLeft',
  path: <path d="m15 18-6-6 6-6" />,
});

export const ChevronRight = createIcon({
  displayName: 'ChevronRight',
  path: <path d="m9 18 6-6-6-6" />,
});

export const ArrowRight = createIcon({
  displayName: 'ArrowRight',
  path: <path d="M5 12h14m-7-7 7 7-7 7" />,
});

export const ArrowLeft = createIcon({
  displayName: 'ArrowLeft',
  path: <path d="M19 12H5m7 7-7-7 7-7" />,
});

export const ArrowUp = createIcon({
  displayName: 'ArrowUp',
  path: <path d="M12 19V5m-7 7 7-7 7 7" />,
});

export const ArrowDown = createIcon({
  displayName: 'ArrowDown',
  path: <path d="M12 5v14m7-7-7 7-7-7" />,
});

export const Close = createIcon({
  displayName: 'Close',
  path: <path d="M18 6 6 18M6 6l12 12" />,
});

export const Menu = createIcon({
  displayName: 'Menu',
  path: <path d="M4 6h16M4 12h16M4 18h16" />,
});

// Feedback & Status
export const Check = createIcon({
  displayName: 'Check',
  path: <path d="M20 6 9 17l-5-5" />,
});

export const CheckCircle = createIcon({
  displayName: 'CheckCircle',
  path: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
});

export const AlertCircle = createIcon({
  displayName: 'AlertCircle',
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
});

export const AlertTriangle = createIcon({
  displayName: 'AlertTriangle',
  path: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
});

export const Info = createIcon({
  displayName: 'Info',
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  ),
});

export const HelpCircle = createIcon({
  displayName: 'HelpCircle',
  path: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
});

// Common Actions & Utilities
export const Search = createIcon({
  displayName: 'Search',
  path: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
});

export const Copy = createIcon({
  displayName: 'Copy',
  path: (
    <>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
});

export const ExternalLink = createIcon({
  displayName: 'ExternalLink',
  path: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
});

export const Eye = createIcon({
  displayName: 'Eye',
  path: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
});

export const EyeOff = createIcon({
  displayName: 'EyeOff',
  path: (
    <>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </>
  ),
});

export const Trash = createIcon({
  displayName: 'Trash',
  path: (
    <>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </>
  ),
});

export const Plus = createIcon({
  displayName: 'Plus',
  path: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
});

export const Minus = createIcon({
  displayName: 'Minus',
  path: <path d="M5 12h14" />,
});

export const Filter = createIcon({
  displayName: 'Filter',
  path: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
});

export const Calendar = createIcon({
  displayName: 'Calendar',
  path: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
});

export const Sun = createIcon({
  displayName: 'Sun',
  path: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
});

export const Moon = createIcon({
  displayName: 'Moon',
  path: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
});

export const SpinnerIcon = createIcon({
  displayName: 'SpinnerIcon',
  path: <path d="M21 12a9 9 0 1 1-6.219-8.56" />,
});
