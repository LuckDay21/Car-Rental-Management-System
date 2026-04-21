"use client";

import { useState } from "react";
import { createCar, updateCar, deleteCar } from "@/lib/actions/carActions";

export function useCars(initialCars = []) {
  const [cars, setCars] = useState(initialCars);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddCar = async (data) => {
    setIsLoading(true);
    setError(null);
    const result = await createCar(data);
    if (result.success) {
      // Re-fetch or manually update local state. For simplicity, manually update.
      // Note: In a real app we'd probably re-fetch to get the populated brand object.
      // For now, let's just assume we need to refresh the page or something.
      window.location.reload();
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleUpdateCar = async (id, data) => {
    setIsLoading(true);
    setError(null);
    const result = await updateCar(id, data);
    if (result.success) {
      window.location.reload();
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleDeleteCar = async (id) => {
    setIsLoading(true);
    setError(null);
    const result = await deleteCar(id);
    if (result.success) {
      setCars((prev) => prev.filter((c) => c.id !== id));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  return {
    cars,
    isLoading,
    error,
    handleAddCar,
    handleUpdateCar,
    handleDeleteCar,
  };
}
