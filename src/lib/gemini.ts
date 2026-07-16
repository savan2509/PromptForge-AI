import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
let client: GoogleGenAI | undefined;

function getClient() {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  if (!client) client = new GoogleGenAI({ apiKey });
  return client;
}

async function run(prompt: string) {
  const response = await getClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  const text = response.text;
  if (!text) throw new Error("Gemini returned an empty response");
  return text;
}

export function generatePrompt(topic: string, targetModel: string) {
  return run(
    `You are an expert prompt engineer. Write a high-quality, detailed prompt for ${targetModel} about: "${topic}".\n` +
      `Return only the prompt text, no explanation or preamble.`
  );
}

export function improvePrompt(promptText: string) {
  return run(
    `You are an expert prompt engineer. Improve the following prompt for clarity, specificity, and effectiveness. ` +
      `Keep the original intent.\n\nPrompt:\n"""${promptText}"""\n\n` +
      `Return only the improved prompt text, no explanation or preamble.`
  );
}

export function optimizePrompt(promptText: string, targetModel: string) {
  return run(
    `You are an expert prompt engineer. Optimize the following prompt specifically for ${targetModel}, ` +
      `applying best practices for that model (formatting, structure, constraints).\n\n` +
      `Prompt:\n"""${promptText}"""\n\n` +
      `Return only the optimized prompt text, no explanation or preamble.`
  );
}
