import * as z from "zod";

const isPhoneNumber = (ph: string) => ph.length > 8 && ph.length <= 10;

export const userAuthSchema = z.object({
  email: z.string().email("Provide a valid email id").optional().or(z.literal("")),
  phone: z
    .string()
    .transform((value) => value.replaceAll(" ", ""))
    .refine(isPhoneNumber, (val) => ({
      message: `${val} is not a valid phone number`,
    }))
    .optional()
    .or(z.literal("")),
});
