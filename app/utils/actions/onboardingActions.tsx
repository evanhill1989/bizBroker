"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { SubmissionResult } from "@conform-to/react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";

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

  await prisma.buyer.create({
    where: { id: user.id },
    data: {
      onboardingSkipped: true,
    },
  });

  return redirect("/dashboard/buyer");
}

export async function handleBackNavigation(currentStep: string) {
  // conditional for handling seller onboarding

  const stepMapping: { [key: string]: string } = {
    location: "trailingrevenue",
    trailingrevenue: "trailingprofit",
    trailingprofit: "revenuemultiple",
    revenuemultiple: "profitmultiple",
    profitmultiple: "revenuemargin",
    revenuemargin: "profitmargin",
    profitmargin: "price",
    price: "businessmodel",
    businessmodel: "maturity",
  };

  const previousStep = stepMapping[currentStep];

  redirect(`/onboarding/buyers/${previousStep}`);

  // DOES THIS CONTINUE RUNNING IN BG AFTER REDIRECT?
  const user = await requireUser();

  await prisma.buyer.update({
    where: { userId: user.id },
    data: {
      onboardingStep: previousStep,
    },
  });
}
