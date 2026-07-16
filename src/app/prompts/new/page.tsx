"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TARGET_MODELS = ["chatgpt", "gemini", "claude", "midjourney", "other"];

export default function NewPromptPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title") as string,
      description: (form.get("description") as string) || undefined,
      content: form.get("content") as string,
      targetModel: (form.get("targetModel") as string) || undefined,
      isPublic: form.get("isPublic") === "on",
    };

    const res = await fetch("/api/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      if (res.status === 401) {
        router.push("/sign-in");
        return;
      }
      setError("Could not save prompt. Check your inputs and try again.");
      return;
    }

    const created = await res.json();
    router.push(`/prompts/${created.slug}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">New prompt</h1>
      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          required
          className="rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        />
        <input
          name="description"
          type="text"
          placeholder="Short description (optional)"
          className="rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        />
        <textarea
          name="content"
          placeholder="Prompt content"
          required
          rows={10}
          className="rounded-md border border-black/10 px-3 py-2 font-mono text-sm dark:border-white/20 dark:bg-transparent"
        />
        <select
          name="targetModel"
          className="rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        >
          <option value="">Target model (optional)</option>
          {TARGET_MODELS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPublic" />
          Publish to the public library
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
        >
          {loading ? "Saving..." : "Save prompt"}
        </button>
      </form>
    </div>
  );
}
