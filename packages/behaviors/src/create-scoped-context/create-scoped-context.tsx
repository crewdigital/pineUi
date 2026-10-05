'use client';

import * as React from 'react';

export type CreateScopedContextReturn<T> = [
  Provider: React.FC<{ value: T; children: React.ReactNode }>,
  useScopedContext: (consumerName?: string) => T,
  Context: React.Context<T | undefined>
];

/**
 * Creates a strongly typed, scoped React Context with automated consumer boundary validation.
 * Throws a clean developer error if a compound component child is rendered outside its parent provider.
 */
export function createScopedContext<T>(
  componentName: string,
  defaultValue?: T
): CreateScopedContextReturn<T> {
  const Context = React.createContext<T | undefined>(defaultValue);
  Context.displayName = `${componentName}Context`;

  function Provider({ value, children }: { value: T; children: React.ReactNode }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useScopedContext(consumerName?: string): T {
    const context = React.useContext(Context);
    if (context === undefined) {
      const consumer = consumerName ? `<${consumerName} />` : 'Component';
      throw new Error(
        `[Pine UI Error]: ${consumer} must be rendered inside a <${componentName} /> provider.`
      );
    }
    return context;
  }

  return [Provider, useScopedContext, Context];
}
