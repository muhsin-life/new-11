import { z } from "zod";

export const CardValidator = z.object({
  card_number: z.string().datetime(),
  expiry_date: z.string().min(3, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type TCardValidator = z.infer<typeof CardValidator>;
