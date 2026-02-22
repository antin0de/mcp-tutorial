import type { MDXComponents } from 'mdx/types';
import { getMDXComponents } from '@/lib/mdx/components';

/**
 * This file is required to use MDX in Next.js app directory.
 * It allows you to provide custom components for MDX files.
 *
 * Documentation: https://nextjs.org/docs/app/building-your-application/configuring/mdx
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
