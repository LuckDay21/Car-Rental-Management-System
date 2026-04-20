"use client";

import { Edit2, Trash2, Wallet } from "lucide-react";

export default function PaymentTypeTable({ items, onEdit, onDelete, isLoading }) {
  if (items.length === 0) {
    return (
      <div className="glass-card text-center py-12 opacity-50">
        No payment methods defined. Add some to enable bookings.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden !p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider opacity-60">
            <tr>
              <th className="px-6 py-4 font-medium">Payment Method Name</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3 font-medium text-lg">
                  <Wallet size={18} className="opacity-40" />
                  {item.name}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      disabled={isLoading}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete payment method ${item.name}?`)) {
                          onDelete(item.id);
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
