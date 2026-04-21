import DashboardPage from "@/pages/DashboardPage";
import { prisma } from "@/utils/prisma";
import { getBookings } from "@/lib/actions/bookingActions";

export default async function Page() {
  const [carCount, brandCount, routeCount, bookingCount, recentBookings] = await Promise.all([
    prisma.car.count(),
    prisma.brand.count(),
    prisma.route.count(),
    prisma.booking.count(),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        car: { include: { brand: true } },
        route: true,
      },
    }),
  ]);

  const stats = [
    { label: "Total Cars", value: carCount, color: "text-blue-500" },
    { label: "Total Brands", value: brandCount, color: "text-purple-500" },
    { label: "Active Routes", value: routeCount, color: "text-emerald-500" },
    { label: "Total Bookings", value: bookingCount, color: "text-amber-500" },
  ];

  return <DashboardPage stats={stats} recentBookings={recentBookings} />;
}
