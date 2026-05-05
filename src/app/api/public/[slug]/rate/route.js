import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { feedbackSchema, ratingSchema } from "@/lib/validators";

export async function POST(request, { params }) {
  const location = await prisma.location.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      redirectThreshold: true,
      googleReviewUrl: true,
    },
  });

  if (!location) {
    return NextResponse.json({ error: "Location not found." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsedRating = ratingSchema.safeParse(body);
    if (!parsedRating.success) {
      return NextResponse.json({ error: "Invalid rating." }, { status: 400 });
    }

    const { rating } = parsedRating.data;
    await prisma.reviewOpen.create({
      data: {
        locationId: location.id,
        rating,
      },
    });

    const goesToGoogle = rating >= location.redirectThreshold;
    if (goesToGoogle) {
      return NextResponse.json({
        destination: "google",
        googleReviewUrl: location.googleReviewUrl,
      });
    }

    const hasMessage = typeof body?.message === "string" && body.message.trim().length > 0;
    if (!hasMessage) {
      return NextResponse.json({ destination: "feedback" });
    }

    const parsedFeedback = feedbackSchema.safeParse(body);
    if (!parsedFeedback.success) {
      return NextResponse.json({ error: "Invalid feedback." }, { status: 400 });
    }

    const { name, message } = parsedFeedback.data;
    await prisma.feedback.create({
      data: {
        locationId: location.id,
        rating,
        name: name || null,
        message,
      },
    });

    return NextResponse.json({ destination: "feedback_saved" });
  } catch {
    return NextResponse.json({ error: "Unable to submit rating." }, { status: 500 });
  }
}
