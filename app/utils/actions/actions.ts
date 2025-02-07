/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { ListingCreationSchema, PostSchema } from "../zodSchemas";
import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

export async function CreateListingAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: ListingCreationSchema({
      async isSubdirectoryUnique() {
        const existingSubdirectory = await prisma.listing.findUnique({
          where: {
            subdirectory: formData.get("subdirectory") as string,
          },
        });

        return !existingSubdirectory;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") return submission.reply();

  const response = await prisma.listing.create({
    data: {
      description: submission.value.description,
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      userId: user.id,
    },
  });

  void response; // Prevents TS unused variable error
  return redirect(`/dashboard/sites`);
}

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
  return redirect(`/dashboard/sites/${formData.get("listingId")}`);
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
  return redirect(`/dashboard/sites/${formData.get("listingId")}`);
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
  return redirect(`/dashboard/sites/${formData.get("listingId")}`);
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

  return redirect(`/dashboard/sites/${formData.get("listingId")}`);
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

  return redirect(`/dashboard/sites`);
}

export async function getExactMatchListings(criteria: Buyer) {
  const queryCriteria = {
    ...(criteria.scale && { scale: criteria.scale }),
    ...(criteria.maturity && { maturity: criteria.maturity }),
    ...(criteria.businessModel && { businessModel: criteria.businessModel }),
    ...(criteria.location && { location: criteria.location }),
    ...(criteria.minPriceRange !== null && criteria.maxPriceRange !== null && {
      price: {
        gte: parseFloat(criteria.minPriceRange.toString()), // Ensure it's a Float
        lte: parseFloat(criteria.maxPriceRange.toString()), // Ensure it's a Float
      },
    }),
    ...(criteria.minProfitMultiple !== null && criteria.maxProfitMultiple !== null && {
      profitMultiple: {
        gte: parseFloat(criteria.minProfitMultiple.toString()), // Ensure it's a Float
        lte: parseFloat(criteria.maxProfitMultiple.toString()), // Ensure it's a Float
      },
    }),
    ...(criteria.minRevenueMultiple !== null && criteria.maxRevenueMultiple !== null && {
      revenueMultiple: {
        gte: parseFloat(criteria.minRevenueMultiple.toString()), // Ensure it's a Float
        lte: parseFloat(criteria.maxRevenueMultiple.toString()), // Ensure it's a Float
      },
    }),
    ...(criteria.minTrailing12MonthRevenue !== null && criteria.maxTrailing12MonthRevenue !== null && {
      trailing12MonthRevenue: {
        gte: parseFloat(criteria.minTrailing12MonthRevenue.toString()), // Ensure it's a Float
        lte: parseFloat(criteria.maxTrailing12MonthRevenue.toString()), // Ensure it's a Float
      },
    }),
    ...(criteria.minTrailing12MonthProfit !== null && criteria.maxTrailing12MonthProfit !== null && {
      trailing12MonthProfit: {
        gte: parseFloat(criteria.minTrailing12MonthProfit.toString()), // Ensure it's a Float
        lte: parseFloat(criteria.maxTrailing12MonthProfit.toString()), // Ensure it's a Float
      },
    }),
  };

  return await prisma.listing.findMany({
    where: queryCriteria,
  });
}