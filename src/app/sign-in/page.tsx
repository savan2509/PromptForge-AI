import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { pageMetadata } from "@/lib/seo";
import { SubmitButton } from "@/components/submit-button";

export const metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to your PromptForge AI account.",
  path: "/sign-in",
  noindex: true,
});

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          Invalid email or password.
        </p>
      )}
      <form
        className="mt-6 flex flex-col gap-4"
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/dashboard",
            });
          } catch (err) {
            if (err instanceof AuthError) {
              redirect("/sign-in?error=1");
            }
            throw err;
          }
        }}
      >
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        />
        <SubmitButton
          pendingText="Signing in..."
          className="rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
        >
          Sign in
        </SubmitButton>
      </form>
      <form
        className="mt-4"
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          className="w-full rounded-md border border-black/10 px-4 py-2 dark:border-white/20"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
