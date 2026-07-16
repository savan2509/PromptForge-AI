import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

// Public prompts and blog posts are DB-backed and change independently of
// deploys, so this route must be rendered per-request rather than baked in
// at build time (when the database may not even be reachable yet).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/prompts`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/generate`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  let promptRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const [prompts, posts] = await Promise.all([
      prisma.prompt.findMany({
        where: { isPublic: true },
        select: { slug: true, updatedAt: true },
        take: 5000,
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        take: 5000,
      }),
    ]);

    promptRoutes = prompts.map((p) => ({
      url: `${SITE_URL}/prompts/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.5,
    }));

    blogRoutes = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    // Database unreachable — still serve the static routes rather than 500.
  }

  return [...staticRoutes, ...promptRoutes, ...blogRoutes];
}
