export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // DIRECT_URL is deliberately not checked here — it's only read by the
  // Prisma CLI for migrations, never by the app server at request time.
  const required = ["DATABASE_URL", "AUTH_SECRET"];
  const missingRequired = required.filter((key) => !process.env[key]);
  if (missingRequired.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missingRequired.join(", ")}. See .env.example.`
    );
  }

  const recommended = ["GEMINI_API_KEY", "NEXT_PUBLIC_SITE_URL"];
  const missingRecommended = recommended.filter((key) => !process.env[key]);
  if (missingRecommended.length > 0) {
    console.warn(
      `[startup] Missing recommended environment variable(s): ${missingRecommended.join(", ")}. Related features won't work until these are set.`
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost")
  ) {
    console.warn(
      "[startup] NEXT_PUBLIC_SITE_URL is set to localhost in a production build — canonical URLs, the sitemap, and Open Graph tags will all be wrong."
    );
  }
}
