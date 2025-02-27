import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import Logo from "@/public/logo.svg";
import { DashboardItems } from "@/components/dashboard/DashboardItems";

import { ModeToggle } from "@/components/dashboard/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { CircleUser } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[1em_1fr_1em] md:grid-rows lg:grid-cols-[1em_1fr_1em]">
      <div className="hidden  bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={Logo} alt="logo" className="h-8 w-8" />
              <h3 className="text-2xl">
                My<span className="text-primary font-bold">Business</span>
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="ml-auto flex items-center gap-x-5">
            <Link
              href={
                window.location.pathname.includes("/seller")
                  ? "/dashboard/buyer"
                  : "/dashboard/seller"
              }
              href="/dashboard/seller"
              className="flex items-center gap-2 font-semibold"
            >
              Seller Dashboard
            </Link>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="">{children}</main>
      </div>
    </div>
  );
}
