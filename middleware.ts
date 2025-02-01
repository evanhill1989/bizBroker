import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import { getUserOnboardingStep } from "./app/utils/getUserOnboardingStep";
// import type { NextRequest } from "next/server";
console.log("!!!!!!!!!<<<<<<<<--------------Middleware running");
export default withAuth(async function middleware(req) {
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
});

export const config = {
  matcher: ["/dashboard"],
};
