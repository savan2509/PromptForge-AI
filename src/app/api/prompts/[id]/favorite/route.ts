import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.favorite.upsert({
    where: { userId_promptId: { userId: session.user.id, promptId: id } },
    create: { userId: session.user.id, promptId: id },
    update: {},
  });

  return NextResponse.json({ favorited: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.favorite
    .delete({ where: { userId_promptId: { userId: session.user.id, promptId: id } } })
    .catch(() => null);

  return NextResponse.json({ favorited: false });
}
