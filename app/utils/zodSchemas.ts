import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const listingSchema = z.object({
  name: z.string().min(1).max(35),
  description: z.string().min(1).max(150),
  subdirectory: z.string().min(1).max(40),
});

export const PostSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(190),
  coverImage: z.string().min(1),
  smallDescription: z.string().min(1).max(200),
  articleContent: z.string().min(1).max(5000),
});

export const BuyerSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  scale: z.string().optional(),
  businessModel: z.string().optional(),
  maturity: z.string().optional(),
  location: z.string().optional(),
  minPriceRange: z.number().optional(),
  maxPriceRange: z.number().optional(),
  minRevenueMultiple: z.number().optional(),
  maxRevenueMultiple: z.number().optional(),
  minProfitMultiple: z.number().optional(),
  maxProfitMultiple: z.number().optional(),
  trailingProfit: z.number().optional(),
  trailingRevenue: z.number().optional(),
});

export const PriceRangeFormSchema = z.object({
  minValue: z.number().min(0).max(1000000).optional(),
  maxValue: z.number().min(0).max(1000000).optional(),
});

export const RevenueMultipleFormSchema = z.object({
  minValue: z.number().min(0).max(10).optional(),
  maxValue: z.number().min(0).max(10).optional(),
});

export const ProfitMultipleFormSchema = z.object({
  minValue: z.number().min(0).max(10).optional(),
  maxValue: z.number().min(0).max(10).optional(),
});

export const TrailingProfitFormSchema = z.object({
  minValue: z.number().min(0).max(1000000).optional(),
  maxValue: z.number().min(0).max(1000000).optional(),
});

export const TrailingRevenueFormSchema = z.object({
  minValue: z.number().min(0).max(1000000).optional(),
  maxValue: z.number().min(0).max(1000000).optional(),
});

export function ListingCreationSchema(options?: {
  isSubdirectoryUnique: () => Promise<boolean>;
}) {
  return z.object({
    subdirectory: z
      .string()
      .min(1)
      .max(40)
      // .regex(/^[a-z]+$/, "Subdirectory must be lowercase")
      .transform(
        (value) =>
          value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, "") // Remove non-URL-safe characters
      )
      .refine(
        (value) => /^[a-z0-9-]+$/.test(value), // Ensure only URL-safe characters
        {
          message:
            "Subdirectory must contain only lowercase letters, numbers, or hyphens",
        }
      )
      .pipe(
        z.string().superRefine((email, ctx) => {
          if (typeof options?.isSubdirectoryUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          return options.isSubdirectoryUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message:
                  "Subdirectory already exists.Subdirectory must be unique",
              });
            }
          });
        })
      ),
    name: z.string().min(1).max(35),
    description: z.string().min(1).max(150),
  });
}

// seller onboarding

export const DescriptionSchema = z.object({
  description: z.string().min(1).max(150),
  shortDescription: z.string().min(1).max(50).optional(),
  longDescription: z.string().min(50).max(500).optional(),
});

export const PriceSchema = z.object({
  price: z.number().min(0).max(10000000),
  profitMultiple: z.number().min(0).max(10),
  revenueMultiple: z.number().min(0).max(10),
  trailing12MonthProfit: z.number().min(0).max(10000000).optional(),
  trailing12MonthRevenue: z.number().min(0).max(10000000).optional(),
  lastMonthRevenue: z.number().min(0).max(1000000).optional(),
  lastMonthProfit: z.number().min(0).max(1000000).optional(),
});

export const ProfileSchema = z.object({
  foundedDate: z.date().optional(),
  numEmployees: z.number().min(1).max(5000).optional(),
  competitors: z.string().optional(),
  growthOpportunities: z.string().optional(),
  assets: z.string().optional(),
  sellingReason: z.string().min(1).max(100).optional(),
  financing: z.string().min(1).max(35).optional(),
  scale: z.string().min(1).max(35).optional(),
  businessModel: z.string().min(1).max(35).optional(),
  maturity: z.string().min(1).max(35).optional(),
  location: z.string().min(1).max(35).optional(),
});

export const WholeListingSchema = z.object({
  description: z.string().min(1).max(150),
  shortDescription: z.string().min(1).max(50).optional(),
  longDescription: z.string().min(50).max(500).optional(),
  foundedDate: z.date().optional(),
  numEmployees: z.number().min(1).max(5000).optional(),
  competitors: z.string().optional(),
  growthOpportunities: z.string().optional(),
  assets: z.string().optional(),
  sellingReason: z.string().min(1).max(100).optional(),
  financing: z.string().min(1).max(35).optional(),
  scale: z.string().min(1).max(35).optional(),
  businessModel: z.string().min(1).max(35).optional(),
  maturity: z.string().min(1).max(35).optional(),
  location: z.string().min(1).max(35).optional(),
  price: z.number().min(0).max(10000000),
  profitMultiple: z.number().min(0).max(10),
  revenueMultiple: z.number().min(0).max(10),
  trailing12MonthProfit: z.number().min(0).max(10000000).optional(),
  trailing12MonthRevenue: z.number().min(0).max(10000000).optional(),
  lastMonthRevenue: z.number().min(0).max(1000000).optional(),
  lastMonthProfit: z.number().min(0).max(1000000).optional(),
});
