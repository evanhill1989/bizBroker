"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";
import { profile } from "console";

export async function StartOnboarding() {
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerOnboardingStep: "scale",
    },
  });

  return redirect("/onboarding/buyers/scale");
}

export async function OnboardingSkipped() {
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerOnboardingStep: "complete",
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

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerOnboardingStep: previousStep,
    },
  });
}

export async function handleSellerBackNav(currentStep: string) {
  // conditional for handling seller onboarding

  const stepMapping: { [key: string]: string } = {
    descriptions: "intro",
    price: "descriptions",
    profile: "price",
    completed: "profile",
  };

  const previousStep = stepMapping[currentStep];

  redirect(`/onboarding/buyers/${previousStep}`);

  // DOES THIS CONTINUE RUNNING IN BG AFTER REDIRECT?
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      buyerOnboardingStep: previousStep,
    },
  });
}
