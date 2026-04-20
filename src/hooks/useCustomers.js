"use client";

import { useState } from "react";
import { createCustomer, updateCustomer, deleteCustomer } from "@/lib/actions/customerActions";

export function useCustomers(initialCustomers = []) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddCustomer = async (data) => {
    setIsLoading(true);
    setError(null);
    const result = await createCustomer(data);
    if (result.success) {
      setCustomers((prev) => [...prev, result.customer].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleUpdateCustomer = async (id, data) => {
    setIsLoading(true);
    setError(null);
    const result = await updateCustomer(id, data);
    if (result.success) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? result.customer : c)).sort((a, b) => a.name.localeCompare(b.name))
      );
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleDeleteCustomer = async (id) => {
    setIsLoading(true);
    setError(null);
    const result = await deleteCustomer(id);
    if (result.success) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  return {
    customers,
    isLoading,
    error,
    handleAddCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer,
  };
}
