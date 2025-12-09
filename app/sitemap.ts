import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      route: "",
      priority: 1,
      changefreq: "weekly" as const,
    },
    {
      route: "/projects",
      priority: 0.9,
      changefreq: "weekly" as const,
    },
    {
      route: "/experiences",
      priority: 0.8,
      changefreq: "monthly" as const,
    },
    {
      route: "/certificates",
      priority: 0.8,
      changefreq: "monthly" as const,
    },
  ].map((item) => ({
    url: `${siteConfig.url}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changefreq,
    priority: item.priority,
  }));

  return routes;
}
