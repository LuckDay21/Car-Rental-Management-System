import BrandPage from "@/views/BrandPage";
import { getBrands } from "@/lib/actions/brandActions";

export const metadata = {
  title: "Manage Brands | Car Rental",
  description: "Manage car brands for the rental system.",
};

export default async function Page() {
  const brands = await getBrands();

  return <BrandPage initialBrands={brands} />;
}
