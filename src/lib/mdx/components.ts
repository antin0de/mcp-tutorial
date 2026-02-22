/**
 * Custom MDX components mapping
 * Extend this object to add custom components for use in MDX content
 */

import type { MDXComponents } from 'mdx/types';

export interface CodeExample {
  filename?: string;
  language: string;
  code: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export interface Callout {
  type: 'info' | 'warning' | 'tip' | 'error' | 'success';
  title?: string;
  content: string;
}

/**
 * Default components that override standard HTML elements
 * Add custom component imports here as they are created
 */
export const defaultComponents: MDXComponents = {
  // Custom components (to be implemented)
  // CodeBlock,
  // Callout,
  // Tabs,
  // Tab,

  // Custom wrappers for standard elements
  // h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
  // h2: ({ children }) => <h2 className="text-3xl font-semibold">{children}</h2>,
  // Add more custom element wrappers as needed
};

/**
 * Merge custom components with defaults
 * @param customComponents - Additional components to include
 * @returns Complete component map for MDX
 */
export function getMDXComponents(customComponents: MDXComponents = {}): MDXComponents {
  return {
    ...defaultComponents,
    ...customComponents,
  };
}
