"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";
import { parse } from "path";

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

export async function UpdateDescriptions(formData: FormData) {
  const user = await requireUser();

  const description = formData.get("description") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const longDescription = formData.get("longDescription") as string;

  await prisma.$transaction(async (tx) => {
    const seller = await tx.user.findUnique({
      where: { id: user.id },
    });

    if (!seller) {
      throw new Error("Seller not found.");
    }

    const listings = await tx.listing.findMany({
      where: { userId: seller.id }, // Use userId directly for clarity
    });

    if (listings.length === 0) {
      throw new Error("No listings found for the seller.");
    }

    await tx.listing.update({
      where: { id: listings[0].id },
      data: {
        description,
        shortDescription,
        longDescription,
      },
    });

    await tx.user.update({
      where: { id: user.id },
      data: {
        sellerOnboardingStep: "price",
      },
    });
  });

  return redirect(`/onboarding/sellers/price`);
}

export async function UpdatePrice(formData: FormData) {
  const user = await requireUser();
  const price = parseFloat(formData.get("price") as string) || null;
  const profitMultiple =
    parseFloat(formData.get("profitMultiple") as string) || null;
  const revenueMultiple =
    parseFloat(formData.get("revenueMultiple") as string) || null;
  const trailing12MonthProfit =
    parseFloat(formData.get("trailing12MonthProfit") as string) || null;
  const trailing12MonthRevenue =
    parseFloat(formData.get("trailing12MonthRevenue") as string) || null;
  const lastMonthRevenue =
    parseFloat(formData.get("lastMonthRevenue") as string) || null;
  const lastMonthProfit =
    parseFloat(formData.get("lastMonthProfit") as string) || null;

  await prisma.$transaction(async (tx) => {
    const seller = await tx.user.findUnique({
      where: { id: user.id },
    });

    if (!seller) {
      throw new Error("Seller not found.");
    }

    const listings = await tx.listing.findMany({
      where: { userId: seller.id }, // Use userId directly for clarity
    });

    if (listings.length === 0) {
      throw new Error("No listings found for the seller.");
    }

    await tx.listing.update({
      where: { id: listings[0].id },
      data: {
        price,
        profitMultiple,
        revenueMultiple,
        trailing12MonthProfit,
        trailing12MonthRevenue,
        lastMonthRevenue,
        lastMonthProfit,
      },
    });

    await tx.user.update({
      where: { id: user.id },
      data: {
        sellerOnboardingStep: "profile",
      },
    });
  });

  return redirect(`/onboarding/sellers/profile`);
}

export async function UpdateProfile(formData: FormData) {
  const user = await requireUser();

  const businessModel = formData.get("businessModel") as string;
  const scale = formData.get("scale") as string;
  const maturity = formData.get("maturity") as string;
  const location = formData.get("location") as string;
  const numEmployees = parseInt(formData.get("numEmployees") as string) || null;
  const foundedDate = formData.get("foundedDate")
    ? new Date(formData.get("foundedDate") as string)
    : null;

  // Handle competitors as an array
  let competitors: string[] = [];
  const competitorsRaw = formData.get("competitors");

  if (competitorsRaw) {
    competitors = competitorsRaw
      .split(",") // Split by commas
      .map((c) => c.trim()) // Trim spaces
      .filter((c) => c.length > 0); // Remove empty entries
  }

  await prisma.$transaction(async (tx) => {
    const seller = await tx.user.findUnique({
      where: { id: user.id },
    });

    if (!seller) {
      throw new Error("Seller not found.");
    }

    const listings = await tx.listing.findMany({
      where: { userId: seller.id },
    });

    if (listings.length === 0) {
      throw new Error("No listings found for the seller.");
    }

    await tx.listing.update({
      where: { id: listings[0].id },
      data: {
        businessModel,
        scale,
        maturity,
        location,
        numEmployees,
        foundedDate,
        competitors, // Now correctly stored as an array
      },
    });
  });
  return redirect(`/onboarding/sellers/profile`);
}
