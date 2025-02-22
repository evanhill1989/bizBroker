"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { SubmissionResult } from "@conform-to/react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

export async function UpdateDescriptions(formData: FormData) {
  const user = await requireUser();

  const businessName = formData.get("businessName") as string;
  const description = formData.get("description") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const longDescription = formData.get("longDescription") as string;

  const seller = await prisma.seller.findUnique({
    where: { userId: user.id },
  });

  if (!seller) {
    throw new Error("Buyer not found.");
  }

  await prisma.listing.update({
    where: { userId: user.id },
    data: {
      businessName,
      description,
      shortDescription,
      longDescription,
    },
  });

  await prisma.seller.update({
    where: { userId: user.id },
    data: {
      onboardingStep: "price",
    },
  });

  return redirect(`/onboarding/sellers/price`);
}
