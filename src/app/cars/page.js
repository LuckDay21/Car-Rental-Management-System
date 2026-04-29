import CarPage from "@/views/CarPage";
import { getCars } from "@/lib/actions/carActions";
import { getBrands } from "@/lib/actions/brandActions";

export const metadata = {
  title: "Fleet Management | Car Rental",
  description: "Manage your car inventory.",
};

export default async function Page() {
  const [cars, brands] = await Promise.all([getCars(), getBrands()]);

  return <CarPage initialCars={cars} brands={brands} />;
}
