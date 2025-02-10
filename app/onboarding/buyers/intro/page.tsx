"use client";

import { CreateListingAction } from "@/app/utils/actions/actions";
import { listingSchema } from "@/app/utils/zodSchemas";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Ghost, Goal } from "lucide-react";
import { BackButton } from "@/components/dashboard/BackButton";
import {
  OnboardingSkipped,
  StartOnboarding,
} from "@/app/utils/actions/onboardingActions";
import { Button } from "@/components/ui/button";

export default function buyerIntroRoute() {
  //   const [lastResult, action] = useActionState(CreateListingAction, undefined);

  //   const [form, fields] = useForm({
  //     lastResult,

  //     onValidate({ formData }) {
  //       return parseWithZod(formData, {
  //         schema: listingSchema,
  //       });
  //     },

  //     shouldValidate: "onBlur",
  //     shouldRevalidate: "onInput",
  //   });

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Create Listing</CardTitle>
          <CardDescription>
            Create your Listing here. Click button below when finished.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4">
            <Goal className="h-12 w-12" />
            <div>
              <h3 className="text-lg font-semibold">Tell us your goals</h3>
              <p>Answer a few straightforward questions to get started</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <form action={OnboardingSkipped}>
            <SubmitButton text="Skip search" variant="ghost" />
          </form>
          <form action={StartOnboarding}>
            <SubmitButton text="Start search build" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
