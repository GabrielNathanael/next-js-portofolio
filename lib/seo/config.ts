// lib/seo/config.ts
export const siteConfig = {
  name: "Gabriel Nathanael Purba",
  shortName: "Gabriel Nathanael",
  description:
    "Full-stack developer specializing in Next.js, React, Laravel, and TypeScript. Building scalable web applications with clean code and modern technologies.",
  url: "https://gabrielnathanael.site",
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
    url: "https://gabrielnathanael.site",
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

// Enhanced WebSite Schema with better structure
export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  inLanguage: ["en", "id"],
  publisher: {
    "@id": `${siteConfig.url}/#person`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Enhanced Person Schema with mainEntityOfPage
export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  givenName: "Gabriel Nathanael",
  familyName: "Purba",
  email: siteConfig.author.email,
  url: siteConfig.url,
  image: {
    "@type": "ImageObject",
    "@id": `${siteConfig.url}/#personImage`,
    url: `${siteConfig.url}${siteConfig.ogImage}`,
    caption: siteConfig.name,
  },
  jobTitle: "Full Stack Developer",
  description: siteConfig.description,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteConfig.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  workLocation: [
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Denpasar",
        addressRegion: "Bali",
        addressCountry: "ID",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Singaraja",
        addressRegion: "Bali",
        addressCountry: "ID",
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
      addressCountry: "ID",
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
  knowsLanguage: [
    {
      "@type": "Language",
      name: "English",
      alternateName: "en",
    },
    {
      "@type": "Language",
      name: "Indonesian",
      alternateName: "id",
    },
  ],
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
  ],
};

// ProfilePage Schema for homepage
export const jsonLdProfilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/#profilepage`,
  name: `${siteConfig.name} - Full Stack Developer Portfolio`,
  description: siteConfig.description,
  url: siteConfig.url,
  mainEntity: {
    "@id": `${siteConfig.url}/#person`,
  },
  inLanguage: ["en", "id"],
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
};

// Breadcrumb helper
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
