import PaymentTypePage from "@/pages/PaymentTypePage";
import { getPaymentTypes } from "@/lib/actions/paymentTypeActions";

export const metadata = {
  title: "Payment Methods | Rental Mobil",
  description: "Manage system payment methods.",
};

export default async function Page() {
  const data = await getPaymentTypes();
  
  return <PaymentTypePage initialData={data} />;
}
