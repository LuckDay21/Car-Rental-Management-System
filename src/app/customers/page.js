import CustomerPage from "@/views/CustomerPage";
import { getCustomers } from "@/lib/actions/customerActions";

export const metadata = {
  title: "Customers | Car Rental",
  description: "Manage system customers.",
};

export default async function Page() {
  const customers = await getCustomers();

  return <CustomerPage initialCustomers={customers} />;
}
