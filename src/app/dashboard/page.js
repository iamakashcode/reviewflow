import { redirect } from "next/navigation";
import DashboardWorkspace from "@/components/DashboardWorkspace";
import MarketingNav from "@/components/MarketingNav";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locations = await prisma.location.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { feedbacks: true, reviewOpens: true } },
    },
  });

  const locationIds = locations.map((l) => l.id);

  const feedbacks = await prisma.feedback.findMany({
    where: { locationId: { in: locationIds } },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { location: { select: { id: true, name: true, slug: true } } },
  });

  const reviewOpens = await prisma.reviewOpen.findMany({
    where: { locationId: { in: locationIds } },
    select: { rating: true, createdAt: true },
  });

  const totalScans = reviewOpens.length;
  const positiveScans = reviewOpens.filter((r) => r.rating >= 4).length;
  const avgRating = totalScans
    ? (reviewOpens.reduce((s, r) => s + r.rating, 0) / totalScans).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-[#060818] text-white">
      <MarketingNav showMarketingLinks={false} />

      {/* Content */}
      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-slate-400">
            Manage locations, monitor sentiment, and read private feedback.
          </p>
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
      </main>
    </div>
  );
}
