import Link from "next/link";

const LINK_COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/generate", label: "Generate" },
      { href: "/prompts", label: "Library" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/sign-up", label: "Sign up" },
      { href: "/sign-in", label: "Sign in" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              PromptForge AI
            </Link>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              A workspace for prompt engineers — generate, improve, and optimize prompts for
              ChatGPT, Gemini, Claude, and more.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="text-sm font-medium">{column.heading}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-black/5 pt-6 text-xs text-neutral-400 dark:border-white/5 dark:text-neutral-500">
          © {new Date().getFullYear()} PromptForge AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
