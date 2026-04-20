"use client";

import { useState } from "react";
import { createBooking, updateBookingStatus, deleteBooking } from "@/lib/actions/bookingActions";

export function useBookings(initialData = []) {
  const [bookings, setBookings] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async (data) => {
    setIsLoading(true);
    setError(null);
    const result = await createBooking(data);
    if (result.success) {
      // Reload is safest with complex relations
      window.location.reload();
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleUpdateStatus = async (id, status) => {
    setIsLoading(true);
    setError(null);
    const result = await updateBookingStatus(id, status);
    if (result.success) {
      window.location.reload();
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    const result = await deleteBooking(id);
    if (result.success) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } else {
      setError(result.error);
    }
    setIsLoading(false);
    return result;
  };

  return {
    bookings,
    isLoading,
    error,
    handleAdd,
    handleUpdateStatus,
    handleDelete,
  };
}
