"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, X, Wallet } from "lucide-react";

export default function PaymentTypeForm({ onSubmit, editingType, onCancel, isLoading }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingType) {
      setName(editingType.name);
    } else {
      setName("");
    }
  }, [editingType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Wallet size={14} /> {editingType ? "Edit Payment Method" : "Add New Payment Method"}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cash, Bank Transfer, Credit Card"
            className="input-glass"
            disabled={isLoading}
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="btn-primary"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
            ) : editingType ? (
              <>
                <Edit2 size={18} /> Update
              </>
            ) : (
              <>
                <Plus size={18} /> Add
              </>
            )}
          </button>
          
          {editingType && (
            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
