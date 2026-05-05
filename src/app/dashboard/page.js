import { redirect } from "next/navigation";
import DashboardWorkspace from "@/components/DashboardWorkspace";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locations = await prisma.location.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          feedbacks: true,
          reviewOpens: true,
        },
      },
    },
  });

  const locationIds = locations.map((location) => location.id);
  const feedbacks = await prisma.feedback.findMany({
    where: { locationId: { in: locationIds } },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      location: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  const reviewOpens = await prisma.reviewOpen.findMany({
    where: { locationId: { in: locationIds } },
    select: { rating: true, createdAt: true },
  });

  const totalScans = reviewOpens.length;
  const positiveScans = reviewOpens.filter((r) => r.rating >= 4).length;
  const avgRating = totalScans
    ? (reviewOpens.reduce((sum, item) => sum + item.rating, 0) / totalScans).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-slate-300">
              Manage locations, monitor sentiment, and filter private feedback.
            </p>
          </div>
          <LogoutButton />
        </div>

        <DashboardWorkspace
          initialLocations={locations}
          initialFeedbacks={feedbacks}
          stats={{
            totalLocations: locations.length,
            totalScans,
            positiveScans,
            feedbackCount: feedbacks.length,
            avgRating,
          }}
        />
      </div>
    </div>
  );
}
