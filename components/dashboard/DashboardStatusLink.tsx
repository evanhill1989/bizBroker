"use client";
import { ArrowBigRightDash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardStatusLink() {
  const pathname = usePathname();
  if (pathname === "/dashboard/seller") {
    return (
      <>
        <Link href="/dashboard/buyer" className="flex items-center">
          <ArrowBigRightDash />
          Buyer Dashboard
        </Link>
      </>
    );
  } else {
    return (
      <Link href="/dashboard/seller" className="flex items-center">
        <ArrowBigRightDash />
        Seller Dashboard
      </Link>
    );
  }
}
