import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const siteSchema = z.object({
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

export const priceRangeFormSchema = z.object({
  minValue: z.string().min(0).max(1000000),
  maxValue: z.string().min(0).max(1000000).optional(),
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
