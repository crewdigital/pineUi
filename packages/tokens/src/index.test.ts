import { describe, it, expect } from 'vitest';
import { TOKEN_FORMAT, TOKEN_SPEC_VERSION } from './index.js';

describe('@pine-ui/tokens', () => {
  it('exports valid DTCG metadata constants', () => {
    expect(TOKEN_FORMAT).toBe('DTCG');
    expect(TOKEN_SPEC_VERSION).toBe('1.0.0');
  });
});
