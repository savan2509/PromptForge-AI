import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FavoriteButton } from "@/components/favorite-button";
import { CopyButton } from "@/components/copy-button";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

async function getPrompt(slug: string) {
  return prisma.prompt.findUnique({
    where: { slug },
    include: { author: { select: { name: true } }, category: true, tags: { include: { tag: true } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prompt = await getPrompt(slug);
  if (!prompt) return { title: "Prompt not found", robots: { index: false, follow: false } };

  return pageMetadata({
    title: prompt.title,
    description: prompt.description ?? `A prompt for ${prompt.targetModel ?? "AI"} on PromptForge AI.`,
    path: `/prompts/${prompt.slug}`,
    noindex: !prompt.isPublic,
  });
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = await getPrompt(slug);
  const session = await auth();

  if (!prompt) notFound();
  if (!prompt.isPublic && prompt.authorId !== session?.user?.id) notFound();

  let isFavorited = false;
  if (session?.user) {
    const fav = await prisma.favorite.findUnique({
      where: { userId_promptId: { userId: session.user.id, promptId: prompt.id } },
    });
    isFavorited = !!fav;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight break-words">{prompt.title}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            by {prompt.author.name ?? "Anonymous"}
            {prompt.targetModel ? ` · for ${prompt.targetModel}` : ""}
          </p>
        </div>
        <FavoriteButton
          promptId={prompt.id}
          initialFavorited={isFavorited}
          isSignedIn={!!session?.user}
        />
      </div>

      {prompt.description && (
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">{prompt.description}</p>
      )}

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-500">Prompt</h2>
        <CopyButton text={prompt.content} />
      </div>
      <pre className="mt-2 whitespace-pre-wrap break-words rounded-lg border border-black/10 bg-neutral-50 p-4 text-sm dark:border-white/10 dark:bg-neutral-900">
        {prompt.content}
      </pre>
    </div>
  );
}
