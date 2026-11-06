import * as z from "zod/mini";

export const interests = [
  "CEYNX Connect (WhatsApp messaging)",
  "CEYNX DocSense (document AI)",
  "CEYNX Voice (AI voice agent)",
  "CEYNX Learn 3D (3D learning)",
  "AI agents & automation",
  "Custom software development",
  "Something else",
] as const;

export const budgets = ["Not sure yet", "Under $5k", "$5k–$20k", "$20k–$50k", "$50k+"] as const;

const optionalText = (max: number, extra?: z.core.$ZodCheck<string>) =>
  z.optional(z.string().check(z.trim(), z.maxLength(max), ...(extra ? [extra] : [])));

/**
 * Shared by the browser form and the API route, so both validate identically.
 * Uses the lightweight `zod/mini` build to keep the browser bundle small.
 */
export const leadSchema = z.object({
  kind: z._default(z.enum(["contact", "demo", "project"]), "contact"),
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your name."), z.maxLength(120)),
  email: z.email("Please enter a valid email address.").check(z.maxLength(200)),
  company: optionalText(160),
  phone: optionalText(40, z.regex(/^[+()\d\s-]*$/, "Use digits, spaces and + ( ) - only.")),
  interest: z.enum(interests, { error: "Please choose what you're interested in." }),
  budget: z.optional(z.enum(budgets)),
  message: z.string({ error: "Please add a few words about what you need." }).check(
    z.trim(),
    z.minLength(10, "Please add a few words about what you need."),
    z.maxLength(4000),
  ),
  consent: z.literal(true, { error: "Please agree so we can reply to you." }),
  /** Honeypot: real visitors never fill this hidden field. */
  website: z.optional(z.string().check(z.maxLength(0))),
  pagePath: z.optional(z.string().check(z.maxLength(300))),
});

export type Lead = z.infer<typeof leadSchema>;

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address.").check(z.maxLength(200)),
  website: z.optional(z.string().check(z.maxLength(0))),
});
