"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

const TARGET_MODELS = ["ChatGPT", "Gemini", "Claude", "Midjourney"];
const MODES = [
  { key: "generate", label: "Generate", endpoint: "/api/ai/generate" },
  { key: "improve", label: "Improve", endpoint: "/api/ai/improve" },
  { key: "optimize", label: "Optimize", endpoint: "/api/ai/optimize" },
] as const;

type ModeKey = (typeof MODES)[number]["key"];

export default function GeneratePage() {
  const [mode, setMode] = useState<ModeKey>("generate");
  const [input, setInput] = useState("");
  const [targetModel, setTargetModel] = useState("ChatGPT");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const activeMode = MODES.find((m) => m.key === mode)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOutput(null);
    setLoading(true);

    const body =
      mode === "generate"
        ? { topic: input, targetModel }
        : mode === "optimize"
          ? { prompt: input, targetModel }
          : { prompt: input };

    const res = await fetch(activeMode.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.status === 401) {
      setError("Sign in to use the AI generator.");
      return;
    }
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    const data = await res.json();
    setOutput(data.output);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Prompt Generator</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Generate a new prompt, improve one you already have, or optimize it for a specific model.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setMode(m.key);
              setOutput(null);
              setError(null);
            }}
            className={`rounded-md px-3 py-1.5 text-sm ${
              mode === m.key
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "border border-black/10 dark:border-white/20"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          rows={mode === "generate" ? 3 : 8}
          placeholder={
            mode === "generate"
              ? "Describe what you want a prompt for, e.g. 'a weekly meal planner'"
              : "Paste your existing prompt here"
          }
          className="rounded-md border border-black/10 px-3 py-2 font-mono text-sm dark:border-white/20 dark:bg-transparent"
        />

        {(mode === "generate" || mode === "optimize") && (
          <select
            value={targetModel}
            onChange={(e) => setTargetModel(e.target.value)}
            className="w-fit rounded-md border border-black/10 px-3 py-2 dark:border-white/20 dark:bg-transparent"
          >
            {TARGET_MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-fit rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
        >
          {loading ? "Working..." : activeMode.label}
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      {output && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-neutral-500">Result</h2>
            <CopyButton text={output} />
          </div>
          <pre className="mt-2 whitespace-pre-wrap break-words rounded-lg border border-black/10 bg-neutral-50 p-4 text-sm dark:border-white/10 dark:bg-neutral-900">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
