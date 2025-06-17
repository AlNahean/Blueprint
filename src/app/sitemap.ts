// src/app/sitemap.ts
import { siteConfig } from "@/config/site";
import { allPosts } from "contentlayer/generated"; // Example for blog posts

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url;

  // Add static routes from your site config
  const routes = ["", "/projects", "/blog", "/docs"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Add dynamic blog post routes
  const blogRoutes = allPosts.map((post) => ({
    url: `${siteUrl}${post.url}`,
    lastModified: post.date,
  }));

  return [...routes, ...blogRoutes];
}
