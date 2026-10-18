import { z } from "zod";

export const teamSizes = ["1-3", "4-10", "11-50", "51+"] as const;
export const useCases = ["Support", "Sales", "Marketing campaigns", "All of these"] as const;

// Shared by the form and the API route so both validate the same way.
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(80, "Use 80 characters or fewer."),
  email: z.email("Enter a valid work email.").trim().max(120).toLowerCase(),
  company: z.string().trim().min(2, "Enter your company name.").max(100, "Use 100 characters or fewer."),
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{7,14}$/, "Use international format, for example +971501234567."),
  teamSize: z.enum(teamSizes, { error: "Choose your team size." }),
  useCase: z.enum(useCases, { error: "Choose what you'll use CEYNX for." }),
  message: z.string().trim().max(1000, "Use 1,000 characters or fewer.").optional().default(""),
  consent: z.literal(true, { error: "Tick the box so we can contact you." }),
  // Spam traps: `website` must stay empty, `elapsedMs` is how long the form was open.
  website: z.string().max(0).optional().default(""),
  elapsedMs: z.number().int().nonnegative().max(86_400_000),
});

export type RegisterInput = z.infer<typeof registerSchema>;
