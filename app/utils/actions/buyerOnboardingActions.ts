"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { SubmissionResult } from "@conform-to/react";

import {
  PriceRangeFormSchema,
  ProfitMultipleFormSchema,
  RevenueMultipleFormSchema,
  TrailingProfitFormSchema,
  TrailingRevenueFormSchema,
} from "../zodSchemas";
import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

export async function UpdateBuyerScaleStepAction(formData: FormData) {
  const user = await requireUser();

  const scaleValue = formData.get("scale") as string;

  if (!scaleValue) {
    throw new Error("Scale value is required.");
  }

  const buyer = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!buyer) {
    throw new Error("Buyer not found.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerScale: scaleValue,
      buyerOnboardingStep: "maturity",
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

  const buyer = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!buyer) {
    throw new Error("Buyer not found.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerMaturity: maturityValue,
      buyerOnboardingStep: "businessModel",
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

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerBusinessModel: businessModelValue,
      buyerOnboardingStep: "price",
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
  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  console.log(parsedMin, parsedMax, "min and max parsed in price range action");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerMinPriceRange: parsedMin,
      buyerMaxPriceRange: parsedMax,
      buyerOnboardingStep: "revenuemultiple",
    },
  });

  return redirect(`/onboarding/buyers/revenuemultiple`);
}

export async function UpdateBuyerRevenueMultipleStepAction(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
): Promise<SubmissionResult<string[]>> {
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

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerMinRevenueMultiple: parsedMin,
      buyerMaxRevenueMultiple: parsedMax,
      buyerOnboardingStep: "profitmultiple",
    },
  });

  return redirect(`/onboarding/buyers/profitmultiple`);
}

export async function UpdateBuyerProfitMultipleStepAction(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
): Promise<SubmissionResult<string[]>> {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: ProfitMultipleFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerMinProfitMultiple: parsedMin,
      buyerMaxProfitMultiple: parsedMax,
      buyerOnboardingStep: "trailingprofit",
    },
  });
  return redirect(`/onboarding/buyers/trailingprofit`);
}

export async function UpdateBuyerTrailingProfitStepAction(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
): Promise<SubmissionResult<string[]>> {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: TrailingProfitFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerMinTrailing12MonthProfit: parsedMin,
      buyerMaxTrailing12MonthProfit: parsedMax,
      buyerOnboardingStep: "trailingrevenue",
    },
  });

  return redirect(`/onboarding/buyers/trailingrevenue`);
}
export async function UpdateBuyerTrailingRevenueStepAction(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
): Promise<SubmissionResult<string[]>> {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: TrailingRevenueFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerMinTrailing12MonthRevenue: parsedMin,
      buyerMaxTrailing12MonthRevenue: parsedMax,
      buyerOnboardingStep: "location",
    },
  });

  return redirect(`/onboarding/buyers/location`);
}

export async function UpdateBuyerLocationStepAction(formData: FormData) {
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerLocation: formData.get("location") as string,
      buyerOnboardingStep: "complete",
    },
  });

  return redirect(`/dashboard/buyer`);
}
