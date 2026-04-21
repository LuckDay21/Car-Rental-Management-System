"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, X, Car as CarIcon, Users, CreditCard, Hash } from "lucide-react";

export default function CarForm({ onSubmit, editingCar, onCancel, isLoading, brands }) {
  const [formData, setFormData] = useState({
    brandId: editingCar?.brandId || brands[0]?.id || "",
    model: editingCar?.model || "",
    seats: (editingCar?.seats || 5).toString(),
    registrationNumber: editingCar?.registrationNumber || "",
    dailyRate: (editingCar?.dailyRate || "").toString(),
    status: editingCar?.status || "Available",
    imageUrl: editingCar?.imageUrl || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card mb-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        {editingCar ? <Edit2 size={20} /> : <Plus size={20} />}
        {editingCar ? `Edit ${editingCar.model}` : "Add New Car"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <CarIcon size={14} /> Brand
          </label>
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
            className="input-glass bg-transparent"
            required
          >
            <option value="" disabled className="bg-slate-900">
              Select Brand
            </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id} className="bg-slate-900">
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. Camry, Civic"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Users size={14} /> Seats
          </label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="input-glass"
            min="1"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Hash size={14} /> License Plate
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="B 1234 ABC"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <CreditCard size={14} /> Daily Rate (Rp)
          </label>
          <input
            type="number"
            name="dailyRate"
            value={formData.dailyRate}
            onChange={handleChange}
            placeholder="500000"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-glass bg-transparent"
            required
          >
            <option value="Available" className="bg-slate-900 text-emerald-400">
              Available
            </option>
            <option value="Maintenance" className="bg-slate-900 text-amber-400">
              Maintenance
            </option>
            <option value="Rented" className="bg-slate-900 text-blue-400">
              Rented
            </option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        {editingCar && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <X size={18} /> Cancel
          </button>
        )}
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
          ) : editingCar ? (
            "Update Car"
          ) : (
            "Add Car"
          )}
        </button>
      </div>
    </form>
  );
}
