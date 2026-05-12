/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_WA_NUMBER: string;
  readonly PUBLIC_INSTAGRAM_URL: string;
  readonly PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: string;
  readonly ADMIN_PASSWORD: string;
  readonly ADMIN_SESSION_SECRET: string;
  readonly ANTHROPIC_API_KEY: string;
  readonly AI_MODEL: string;
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly CLOUDINARY_UPLOAD_PRESET: string;
  readonly GITHUB_CLIENT_ID: string;
  readonly GITHUB_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare namespace App {
  interface Locals {
    runtime: {
      env: ImportMetaEnv;
    };
  }
}