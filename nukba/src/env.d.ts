/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Runtime bindings (Cloudflare secrets + vars) — accessed via cloudflare:workers
interface CloudflareEnv {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  ADMIN_PASSWORD: string;
  ADMIN_SESSION_SECRET: string;
  ANTHROPIC_API_KEY: string;
  AI_MODEL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_UPLOAD_PRESET: string;
  PUBLIC_SITE_URL: string;
  PUBLIC_WA_NUMBER: string;
  PUBLIC_INSTAGRAM_URL: string;
  PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: string;
}

declare module 'cloudflare:workers' {
  const env: CloudflareEnv;
  export { env };
}

// Build-time PUBLIC_ vars (still available via import.meta.env)
interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_WA_NUMBER: string;
  readonly PUBLIC_INSTAGRAM_URL: string;
  readonly PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}