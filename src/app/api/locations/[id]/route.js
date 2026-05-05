import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { locationSchema } from "@/lib/validators";

async function checkOwnership(locationId, userId) {
  return prisma.location.findFirst({
    where: { id: locationId, userId },
  });
}

export async function PATCH(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const exists = await checkOwnership(params.id, user.id);
  if (!exists) return NextResponse.json({ error: "Not found." }, { status: 404 });

  try {
    const body = await request.json();
    const parsed = locationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const location = await prisma.location.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json({ location });
  } catch {
    return NextResponse.json({ error: "Unable to update location." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const exists = await checkOwnership(params.id, user.id);
  if (!exists) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.location.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
