"use client";

import { Edit2, Trash2, Phone, MapPin, CreditCard } from "lucide-react";

export default function CustomerTable({ customers, onEdit, onDelete, isLoading }) {
  if (customers.length === 0) {
    return (
      <div className="glass-card text-center py-12 opacity-50">
        No customers registered. Add customers to start making bookings.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden !p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider opacity-60">
            <tr>
              <th className="px-6 py-4 font-medium">Customer Details</th>
              <th className="px-6 py-4 font-medium">Contact Info</th>
              <th className="px-6 py-4 font-medium">Identity (KTP)</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map((customer) => (
              <tr key={customer.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-lg">{customer.name}</div>
                  <div className="flex items-center gap-2 text-xs opacity-50 mt-1">
                    <MapPin size={12} />
                    <span className="truncate max-w-[200px]">{customer.address}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-blue-400" />
                    <span>{customer.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-mono opacity-80">
                    <CreditCard size={16} className="opacity-40" />
                    <span>{customer.identityNumber}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(customer)}
                      disabled={isLoading}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete customer ${customer.name}?`)) {
                          onDelete(customer.id);
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
