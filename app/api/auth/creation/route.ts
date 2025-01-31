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

  const onboardedUser = await prisma.user.findUnique({
    where: {
      id: user.id,
      onboardingCompleted: true,
    },
  });

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      onboardingStep: true,
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

    console.log("New user created:", newUser);
    return NextResponse.redirect("http://localhost:3000/onboarding");
  } else if (!onboardedUser && buyer) {
    // this conditional just very specifically tests/satisfies my current state.
    console.log("User not onboarded, redirecting to onboarding");
    return NextResponse.redirect(
      `http://localhost:3000/onboarding/buyers/${buyer.onboardingStep}`
    );
  } else if (onboardedUser) {
    console.log("User already onboarded, redirecting to dashboard");
    return NextResponse.redirect("http://localhost:3000/dashboard"); // Redirect to onboarding if incomplete
  } else {
    return NextResponse.redirect("http://localhost:3000/onboarding");
  }
}
