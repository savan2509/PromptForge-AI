import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  content: z.string().min(1),
  targetModel: z.string().max(50).optional(),
  isPublic: z.boolean().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  const prompts = await prisma.prompt.findMany({
    where: {
      isPublic: true,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { author: { select: { name: true } }, category: true },
  });

  return NextResponse.json(prompts);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { title, description, content, targetModel, isPublic } = parsed.data;

  const baseSlug = slugify(title) || "prompt";
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.prompt.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const prompt = await prisma.prompt.create({
    data: {
      title,
      description,
      content,
      targetModel,
      isPublic: isPublic ?? false,
      slug,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(prompt, { status: 201 });
}
