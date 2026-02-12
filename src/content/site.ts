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
  name: "Resizing Studio",
  tagline: "Websites for small businesses that actually make sense.",
  description:
    "Calgary-based web design studio building fast, affordable, low-maintenance websites for small businesses. Static HTML sites that load instantly, rank well, and don't break.",
  url: (() => {
    const url = import.meta.env.SITE_URL ?? "https://resizing.ca";
    return url.startsWith("http") ? url : `https://${url}`;
  })(),
  locale: "en",
  author: {
    name: "Resizing Studio",
    email: "contact@resizing.ca",
    url: "https://resizing.ca",
    socials: {
      github: "https://github.com/resizingstudio",
      linkedin: "https://linkedin.com/company/resizing"
    }
  },
  nav: [
    { label: "Services", href: "/#how-we-help" },
    { label: "Studio", href: "/studio" },
    { label: "Work", href: "/#showcased-work" },
    { label: "Contact", href: "/contact" }
  ],
  seo: {
    ogImage: "/images/og/og-default.jpg",
    robots: "index,follow",
    themeColor: "rgb(59, 82, 73)"
  }
};
