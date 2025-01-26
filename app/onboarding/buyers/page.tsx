import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { on } from "events";
import { Goal } from "lucide-react";
import Link from "next/link";

export default function BuyersOnboardingPage() {
  // const onboardingSteps = [
  //   {
  //     id: 1,
  //     title:"We'll help you build your first search"
  //   },
  // ]

  return (
    <div>
      <Card>
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
      </Card>
    </div>
  );
}
