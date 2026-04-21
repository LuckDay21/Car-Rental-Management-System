"use server";

import { revalidatePath } from "next/cache";

export async function getPaymentTypes() {
  const { prisma } = await import("@/utils/prisma");
  try {
    return await prisma.paymentType.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch payment types:", error);
    return [];
  }
}

export async function createPaymentType(name) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const pt = await prisma.paymentType.create({
      data: { name },
    });
    revalidatePath("/payment-types");
    return { success: true, paymentType: pt };
  } catch (error) {
    console.error("Failed to create payment type:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePaymentType(id, name) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const pt = await prisma.paymentType.update({
      where: { id },
      data: { name },
    });
    revalidatePath("/payment-types");
    return { success: true, paymentType: pt };
  } catch (error) {
    console.error("Failed to update payment type:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePaymentType(id) {
  const { prisma } = await import("@/utils/prisma");
  try {
    await prisma.paymentType.delete({
      where: { id },
    });
    revalidatePath("/payment-types");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete payment type:", error);
    return { success: false, error: "Cannot delete payment type if it is used in bookings." };
  }
}
