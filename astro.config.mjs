import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

const siteUrl = process.env.SITE_URL ?? "https://resizing.ca";
const site = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;

export default defineConfig({
  site,
  integrations: [sitemap(), react()],
});
