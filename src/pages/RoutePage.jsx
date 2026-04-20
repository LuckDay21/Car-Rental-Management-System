"use client";

import { useState } from "react";
import RouteForm from "@/components/RouteForm";
import RouteTable from "@/components/RouteTable";
import { useRoutes } from "@/hooks/useRoutes";
import { AlertCircle, MapPin } from "lucide-react";

export default function RoutePage({ initialRoutes = [] }) {
  const {
    routes,
    isLoading,
    error,
    handleAddRoute,
    handleUpdateRoute,
    handleDeleteRoute,
  } = useRoutes(initialRoutes);

  const [editingRoute, setEditingRoute] = useState(null);

  const handleFormSubmit = async (data) => {
    if (editingRoute) {
      const result = await handleUpdateRoute(editingRoute.id, data);
      if (result.success) setEditingRoute(null);
    } else {
      await handleAddRoute(data);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Trip Routes</h1>
          <p className="opacity-60">Define origins, destinations, and base pricing.</p>
        </div>
        <div className="hidden md:block bg-emerald-600/10 p-4 rounded-2xl border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <MapPin className="text-emerald-500" size={32} />
            <div>
              <p className="text-2xl font-bold">{routes.length}</p>
              <p className="text-xs opacity-60 uppercase tracking-wider font-bold">Total Routes</p>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <RouteForm
        onSubmit={handleFormSubmit}
        editingRoute={editingRoute}
        onCancel={() => setEditingRoute(null)}
        isLoading={isLoading}
      />

      <RouteTable
        routes={routes}
        onEdit={setEditingRoute}
        onDelete={handleDeleteRoute}
        isLoading={isLoading}
      />
    </div>
  );
}
