"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { PreviousOnboardingStep } from "@/app/utils/actions/onboardingActions";

export function BackButton(lastStep: string) {
  return (
    <Button asChild variant="ghost" onClick={PreviousOnboardingStep(lastStep)}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      <Link href={lastStep} />
    </Button>
  );
}
