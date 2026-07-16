import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prompt Library",
  description:
    "Browse public, ready-to-use prompts for ChatGPT, Gemini, Claude, Midjourney, and more.",
  path: "/prompts",
});

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const prompts = await prisma.prompt.findMany({
    where: {
      isPublic: true,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { author: { select: { name: true } }, category: true },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Prompt Library</h1>
        <Link href="/prompts/new" className="text-sm underline">
          New prompt
        </Link>
      </div>

      <form className="mt-6" method="get">
        <label htmlFor="q" className="sr-only">
          Search prompts
        </label>
        <input
          id="q"
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search prompts..."
          className="w-full max-w-md rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        />
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {prompts.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">No prompts found.</p>
        )}
        {prompts.map((p) => (
          <Link
            key={p.id}
            href={`/prompts/${p.slug}`}
            className="rounded-lg border border-black/10 p-4 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="min-w-0 truncate font-medium">{p.title}</h2>
              {p.targetModel && (
                <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  {p.targetModel}
                </span>
              )}
            </div>
            {p.description && (
              <p className="mt-1 text-sm text-neutral-500 line-clamp-2 dark:text-neutral-400">{p.description}</p>
            )}
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">by {p.author.name ?? "Anonymous"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
