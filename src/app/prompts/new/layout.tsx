import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "New prompt",
  description: "Create a new prompt on PromptForge AI.",
  path: "/prompts/new",
  noindex: true,
});

export default function NewPromptLayout({ children }: { children: React.ReactNode }) {
  return children;
}
