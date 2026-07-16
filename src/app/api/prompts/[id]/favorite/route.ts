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
  // deleteMany doesn't throw if the row is already gone (unlike delete),
  // so real errors (e.g. DB outage) aren't masked as a successful unfavorite.
  await prisma.favorite.deleteMany({
    where: { userId: session.user.id, promptId: id },
  });

  return NextResponse.json({ favorited: false });
}
