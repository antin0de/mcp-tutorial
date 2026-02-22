import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import { PreWithCopy } from '@/components/tutorial/PreWithCopy';

/**
 * Default MDX components - includes syntax highlighted pre with copy button
 */
export const defaultMDXComponents: MDXComponents = {
  pre: PreWithCopy,
};

/**
 * Rehype pretty code options for syntax highlighting
 *
 * Theme options from Shiki v3: https://shiki.style/themes
 * Using bundled themes for compatibility
 *
 * Note: rehype-pretty-code uses CSS variables (--shiki-light, --shiki-dark)
 * which are applied to spans. We use these in globals.css to set actual colors.
 */
const rehypePrettyCodeOptions = {
  // Shiki v3 uses bundled theme names
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  // Keep the background color from Shiki themes
  keepBackground: true,
  // Don't use grid layout
  grid: false,
  onVisitLine(node: { children: unknown[] }) {
    // Prevent empty lines from collapsing
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
    node.properties.className = ['line--highlighted'];
  },
  onVisitHighlightedChars(node: { properties: { className?: string[] } }) {
    node.properties.className = ['chars--highlighted'];
  },
  onVisitTitle(node: { properties: { className?: string[] } }) {
    // Add styling for code block titles (filenames)
    node.properties.className = ['code-title'];
  },
};

/**
 * Compile MDX content with configured options
 * Supports GitHub Flavored Markdown, auto-generated heading IDs, anchor links, and syntax highlighting
 */
export async function compileMDXWithConfig(
  source: string,
  components?: MDXComponents
) {
  return compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
    },
    components: {
      ...defaultMDXComponents,
      ...components,
    },
  });
}

/**
 * MDX configuration object for Next.js webpack
 */
export const mdxConfig = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    [rehypePrettyCode, rehypePrettyCodeOptions],
  ],
};

