import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/markdown-content";

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt ?? `${post.title} — PromptForge AI blog.`,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <div className="mt-8">
        <MarkdownContent content={post.content} />
      </div>
    </article>
  );
}
