export type TokenType =
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'duration'
  | 'cubicBezier'
  | 'number'
  | 'shadow'
  | 'border'
  | 'transition'
  | 'custom';

export interface ResolvedToken {
  path: string;
  name: string;
  type: TokenType;
  rawValue: string | number;
  resolvedValue: string | number;
  cssVariable: string;
  stylexKey: string;
  description?: string | undefined;
  isAlias: boolean;
  aliasTarget?: string | undefined;
}

export interface TokenDictionary {
  primitives: Map<string, ResolvedToken>;
  semantics: {
    light: Map<string, ResolvedToken>;
    dark: Map<string, ResolvedToken>;
    highContrast: Map<string, ResolvedToken>;
    space: Map<string, ResolvedToken>;
    typography: Map<string, ResolvedToken>;
  };
}

export interface CompilerOptions {
  tokensRoot?: string | undefined;
  stylexOutDir?: string | undefined;
  themesOutDir?: string | undefined;
  docsOutDir?: string | undefined;
}
