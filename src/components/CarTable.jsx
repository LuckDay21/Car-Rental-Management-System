"use client";

import { Edit2, Trash2, Users, CreditCard } from "lucide-react";
import { clsx } from "clsx";

export default function CarTable({ cars, onEdit, onDelete, isLoading }) {
  if (cars.length === 0) {
    return (
      <div className="glass-card text-center py-12 opacity-50">
        No cars in inventory. Add your first car to manage fleet.
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="glass-card overflow-hidden p-0!">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider opacity-60">
            <tr>
              <th className="px-6 py-4 font-medium">Car Details</th>
              <th className="px-6 py-4 font-medium">Capacity</th>
              <th className="px-6 py-4 font-medium">Daily Rate</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cars.map((car) => (
              <tr key={car.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold flex items-center gap-1">
                    <span className="text-blue-400">{car.brand.name}</span>
                    <span>{car.model}</span>
                  </div>
                  <div className="text-xs opacity-50 font-mono mt-1">{car.registrationNumber}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 opacity-70">
                    <Users size={16} />
                    <span>{car.seats} Seats</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-emerald-400">
                    {formatCurrency(car.dailyRate)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      car.status === "Available" && "bg-emerald-500/10 text-emerald-400",
                      car.status === "Maintenance" && "bg-amber-500/10 text-amber-400",
                      car.status === "Rented" && "bg-blue-500/10 text-blue-400",
                    )}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(car)}
                      disabled={isLoading}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${car.brand.name} ${car.model}?`)) {
                          onDelete(car.id);
                        }
                      }}
                      disabled={isLoading}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
