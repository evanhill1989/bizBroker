"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

export async function UpdateDescriptions(formData: FormData) {
  const user = await requireUser();

  const description = formData.get("description") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const longDescription = formData.get("longDescription") as string;

  const seller = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!seller) {
    throw new Error("Buyer not found.");
  }

  await prisma.listing.update({
    where: { id: user.id },
    data: {
      businessName,
      description,
      shortDescription,
      longDescription,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      sellerOnboardingStep: "price",
    },
  });

  return redirect(`/onboarding/sellers/price`);
}

export async function CreateListing(formData: FormData) {
  const user = await requireUser();

  const businessName = formData.get("businessName") as string;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    throw new Error("Buyer not found.");
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      sellerOnboardingStep: "description",
    },
  });

  await prisma.listing.create({
    data: {
      userId: dbUser.id,
      businessName: businessName,
      description: "",
      shortDescription: "",
      longDescription: "",
      subdirectory: "",
      businessModel: "",
      maturity: "",
      location: "",
    },
  });

  return redirect(`/onboarding/sellers/description`);
}
