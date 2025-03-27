import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import Logo from "@/public/logo.svg";

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
import DashboardStatusLink from "@/components/dashboard/DashboardStatusLink";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <header className="w-full my-auto h-14 flex  border-b bg-muted/40">
        <div className="wrapper w-full flex justify-between">
          <div className="hidden bg-muted/40 md:flex items-center">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={Logo} alt="logo" className="h-8 w-8" />
              <h3 className="text-2xl">
                My<span className="text-primary font-bold">Business</span>
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DashboardStatusLink />
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
        </div>
        {/* <!-- wrapper --> */}
      </header>

      <main className="w-full">{children}</main>
    </div>
  );
}
