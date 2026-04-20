"use client";

import { CheckCircle, XCircle, Clock, Trash2, MapPin, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { clsx } from "clsx";

export default function BookingTable({ bookings, onUpdateStatus, onDelete, isLoading }) {
  if (bookings.length === 0) {
    return (
      <div className="glass-card text-center py-12 opacity-50">
        No bookings found. Create a new booking to start managing rentals.
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock size={16} className="text-amber-400" />;
      case "Active": return <CheckCircle size={16} className="text-blue-400" />;
      case "Completed": return <CheckCircle size={16} className="text-emerald-400" />;
      case "Cancelled": return <XCircle size={16} className="text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="glass-card overflow-hidden !p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider opacity-60">
            <tr>
              <th className="px-6 py-4 font-medium">Customer & Car</th>
              <th className="px-6 py-4 font-medium">Route & Schedule</th>
              <th className="px-6 py-4 font-medium">Payment</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((booking) => (
              <tr key={booking.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-lg">{booking.customer.name}</div>
                  <div className="flex items-center gap-2 text-xs opacity-60 mt-1">
                    <Tag size={12} className="text-blue-400" />
                    <span>{booking.car.brand.name} {booking.car.model}</span>
                    <span className="font-mono">({booking.car.registrationNumber})</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin size={14} className="opacity-40" />
                    <span>{booking.route.origin}</span>
                    <span className="opacity-30">→</span>
                    <span>{booking.route.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-50 mt-1">
                    <Calendar size={12} />
                    <span>{format(new Date(booking.startDate), "MMM d, yyyy")}</span>
                    <span>-</span>
                    <span>{format(new Date(booking.endDate), "MMM d, yyyy")}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-emerald-400">
                    {formatCurrency(booking.totalAmount)}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                    via {booking.paymentType.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={clsx(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset",
                    booking.status === "Pending" && "bg-amber-500/10 text-amber-500 ring-amber-500/20",
                    booking.status === "Active" && "bg-blue-500/10 text-blue-500 ring-blue-500/20",
                    booking.status === "Completed" && "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
                    booking.status === "Cancelled" && "bg-red-500/10 text-red-500 ring-red-500/20"
                  )}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {booking.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(booking.id, "Active")}
                          className="px-3 py-1 text-xs font-bold bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 rounded-lg transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onUpdateStatus(booking.id, "Cancelled")}
                          className="px-3 py-1 text-xs font-bold bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "Active" && (
                      <button
                        onClick={() => onUpdateStatus(booking.id, "Completed")}
                        className="px-3 py-1 text-xs font-bold bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/20 rounded-lg transition-all"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm("Delete this booking record?")) {
                          onDelete(booking.id);
                        }
                      }}
                      className="p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
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
