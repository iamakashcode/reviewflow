import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RatingExperience from "@/components/RatingExperience";

export default async function PublicReviewPage({ params }) {
  const location = await prisma.location.findUnique({
    where: { slug: params.slug },
    select: {
      slug: true,
      name: true,
    },
  });

  if (!location) notFound();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <RatingExperience slug={location.slug} locationName={location.name} />
    </div>
  );
}
