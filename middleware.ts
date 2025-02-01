// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// export default withAuth(async function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//   const pathname = url.pathname;

//   const user = request.auth?.user;
//   if (!user) {NextResponse.next();}

//   //Allow public pages and API routes
//   if (
//     pathname.startsWith("/api/") ||
//     pathname.startsWith("/public") ||
//     pathname === "/login" ||
//     pathname === "/register" ||
//     pathname === "/verify" ||
//     pathname === "/forgot-password"
//   ) { return NextResponse.next();}

//   // Fetch user data

// }, {
//   loginPage: "/api/auth/login",
//   isReturnToCurrentPage: true,
// });

// export const config = {
//   matcher: ["/dashboard/:path*", "/onboarding/:path*"],
// };

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import { getUserOnboardingStep } from "./app/utils/getUserOnboardingStep";
// import type { NextRequest } from "next/server";
console.log("Middleware running");
export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl;
    const pathname = url.pathname;
    const user = req.auth?.user;
    if (!user) {
      return NextResponse.next();
    }

    const onboardingStep = await getUserOnboardingStep(user.id);

    const isOnboardingRoute = pathname.startsWith("/onboarding");

    if (onboardingStep && !isOnboardingRoute) {
      return NextResponse.redirect(`/onboarding/${onboardingStep}`);
    }
    return NextResponse.next();
  },
  {
    isReturnToCurrentPage: true,
    publicPaths: ["/public", "/more"],
  }
);

export const config = {
  matcher: ["/dashboard"],
};
