"use client";

import { Edit2, Trash2 } from "lucide-react";

export default function BrandTable({ brands, onEdit, onDelete, isLoading }) {
  if (brands.length === 0) {
    return (
      <div className="glass-card text-center py-12 opacity-50">
        No brands found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden p-0!">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider opacity-60">
            <tr>
              <th className="px-6 py-4 font-medium">Brand Name</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {brands.map((brand) => (
              <tr key={brand.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium">{brand.name}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(brand)}
                      disabled={isLoading}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${brand.name}?`)) {
                          onDelete(brand.id);
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
