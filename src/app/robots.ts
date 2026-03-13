import type { MetadataRoute } from "next";
import { baseUrl } from "@/shared/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/", "/api/", "/dashboard"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/auth/", "/api/", "/dashboard"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
