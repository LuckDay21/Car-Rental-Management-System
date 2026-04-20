import CarPage from "@/pages/CarPage";
import { getCars } from "@/lib/actions/carActions";
import { getBrands } from "@/lib/actions/brandActions";

export const metadata = {
  title: "Fleet Management | Rental Mobil",
  description: "Manage your car inventory.",
};

export default async function Page() {
  const [cars, brands] = await Promise.all([
    getCars(),
    getBrands(),
  ]);
  
  return <CarPage initialCars={cars} brands={brands} />;
}
