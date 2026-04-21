"use server";

import { revalidatePath } from "next/cache";

export async function getRoutes() {
  const { prisma } = await import("@/utils/prisma");
  try {
    return await prisma.route.findMany({
      orderBy: { origin: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch routes:", error);
    return [];
  }
}

export async function createRoute(data) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const route = await prisma.route.create({
      data: {
        origin: data.origin,
        destination: data.destination,
        basePrice: parseFloat(data.basePrice),
      },
    });
    revalidatePath("/routes");
    return { success: true, route };
  } catch (error) {
    console.error("Failed to create route:", error);
    return { success: false, error: error.message };
  }
}

export async function updateRoute(id, data) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const route = await prisma.route.update({
      where: { id },
      data: {
        origin: data.origin,
        destination: data.destination,
        basePrice: parseFloat(data.basePrice),
      },
    });
    revalidatePath("/routes");
    return { success: true, route };
  } catch (error) {
    console.error("Failed to update route:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteRoute(id) {
  const { prisma } = await import("@/utils/prisma");
  try {
    await prisma.route.delete({
      where: { id },
    });
    revalidatePath("/routes");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete route:", error);
    return { success: false, error: "Cannot delete route if it is used in bookings." };
  }
}
