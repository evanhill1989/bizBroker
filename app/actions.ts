/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { ListingCreationSchema, PostSchema } from "./utils/zodSchemas";
import { prisma } from "@/lib/prisma";
import { requireUser } from "./utils/requireUser";

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

export async function CreateBuyerAction(formData: FormData) {
  const user = await requireUser();

  //Will add validation later
  // const submission = parseWithZod(formData, {
  //   schema: PostSchema,
  // });

  const data = await prisma.buyer.create({
    data: {
      userId: user.id,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      onboardingCompleted: true,
    },
  });

  void data;
  return redirect("/buyer/dashboard");
}

export async function CreateBuyerPreferenceAction(
  formData: FormData,
  preferenceType: string
) {
  const user = await requireUser();
  const preferenceValue = formData.get("preferences") as string;

  if (!preferenceValue) {
    throw new Error("Preference value is required.");
  }

  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });

  if (!buyer) {
    throw new Error("Buyer not found.");
  }

  // Create preference
  await prisma.preference.create({
    data: {
      type: preferenceType,
      value: preferenceValue,
      buyer: {
        connect: { id: buyer.id },
      },
    },
  });

  // Increment onboarding step
  const updatedBuyer = await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      onboardingStep: { increment: 1 }, // Automatically increments step
    },
  });

  // Redirect to the next step
  return redirect(`/onboarding/buyers/${updatedBuyer.onboardingStep}`);
}

// Action for Scale Step
export async function CreateBuyerScaleStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "scale");
}

// Action for Maturity Step
export async function CreateBuyerMaturityStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "maturity");
}

export async function CreateBuyerIndustryModelInfraStepAction(
  formData: FormData
) {
  return CreateBuyerPreferenceAction(formData, "industryModelInfra");
}

export async function CreateBuyerLocationStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "location");
}

export async function CreateBuyerPriceRangeStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "priceRange");
}

export async function CreateBuyerRevenueMultipleStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "revenueMultiple");
}

export async function CreateBuyerProfitMultipleStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "profitMultiple");
}

export async function CreateBuyerTrailingProfitStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "trailingProfit");
}

export async function CreateBuyerTrailingRevenueStepAction(formData: FormData) {
  return CreateBuyerPreferenceAction(formData, "trailingRevenue");
}
