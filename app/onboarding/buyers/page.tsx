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
    title: "Scale and maturity",
    description: "Choose a general level of maturity and size",
    cardContent: <ScaleForm />,
  },
];

function onboardingStep(step: number) {
  const currentStep = onboardingSteps[step];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
          <CardContent>{currentStep.cardContent}</CardContent>
        </CardHeader>

        <CardFooter>
          <Button asChild className="w-full"></Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default function BuyersOnboardingPage() {
  const [step, setStep] = useState(1);

  return <div>{onboardingStep(step)}</div>;
}

/* <Card>
        <CardHeader>
          <CardTitle>We can help you build your first search</CardTitle>
          <CardDescription></CardDescription>
          <CardContent>
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
          </CardContent>
        </CardHeader>

        <CardFooter>
          <Button asChild className="w-full"></Button>
        </CardFooter>
      </Card> */
