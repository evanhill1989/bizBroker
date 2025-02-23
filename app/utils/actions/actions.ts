/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import { PostSchema } from "../zodSchemas";
import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

import { Listing, User } from "@prisma/client";

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const data = await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user.id,
      listingId: formData.get("listingId") as string,
    },
  });

  void data; // Prevents TS unused variable error
  return redirect(`/dashboard/listings/${formData.get("listingId")}`);
}

export async function EditPostActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const data = await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
    },
  });

  void data; // Prevents TS unused variable error
  return redirect(`/dashboard/listings/${formData.get("listingId")}`);
}

export async function DeletePost(formData: FormData) {
  console.log("FormData:", formData); // Debugging
  const user = await requireUser();

  const data = await prisma.post.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  void data; // Prevents TS unused variable error
  return redirect(`/dashboard/listings/${formData.get("listingId")}`);
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.listing.update({
    where: {
      userId: user.id,
      id: formData.get("listingId") as string,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  void data; // Prevents TS unused variable error

  return redirect(`/dashboard/listings/${formData.get("listingId")}`);
}

export async function DeleteListing(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.listing.delete({
    where: {
      userId: user.id,
      id: formData.get("listingId") as string,
    },
  });

  void data; // Prevents TS unused variable error

  return redirect(`/dashboard/listings`);
}

export async function getExactMatchListings(dbUser: User): Promise<Listing[]> {
  if (!dbUser) return [];

  const {
    buyerBusinessModel,

    buyerMaturity,
    buyerScale,
    buyerMinPriceRange,
    buyerMaxPriceRange,
    buyerMinProfitMultiple,
    buyerMaxProfitMultiple,
    // minRevenueMultiple,
    // maxRevenueMultiple,
    // minTrailing12MonthProfit,
    // maxTrailing12MonthProfit,
    // minTrailing12MonthRevenue,
    // maxTrailing12MonthRevenue,
  } = dbUser;

  const listings = await prisma.listing.findMany({
    where: {
      // Match nullable string values exactly
      businessModel: buyerBusinessModel
        ? { equals: buyerBusinessModel }
        : undefined,

      maturity: buyerMaturity ? { equals: buyerMaturity } : undefined,
      scale: buyerScale ? { equals: buyerScale } : undefined,

      price: {
        gte: buyerMinPriceRange ?? undefined,
        lte: buyerMaxPriceRange ?? undefined,
      },
      profitMultiple: {
        gte: buyerMinProfitMultiple ?? undefined,
        lte: buyerMaxProfitMultiple ?? undefined,
      },
      // revenueMultiple: {
      //   gte: buyerMinRevenueMultiple ?? undefined,
      //   lte: buyerMaxRevenueMultiple ?? undefined,
      // },
      // trailing12MonthProfit: {
      //   gte: buyerMinTrailing12MonthProfit ?? undefined,
      //   lte: buyerMaxTrailing12MonthProfit ?? undefined,
      // },
      // trailing12MonthRevenue: {
      //   gte: buyerMinTrailing12MonthRevenue ?? undefined,
      //   lte: buyerMaxTrailing12MonthRevenue ?? undefined,
      // },
    },
  });

  const formattedListings = listings.map((listing) => {
    listing.businessModel = listing.businessModel ?? "Unknown";

    listing.maturity = listing.maturity ?? "Unknown";
    listing.scale = listing.scale ?? "Unknown";
    listing.trailing12MonthProfit = Math.floor(
      (listing.trailing12MonthProfit ?? 0) / 1000
    );
    listing.trailing12MonthRevenue = Math.floor(
      (listing.trailing12MonthRevenue ?? 0) / 1000
    );
    listing.price = Math.floor((listing.price ?? 0) / 1000);
    listing.profitMultiple = Math.floor(listing.profitMultiple ?? 0);
    listing.revenueMultiple = Math.floor(listing.revenueMultiple ?? 0);

    return listing;
  });

  return formattedListings;
}

export async function updateListingPreference(
  userId: string,
  listingId: string,
  status: "HIDDEN" | "LIKED"
) {
  try {
    await prisma.buyerListingPreference.upsert({
      where: {
        userId_listingId: {
          userId,
          listingId,
        },
      },
      update: {
        status,
      },
      create: {
        userId,
        listingId,
        status,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(
      "Failed to update preference:",
      error instanceof Error ? error.message : String(error)
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function deleteListingPreference(
  userId: string,
  listingId: string
) {
  try {
    await prisma.buyerListingPreference.delete({
      where: {
        userId_listingId: {
          userId,
          listingId,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error(
      "Failed to delete preference:",
      error instanceof Error ? error.message : String(error)
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
