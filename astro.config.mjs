import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: process.env.SITE_URL,
  integrations: [sitemap(), react()],
});
