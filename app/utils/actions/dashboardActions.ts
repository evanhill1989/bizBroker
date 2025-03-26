"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../requireUser";
import { parseWithZod } from "@conform-to/zod";

import { WholeListingSchema } from "../zodSchemas";
import { SubmissionResult } from "@conform-to/react";

export async function UpdateWholeListing(
  state: SubmissionResult<string[]> | undefined,
  formData: FormData
): Promise<SubmissionResult<string[]>> {
  const user = await requireUser();
  const listingId = formData.get("listingId") as string;

  if (!listingId) {
    throw new Error("No listing ID provided.");
  }

  const submission = parseWithZod(formData, { schema: WholeListingSchema });
  if (submission.status !== "success") return submission.reply();

  await prisma.listing.update({
    where: { id: listingId, userId: user.id }, // Now it's scoped correctly
    data: {
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      longDescription: formData.get("longDescription") as string,
      price: parseFloat((formData.get("price") as string) || "0"),
      profitMultiple: parseFloat(
        (formData.get("profitMultiple") as string) || "0"
      ),
      revenueMultiple: parseFloat(
        (formData.get("revenueMultiple") as string) || "0"
      ),
      trailing12MonthProfit: parseFloat(
        (formData.get("trailing12MonthProfit") as string) || "0"
      ),
      trailing12MonthRevenue: parseFloat(
        (formData.get("trailing12MonthRevenue") as string) || "0"
      ),
      lastMonthRevenue: parseFloat(
        (formData.get("lastMonthRevenue") as string) || "0"
      ),
      lastMonthProfit: parseFloat(
        (formData.get("lastMonthProfit") as string) || "0"
      ),
      foundedDate: new Date((formData.get("foundedDate") as string) || "0"),
      numEmployees: parseInt((formData.get("numEmployees") as string) || "0"),
      competitors: (formData.get("competitors") as string) || "",
      growthOpportunities:
        (formData.get("growthOpportunities") as string) || "",
      assets: (formData.get("assets") as string) || "",
      sellingReason: (formData.get("sellingReason") as string) || "",
      financing: (formData.get("financing") as string) || "",
      scale: (formData.get("scale") as string) || "",
      businessModel: formData.get("businessModel" as string) || "",
      maturity: (formData.get("maturity") as string) || "",
      location: (formData.get("location") as string) || "",
    },
  });

  return redirect(`/dashboard/seller`);
}
