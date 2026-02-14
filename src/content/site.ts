// src/content/site.ts
export type SiteNavItem = { 
    label: string;
    href: string 
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;            
  locale: string;
  author: {
    name: string;
    email?: string;
    url?: string;
    socials?: {
      x?: string;
      github?: string;
      linkedin?: string;
    };
  };
  nav: SiteNavItem[];
  seo: {
    ogImage?: string;
    robots: string;
    themeColor: string;
  };
};

export const site: SiteConfig = {
  name: "Resizing",
  tagline: "A boring, production-ready Astro starter.",
  description:
    "Resizing is a minimal HTML-first starter with senior defaults: SEO, JSON-LD, a11y basics, and clean structure.",
  url: import.meta.env.SITE_URL ?? "https://example.com",
  locale: "en",
  author: {
    name: "Your Name",
    email: "hello@example.com",
    url: "https://example.com",
    socials: {
      x: "https://x.com/yourhandle",
      github: "https://github.com/yourhandle",
      linkedin: "https://www.linkedin.com/in/yourhandle/"
    }
  },
  nav: [
    { label: "Studio", href: "/studio" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" }
  ],
  seo: {
    ogImage: "/images/og/og-default.jpg",
    robots: "index,follow",
    themeColor: "#fbfbf9"
  }
};
