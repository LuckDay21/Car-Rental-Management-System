"use client";

import { useState } from "react";
import CarForm from "@/components/CarForm";
import CarTable from "@/components/CarTable";
import { useCars } from "@/hooks/useCars";
import { AlertCircle, Car as CarIcon } from "lucide-react";

export default function CarPage({ initialCars = [], brands = [] }) {
  const { cars, isLoading, error, handleAddCar, handleUpdateCar, handleDeleteCar } =
    useCars(initialCars);

  const [editingCar, setEditingCar] = useState(null);

  const handleFormSubmit = async (data) => {
    if (editingCar) {
      const result = await handleUpdateCar(editingCar.id, data);
      if (result.success) setEditingCar(null);
    } else {
      await handleAddCar(data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Fleet Management</h1>
          <p className="opacity-60">Manage your cars, availability, and rates.</p>
        </div>
        <div className="hidden md:block bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
          <div className="flex items-center gap-3">
            <CarIcon className="text-blue-500" size={32} />
            <div>
              <p className="text-2xl font-bold">{cars.length}</p>
              <p className="text-xs opacity-60 uppercase tracking-wider font-bold">Total Cars</p>
            </div>
          </div>
        </div>
      </header>

      {brands.length === 0 ? (
        <div className="glass-card text-center py-12 border-amber-500/20">
          <p className="text-amber-400 font-bold mb-2">No Brands Found</p>
          <p className="opacity-60 mb-6">
            You need to add at least one brand before managing cars.
          </p>
          <a href="/brands" className="btn-primary inline-flex">
            Go to Brands
          </a>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <CarForm
            key={editingCar?.id || "new"}
            onSubmit={handleFormSubmit}
            editingCar={editingCar}
            onCancel={() => setEditingCar(null)}
            isLoading={isLoading}
            brands={brands}
          />

          <CarTable
            cars={cars}
            onEdit={setEditingCar}
            onDelete={handleDeleteCar}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
