import { requireUser } from "@/app/utils/requireUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await requireUser();
  const { step } = await req.json();

  // Update the buyer's onboarding step in the database
  await prisma.buyer.update({
    where: { userId: user.id },
    data: { onboardingStep: step },
  });

  return NextResponse.json({ message: "Onboarding step updated" });
}
