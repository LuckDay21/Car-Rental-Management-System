import PaymentTypePage from "@/views/PaymentTypePage";
import { getPaymentTypes } from "@/lib/actions/paymentTypeActions";

export const metadata = {
  title: "Payment Methods | Car Rental",
  description: "Manage system payment methods.",
};

export default async function Page() {
  const data = await getPaymentTypes();

  return <PaymentTypePage initialData={data} />;
}
