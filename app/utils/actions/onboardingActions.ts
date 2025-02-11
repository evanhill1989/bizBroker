"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { Submission, SubmissionResult } from "@conform-to/react";
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

type FormSubmissionState = Submission<z.ZodType>;

export async function UpdateBuyerAction(formData: FormData) {
  const user = await requireUser();
  const submission = parseWithZod(formData, {
    schema: BuyerSchema,
  });
  if (submission.status !== "success") return submission.reply();
  const data = await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      ...submission.value,
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
    where: { userId: user.id },
    data: {
      onboardingStep: "scale",
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

export async function handleBackNavigation(currentStep: string) {
  const stepMapping: { [key: string]: string } = {
    'location': 'trailingrevenue',
    'trailingrevenue': 'trailingprofit',
    'trailingprofit': 'revenuemultiple',
    'revenuemultiple': 'profitmultiple',
    'profitmultiple': 'revenuemargin',
    'revenuemargin': 'profitmargin',
    'profitmargin': 'price',
    'price': 'businessmodel',
    'businessmodel': 'maturity',

  };

  const previousStep = stepMapping[currentStep];

  redirect(`/onboarding/buyers/${previousStep}`);

  const user = await requireUser();
  
  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      onboardingStep: previousStep
    }
  });

  
}

export async function UpdateBuyerScaleStepAction(formData: FormData) {
  const user = await requireUser();

  const scaleValue = formData.get("scale") as string;

  if (!scaleValue) {
    throw new Error("Scale value is required.");
  }

  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });

  if (!buyer) {
    throw new Error("Buyer not found.");
  }

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      scale: scaleValue,
      onboardingStep: "maturity",
    },
  });

  return redirect(`/onboarding/buyers/maturity`);
}

export async function UpdateBuyerMaturityStepAction(formData: FormData) {
  const user = await requireUser();

  const maturityValue = formData.get("maturity") as string;

  if (!maturityValue) {
    throw new Error("maturity value is required.");
  }

  const buyer = await prisma.buyer.findUnique({
    where: { userId: user.id },
  });

  if (!buyer) {
    throw new Error("Buyer not found.");
  }

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      maturity: maturityValue,
      onboardingStep: "businessModel",
    },
  });

  return redirect(`/onboarding/buyers/businessmodel`);
}

export async function UpdateBuyerBusinessModelStepAction(formData: FormData) {
  const user = await requireUser();

  const businessModelValue = formData.get("businessmodel") as string;

  if (!businessModelValue) {
    throw new Error("business model value is required.");
  }

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      businessModel: businessModelValue,
      onboardingStep: "price",
    },
  });

  return redirect(`/onboarding/buyers/price`);
}



export async function UpdateBuyerPriceRangeStepAction(
  state: SubmissionResult<string[]> | undefined, 
  formData: FormData
): Promise<SubmissionResult<string[]>> {
  const user = await requireUser();
  const submission = parseWithZod(formData, {
    schema: PriceRangeFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      priceRange: submission.value.priceRange,
      onboardingStep: "revenuemultiple",
    },
  });

  return {
    status: "success",
    data: ["Price range updated successfully"],
  };
}

export async function UpdateBuyerRevenueMultipleStepAction(
  prevState: FormSubmissionState,
  formData: FormData
) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: RevenueMultipleFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);
  // make min and max a number

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      minRevenueMultiple: parsedMin,
      maxRevenueMultiple: parsedMax,
      onboardingStep: "profitmultiple",
    },
  });

  return redirect(`/onboarding/buyers/profitmultiple`);
}

export async function UpdateBuyerProfitMultipleStepAction(
  prevState: FormSubmissionState,
  formData: FormData
) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: ProfitMultipleFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      minProfitMultiple: parsedMin,
      maxProfitMultiple: parsedMax,
      onboardingStep: "trailingprofit",
    },
  });
  return redirect(`/onboarding/buyers/trailingprofit`);
}

export async function UpdateBuyerTrailingProfitStepAction(
  prevState: FormSubmissionState,
  formData: FormData
) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: TrailingProfitFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      minTrailing12MonthProfit: parsedMin,
      maxTrailing12MonthProfit: parsedMax,
      onboardingStep: "trailingrevenue",
    },
  });

  return redirect(`/onboarding/buyers/trailingrevenue`);
}
export async function UpdateBuyerTrailingRevenueStepAction(
  prevState: FormSubmissionState,
  formData: FormData
) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: TrailingRevenueFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      minTrailing12MonthRevenue: parsedMin,
      maxTrailing12MonthRevenue: parsedMax,
      onboardingStep: "location",
    },
  });

  return redirect(`/onboarding/buyers/location`);
}

export async function UpdateBuyerLocationStepAction(formData: FormData) {
  const user = await requireUser();

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      location: formData.get("location") as string,
      onboardingStep: "complete",
    },
  });

 
  await prisma.user.update({
      where: { id: user.id },
      data: {
        onboardingCompleted: true,
      },
    })
  

  return redirect(`/dashboard/buyer`);
}
