"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { SubmissionResult } from "@conform-to/react";

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
  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      minProfitMultiple: parsedMin,
      maxProfitMultiple: parsedMax,
      onboardingStep: "revenuemultiple",
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
  });

  return redirect(`/dashboard/buyer`);
}
