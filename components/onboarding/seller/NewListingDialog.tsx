"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateListing } from "@/app/utils/actions/sellerOnboardingActions";

export default function NewListingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Listing</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New listing</DialogTitle>
          <DialogDescription>
            Begin by providing the business name. (Shared with prequalified
            buyers once you approve their inquiry request.)
          </DialogDescription>
        </DialogHeader>
        <form action={CreateListing}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Business Name
              </Label>
              <Input
                id="businessName"
                name="businessName"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Listing Now</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
