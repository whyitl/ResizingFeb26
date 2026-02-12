import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  let site = import.meta.env.SITE_URL ?? "https://resizing.ca";
  if (!site.startsWith("http")) {
    site = `https://${site}`;
  }
  const body = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
