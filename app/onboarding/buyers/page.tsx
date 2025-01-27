"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Goal } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { ScaleForm } from "@/components/onboarding/buyer/forms/ScaleForm";
import { MaturityForm } from "@/components/onboarding/buyer/forms/MaturityForm";

const onboardingSteps = [
  {
    id: 1,
    title: "We'll help you build your first search",
    description: "Answer a few straightforward questions to get started",
    cardContent: (
      <>
        <div className="flex gap-4">
          <Goal className="h-12 w-12" />
          <div>
            <h3 className="text-lg font-semibold">Tell us your goals</h3>
            <p>Answer a few straightforward questions to get started</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Goal className="h-12 w-12" />
          <div>
            <h3 className="text-lg font-semibold">Tell us your goals</h3>
            <p>Answer a few straightforward questions to get started</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 2,
    title: "Scale",
    description: "Choose a general level of maturity and size",
    cardContent: <ScaleForm />,
  },
  {
    id: 3,
    title: "Scale",
    description: "Choose a general level of maturity and size",
    cardContent: <MaturityForm />,
  },
];

export default function BuyersOnboardingPage({
  initialStep,
}: {
  initialStep: number;
}) {
  const [step, setStep] = useState(initialStep);

  async function handleNextStep() {
    const nextStep = step + 1;

    // Might be an issue with the ai solution because the button needs to submit the form, but can it do that and trigger handleNextStep?

    await fetch("/api/update-onboarding-step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: nextStep }),
    });

    setStep(nextStep);
  }

  const currentStep = onboardingSteps[step - 1] || onboardingSteps[1]; // Adjust for 0-based indexing

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Hi, {currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
          <CardContent>{currentStep.cardContent}</CardContent>
        </CardHeader>

        <CardFooter>
          <h3>Umm hello?</h3>
          <Button asChild className="w-full">
            <p>hi</p>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
