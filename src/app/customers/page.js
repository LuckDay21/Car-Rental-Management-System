import CustomerPage from "@/pages/CustomerPage";
import { getCustomers } from "@/lib/actions/customerActions";

export const metadata = {
  title: "Customers | Rental Mobil",
  description: "Manage system customers.",
};

export default async function Page() {
  const customers = await getCustomers();
  
  return <CustomerPage initialCustomers={customers} />;
}
