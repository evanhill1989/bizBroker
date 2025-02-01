// lib/onboarding.ts
import { prisma } from "@/lib/prisma";

console.log("getUserOnboardingStep");

export async function getUserOnboardingStep(userId: string) {
  const buyer = await prisma.buyer.findUnique({
    where: { userId },
    select: { onboardingStep: true },
  });

  return buyer?.onboardingStep || 1; // Default to step 1 if not found
}
