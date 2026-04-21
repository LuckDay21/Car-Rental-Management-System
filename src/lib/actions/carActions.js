"use server";

import { revalidatePath } from "next/cache";

export async function getCars() {
  const { prisma } = await import("@/utils/prisma");
  try {
    return await prisma.car.findMany({
      include: { brand: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
}

export async function createCar(data) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const car = await prisma.car.create({
      data: {
        brandId: data.brandId,
        model: data.model,
        seats: parseInt(data.seats),
        registrationNumber: data.registrationNumber,
        dailyRate: parseFloat(data.dailyRate),
        status: data.status || "Available",
        imageUrl: data.imageUrl || null,
      },
    });
    revalidatePath("/cars");
    return { success: true, car };
  } catch (error) {
    console.error("Failed to create car:", error);
    return { success: false, error: error.message };
  }
}

export async function updateCar(id, data) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const car = await prisma.car.update({
      where: { id },
      data: {
        brandId: data.brandId,
        model: data.model,
        seats: parseInt(data.seats),
        registrationNumber: data.registrationNumber,
        dailyRate: parseFloat(data.dailyRate),
        status: data.status,
        imageUrl: data.imageUrl,
      },
    });
    revalidatePath("/cars");
    return { success: true, car };
  } catch (error) {
    console.error("Failed to update car:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCar(id) {
  const { prisma } = await import("@/utils/prisma");
  try {
    await prisma.car.delete({
      where: { id },
    });
    revalidatePath("/cars");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete car:", error);
    return { success: false, error: "Cannot delete car if it has existing bookings." };
  }
}
