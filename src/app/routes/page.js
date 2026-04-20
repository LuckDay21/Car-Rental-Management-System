import RoutePage from "@/pages/RoutePage";
import { getRoutes } from "@/lib/actions/routeActions";

export const metadata = {
  title: "Trip Routes | Car Rental",
  description: "Manage origins, destinations, and pricing.",
};

export default async function Page() {
  const routes = await getRoutes();

  return <RoutePage initialRoutes={routes} />;
}
