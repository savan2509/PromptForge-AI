# PromptForge AI

A web-only prompt engineering workspace — generate, improve, and optimize prompts with Gemini.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Supabase) · Auth.js · Gemini API

## Getting started

1. Copy the env file and fill in real values:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URL` / `DIRECT_URL` — a Supabase Postgres project (Settings → Database → Connection string). Use the pooled connection string for `DATABASE_URL` and the direct connection for `DIRECT_URL`.
   - `AUTH_SECRET` — generate with `npx auth secret`.
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional, only needed for Google sign-in.
   - `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/apikey).

2. Install dependencies and push the schema to your database:

   ```bash
   npm install
   npx prisma db push
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `prisma/schema.prisma` — data model (users, prompts, categories, tags, collections, favorites, history, blog posts)
- `src/auth.ts` — Auth.js config (credentials + Google)
- `src/lib/gemini.ts` — Gemini API wrapper (generate / improve / optimize)
- `src/app/prompts` — prompt library (list, create, detail)
- `src/app/generate` — AI prompt generator UI
- `src/app/api` — route handlers for prompts, favorites, auth, and AI actions

## Writing blog posts

`BlogPost.content` is Markdown, rendered via `src/components/markdown-content.tsx`. Links resolve
automatically: same-origin/relative links render as `next/link` (internal navigation), everything
else opens in a new tab with `rel="noopener noreferrer"` — external links are deliberately **not**
`nofollow`, since citing authoritative sources is a trust signal, not something to suppress.

Keep total links per ~800-word post to **5–6**: 2 external (authoritative sources), 1 feature/product
page, 1 case study if one exists, and **1–2 blog-to-blog links max** — pick the single most relevant
related post rather than linking every tangentially related one. More than that reads as templated
"related posts" cross-linking rather than an editorial choice, dilutes internal link equity, and
fragments reader attention.

## Deploy

Deploy on [Vercel](https://vercel.com/new). Set the same environment variables there, then run `npx prisma db push` (or set up `prisma migrate deploy` in your build step) against the production database.
