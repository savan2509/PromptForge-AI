"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FavoriteButton({
  promptId,
  initialFavorited,
  isSignedIn,
}: {
  promptId: string;
  initialFavorited: boolean;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/prompts/${promptId}/favorite`, {
      method: favorited ? "DELETE" : "POST",
    });
    setLoading(false);
    if (res.ok) setFavorited(!favorited);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="rounded-md border border-black/10 px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20"
    >
      {favorited ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
}
