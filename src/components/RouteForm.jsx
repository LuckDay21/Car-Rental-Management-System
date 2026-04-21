"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, X, MapPin, Navigation, CreditCard } from "lucide-react";

export default function RouteForm({ onSubmit, editingRoute, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    origin: editingRoute?.origin || "",
    destination: editingRoute?.destination || "",
    basePrice: editingRoute?.basePrice?.toString() || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingRoute) {
      setFormData({ origin: "", destination: "", basePrice: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card mb-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        {editingRoute ? <Edit2 size={20} /> : <Plus size={20} />}
        {editingRoute ? "Edit Route" : "Add New Route"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <MapPin size={14} /> Origin
          </label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="e.g. Jakarta"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Navigation size={14} /> Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="e.g. Bandung"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <CreditCard size={14} /> Base Price (Rp)
          </label>
          <input
            type="number"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            placeholder="250000"
            className="input-glass"
            required
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        {editingRoute && (
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
          ) : editingRoute ? (
            "Update Route"
          ) : (
            "Add Route"
          )}
        </button>
      </div>
    </form>
  );
}
