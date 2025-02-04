"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import {
  BuyerSchema,
  PriceRangeFormSchema,
  ProfitMultipleFormSchema,
  RevenueMultipleFormSchema,
  TrailingProfitFormSchema,
  TrailingRevenueFormSchema,
} from "../zodSchemas";
import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

export async function CreateBuyerAction(formData: FormData) {
  const user = await requireUser();
  const submission = parseWithZod(formData, {
    schema: BuyerSchema,
  });
  if (submission.status !== "success") return submission.reply();
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

export async function StartOnboarding() {
  const user = await requireUser();

  await prisma.buyer.update({
    where: { id: user.id },
    data: {
      onboardingStep: 2,
    },
  });

  return redirect("/onboarding/buyers/scale");
}

export async function OnboardingSkipped() {
  const user = await requireUser();

  await prisma.buyer.update({
    where: { id: user.id },
    data: {
      onboardingSkipped: true,
    },
  });

  return redirect("/buyer/dashboard");
}

export async function CreateBuyerPreferenceAction(
  formData: FormData,
  preferenceType: string
) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: BuyerPreferenceSchema,
  });

  if (submission.status !== "success") return submission.reply();

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

  await prisma.preference.create({
    data: {
      type: preferenceType,
      value: preferenceValue,
      buyer: {
        connect: { id: buyer.id },
      },
    },
  });

  const updatedBuyer = await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      onboardingStep: { increment: 1 },
    },
  });

  return redirect(`/onboarding/buyers/${updatedBuyer.onboardingStep}`);
}

export async function CreateBuyerMinMaxAction(
  formData: FormData,
  preferenceType: string,
  zodSchema: z.ZodSchema<any>
) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: zodSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;
  console.log(min, max, "<--------!!!!  min and max");
  const preferenceValue = `${min}-${max}`;

  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });

  if (!buyer) {
    throw new Error("Buyer not found.");
  }

  await prisma.preference.create({
    data: {
      type: preferenceType,
      value: preferenceValue,
      buyer: {
        connect: { id: buyer.id },
      },
    },
  });

  const updatedBuyer = await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      onboardingStep: { increment: 1 },
    },
  });

  if (updatedBuyer.onboardingStep === 11) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        onboardingCompleted: true,
      },
    });
  }
  if (updatedBuyer.onboardingStep < 11) {
    return redirect(`/onboarding/buyers/${updatedBuyer.onboardingStep}`);
  } else {
    return redirect("/buyer/dashboard");
  }
}

// Action for Scale Step
// do these need prev states for TS?
export async function CreateBuyerScaleStepAction(
  prevState: any,
  formData: FormData
) {
  return CreateBuyerPreferenceAction(formData, "scale");
}

// Action for Maturity Step
export async function CreateBuyerMaturityStepAction(
  prevState: any,
  formData: FormData
) {
  return CreateBuyerPreferenceAction(formData, "maturity");
}

export async function CreateBuyerIndustryModelInfraStepAction(
  prevState: any,
  formData: FormData
) {
  return CreateBuyerPreferenceAction(formData, "industryModelInfra");
}

export async function CreateBuyerLocationStepAction(
  prevState: any,
  formData: FormData
) {
  return CreateBuyerPreferenceAction(formData, "location");
}

export async function CreateBuyerPriceRangeStepAction(
  prevState: any,
  formData: FormData
): Promise<void> {
  return CreateBuyerMinMaxAction(formData, "priceRange", PriceRangeFormSchema);
}

export async function CreateBuyerRevenueMultipleStepAction(
  prevState: any,
  formData: FormData
) {
  console.log(formData, "Trying to get formData in rev multiple action");
  return CreateBuyerMinMaxAction(
    formData,
    "revenueMultiple",
    RevenueMultipleFormSchema
  );
}

export async function CreateBuyerProfitMultipleStepAction(
  prevState: any,
  formData: FormData
) {
  return CreateBuyerMinMaxAction(
    formData,
    "profitMultiple",
    ProfitMultipleFormSchema
  );
}

export async function CreateBuyerTrailingProfitStepAction(
  prevState: any,
  formData: FormData
) {
  return CreateBuyerMinMaxAction(
    formData,
    "trailingProfit",
    TrailingProfitFormSchema
  );
}

export async function CreateBuyerTrailingRevenueStepAction(
  prevState: any,
  formData: FormData
) {
  return CreateBuyerMinMaxAction(
    formData,
    "trailingRevenue",
    TrailingRevenueFormSchema
  );
}
