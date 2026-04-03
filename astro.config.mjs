// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    prerenderEnvironment: 'node'
  }),
  integrations: [icon(), sitemap()],
  trailingSlash: 'always'
});