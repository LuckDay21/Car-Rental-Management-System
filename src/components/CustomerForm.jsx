"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, X, User, Phone, MapPin, CreditCard } from "lucide-react";

export default function CustomerForm({ onSubmit, editingCustomer, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    identityNumber: "",
  });

  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        name: editingCustomer.name,
        phone: editingCustomer.phone,
        address: editingCustomer.address,
        identityNumber: editingCustomer.identityNumber,
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        address: "",
        identityNumber: "",
      });
    }
  }, [editingCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingCustomer) {
      setFormData({ name: "", phone: "", address: "", identityNumber: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card mb-8">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        {editingCustomer ? <Edit2 size={20} /> : <Plus size={20} />}
        {editingCustomer ? "Edit Customer" : "Add New Customer"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <User size={14} /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Phone size={14} /> Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 08123456789"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <CreditCard size={14} /> Identity Number (KTP)
          </label>
          <input
            type="text"
            name="identityNumber"
            value={formData.identityNumber}
            onChange={handleChange}
            placeholder="16-digit KTP number"
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <MapPin size={14} /> Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full mailing address"
            className="input-glass"
            required
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        {editingCustomer && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <X size={18} /> Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
          ) : editingCustomer ? "Update Customer" : "Add Customer"}
        </button>
      </div>
    </form>
  );
}
