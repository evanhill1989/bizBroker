/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { parseWithZod} from "@conform-to/zod";


import { PostSchema} from "../zodSchemas";
import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

import { Listing, Buyer } from "@prisma/client";


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




export async function getExactMatchListings(buyer: Buyer): Promise<Listing[]> {
  if (!buyer) return [];

  const {
    businessModel,
    
    maturity,
    scale,
    minPriceRange,
    maxPriceRange,
    minProfitMultiple,
    maxProfitMultiple,
    // minRevenueMultiple,
    // maxRevenueMultiple,
    // minTrailing12MonthProfit,
    // maxTrailing12MonthProfit,
    // minTrailing12MonthRevenue,
    // maxTrailing12MonthRevenue,
  } = buyer;

  const listings = await prisma.listing.findMany({
    where: {
      // Match nullable string values exactly
      businessModel: businessModel ? { equals: businessModel } : undefined,
      
      maturity: maturity ? { equals: maturity } : undefined,
      scale: scale ? { equals: scale } : undefined,

      price: {
        gte: minPriceRange ?? undefined,
        lte: maxPriceRange ?? undefined,
      },
      profitMultiple: {
        gte: minProfitMultiple ?? undefined,
        lte: maxProfitMultiple ?? undefined,
      },
      // revenueMultiple: {
      //   gte: minRevenueMultiple ?? undefined,
      //   lte: maxRevenueMultiple ?? undefined,
      // },
      // trailing12MonthProfit: {
      //   gte: minTrailing12MonthProfit ?? undefined,
      //   lte: maxTrailing12MonthProfit ?? undefined,
      // },
      // trailing12MonthRevenue: {
      //   gte: minTrailing12MonthRevenue ?? undefined,
      //   lte: maxTrailing12MonthRevenue ?? undefined,
      // },
    },
  });

  const formattedListings = listings.map((listing) => {
    listing.businessModel = listing.businessModel ?? "Unknown";
    
    listing.maturity = listing.maturity ?? "Unknown";
    listing.scale = listing.scale ?? "Unknown";
    listing.trailing12MonthProfit = Math.floor((listing.trailing12MonthProfit ?? 0) / 1000);
    listing.trailing12MonthRevenue = Math.floor((listing.trailing12MonthRevenue ?? 0) / 1000);
    listing.price = Math.floor((listing.price ?? 0) / 1000);
    listing.profitMultiple = Math.floor(listing.profitMultiple ?? 0) ;
    listing.revenueMultiple = Math.floor(listing.revenueMultiple ?? 0) ;

    return listing;
  })

  return formattedListings;
}

export async function updateListingPreference(
  buyerId: string,
  listingId: string,
  status: 'HIDDEN' | 'LIKED'
) {
  try {
    await prisma.buyerListingPreference.upsert({
      where: {
        buyerId_listingId: {
          buyerId,
          listingId,
        },
      },
      update: {
        status,
      },
      create: {
        buyerId,
        listingId,
        status,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update preference:", error instanceof Error ? error.message : String(error));
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function deleteListingPreference(
  buyerId: string,
  listingId: string
) {
  try {
    await prisma.buyerListingPreference.delete({
      where: {
        buyerId_listingId: {
          buyerId,
          listingId,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to delete preference:", error instanceof Error ? error.message : String(error));
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}