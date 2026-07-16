import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prompt Generator",
  description:
    "Generate a new prompt, improve one you already have, or optimize it for ChatGPT, Gemini, Claude, or Midjourney.",
  path: "/generate",
});

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
