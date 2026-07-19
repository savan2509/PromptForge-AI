import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { SITE_URL } from "@/lib/seo";

function isInternalHref(href: string) {
  if (href.startsWith("/") || href.startsWith("#")) return true;
  try {
    return new URL(href).origin === new URL(SITE_URL).origin;
  } catch {
    return false;
  }
}

const components: Components = {
  // Only pass through href/children — react-markdown also hands custom
  // components a `node` prop (the mdast node) that must never reach the DOM.
  a: ({ href, children }) => {
    if (!href) return <>{children}</>;

    if (isInternalHref(href)) {
      return <Link href={href}>{children}</Link>;
    }

    // External links stay dofollow (no rel="nofollow") — citing authoritative
    // sources is a deliberate trust signal, not something to suppress.
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-a:font-medium">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
