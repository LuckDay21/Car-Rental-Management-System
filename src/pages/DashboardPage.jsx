"use client";

import { ArrowRight, Car, Database, MapPin, ClipboardList, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { clsx } from "clsx";

export default function DashboardPage({ stats = [], recentBookings = [] }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Welcome Back, Admin
        </h1>
        <p className="opacity-60 mt-2 text-lg">Here's what's happening with your fleet today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card hover:scale-[1.02]">
            <p className="text-sm font-medium opacity-60 mb-1">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="glass-card h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ClipboardList className="text-blue-500" />
                Recent Activities
              </h2>
              <Link href="/bookings" className="text-sm text-blue-400 hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {recentBookings && recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        booking.status === "Pending" ? "bg-amber-500/10 text-amber-500" :
                        booking.status === "Active" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"
                      )}>
                        {booking.status === "Pending" ? <Clock size={20} /> : <CheckCircle size={20} />}
                      </div>
                      <div>
                        <p className="font-bold">{booking.customer.name}</p>
                        <p className="text-xs opacity-50">
                          {booking.car.brand.name} {booking.car.model} • {booking.route.origin} → {booking.route.destination}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">{formatCurrency(booking.totalAmount)}</p>
                      <p className="text-[10px] opacity-40">{format(new Date(booking.createdAt), "MMM d, HH:mm")}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-center">
                <div className="bg-blue-500/10 p-4 rounded-full mb-4">
                  <ClipboardList size={48} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Recent Activity</h3>
                <p className="opacity-50 max-w-xs">
                  Bookings and system events will appear here once they start coming in.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <div className="flex flex-col gap-4">
            <Link href="/cars" className="glass-card flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Car className="text-blue-500" />
                <span>Manage Fleet</span>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </Link>
            
            <Link href="/brands" className="glass-card flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Database className="text-purple-500" />
                <span>Master Brands</span>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </Link>

            <Link href="/routes" className="glass-card flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <MapPin className="text-emerald-500" />
                <span>Manage Routes</span>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </Link>

            <Link href="/bookings" className="glass-card flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-amber-500" />
                <span>Bookings</span>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
