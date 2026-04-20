"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, X, User, Car, MapPin, Wallet, Calendar, Calculator } from "lucide-react";
import { differenceInDays, isAfter, parseISO, startOfDay } from "date-fns";

export default function BookingForm({ onSubmit, onCancel, isLoading, data }) {
  const { customers, cars, routes, paymentTypes } = data;

  const [formData, setFormData] = useState({
    customerId: "",
    carId: "",
    routeId: "",
    paymentTypeId: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  });

  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate price whenever selections or dates change
  useEffect(() => {
    const selectedCar = cars.find((c) => c.id === formData.carId);
    const selectedRoute = routes.find((r) => r.id === formData.routeId);
    
    if (selectedCar && selectedRoute && formData.startDate && formData.endDate) {
      const start = parseISO(formData.startDate);
      const end = parseISO(formData.endDate);
      
      const days = Math.max(1, differenceInDays(end, start));
      const amount = selectedRoute.basePrice + (selectedCar.dailyRate * days);
      setTotalAmount(amount);
    } else {
      setTotalAmount(0);
    }
  }, [formData, cars, routes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalAmount <= 0) return;
    onSubmit({ ...formData, totalAmount });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const availableCars = useMemo(() => {
    return cars.filter(c => c.status === "Available");
  }, [cars]);

  return (
    <form onSubmit={handleSubmit} className="glass-card mb-10">
      <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
        <Plus size={20} className="text-blue-500" />
        New Booking Request
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Customer Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <User size={14} /> Customer
          </label>
          <select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className="input-glass bg-transparent"
            required
          >
            <option value="" disabled className="bg-slate-900">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
            ))}
          </select>
        </div>

        {/* Car Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Car size={14} /> Available Car
          </label>
          <select
            name="carId"
            value={formData.carId}
            onChange={handleChange}
            className="input-glass bg-transparent"
            required
          >
            <option value="" disabled className="bg-slate-900">Select Car</option>
            {availableCars.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900">
                {c.brand.name} {c.model} ({c.seats} seats)
              </option>
            ))}
          </select>
        </div>

        {/* Route Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <MapPin size={14} /> Route
          </label>
          <select
            name="routeId"
            value={formData.routeId}
            onChange={handleChange}
            className="input-glass bg-transparent"
            required
          >
            <option value="" disabled className="bg-slate-900">Select Route</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id} className="bg-slate-900">
                {r.origin} → {r.destination}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Calendar size={14} /> Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input-glass"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Calendar size={14} /> End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            min={formData.startDate}
            onChange={handleChange}
            className="input-glass"
            required
          />
        </div>

        {/* Payment Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-70 flex items-center gap-2">
            <Wallet size={14} /> Payment Method
          </label>
          <select
            name="paymentTypeId"
            value={formData.paymentTypeId}
            onChange={handleChange}
            className="input-glass bg-transparent"
            required
          >
            <option value="" disabled className="bg-slate-900">Select Method</option>
            {paymentTypes.map((pt) => (
              <option key={pt.id} value={pt.id} className="bg-slate-900">{pt.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Display */}
      <div className="mt-10 p-6 rounded-2xl bg-blue-600/5 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl text-white">
            <Calculator size={24} />
          </div>
          <div>
            <p className="text-sm opacity-60 uppercase tracking-widest font-bold">Estimated Total</p>
            <p className="text-3xl font-black text-blue-400">
              {totalAmount > 0 ? formatCurrency(totalAmount) : "Select details..."}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || totalAmount <= 0}
            className="btn-primary px-10 py-3 text-lg font-bold"
          >
            {isLoading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </form>
  );
}
