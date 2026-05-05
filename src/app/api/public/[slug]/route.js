import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_, { params }) {
  const location = await prisma.location.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      name: true,
      slug: true,
      redirectThreshold: true,
    },
  });

  if (!location) {
    return NextResponse.json({ error: "Location not found." }, { status: 404 });
  }

  return NextResponse.json({ location });
}
