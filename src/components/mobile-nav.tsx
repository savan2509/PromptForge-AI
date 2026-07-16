"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/prompts", label: "Library" },
  { href: "/generate", label: "Generate" },
  { href: "/blog", label: "Blog" },
];

export function MobileNav({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 dark:border-white/20"
      >
        <span className="sr-only">Toggle menu</span>
        {open ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full z-50 flex flex-col gap-1 border-b border-black/10 bg-white px-4 py-3 text-sm shadow-sm dark:border-white/10 dark:bg-neutral-950">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="rounded-md px-3 py-2 text-left text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="rounded-md bg-neutral-900 px-3 py-2 text-white dark:bg-white dark:text-neutral-900"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      )}
    </div>
  );
}
