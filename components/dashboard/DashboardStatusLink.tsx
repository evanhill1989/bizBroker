"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardStatusLink() {
  const pathname = usePathname();
  if (pathname === "/dashboard/seller") {
    return <Link href="/dashboard/buyer">Buyer Dashboard</Link>;
  } else {
    return <Link href="/dashboard/seller">Seller Dashboard</Link>;
  }
}
