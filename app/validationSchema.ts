import { z } from "zod";

export const issueSchema = z.object({
  name: z
    .string()
    .min(1, "Title must be at least 1 character.")
    .max(255, "Title must be at most 255 characters."),
  description: z
    .string()
    .min(1, "Description must be at least 1 character.")
    .max(65535),
});

export const patchIssueSchema = z.object({
  name: z
    .string()
    .min(1, "Title must be at least 1 character.")
    .max(255, "Title must be at most 255 characters.")
    .optional(),
  description: z
    .string()
    .min(1, "Description must be at least 1 character.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
