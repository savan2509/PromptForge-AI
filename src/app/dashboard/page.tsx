import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dashboard",
  description: "Your PromptForge AI dashboard.",
  path: "/dashboard",
  noindex: true,
});

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const [promptCount, favoriteCount, recentPrompts] = await Promise.all([
    prisma.prompt.count({ where: { authorId: session.user.id } }),
    prisma.favorite.count({ where: { userId: session.user.id } }),
    prisma.prompt.findMany({
      where: { authorId: session.user.id },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome back{session.user.name ? `, ${session.user.name}` : ""}
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
          <p className="text-sm text-neutral-500">Your prompts</p>
          <p className="text-2xl font-semibold">{promptCount}</p>
        </div>
        <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
          <p className="text-sm text-neutral-500">Favorites</p>
          <p className="text-2xl font-semibold">{favoriteCount}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-medium">Recent prompts</h2>
        <Link href="/prompts/new" className="text-sm underline">
          New prompt
        </Link>
      </div>

      <ul className="mt-4 divide-y divide-black/5 dark:divide-white/10">
        {recentPrompts.length === 0 && (
          <p className="py-4 text-sm text-neutral-500">
            You haven&apos;t created any prompts yet.
          </p>
        )}
        {recentPrompts.map((p) => (
          <li key={p.id} className="py-3">
            <Link href={`/prompts/${p.slug}`} className="font-medium break-words hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
