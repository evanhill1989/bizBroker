"use client";

import { useState } from "react";
import { ScaleForm } from "@/components/onboarding/buyer/forms/ScaleForm";
import { MaturityForm } from "@/components/onboarding/buyer/forms/MaturityForm";
import { Button } from "@/components/ui/button";

const onboardingSteps = [
  {
    id: 1,
    title: "We'll help you build your first search",
    description: "Answer a few straightforward questions to get started",
    cardContent: <div>Your intro content here</div>,
  },
  {
    id: 2,
    title: "Scale",
    description: "Choose a general level of maturity and size",
    cardContent: <ScaleForm />,
  },
  {
    id: 3,
    title: "Maturity",
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

    // Call API to update step in the database
    await fetch("/api/update-onboarding-step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: nextStep }),
    });

    setStep(nextStep);
  }

  const currentStep = onboardingSteps[step - 1]; // Adjust for 0-based indexing

  return (
    <div>
      <h1>{currentStep.title}</h1>
      <p>{currentStep.description}</p>
      {currentStep.cardContent}

      <Button onClick={handleNextStep} className="mt-4">
        Next Step
      </Button>
    </div>
  );
}
