import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const registerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(input: RegisterInput) {
  const { name, email, password } = input;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({ data: { name, email, password: hashed } });
    return { user } as const;
  } catch (err) {
    const isEmailConflict =
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002" &&
      (err.meta?.target as string[] | undefined)?.includes("email");
    if (isEmailConflict) {
      return { error: "Email already registered" } as const;
    }
    throw err;
  }
}
