import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { ModeToggle } from "../dashboard/ModeToggle";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import HeroImage from "@/public/hero.png";
import { NavigationMenuComponent } from "./NavMenu";

export function SellersHero() {
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center text-sm justify-between lg:justify-start gap-12">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={Logo} alt="logo" width={40} height={40} />
            <h4 className="text-3xl">
              My<span className="text-primary font-bold">Business</span>
            </h4>
          </Link>
          <NavigationMenuComponent />
          <div className="md:hidden"></div>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ModeToggle />
          <LoginLink postLoginRedirectURL="/api/auth/creation">
            <Button variant="secondary">Log In</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Sign Up</Button>
          </RegisterLink>
        </nav>
      </div>
      <section className="relative flex  items-center justify-center ">
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
              Premier Business Selling Platform
            </span>
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
              Setup your listing
              <span className="block py-2 w-fit m-auto rounded-sm px-3 mt-2 underline underline-offset-8">
                in minutes
              </span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              Setting up listings is hard and time consuming, but not here.
            </p>
            <div className="flex items-center w-full justify-center gap-x-4 mt-5">
              <LoginLink postLoginRedirectURL="/api/auth/creation">
                <Button variant="secondary">Log In</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Try for free</Button>
              </RegisterLink>
            </div>
          </div>
          <div className="relative items-center w-full py-12 mx-auto">
            <Image
              src={HeroImage}
              priority
              alt="hero image"
              className=" relative w-full object-cover border rounded-lg shadow-2xl lg:rounded-3xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
