"use client";

import { useState } from "react";
import CustomerForm from "@/components/CustomerForm";
import CustomerTable from "@/components/CustomerTable";
import { useCustomers } from "@/hooks/useCustomers";
import { AlertCircle, Users } from "lucide-react";

export default function CustomerPage({ initialCustomers = [] }) {
  const {
    customers,
    isLoading,
    error,
    handleAddCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer,
  } = useCustomers(initialCustomers);

  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleFormSubmit = async (data) => {
    if (editingCustomer) {
      const result = await handleUpdateCustomer(editingCustomer.id, data);
      if (result.success) setEditingCustomer(null);
    } else {
      await handleAddCustomer(data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Customers</h1>
          <p className="opacity-60">Manage customer records and contact details.</p>
        </div>
        <div className="hidden md:block bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
          <div className="flex items-center gap-3">
            <Users className="text-blue-500" size={32} />
            <div>
              <p className="text-2xl font-bold">{customers.length}</p>
              <p className="text-xs opacity-60 uppercase tracking-wider font-bold">
                Total Registered
              </p>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <CustomerForm
        key={editingCustomer?.id || "new"}
        onSubmit={handleFormSubmit}
        editingCustomer={editingCustomer}
        onCancel={() => setEditingCustomer(null)}
        isLoading={isLoading}
      />

      <CustomerTable
        customers={customers}
        onEdit={setEditingCustomer}
        onDelete={handleDeleteCustomer}
        isLoading={isLoading}
      />
    </div>
  );
}
