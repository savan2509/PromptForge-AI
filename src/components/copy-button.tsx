"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="min-h-11 rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/20"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
