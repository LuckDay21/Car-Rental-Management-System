"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  LayoutDashboard,
  Database,
  ClipboardList,
  Users,
  MapPin,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cars", label: "Cars", icon: Car },
  { href: "/brands", label: "Brands", icon: Database },
  { href: "/routes", label: "Routes", icon: MapPin },
  { href: "/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/customers", label: "Customers", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/10 px-4 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
          <Car size={24} />
        </div>
        <span>
          Rental<span className="text-blue-500">Mobil</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",
              pathname === item.href
                ? "bg-blue-600/10 text-blue-500"
                : "hover:bg-white/5 opacity-70 hover:opacity-100",
            )}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 cursor-pointer" />
      </div>
    </nav>
  );
}
