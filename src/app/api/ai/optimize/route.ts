import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { optimizePrompt } from "@/lib/gemini";

const schema = z.object({
  prompt: z.string().min(1).max(5000),
  targetModel: z.string().min(1).max(50).default("ChatGPT"),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 }
    );
  }
  const { prompt, targetModel } = parsed.data;

  let output: string;
  try {
    output = await optimizePrompt(prompt, targetModel);
  } catch {
    return NextResponse.json({ error: "AI optimization failed" }, { status: 502 });
  }

  await prisma.promptHistory.create({
    data: { userId: session.user.id, action: "OPTIMIZE", input: prompt, output },
  });

  return NextResponse.json({ output });
}
