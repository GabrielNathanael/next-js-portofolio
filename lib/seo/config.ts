// lib/seo/config.ts
export const siteConfig = {
  name: "Gabriel Nathanael Purba",
  shortName: "Gabriel Nathanael",
  description:
    "Full-stack web developer specializing in Next.js, React, Laravel, and TypeScript. Building scalable web applications with clean code and modern technologies.",
  url: "https://gabrielnathanael.vercel.app",
  ogImage: "/images/avatarful.webp",
  keywords: [
    "Gabriel Nathanael Purba",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Laravel Developer",
    "Frontend Developer",
    "Backend Developer",
    "Jakarta Developer",
    "Denpasar Developer",
    "Singaraja Developer",
    "Bali Developer",
    "Indonesia Developer",
    "Undiksha",
    "Computer Science Student",
    "Web Development",
    "API Development",
    "UI/UX Implementation",
  ],
  author: {
    name: "Gabriel Nathanael Purba",
    email: "gabrielnathanael81@gmail.com",
    url: "https://gabrielnathanael.vercel.app",
  },
  creator: "Gabriel Nathanael Purba",
  publisher: "Gabriel Nathanael Purba",
  locale: "en_US",
  alternateLocale: "id_ID",
  social: {
    github: "https://github.com/GabrielNathanael",
    linkedin: "https://www.linkedin.com/in/gabriel-nathanael-purba-549273376/",
    instagram: "https://instagram.com/gabrielnathanaelp",
    email: "mailto:gabrielnathanael81@gmail.com",
  },
};

export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    email: siteConfig.author.email,
    jobTitle: "Full Stack Developer",
    url: siteConfig.author.url,
  },
  inLanguage: ["en", "id"],
  publisher: {
    "@type": "Person",
    name: siteConfig.publisher,
  },
};

export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  givenName: "Gabriel Nathanael",
  familyName: "Purba",
  email: siteConfig.author.email,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  jobTitle: "Full Stack Developer",
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    addressCountry: "Indonesia",
  },
  workLocation: [
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "Indonesia",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Denpasar",
        addressRegion: "Bali",
        addressCountry: "Indonesia",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Singaraja",
        addressRegion: "Bali",
        addressCountry: "Indonesia",
      },
    },
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Universitas Pendidikan Ganesha",
    alternateName: "Undiksha",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Singaraja",
      addressRegion: "Bali",
      addressCountry: "Indonesia",
    },
  },
  knowsAbout: [
    "Web Development",
    "Full Stack Development",
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "Node.js",
    "API Development",
    "Frontend Development",
    "Backend Development",
  ],
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
  ],
};

export const jsonLdBreadcrumb = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteConfig.url}${item.url}`,
  })),
});
