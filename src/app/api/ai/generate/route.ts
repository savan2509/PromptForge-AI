import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generatePrompt } from "@/lib/gemini";

const schema = z.object({
  topic: z.string().min(1).max(500),
  targetModel: z.string().min(1).max(50).default("ChatGPT"),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { topic, targetModel } = parsed.data;

  let output: string;
  try {
    output = await generatePrompt(topic, targetModel);
  } catch {
    return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
  }

  await prisma.promptHistory.create({
    data: { userId: session.user.id, action: "GENERATE", input: topic, output },
  });

  return NextResponse.json({ output });
}
