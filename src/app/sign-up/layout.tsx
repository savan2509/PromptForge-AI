import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sign up",
  description: "Create your PromptForge AI account.",
  path: "/sign-up",
  noindex: true,
});

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
