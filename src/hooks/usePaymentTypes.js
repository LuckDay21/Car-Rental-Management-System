"use client";

import { useState } from "react";
import { createPaymentType, updatePaymentType, deletePaymentType } from "@/lib/actions/paymentTypeActions";

export function usePaymentTypes(initialData = []) {
  const [paymentTypes, setPaymentTypes] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async (name) => {
    setIsLoading(true);
    setError(null);
    const result = await createPaymentType(name);
    if (result.success) {
      setPaymentTypes((prev) => [...prev, result.paymentType].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleUpdate = async (id, name) => {
    setIsLoading(true);
    setError(null);
    const result = await updatePaymentType(id, name);
    if (result.success) {
      setPaymentTypes((prev) =>
        prev.map((pt) => (pt.id === id ? result.paymentType : pt)).sort((a, b) => a.name.localeCompare(b.name))
      );
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    const result = await deletePaymentType(id);
    if (result.success) {
      setPaymentTypes((prev) => prev.filter((pt) => pt.id !== id));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  return {
    paymentTypes,
    isLoading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}
