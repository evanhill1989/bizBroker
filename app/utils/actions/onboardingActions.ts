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

export async function UpdateBuyerAction(formData: FormData) {
  const user = await requireUser();
  const submission = parseWithZod(formData, {
    schema: BuyerSchema,
  });
  if (submission.status !== "success") return submission.reply();
  const data = await prisma.buyer.Update({
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
  prevState: any,
  formData: FormData
) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PriceRangeFormSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const min = formData.get("minValue") as string;
  const max = formData.get("maxValue") as string;

  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      minPriceRange: parsedMin,
      maxPriceRange: parsedMax,
      onboardingStep: "revenuemultiple",
    },
  });

  return redirect(`/onboarding/buyers/revenuemultiple`);
}

export async function UpdateBuyerRevenueMultipleStepAction(
  prevState: any,
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
  prevState: any,
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
  prevState: any,
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
  prevState: any,
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

  return redirect(`/dashboard/buyer`);
}

// export async function UpdateBuyerPreferenceAction(
//   formData: FormData,
//   preferenceType: string
// ) {
//   const user = await requireUser();

//   const submission = parseWithZod(formData, {
//     schema: BuyerPreferenceSchema,
//   });

//   if (submission.status !== "success") return submission.reply();

//   const preferenceValue = formData.get("preferences") as string;

//   if (!preferenceValue) {
//     throw new Error("Preference value is required.");
//   }

//   const buyer = await prisma.buyer.findUnique({
//     where: { userId: user.id },
//   });

//   if (!buyer) {
//     throw new Error("Buyer not found.");
//   }

//   await prisma.preference.Update({
//     data: {
//       type: preferenceType,
//       value: preferenceValue,
//       buyer: {
//         connect: { id: buyer.id },
//       },
//     },
//   });

//   const updatedBuyer = await prisma.buyer.update({
//     where: { id: buyer.id },
//     data: {
//       onboardingStep: { increment: 1 },
//     },
//   });

//   return redirect(`/onboarding/buyers/${updatedBuyer.onboardingStep}`);
// }

// export async function UpdateBuyerMinMaxAction(
//   formData: FormData,
//   preferenceType: string,
//   zodSchema: z.ZodSchema<any>
// ) {
//   const user = await requireUser();

//   const submission = parseWithZod(formData, {
//     schema: zodSchema,
//   });

//   if (submission.status !== "success") return submission.reply();

//   const min = formData.get("minValue") as string;
//   const max = formData.get("maxValue") as string;
//   console.log(min, max, "<--------!!!!  min and max");
//   const preferenceValue = `${min}-${max}`;

//   const buyer = await prisma.buyer.findUnique({
//     where: { userId: user.id },
//   });

//   if (!buyer) {
//     throw new Error("Buyer not found.");
//   }

//   await prisma.preference.Update({
//     data: {
//       type: preferenceType,
//       value: preferenceValue,
//       buyer: {
//         connect: { id: buyer.id },
//       },
//     },
//   });

//   const updatedBuyer = await prisma.buyer.update({
//     where: { id: buyer.id },
//     data: {
//       onboardingStep: { increment: 1 },
//     },
//   });

//   if (updatedBuyer.onboardingStep === 11) {
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         onboardingCompleted: true,
//       },
//     });
//   }
//   if (updatedBuyer.onboardingStep < 11) {
//     return redirect(`/onboarding/buyers/${updatedBuyer.onboardingStep}`);
//   } else {
//     return redirect("/buyer/dashboard");
//   }
// }
