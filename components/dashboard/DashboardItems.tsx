import { DollarSign, Globe, Home } from "lucide-react";

const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Listings",
    href: "/dashboard/listings",
    icon: Globe,
  },
  { name: "Pricing", href: "/dashboard/pricing", icon: DollarSign },
];

export function DashboardItems() {
  return (
    <div>
      {navLinks.map((link) => (
        <div key={link.href}>
          <a href={link.href}>{link.name}</a>
        </div>
      ))}
    </div>
  );
}
