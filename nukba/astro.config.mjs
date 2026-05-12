// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const fixAssetsBinding = {
  name: 'fix-cloudflare-assets-binding',
  hooks: {
    'astro:build:done': () => {
      const wranglerPath = join('dist', 'server', '.prerender', 'wrangler.json');
      if (!existsSync(wranglerPath)) return;

      try {
        const json = JSON.parse(readFileSync(wranglerPath, 'utf8'));

        if (json.assets?.binding === 'ASSETS') {
          json.assets.binding = 'STATIC_ASSETS';
          writeFileSync(wranglerPath, JSON.stringify(json));
        }
      } catch {}
    },
  },
};

export default defineConfig({
  output: 'server',

  adapter: cloudflare({
    platformProxy: {
      enabled: true, // ✅ important for local dev
    },
    imageService: 'passthrough',
  }),

  integrations: [fixAssetsBinding],

  vite: {
    plugins: [tailwindcss()],
  },

site: import.meta.env.PUBLIC_SITE_URL || 'https://nukhba-furniture.ammar-shata.workers.dev/',});