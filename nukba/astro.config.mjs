// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

/** @type {import('astro/config').AstroIntegration} */
const fixAssetsBinding = {
  name: 'fix-cloudflare-assets-binding',
  hooks: {
    'astro:build:done': () => {
      const wranglerPath = join('dist', 'server', '.prerender', 'wrangler.json');
      if (!existsSync(wranglerPath)) return;
      try {
        const json = JSON.parse(readFileSync(wranglerPath, 'utf8'));
        // Cloudflare Pages reserves the binding name "ASSETS" — rename it
        if (json.assets?.binding === 'ASSETS') {
          json.assets.binding = 'STATIC_ASSETS';
          writeFileSync(wranglerPath, JSON.stringify(json));
        }
      } catch { /* ignore */ }
    },
  },
};

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: false },
    imageService: 'passthrough',
  }),
  integrations: [fixAssetsBinding],
  vite: {
    plugins: [tailwindcss()],
  },
  site: process.env.PUBLIC_SITE_URL || 'https://nukhba.com',
});
