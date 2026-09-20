import { z } from 'zod';

/**
 * Standard DTCG token types.
 */
export const TokenTypeSchema = z.enum([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'shadow',
  'border',
  'transition',
  'custom',
]);

export type TokenType = z.infer<typeof TokenTypeSchema>;

/**
 * Single DTCG token node.
 */
export const TokenNodeSchema = z.object({
  $value: z.union([
    z.string(),
    z.number(),
    z.record(z.string(), z.union([z.string(), z.number()])),
    z.array(
      z.union([z.string(), z.number(), z.record(z.string(), z.union([z.string(), z.number()]))]),
    ),
  ]),
  $type: TokenTypeSchema.optional(),
  $description: z.string().optional(),
  $deprecated: z.union([z.boolean(), z.string()]).optional(),
  $extensions: z.record(z.string(), z.unknown()).optional(),
});

export type TokenNode = z.infer<typeof TokenNodeSchema>;

/**
 * Recursive DTCG token group structure.
 */
export type TokenGroup = {
  $type?: TokenType;
  $description?: string;
  [key: string]: TokenNode | TokenGroup | TokenType | string | undefined;
};

export const TokenGroupSchema: z.ZodType<TokenGroup> = z.lazy(() =>
  z.record(
    z.string(),
    z.union([TokenNodeSchema, z.lazy(() => TokenGroupSchema), TokenTypeSchema, z.string()]),
  ),
);

/**
 * Root DTCG Token Document.
 */
export const TokenDocumentSchema = z.record(z.string(), z.unknown());

export type TokenDocument = z.infer<typeof TokenDocumentSchema>;
