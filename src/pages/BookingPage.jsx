"use client";

import { useState } from "react";
import BookingForm from "@/components/BookingForm";
import BookingTable from "@/components/BookingTable";
import { useBookings } from "@/hooks/useBookings";
import { AlertCircle, ClipboardList, Plus, X } from "lucide-react";

export default function BookingPage({ initialData = [], relatedData = { customers: [], cars: [], routes: [], paymentTypes: [] } }) {
  const {
    bookings,
    isLoading,
    error,
    handleAdd,
    handleUpdateStatus,
    handleDelete,
  } = useBookings(initialData);

  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = async (data) => {
    const result = await handleAdd(data);
    if (result.success) setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Rental Bookings</h1>
          <p className="opacity-60">Manage your active, pending, and completed rentals.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "Cancel" : "New Booking"}
        </button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {showForm && (
        <BookingForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
          isLoading={isLoading}
          data={relatedData}
        />
      )}

      <BookingTable
        bookings={bookings}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
