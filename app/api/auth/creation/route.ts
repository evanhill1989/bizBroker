import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user === null || !user.id) {
    throw new Error("User not found");
  }

  // Define the union type for dbUser
  type DbUser =
    | (Awaited<ReturnType<typeof prisma.user.findUnique>> & {
        buyerProfile?: Awaited<
          ReturnType<typeof prisma.buyer.findUnique>
        > | null;
        sellerProfile?: Awaited<
          ReturnType<typeof prisma.seller.findUnique>
        > | null;
      })
    | null;

  let dbUser: DbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      sellerProfile: true,
      buyerProfile: true,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        onboardingCompleted: false,
      },
    });

    return NextResponse.redirect("http://localhost:3000/onboarding"); // Redirect to onboarding
  }

  if (!dbUser.onboardingCompleted) {
    return NextResponse.redirect("/onboarding"); // Redirect to onboarding if incomplete
  }

  // Redirect to the correct dashboard
  if (dbUser.buyerProfile) {
    return NextResponse.redirect("/buyer/dashboard");
  } else if (dbUser.sellerProfile) {
    return NextResponse.redirect("/seller/dashboard");
  }

  // Fallback to onboarding if no profiles exist
  return NextResponse.redirect("/onboarding");
}
