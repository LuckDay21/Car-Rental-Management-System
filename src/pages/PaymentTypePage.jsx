"use client";

import { useState } from "react";
import PaymentTypeForm from "@/components/PaymentTypeForm";
import PaymentTypeTable from "@/components/PaymentTypeTable";
import { usePaymentTypes } from "@/hooks/usePaymentTypes";
import { AlertCircle, Wallet } from "lucide-react";

export default function PaymentTypePage({ initialData = [] }) {
  const {
    paymentTypes,
    isLoading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = usePaymentTypes(initialData);

  const [editingType, setEditingType] = useState(null);

  const handleFormSubmit = async (name) => {
    if (editingType) {
      const result = await handleUpdate(editingType.id, name);
      if (result.success) setEditingType(null);
    } else {
      await handleAdd(name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Payment Methods</h1>
          <p className="opacity-60">Manage the payment types accepted by your system.</p>
        </div>
        <div className="hidden md:block bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
          <Wallet className="text-blue-500" size={32} />
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <PaymentTypeForm
        onSubmit={handleFormSubmit}
        editingType={editingType}
        onCancel={() => setEditingType(null)}
        isLoading={isLoading}
      />

      <PaymentTypeTable
        items={paymentTypes}
        onEdit={setEditingType}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
