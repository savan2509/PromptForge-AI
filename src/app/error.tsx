"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
        <button
          onClick={reset}
          className="min-h-11 rounded-md bg-neutral-900 px-5 py-2.5 text-white dark:bg-white dark:text-neutral-900"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex min-h-11 items-center justify-center rounded-md border border-black/10 px-5 py-2.5 dark:border-white/20"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
