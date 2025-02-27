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

        buyerOnboardingStep: "intro",
       
        buyerScale: null,
        buyerMaturity: null,
        buyerBusinessModel: null,
        buyerLocation: null,
        buyerMinPriceRange: null,
        buyerMaxPriceRange: null,
        buyerMinProfitMultiple: null,
        buyerMaxProfitMultiple: null,
        buyerMinRevenueMultiple: null,
        buyerMaxRevenueMultiple: null,
        buyerMinTrailing12MonthProfit: null,
        buyerMaxTrailing12MonthProfit: null,
        buyerMinTrailing12MonthRevenue: null,
        buyerMaxTrailing12MonthRevenue: null,

        sellerBusinessNames: [],

        sellerOnboardingStep: "intro",
        
        sellerPhoneNumber: "",
        sellerWebsite: null,
      },
    });

    console.log("New user created:", newUser);
    // initially we'll just let this be redirect to buyers, but probably need to grab the user intention if they clicked on "buyers" or "sellers" link from landing page passed via params. pretty aspirational though.
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? `http://bizlists.vercel.app/onboarding/buyers/intro`
        : `http://localhost:3000/onboarding/buyers/intro`
    );
  }

  if (dbUser.buyerOnboardingStep === "complete") {
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? `http://bizlists.vercel.app/dashboard/buyer`
        : `http://localhost:3000/dashboard/buyer`
    );
  } else if (
    !(dbUser.buyerOnboardingStep === "complete") &&
    !(dbUser.sellerOnboardingStep === "complete")
  ) {
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? `http://bizlists.vercel.app/onboarding/buyers/${dbUser.buyerOnboardingStep}`
        : `http://localhost:3000/onboarding/buyers/${dbUser.buyerOnboardingStep}`
    );
  } else if (dbUser.sellerOnboardingStep === "complete") {
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? `http://bizlists.vercel.app/dashboard/seller`
        : `http://localhost:3000/dashboard/seller`
    );
  } else {
    return NextResponse.redirect(
      process.env.NODE_ENV === "production"
        ? `http://bizlists.vercel.app/onboarding/sellers/${dbUser.sellerOnboardingStep}`
        : `http://localhost:3000/onboarding/sellers/${dbUser.sellerOnboardingStep}`
    );
  }
}
