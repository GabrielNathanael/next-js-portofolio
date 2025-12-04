import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/experiences", "/certificates"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      priority: route === "" ? 1 : 0.8,
    })
  );

  return routes;
}
