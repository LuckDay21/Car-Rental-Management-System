"use server";

import { revalidatePath } from "next/cache";

export async function getBookings() {
  const { prisma } = await import("@/utils/prisma");
  try {
    return await prisma.booking.findMany({
      include: {
        customer: true,
        car: { include: { brand: true } },
        route: true,
        paymentType: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

export async function createBooking(data) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const booking = await prisma.booking.create({
      data: {
        customerId: data.customerId,
        carId: data.carId,
        routeId: data.routeId,
        paymentTypeId: data.paymentTypeId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalAmount: parseFloat(data.totalAmount),
        status: "Pending",
      },
    });
    
    revalidatePath("/bookings");
    revalidatePath("/");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBookingStatus(id, status) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    
    if (status === "Active") {
      await prisma.car.update({
        where: { id: booking.carId },
        data: { status: "Rented" },
      });
    } else if (status === "Completed" || status === "Cancelled") {
       await prisma.car.update({
        where: { id: booking.carId },
        data: { status: "Available" },
      });
    }

    revalidatePath("/bookings");
    revalidatePath("/cars");
    revalidatePath("/");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBooking(id) {
  const { prisma } = await import("@/utils/prisma");
  try {
    await prisma.booking.delete({
      where: { id },
    });
    revalidatePath("/bookings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return { success: false, error: error.message };
  }
}

