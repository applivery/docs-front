/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly CMS_URL: string;
  readonly CMS_API_KEY: string;
  readonly SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
