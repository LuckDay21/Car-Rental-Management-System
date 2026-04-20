"use client";

import { useState } from "react";
import { createRoute, updateRoute, deleteRoute } from "@/lib/actions/routeActions";

export function useRoutes(initialRoutes = []) {
  const [routes, setRoutes] = useState(initialRoutes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddRoute = async (data) => {
    setIsLoading(true);
    setError(null);
    const result = await createRoute(data);
    if (result.success) {
      setRoutes((prev) => [...prev, result.route].sort((a, b) => a.origin.localeCompare(b.origin)));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleUpdateRoute = async (id, data) => {
    setIsLoading(true);
    setError(null);
    const result = await updateRoute(id, data);
    if (result.success) {
      setRoutes((prev) =>
        prev.map((r) => (r.id === id ? result.route : r)).sort((a, b) => a.origin.localeCompare(b.origin))
      );
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleDeleteRoute = async (id) => {
    setIsLoading(true);
    setError(null);
    const result = await deleteRoute(id);
    if (result.success) {
      setRoutes((prev) => prev.filter((r) => r.id !== id));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  return {
    routes,
    isLoading,
    error,
    handleAddRoute,
    handleUpdateRoute,
    handleDeleteRoute,
  };
}
