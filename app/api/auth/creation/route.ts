import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user, "user in GET");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    console.log(
      "User not found in database, creating new user if(!dbUser) block"
    );
    // Only create a new user if the user truly doesn't exist

    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        // onboardingCompleted: false,
      },
    });

    await prisma.buyer.create({
      data: {
        userId: user.id,
        onboardingStep: "intro",
        onboardingSkipped: false,
        scale: null,
        maturity: null,
        businessModel: null,
        location: null,
        minPriceRange: null,
        maxPriceRange: null,
        minProfitMultiple: null,
        maxProfitMultiple: null,
        minRevenueMultiple: null,
        maxRevenueMultiple: null,
        minTrailing12MonthProfit: null,
        maxTrailing12MonthProfit: null,
        minTrailing12MonthRevenue: null,
        maxTrailing12MonthRevenue: null,
      },
    });

    await prisma.seller.create({
      data: {
        userId: user.id,
        onboardingStep: "intro",
        onboardingSkipped: false,
        phoneNumber: null,
        website: null,
        businessNames: [],
      },
    });

    console.log("New user created:", newUser);
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? `http://bizlists.vercel.app/onboarding/buyers/intro`
        : `http://localhost:3000/onboarding/buyers/intro`
    );
  }

  if (!onboardedUser && buyer) {
    // this conditional just very specifically tests/satisfies my current state.
    console.log("User not onboarded, redirecting to onboarding");
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? `http://bizlists.vercel.app/onboarding/buyers/${buyer.onboardingStep}`
        : `http://localhost:3000/onboarding/buyers/${buyer.onboardingStep}`
    );
  } else if (onboardedUser) {
    console.log("User already onboarded, redirecting to dashboard");
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? "https://bizlists.vercel.app/dashboard/buyer"
        : "http://localhost:3000/dashboard/buyer"
    ); // Redirect to onboarding if incomplete
  } else {
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? "https://bizlists.vercel.app/onboarding"
        : "http://localhost:3000/onboarding"
    );
  }
}
