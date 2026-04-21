"use client";

import { useState } from "react";
import { createBrand, updateBrand, deleteBrand } from "@/lib/actions/brandActions";

export function useBrands(initialBrands = []) {
  const [brands, setBrands] = useState(initialBrands);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddBrand = async (name) => {
    setIsLoading(true);
    setError(null);
    const result = await createBrand(name);
    if (result.success) {
      setBrands((prev) => [...prev, result.brand].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleUpdateBrand = async (id, name) => {
    setIsLoading(true);
    setError(null);
    const result = await updateBrand(id, name);
    if (result.success) {
      setBrands((prev) =>
        prev
          .map((b) => (b.id === id ? result.brand : b))
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleDeleteBrand = async (id) => {
    setIsLoading(true);
    setError(null);
    const result = await deleteBrand(id);
    if (result.success) {
      setBrands((prev) => prev.filter((b) => b.id !== id));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  return {
    brands,
    isLoading,
    error,
    handleAddBrand,
    handleUpdateBrand,
    handleDeleteBrand,
  };
}
