import { redirect } from "next/navigation";
import LocationManager from "@/components/LocationManager";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locations = await prisma.location.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-slate-300">Manage locations, QR links and routing thresholds.</p>
          </div>
          <LogoutButton />
        </div>

        <LocationManager initialLocations={locations} />
      </div>
    </div>
  );
}
