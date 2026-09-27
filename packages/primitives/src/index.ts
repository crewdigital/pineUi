/**
 * @pine-ui/primitives
 * Level 1 static layout and typography primitives.
 *
 * These are zero-runtime, static StyleX primitives — layout containers, visual
 * primitives, and accessibility utilities. They impose no behavioral overhead.
 */

export const PRIMITIVES_VERSION = '0.0.1';

// Layout primitives
export * from './box/index.js';
export * from './stack/index.js';
export * from './inline/index.js';
export * from './cluster/index.js';
export * from './grid/index.js';
export * from './container/index.js';

// Visual primitives
export * from './surface/index.js';
export * from './separator/index.js';

// Typography primitives
export * from './text/index.js';
export * from './heading/index.js';

// Accessibility primitives
export * from './visually-hidden/index.js';
export * from './focus-ring/index.js';
