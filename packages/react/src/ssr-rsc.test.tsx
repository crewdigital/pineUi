import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Box } from '@pine-ui/primitives/box';
import { Stack } from '@pine-ui/primitives/stack';
import { Text } from '@pine-ui/primitives/text';
import { Heading } from '@pine-ui/primitives/heading';
import { Surface } from '@pine-ui/primitives/surface';
import { Button } from './button/index.js';
import { Badge } from './badge/index.js';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion/index.js';

describe('Next.js App Router (RSC & SSR) Integration Contracts', () => {
  describe('Level 1: Pure Server Component (RSC) Primitives', () => {
    it('renders Box to static HTML string without hooks or client runtime', () => {
      const html = renderToString(
        <Box as="section" data-testid="rsc-box" padding={4}>
          <Heading level={1}>Server Rendered Title</Heading>
          <Text size="md">Zero-runtime RSC primitive content</Text>
        </Box>
      );

      expect(html).toContain('<section');
      expect(html).toContain('Server Rendered Title');
      expect(html).toContain('Zero-runtime RSC primitive content');
      expect(html).not.toContain('undefined');
    });

    it('renders complex nested layout tree via server-side rendering', () => {
      const html = renderToString(
        <Surface variant="raised" bordered>
          <Stack gap={3}>
            <Text size="lg" weight="bold">
              Layout Header
            </Text>
            <Text size="sm" color="muted">
              Subtext description
            </Text>
          </Stack>
        </Surface>
      );

      expect(html).toContain('Layout Header');
      expect(html).toContain('Subtext description');
    });
  });

  describe('Level 2–4: Client Components Initial SSR Paint', () => {
    it('renders Button with variants and accessible attributes to static SSR HTML', () => {
      const html = renderToString(
        <Button variant="primary" size="md">
          Save Changes
        </Button>
      );

      expect(html).toContain('<button');
      expect(html).toContain('Save Changes');
    });

    it('renders Badge with semantic intent to static SSR HTML', () => {
      const html = renderToString(
        <Badge variant="success">Active Status</Badge>
      );

      expect(html).toContain('Active Status');
    });

    it('renders compound Accordion structure during server-side initial paint', () => {
      const html = renderToString(
        <Accordion type="multiple" defaultValue={['item-1']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Section 1 details</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(html).toContain('Section 1');
      expect(html).toContain('Section 1 details');
    });
  });
});
