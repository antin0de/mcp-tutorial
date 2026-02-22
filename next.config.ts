import type { NextConfig } from "next";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  // Enable standalone output for optimized Docker builds
  output: 'standalone',
};

// Apply MDX config to webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
nextConfig.webpack = (config: any, _options: { isServer: boolean }) => {
  return mdxConfig.webpack(config);
};

/**
 * MDX configuration for Next.js
 * Configure webpack to handle .mdx files with MDX loader
 */
export const mdxConfig = {
  // Extend Next.js webpack config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack(config: any) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
