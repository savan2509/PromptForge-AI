import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <div className="mt-8 flex flex-col gap-6">
        {posts.length === 0 && (
          <p className="text-sm text-neutral-500">No posts yet. Check back soon.</p>
        )}
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block">
            <h2 className="text-lg font-medium hover:underline">{post.title}</h2>
            {post.excerpt && (
              <p className="mt-1 text-sm text-neutral-500">{post.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
