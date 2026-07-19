import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PromptForge AI — Build, Improve & Optimize AI Prompts",
  description:
    "A prompt engineering workspace to generate, improve, and optimize prompts for ChatGPT, Gemini, Claude, and more.",
  path: "/",
  absoluteTitle: true,
});

const FEATURES = [
  {
    title: "Generate",
    description: "Describe what you need and get a ready-to-use prompt in seconds.",
    icon: <path d="M12 3l1.8 4.9L19 9.5l-5.2 1.6L12 16l-1.8-4.9L5 9.5l5.2-1.6L12 3z" strokeLinejoin="round" />,
  },
  {
    title: "Improve",
    description: "Paste a prompt you already have and get a clearer, more effective version.",
    icon: <path d="M3 17l6-6 4 4 8-8M21 7h-6M21 7v6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Optimize",
    description: "Tailor any prompt to get the best results from ChatGPT, Gemini, Claude, or Midjourney.",
    icon: (
      <>
        <path d="M4 6h10M4 12h16M4 18h7" strokeLinecap="round" />
        <circle cx="16" cy="6" r="2" />
        <circle cx="8" cy="18" r="2" />
      </>
    ),
  },
];

const STEPS = [
  {
    title: "Describe what you need",
    description: "Tell us what you're trying to do, or paste a prompt you already have.",
  },
  {
    title: "Pick generate, improve, or optimize",
    description: "Choose the mode that fits, and target the AI model you're using.",
  },
  {
    title: "Copy, save, and reuse",
    description: "Copy the result instantly, or save it to your library to use again later.",
  },
];

const EXAMPLES = [
  {
    title: "Weekly meal planner",
    model: "chatgpt",
    snippet:
      "Act as a nutrition-conscious meal planner. Create a 7-day dinner plan for two people that uses seasonal ingredients and keeps prep time under 30 minutes...",
  },
  {
    title: "Landing page copywriter",
    model: "claude",
    snippet:
      "You are a conversion-focused copywriter. Write a hero section for a SaaS product that helps freelancers track invoices, in a confident, plain-spoken tone...",
  },
  {
    title: "SQL query explainer",
    model: "gemini",
    snippet:
      "Explain the following SQL query in plain English, step by step, for someone who has never written SQL before. Highlight any joins, filters, or aggregations...",
  },
];

const BENEFITS = [
  {
    title: "Works with any model",
    description: "Generate and optimize prompts for ChatGPT, Gemini, Claude, and Midjourney from one place.",
  },
  {
    title: "Free to start",
    description: "Browse the library and try the generator without paying anything.",
  },
  {
    title: "Your prompts, organized",
    description: "Save, favorite, and search your prompts instead of losing them in old chats.",
  },
  {
    title: "Built for speed",
    description: "No clutter, no unnecessary steps — describe what you need and get a usable prompt.",
  },
];

const FAQS = [
  {
    question: "Is PromptForge AI free to use?",
    answer:
      "Yes. You can browse the prompt library and use the generator for free. A paid plan with extra features is planned for later.",
  },
  {
    question: "Which AI models are supported?",
    answer:
      "You can generate and optimize prompts for ChatGPT, Gemini, Claude, and Midjourney, with more models planned.",
  },
  {
    question: "Do I need an account?",
    answer:
      "You can browse public prompts without one, but you'll need a free account to save prompts or use the generator.",
  },
  {
    question: "Can I save and organize my prompts?",
    answer:
      "Yes — save prompts to your library, mark favorites, and search across everything you've created.",
  },
];

export default function Home() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Build, improve, and optimize AI prompts
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-500 dark:text-neutral-400">
          PromptForge AI is a workspace for prompt engineers — generate new prompts,
          improve existing ones, and optimize them for ChatGPT, Gemini, Claude, and more.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/generate"
            className="rounded-md bg-neutral-900 px-5 py-2.5 text-white dark:bg-white dark:text-neutral-900"
          >
            Try the generator
          </Link>
          <Link
            href="/prompts"
            className="rounded-md border border-black/10 px-5 py-2.5 dark:border-white/20"
          >
            Browse the library
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Everything you need to craft better prompts
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-black/10 p-6 dark:border-white/10"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                {feature.icon}
              </svg>
              <h3 className="mt-4 font-medium">{feature.title}</h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="border-t border-black/5 bg-neutral-50 dark:border-white/5 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white dark:bg-white dark:text-neutral-900">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example prompts */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight">See it in action</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-neutral-500 dark:text-neutral-400">
            A few examples of the kind of prompts you can generate.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {EXAMPLES.map((example) => (
              <div
                key={example.title}
                className="rounded-lg border border-black/10 p-4 dark:border-white/10"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="min-w-0 truncate font-medium">{example.title}</h3>
                  <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {example.model}
                  </span>
                </div>
                <p className="mt-2 line-clamp-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  {example.snippet}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/prompts" className="text-sm underline">
              Browse the full library
            </Link>
          </div>
        </div>
      </section>

      {/* Why PromptForge AI */}
      <section className="border-t border-black/5 bg-neutral-50 dark:border-white/5 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight">Why PromptForge AI</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-black/5 dark:divide-white/10">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 transition-transform group-open:rotate-180"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-black/5 dark:border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to write better prompts?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-500 dark:text-neutral-400">
            Create a free account and start generating, improving, and optimizing prompts in
            minutes.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/sign-up"
              className="rounded-md bg-neutral-900 px-5 py-2.5 text-white dark:bg-white dark:text-neutral-900"
            >
              Sign up free
            </Link>
            <Link
              href="/generate"
              className="rounded-md border border-black/10 px-5 py-2.5 dark:border-white/20"
            >
              Try the generator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
