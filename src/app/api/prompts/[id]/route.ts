import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(500).optional(),
  content: z.string().min(1).optional(),
  targetModel: z.string().max(50).optional(),
  isPublic: z.boolean().optional(),
});

async function requireUserId() {
  const session = await auth();
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) } as const;
  }
  return { userId: session.user.id } as const;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 }
    );
  }

  // updateMany filters on id + authorId atomically, so ownership is checked
  // and enforced in the same operation — no separate read-then-write race.
  const { count } = await prisma.prompt.updateMany({
    where: { id, authorId: authResult.userId },
    data: parsed.data,
  });
  if (count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.prompt.findUnique({ where: { id } });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  const { count } = await prisma.prompt.deleteMany({
    where: { id, authorId: authResult.userId },
  });
  if (count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
