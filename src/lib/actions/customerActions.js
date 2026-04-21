"use server";

import { revalidatePath } from "next/cache";

export async function getCustomers() {
  const { prisma } = await import("@/utils/prisma");
  try {
    return await prisma.customer.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
}

export async function createCustomer(data) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        identityNumber: data.identityNumber,
      },
    });
    revalidatePath("/customers");
    return { success: true, customer };
  } catch (error) {
    console.error("Failed to create customer:", error);
    return { success: false, error: error.message };
  }
}

export async function updateCustomer(id, data) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        identityNumber: data.identityNumber,
      },
    });
    revalidatePath("/customers");
    return { success: true, customer };
  } catch (error) {
    console.error("Failed to update customer:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCustomer(id) {
  const { prisma } = await import("@/utils/prisma");
  try {
    await prisma.customer.delete({
      where: { id },
    });
    revalidatePath("/customers");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return { success: false, error: "Cannot delete customer if they have bookings." };
  }
}
