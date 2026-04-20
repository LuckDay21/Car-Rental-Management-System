"use server";

import { revalidatePath } from "next/cache";

export async function getBrands() {
  const { prisma } = await import("@/utils/prisma");
  try {
    return await prisma.brand.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}

export async function createBrand(name) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const brand = await prisma.brand.create({
      data: { name },
    });
    revalidatePath("/brands");
    return { success: true, brand };
  } catch (error) {
    console.error("Failed to create brand:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBrand(id, name) {
  const { prisma } = await import("@/utils/prisma");
  try {
    const brand = await prisma.brand.update({
      where: { id },
      data: { name },
    });
    revalidatePath("/brands");
    return { success: true, brand };
  } catch (error) {
    console.error("Failed to update brand:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBrand(id) {
  const { prisma } = await import("@/utils/prisma");
  try {
    await prisma.brand.delete({
      where: { id },
    });
    revalidatePath("/brands");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete brand:", error);
    return { success: false, error: "Cannot delete brand if it has cars associated." };
  }
}
