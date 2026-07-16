import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { registerSchema, registerUser } from "@/lib/register";
import { pageMetadata } from "@/lib/seo";
import { SubmitButton } from "@/components/submit-button";

export const metadata = pageMetadata({
  title: "Sign up",
  description: "Create your PromptForge AI account.",
  path: "/sign-up",
  noindex: true,
});

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Please check your inputs and try again.",
  exists: "That email is already registered.",
  "signin-failed": "Account created, but sign-in failed. Try signing in manually.",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {ERROR_MESSAGES[error] ?? "Something went wrong. Please try again."}
        </p>
      )}
      <form
        className="mt-6 flex flex-col gap-4"
        action={async (formData) => {
          "use server";

          const parsed = registerSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
          });
          if (!parsed.success) {
            redirect("/sign-up?error=invalid");
          }

          const result = await registerUser(parsed.data);
          if ("error" in result) {
            redirect("/sign-up?error=exists");
          }

          try {
            await signIn("credentials", {
              email: parsed.data.email,
              password: parsed.data.password,
              redirectTo: "/dashboard",
            });
          } catch (err) {
            if (err instanceof AuthError) {
              redirect("/sign-up?error=signin-failed");
            }
            throw err;
          }
        }}
      >
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          required
          className="rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        />
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
          placeholder="Password (min 8 characters)"
          required
          minLength={8}
          className="rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
        />
        <SubmitButton
          pendingText="Creating account..."
          className="rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
        >
          Sign up
        </SubmitButton>
      </form>
    </div>
  );
}
