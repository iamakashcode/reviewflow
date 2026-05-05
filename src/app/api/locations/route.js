import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { locationSchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const locations = await prisma.location.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { feedbacks: true, reviewOpens: true } },
    },
  });

  return NextResponse.json({ locations });
}

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = locationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const { name, googleReviewUrl, redirectThreshold } = parsed.data;
    const base = toSlug(name) || "location";
    const slug = `${base}-${nanoid(6)}`;

    const location = await prisma.location.create({
      data: {
        userId: user.id,
        name,
        slug,
        googleReviewUrl,
        redirectThreshold,
      },
    });

    return NextResponse.json({ location }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create location." }, { status: 500 });
  }
}
