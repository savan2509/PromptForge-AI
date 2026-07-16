import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PromptForge AI — Build, Improve & Optimize AI Prompts",
  description:
    "A prompt engineering workspace to generate, improve, and optimize prompts for ChatGPT, Gemini, Claude, and more.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        Build, improve, and optimize AI prompts
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-neutral-500 dark:text-neutral-400">
        PromptForge AI is a workspace for prompt engineers — generate new prompts,
        improve existing ones, and optimize them for ChatGPT, Gemini, Claude, and more.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/generate"
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-white dark:bg-white dark:text-neutral-900"
        >
          Try the generator
        </Link>
        <Link
          href="/prompts"
          className="rounded-md border border-black/10 px-5 py-2.5 dark:border-white/20"
        >
          Browse the library
        </Link>
      </div>
    </div>
  );
}
