import Link from "next/link";
import { auth, signOut } from "@/auth";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export async function NavBar() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <header className="relative border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          PromptForge AI
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="/prompts">Library</Link>
            <Link href="/generate">Generate</Link>
            <Link href="/blog">Blog</Link>
            {isSignedIn ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/sign-in">Sign in</Link>
                <Link
                  href="/sign-up"
                  className="rounded-md bg-neutral-900 px-3 py-1.5 text-white dark:bg-white dark:text-neutral-900"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>

          <ThemeToggle />
          <MobileNav isSignedIn={isSignedIn} />
        </div>
      </div>
    </header>
  );
}
