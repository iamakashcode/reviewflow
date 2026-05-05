import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { signupSchema } from "@/lib/validators";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
      },
      select: { id: true, name: true, email: true },
    });

    await setSessionCookie(user.id);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
