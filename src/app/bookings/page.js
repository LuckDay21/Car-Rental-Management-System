import BookingPage from "@/pages/BookingPage";
import { getBookings } from "@/lib/actions/bookingActions";
import { getCustomers } from "@/lib/actions/customerActions";
import { getCars } from "@/lib/actions/carActions";
import { getRoutes } from "@/lib/actions/routeActions";
import { getPaymentTypes } from "@/lib/actions/paymentTypeActions";

export const metadata = {
  title: "Bookings | Rental Mobil",
  description: "Manage car rental bookings.",
};

export default async function Page() {
  const [bookings, customers, cars, routes, paymentTypes] = await Promise.all([
    getBookings(),
    getCustomers(),
    getCars(),
    getRoutes(),
    getPaymentTypes(),
  ]);
  
  const relatedData = {
    customers,
    cars,
    routes,
    paymentTypes
  };
  
  return <BookingPage initialData={bookings} relatedData={relatedData} />;
}
