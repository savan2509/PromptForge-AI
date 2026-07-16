import type { Metadata } from "next";

export const SITE_NAME = "PromptForge AI";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Set true when `title` already includes the site name, to skip the root layout's "%s — SITE_NAME" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
