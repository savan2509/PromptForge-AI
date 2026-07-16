import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/"
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-white dark:bg-white dark:text-neutral-900"
        >
          Go home
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
