"use client";

import { Edit2, Trash2, MapPin, ArrowRight } from "lucide-react";

export default function RouteTable({ routes, onEdit, onDelete, isLoading }) {
  if (routes.length === 0) {
    return (
      <div className="glass-card text-center py-12 opacity-50">
        No routes defined. Add routes to enable booking price calculations.
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
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider opacity-60">
            <tr>
              <th className="px-6 py-4 font-medium">Route Path</th>
              <th className="px-6 py-4 font-medium text-center">Distance Type</th>
              <th className="px-6 py-4 font-medium">Base Price</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {routes.map((route) => (
              <tr key={route.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1 opacity-50">
                      <MapPin size={14} className="text-blue-500" />
                      <div className="w-0.5 h-3 bg-white/20" />
                      <MapPin size={14} className="text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        <span>{route.origin}</span>
                        <ArrowRight size={14} className="opacity-40" />
                        <span>{route.destination}</span>
                      </div>
                      <p className="text-xs opacity-50">Fixed route pricing</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-xs px-2 py-1 bg-white/5 rounded border border-white/10 opacity-70">
                    Inter-city
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-emerald-400">
                    {formatCurrency(route.basePrice)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(route)}
                      disabled={isLoading}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete route ${route.origin} - ${route.destination}?`)) {
                          onDelete(route.id);
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
