"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";
import { parseWithZod } from "@conform-to/zod";

import { DescriptionSchema, PriceSchema, ProfileSchema } from "../zodSchemas";
import { SubmissionResult } from "@conform-to/react";

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
      businessName: businessName,
      description: "",
      shortDescription: "",
      longDescription: "",
      subdirectory: businessName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-"),
      businessModel: "",
      maturity: "",
      location: "",
      User: {
        connect: { id: dbUser.id },
      },
    },
  });

  return redirect(`/onboarding/sellers/descriptions`);
}

export async function UpdateDescriptions(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
): Promise<SubmissionResult<string[]>> {
  const user = await requireUser();
  const listingId = formData.get("listingId") as string;

  if (!listingId) {
    throw new Error("No listing ID provided.");
  }

  const submission = parseWithZod(formData, { schema: DescriptionSchema });
  if (submission.status !== "success") return submission.reply();

  await prisma.listing.update({
    where: { id: listingId, userId: user.id }, // Now it's scoped correctly
    data: {
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      longDescription: formData.get("longDescription") as string,
      listingOnboardingStep: "price",
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { sellerOnboardingStep: "price" },
  });

  return redirect(`/onboarding/sellers/price`);
}

export async function UpdatePrice(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
) {
  const user = await requireUser();
  const listingId = formData.get("listingId") as string;

  if (!listingId) {
    throw new Error("No listing ID provided.");
  }

  const submission = parseWithZod(formData, { schema: PriceSchema });
  if (submission.status !== "success") return submission.reply();

  await prisma.$transaction(async (tx) => {
    await tx.listing.update({
      where: { id: listingId, userId: user.id },
      data: {
        price: parseFloat((formData.get("price") as string) || "0"),
        profitMultiple: parseFloat(
          (formData.get("profitMultiple") as string) || "0"
        ),
        revenueMultiple: parseFloat(
          (formData.get("revenueMultiple") as string) || "0"
        ),
        trailing12MonthProfit: parseFloat(
          (formData.get("trailing12MonthProfit") as string) || "0"
        ),
        trailing12MonthRevenue: parseFloat(
          (formData.get("trailing12MonthRevenue") as string) || "0"
        ),
        lastMonthRevenue: parseFloat(
          (formData.get("lastMonthRevenue") as string) || "0"
        ),
        lastMonthProfit: parseFloat(
          (formData.get("lastMonthProfit") as string) || "0"
        ),
        listingOnboardingStep: "profile",
      },
    });

    await tx.user.update({
      where: { id: user.id },
      data: { sellerOnboardingStep: "profile" },
    });
  });

  return redirect(`/onboarding/sellers/profile`);
}

export async function UpdateProfile(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
) {
  const user = await requireUser();

  const listingId = formData.get("listingId") as string;

  if (!listingId) {
    throw new Error("No listing ID provided.");
  }

  const submission = parseWithZod(formData, { schema: ProfileSchema });
  if (submission.status !== "success") return submission.reply();

  await prisma.$transaction(async (tx) => {
    await tx.listing.update({
      where: { id: listingId, userId: user.id },
      data: {
        foundedDate: new Date((formData.get("foundedDate") as string) || "0"),
        numEmployees: parseInt((formData.get("numEmployees") as string) || "0"),
        competitors: (formData.get("competitors") as string) || "",
        growthOpportunities:
          (formData.get("growthOpportunities") as string) || "",
        assets: (formData.get("assets") as string) || "",
        sellingReason: (formData.get("sellingReason") as string) || "",
        financing: (formData.get("financing") as string) || "",
        scale: (formData.get("scale") as string) || "",
        businessModel: (formData.get("businessModel") as string) || "",
        maturity: (formData.get("maturity") as string) || "",
        location: (formData.get("location") as string) || "",

        listingOnboardingStep: "profile",
      },
    });

    await tx.user.update({
      where: { id: user.id },
      data: { sellerOnboardingStep: "profile" },
    });
  });
  return redirect(`/onboarding/sellers/completed`);
}
