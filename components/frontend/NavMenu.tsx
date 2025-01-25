"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavigationMenuComponent() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-8">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg">
            Sellers
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-8 p-4 grid-cols-2 md:w-[400px] lg:w-[600px] ">
              <li className="">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/list"
                  >
                    <div className="mb-2 mt-4 text-md font-medium">
                      List your business
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Create and manage your business listing.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li className="">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/helpselling"
                  >
                    <div className="mb-2 mt-4 text-md font-medium">
                      Get help selling
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Connect with brokers and marketing experts.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              href="/buyers"
            >
              Buyers
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
