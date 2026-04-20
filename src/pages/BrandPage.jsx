"use client";

import { useState } from "react";
import BrandForm from "@/components/BrandForm";
import BrandTable from "@/components/BrandTable";
import { useBrands } from "@/hooks/useBrands";
import { AlertCircle } from "lucide-react";

export default function BrandPage({ initialBrands = [] }) {
  const {
    brands,
    isLoading,
    error,
    handleAddBrand,
    handleUpdateBrand,
    handleDeleteBrand,
  } = useBrands(initialBrands);

  const [editingBrand, setEditingBrand] = useState(null);

  const handleFormSubmit = async (name) => {
    if (editingBrand) {
      const result = await handleUpdateBrand(editingBrand.id, name);
      if (result.success) setEditingBrand(null);
    } else {
      await handleAddBrand(name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Car Brands</h1>
        <p className="opacity-60">Manage the manufacturers available in your fleet.</p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <BrandForm
        onSubmit={handleFormSubmit}
        editingBrand={editingBrand}
        onCancel={() => setEditingBrand(null)}
        isLoading={isLoading}
      />

      <BrandTable
        brands={brands}
        onEdit={setEditingBrand}
        onDelete={handleDeleteBrand}
        isLoading={isLoading}
      />
    </div>
  );
}
